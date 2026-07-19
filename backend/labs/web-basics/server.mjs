import http from 'node:http';
import fs from 'node:fs';
import { scenarios } from './scenarios.mjs';

const page = fs.readFileSync(new URL('./index.html', import.meta.url));
const scenario = scenarios[process.env.LAB_SCENARIO] || scenarios['web-basics'];

function normalize(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function send(res, status, body, contentType = 'application/json; charset=utf-8') {
  const data = Buffer.isBuffer(body) ? body : Buffer.from(typeof body === 'string' ? body : JSON.stringify(body));
  res.writeHead(status, {
    'Content-Type': contentType,
    'Content-Length': data.length,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; connect-src 'self'; img-src data:; form-action 'none'; frame-ancestors 'none'",
  });
  res.end(data);
}

async function readJson(req) {
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > 16_384) throw new Error('payload_too_large');
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch { throw new Error('invalid_json'); }
}

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://lab.local').pathname;
  if (req.method === 'GET' && ['/', '/index.html'].includes(pathname)) {
    return send(res, 200, page, 'text/html; charset=utf-8');
  }
  if (req.method === 'GET' && pathname === '/api/scenario') {
    const { answers, commands, ...publicScenario } = scenario;
    return send(res, 200, { scenario: publicScenario, availableCommands: Object.keys(commands).filter((command) => command !== 'help') });
  }
  if (req.method === 'POST' && pathname === '/api/command') {
    try {
      const body = await readJson(req);
      const command = normalize(body.command);
      if (command === 'clear') return send(res, 200, { clear: true, output: '' });
      const output = scenario.commands[command] || `hackpro-lab: buyruq topilmadi: ${String(body.command || '').slice(0, 120)}\n"help" buyrug‘idan foydalaning.`;
      return send(res, 200, { output });
    } catch {
      return send(res, 400, { error: 'Buyruq noto‘g‘ri.' });
    }
  }
  if (req.method === 'POST' && pathname === '/api/check') {
    try {
      const body = await readJson(req);
      const passed = scenario.answers.some((answer) => normalize(answer) === normalize(body.answer));
      return send(res, 200, passed
        ? { passed: true, message: scenario.success }
        : { passed: false, message: 'Javob hali to‘g‘ri emas. Dalillarni yana tekshiring.', hint: scenario.hint });
    } catch {
      return send(res, 400, { error: 'Javob noto‘g‘ri.' });
    }
  }
  return send(res, 404, { error: 'Not found' });
});

server.listen(8080, '0.0.0.0');
