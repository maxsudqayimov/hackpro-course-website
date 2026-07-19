import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { config } from './config.mjs';
import { getLabTemplate } from './lab-catalog.mjs';

function runProcess(command, args, { input = '', timeoutMs = 15_000, maxOutputBytes = config.judgeMaxOutputBytes } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true });
    const stdout = [];
    const stderr = [];
    let stdoutBytes = 0;
    let stderrBytes = 0;
    let settled = false;
    let timedOut = false;

    const finish = (error, code = null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const result = {
        code,
        stdout: Buffer.concat(stdout).toString('utf8'),
        stderr: Buffer.concat(stderr).toString('utf8'),
        timedOut,
      };
      if (error) reject(Object.assign(error, { result }));
      else resolve(result);
    };

    const collect = (target, chunk, currentBytes, setBytes) => {
      const next = currentBytes + chunk.length;
      if (next > maxOutputBytes) {
        child.kill('SIGKILL');
        finish(new Error('Jarayon chiqishi ruxsat etilgan hajmdan oshdi'));
        return;
      }
      target.push(chunk);
      setBytes(next);
    };

    child.stdout.on('data', (chunk) => collect(stdout, chunk, stdoutBytes, (value) => { stdoutBytes = value; }));
    child.stderr.on('data', (chunk) => collect(stderr, chunk, stderrBytes, (value) => { stderrBytes = value; }));
    child.once('error', (error) => finish(error));
    child.once('close', (code) => finish(null, code));
    child.stdin.on('error', () => {});
    child.stdin.end(input);

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
    }, timeoutMs);
  });
}

export async function docker(args, options = {}) {
  return runProcess('docker', args, options);
}

async function removeContainer(name) {
  try { await docker(['rm', '-f', name], { timeoutMs: 8_000 }); } catch {}
}

function normalized(value) {
  return String(value).replace(/\r\n/g, '\n').trimEnd();
}

export async function runSubmission({ id, language, source, tests }) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'hackpro-judge-'));
  const fileName = language === 'python' ? 'main.py' : 'main.js';
  const image = language === 'python' ? config.judgeImagePython : config.judgeImageJavaScript;
  const command = language === 'python' ? ['python', '-I', fileName] : ['node', '--disable-proto=throw', fileName];
  fs.writeFileSync(path.join(directory, fileName), source, { encoding: 'utf8', mode: 0o400 });
  const results = [];
  try {
    for (let index = 0; index < tests.length; index += 1) {
      const test = tests[index];
      const containerName = `hackpro-judge-${id.slice(0, 12)}-${index}`;
      const args = [
        'run', '--rm', '--name', containerName, '--interactive',
        '--network', 'none', '--read-only', '--cap-drop', 'ALL',
        '--security-opt', 'no-new-privileges', '--pids-limit', '64',
        '--memory', '128m', '--memory-swap', '128m', '--cpus', '0.5',
        '--tmpfs', '/tmp:rw,noexec,nosuid,size=16m', '--user', '65534:65534',
        '--volume', `${directory}:/workspace:ro`, '--workdir', '/workspace',
        image, ...command,
      ];
      let execution;
      try {
        execution = await docker(args, { input: test.input, timeoutMs: config.judgeTimeoutMs });
      } catch (error) {
        await removeContainer(containerName);
        if (error.result?.timedOut) {
          results.push({ index: index + 1, passed: false, status: 'timeout' });
          break;
        }
        throw error;
      }
      const passed = execution.code === 0 && normalized(execution.stdout) === normalized(test.expected);
      results.push({
        index: index + 1,
        passed,
        status: execution.code === 0 ? (passed ? 'passed' : 'wrong_answer') : 'runtime_error',
        stderr: execution.code === 0 ? undefined : execution.stderr.slice(0, 2_000),
      });
      if (!passed) break;
    }
    return { passed: results.length === tests.length && results.every((test) => test.passed), tests: results };
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

export async function ensureLabNetwork() {
  const inspected = await docker(['network', 'inspect', config.labNetwork], { timeoutMs: 8_000 }).catch(() => null);
  if (inspected?.code === 0) return;
  const created = await docker(['network', 'create', '--internal', config.labNetwork], { timeoutMs: 8_000 });
  if (created.code !== 0) throw new Error(created.stderr || 'Laboratoriya tarmog‘i yaratilmadi');
}

export async function startLabContainer(lab) {
  await ensureLabNetwork();
  const name = `hackpro-lab-${lab.id.slice(0, 12)}`;
  const template = getLabTemplate(lab.template_id);
  if (!template) throw new Error('Laboratoriya image’i ruxsat etilmagan');
  const image = config.labImageStation;
  await removeContainer(name);
  const execution = await docker([
    'run', '--detach', '--name', name,
    '--network', config.labNetwork, '--read-only', '--cap-drop', 'ALL',
    '--security-opt', 'no-new-privileges', '--pids-limit', '64',
    '--memory', '128m', '--memory-swap', '128m', '--cpus', '0.25',
    '--tmpfs', '/tmp:rw,noexec,nosuid,size=8m',
    '--publish', '127.0.0.1::8080',
    '--label', `hackpro.lab=${lab.id}`,
    '--label', `hackpro.expires=${lab.expires_at}`,
    '--env', `LAB_SCENARIO=${template.id}`,
    image,
  ], { timeoutMs: 20_000 });
  if (execution.code !== 0) throw new Error(execution.stderr || 'Laboratoriya konteyneri ishga tushmadi');
  const containerId = execution.stdout.trim();
  const portResult = await docker(['port', name, '8080/tcp'], { timeoutMs: 8_000 });
  const portMatch = portResult.stdout.match(/:(\d+)\s*$/m);
  if (!portMatch) {
    await removeContainer(name);
    throw new Error('Laboratoriya porti aniqlanmadi');
  }
  return { containerId, port: Number(portMatch[1]) };
}

export async function stopLabContainer(lab) {
  const name = `hackpro-lab-${lab.id.slice(0, 12)}`;
  await removeContainer(name);
}
