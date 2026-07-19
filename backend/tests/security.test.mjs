import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import test from 'node:test';
import {
  createSessionToken,
  createLabAccessToken,
  hashPassword,
  hashSessionToken,
  validateRegistration,
  verifyPassword,
  verifyStripeSignature,
  safeTokenEqual,
} from '../src/security.mjs';

test('parol scrypt bilan xeshlanadi va tekshiriladi', async () => {
  const encoded = await hashPassword('KuchliParol2026');
  assert.equal(await verifyPassword('KuchliParol2026', encoded), true);
  assert.equal(await verifyPassword('Noto‘g‘riParol2026', encoded), false);
  assert.match(encoded, /^scrypt\$/);
});

test('sessiya tokenining faqat xeshi bazaga saqlanadi', () => {
  const session = createSessionToken();
  assert.notEqual(session.token, session.tokenHash);
  assert.equal(hashSessionToken(session.token), session.tokenHash);
  assert.equal(session.tokenHash.length, 64);
});

test('ro‘yxatdan o‘tish ma’lumotlari tekshiriladi', () => {
  assert.equal(validateRegistration({ email: 'student@hackpro.uz', password: 'KuchliParol2026', displayName: 'Talaba' }), null);
  assert.ok(validateRegistration({ email: 'xato', password: '123', displayName: 'T' }));
});

test('Stripe webhook HMAC imzosi va vaqti tekshiriladi', () => {
  const payload = JSON.stringify({ id: 'evt_test' });
  const timestamp = Math.floor(Date.now() / 1000);
  const secret = 'whsec_test';
  const signature = createHmac('sha256', secret).update(`${timestamp}.${payload}`).digest('hex');
  assert.equal(verifyStripeSignature(Buffer.from(payload), `t=${timestamp},v1=${signature}`, secret), true);
  assert.equal(verifyStripeSignature(Buffer.from(`${payload}x`), `t=${timestamp},v1=${signature}`, secret), false);
});

test('laboratoriya havolasi foydalanuvchi va muddatga bog‘langan', () => {
  const lab = { id: 'lab-1', user_id: 'user-1', expires_at: '2026-07-19T12:00:00.000Z' };
  const token = createLabAccessToken(lab, 'test-secret-that-is-long-enough-1234');
  assert.equal(safeTokenEqual(token, createLabAccessToken(lab, 'test-secret-that-is-long-enough-1234')), true);
  assert.equal(safeTokenEqual(token, createLabAccessToken({ ...lab, user_id: 'user-2' }, 'test-secret-that-is-long-enough-1234')), false);
});
