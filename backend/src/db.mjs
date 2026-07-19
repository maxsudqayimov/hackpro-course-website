import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { config } from './config.mjs';

const migrations = [
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'mentor')),
    xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    ip_hash TEXT,
    user_agent TEXT
  )`,
  'CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id)',
  'CREATE INDEX IF NOT EXISTS sessions_expiry_idx ON sessions(expires_at)',
  `CREATE TABLE IF NOT EXISTS lesson_progress (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    completed_at TEXT NOT NULL,
    xp_awarded INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, lesson_id)
  )`,
  `CREATE TABLE IF NOT EXISTS challenges (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    xp INTEGER NOT NULL,
    languages_json TEXT NOT NULL,
    starter_json TEXT NOT NULL,
    tests_json TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 1
  )`,
  `CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    challenge_id TEXT NOT NULL REFERENCES challenges(id),
    language TEXT NOT NULL,
    source TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('queued', 'running', 'passed', 'failed', 'error')),
    result_json TEXT,
    created_at TEXT NOT NULL,
    started_at TEXT,
    finished_at TEXT
  )`,
  'CREATE INDEX IF NOT EXISTS submissions_queue_idx ON submissions(status, created_at)',
  `CREATE TABLE IF NOT EXISTS challenge_solves (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    challenge_id TEXT NOT NULL REFERENCES challenges(id),
    submission_id TEXT NOT NULL REFERENCES submissions(id),
    solved_at TEXT NOT NULL,
    xp_awarded INTEGER NOT NULL,
    PRIMARY KEY (user_id, challenge_id)
  )`,
  `CREATE TABLE IF NOT EXISTS lab_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    template_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'starting', 'running', 'stopping', 'stopped', 'expired', 'error')),
    container_id TEXT,
    port INTEGER,
    error_message TEXT,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    stopped_at TEXT
  )`,
  'CREATE INDEX IF NOT EXISTS labs_queue_idx ON lab_sessions(status, created_at)',
  'CREATE INDEX IF NOT EXISTS labs_expiry_idx ON lab_sessions(status, expires_at)',
  `CREATE TABLE IF NOT EXISTS lab_completions (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    template_id TEXT NOT NULL,
    lab_session_id TEXT NOT NULL REFERENCES lab_sessions(id),
    completed_at TEXT NOT NULL,
    xp_awarded INTEGER NOT NULL,
    PRIMARY KEY (user_id, template_id)
  )`,
  `CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    provider_session_id TEXT UNIQUE,
    provider_customer_id TEXT,
    provider_subscription_id TEXT,
    plan TEXT NOT NULL,
    status TEXT NOT NULL,
    amount INTEGER,
    currency TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS studio_drafts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content_type TEXT NOT NULL,
    summary TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS audit_events (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    ip_hash TEXT,
    metadata_json TEXT,
    created_at TEXT NOT NULL
  )`,
  'CREATE INDEX IF NOT EXISTS audit_created_idx ON audit_events(created_at)',
  `CREATE TABLE IF NOT EXISTS service_heartbeats (
    service_name TEXT PRIMARY KEY,
    last_seen_at TEXT NOT NULL
  )`,
];

const seededChallenges = [
  {
    id: 'array-transform',
    title: 'Massivni tartiblash',
    description: 'Standart kiritishdan JSON massivni o‘qing va sonlarni o‘sish tartibida JSON ko‘rinishida chiqaring.',
    difficulty: 'Oson',
    xp: 90,
    languages: ['javascript', 'python'],
    starter: {
      javascript: "const fs = require('fs');\nconst numbers = JSON.parse(fs.readFileSync(0, 'utf8'));\n// Yechimingiz\nconsole.log(JSON.stringify(numbers));\n",
      python: "import json, sys\nnumbers = json.loads(sys.stdin.read())\n# Yechimingiz\nprint(json.dumps(numbers, separators=(',', ':')))\n",
    },
    tests: [
      { input: '[3,1,2]', expected: '[1,2,3]', public: true },
      { input: '[9,-2,9,0,4]', expected: '[-2,0,4,9,9]', public: false },
      { input: '[]', expected: '[]', public: false },
    ],
  },
];

export function nowIso() {
  return new Date().toISOString();
}

export function openDatabase(databasePath = config.databasePath) {
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  const db = new DatabaseSync(databasePath);
  db.exec('PRAGMA journal_mode = WAL');
  db.exec('PRAGMA foreign_keys = ON');
  db.exec('PRAGMA busy_timeout = 5000');
  for (const sql of migrations) db.exec(sql);
  const paymentColumns = db.prepare('PRAGMA table_info(payments)').all().map((column) => column.name);
  if (!paymentColumns.includes('provider_subscription_id')) db.exec('ALTER TABLE payments ADD COLUMN provider_subscription_id TEXT');
  db.exec('CREATE UNIQUE INDEX IF NOT EXISTS payments_subscription_idx ON payments(provider_subscription_id) WHERE provider_subscription_id IS NOT NULL');
  const seed = db.prepare(`INSERT OR IGNORE INTO challenges
    (id, title, description, difficulty, xp, languages_json, starter_json, tests_json, active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`);
  for (const challenge of seededChallenges) {
    seed.run(
      challenge.id,
      challenge.title,
      challenge.description,
      challenge.difficulty,
      challenge.xp,
      JSON.stringify(challenge.languages),
      JSON.stringify(challenge.starter),
      JSON.stringify(challenge.tests),
    );
  }
  return db;
}

export function transaction(db, operation) {
  db.exec('BEGIN IMMEDIATE');
  try {
    const result = operation();
    db.exec('COMMIT');
    return result;
  } catch (error) {
    try { db.exec('ROLLBACK'); } catch {}
    throw error;
  }
}

export function audit(db, eventType, { userId = null, ipHash = null, metadata = null } = {}) {
  db.prepare('INSERT INTO audit_events (id, user_id, event_type, ip_hash, metadata_json, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    .run(randomUUID(), userId, eventType, ipHash, metadata ? JSON.stringify(metadata) : null, nowIso());
}

export function removeExpiredSessions(db) {
  return db.prepare('DELETE FROM sessions WHERE expires_at <= ?').run(nowIso()).changes;
}

export function publicChallenge(row) {
  const tests = JSON.parse(row.tests_json);
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    difficulty: row.difficulty,
    xp: row.xp,
    languages: JSON.parse(row.languages_json),
    starter: JSON.parse(row.starter_json),
    examples: tests.filter((test) => test.public).map(({ input, expected }) => ({ input, expected })),
  };
}
