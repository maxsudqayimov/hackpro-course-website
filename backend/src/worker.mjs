import { config } from './config.mjs';
import { audit, nowIso, openDatabase, transaction } from './db.mjs';
import { docker, runSubmission, startLabContainer, stopLabContainer } from './docker.mjs';

const db = openDatabase();
let stopping = false;

function claimSubmission() {
  return transaction(db, () => {
    const row = db.prepare("SELECT * FROM submissions WHERE status = 'queued' ORDER BY created_at LIMIT 1").get();
    if (!row) return null;
    const changed = db.prepare("UPDATE submissions SET status = 'running', started_at = ? WHERE id = ? AND status = 'queued'")
      .run(nowIso(), row.id).changes;
    return changed ? { ...row, status: 'running' } : null;
  });
}

async function processSubmission() {
  const submission = claimSubmission();
  if (!submission) return false;
  try {
    const challenge = db.prepare('SELECT * FROM challenges WHERE id = ?').get(submission.challenge_id);
    if (!challenge) throw new Error('Challenge topilmadi');
    const tests = JSON.parse(challenge.tests_json);
    const result = await runSubmission({
      id: submission.id,
      language: submission.language,
      source: submission.source,
      tests,
    });
    const finalStatus = result.passed ? 'passed' : 'failed';
    transaction(db, () => {
      db.prepare('UPDATE submissions SET status = ?, result_json = ?, finished_at = ? WHERE id = ?')
        .run(finalStatus, JSON.stringify(result), nowIso(), submission.id);
      if (result.passed) {
        const solve = db.prepare(`INSERT OR IGNORE INTO challenge_solves
          (user_id, challenge_id, submission_id, solved_at, xp_awarded) VALUES (?, ?, ?, ?, ?)`)
          .run(submission.user_id, submission.challenge_id, submission.id, nowIso(), challenge.xp);
        if (solve.changes) db.prepare('UPDATE users SET xp = xp + ?, updated_at = ? WHERE id = ?')
          .run(challenge.xp, nowIso(), submission.user_id);
      }
      audit(db, `judge.${finalStatus}`, {
        userId: submission.user_id,
        metadata: { submissionId: submission.id, challengeId: submission.challenge_id },
      });
    });
  } catch (error) {
    db.prepare("UPDATE submissions SET status = 'error', result_json = ?, finished_at = ? WHERE id = ?")
      .run(JSON.stringify({ passed: false, message: 'Tekshiruvchi xizmatida xatolik.', detail: String(error.message).slice(0, 500) }), nowIso(), submission.id);
    console.error(`Submission ${submission.id}:`, error.message);
  }
  return true;
}

function claimLab(status, nextStatus) {
  return transaction(db, () => {
    const row = db.prepare('SELECT * FROM lab_sessions WHERE status = ? ORDER BY created_at LIMIT 1').get(status);
    if (!row) return null;
    const changed = db.prepare('UPDATE lab_sessions SET status = ? WHERE id = ? AND status = ?').run(nextStatus, row.id, status).changes;
    return changed ? { ...row, status: nextStatus } : null;
  });
}

async function processLabStart() {
  const lab = claimLab('pending', 'starting');
  if (!lab) return false;
  try {
    const runtime = await startLabContainer(lab);
    db.prepare("UPDATE lab_sessions SET status = 'running', container_id = ?, port = ? WHERE id = ?")
      .run(runtime.containerId, runtime.port, lab.id);
    audit(db, 'lab.started', { userId: lab.user_id, metadata: { labId: lab.id } });
  } catch (error) {
    db.prepare("UPDATE lab_sessions SET status = 'error', error_message = ?, stopped_at = ? WHERE id = ?")
      .run(String(error.message).slice(0, 500), nowIso(), lab.id);
    console.error(`Lab ${lab.id}:`, error.message);
  }
  return true;
}

async function processLabStop() {
  const lab = claimLab('stopping', 'stopping');
  if (!lab) return false;
  try {
    await stopLabContainer(lab);
    db.prepare("UPDATE lab_sessions SET status = 'stopped', stopped_at = ? WHERE id = ?").run(nowIso(), lab.id);
    audit(db, 'lab.stopped', { userId: lab.user_id, metadata: { labId: lab.id } });
  } catch (error) {
    db.prepare("UPDATE lab_sessions SET status = 'error', error_message = ?, stopped_at = ? WHERE id = ?")
      .run(String(error.message).slice(0, 500), nowIso(), lab.id);
  }
  return true;
}

async function expireLabs() {
  const rows = db.prepare("SELECT * FROM lab_sessions WHERE status = 'running' AND expires_at <= ?").all(nowIso());
  for (const lab of rows) {
    db.prepare("UPDATE lab_sessions SET status = 'stopping' WHERE id = ? AND status = 'running'").run(lab.id);
  }
}

async function loop() {
  const engine = await docker(['version', '--format', '{{.Server.Version}}'], { timeoutMs: 10_000 });
  if (engine.code !== 0 || !engine.stdout.trim()) throw new Error('Docker Engine worker uchun mavjud emas');
  db.prepare("UPDATE submissions SET status = 'queued', started_at = NULL WHERE status = 'running'").run();
  db.prepare("UPDATE lab_sessions SET status = 'pending' WHERE status = 'starting'").run();
  while (!stopping) {
    db.prepare(`INSERT INTO service_heartbeats (service_name, last_seen_at) VALUES ('worker', ?)
      ON CONFLICT(service_name) DO UPDATE SET last_seen_at = excluded.last_seen_at`).run(nowIso());
    let worked = false;
    worked = await processSubmission() || worked;
    worked = await processLabStart() || worked;
    worked = await processLabStop() || worked;
    await expireLabs();
    if (!worked) await new Promise((resolve) => setTimeout(resolve, config.workerPollMs));
  }
}

console.log('HackPro worker ishga tushdi');
loop().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function shutdown() {
  stopping = true;
  setTimeout(() => {
    db.close();
    process.exit(0);
  }, config.workerPollMs + 100).unref();
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
