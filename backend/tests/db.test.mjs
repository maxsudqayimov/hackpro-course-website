import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { openDatabase, publicChallenge, transaction } from '../src/db.mjs';

test('baza yaratiladi, challenge seed qilinadi va tranzaksiya ishlaydi', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'hackpro-db-test-'));
  const databasePath = path.join(directory, 'test.sqlite');
  const db = openDatabase(databasePath);
  try {
    const challenge = db.prepare("SELECT * FROM challenges WHERE id = 'array-transform'").get();
    const publicData = publicChallenge(challenge);
    assert.deepEqual(publicData.languages, ['javascript', 'python']);
    assert.equal('tests' in publicData, false);
    assert.equal(publicData.examples.length, 1);

    transaction(db, () => {
      db.prepare(`INSERT INTO users
        (id, email, display_name, password_hash, plan, xp, created_at, updated_at)
        VALUES ('u1', 'student@example.com', 'Student', 'hash', 'free', 0, 'now', 'now')`).run();
    });
    assert.equal(db.prepare("SELECT COUNT(*) AS count FROM users").get().count, 1);
  } finally {
    db.close();
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
