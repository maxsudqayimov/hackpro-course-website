import { createHash, createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const PASSWORD_N = 32_768;
const PASSWORD_R = 8;
const PASSWORD_P = 1;
const PASSWORD_BYTES = 64;

export function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

export function validateRegistration({ email, password, displayName }) {
  const normalized = normalizeEmail(email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) || normalized.length > 254) {
    return 'To‘g‘ri elektron pochta manzilini kiriting.';
  }
  if (String(displayName || '').trim().length < 2 || String(displayName).trim().length > 60) {
    return 'Ism 2–60 belgidan iborat bo‘lishi kerak.';
  }
  if (typeof password !== 'string' || password.length < 10 || password.length > 128) {
    return 'Parol 10–128 belgidan iborat bo‘lishi kerak.';
  }
  if (!/[a-z]/i.test(password) || !/[0-9]/.test(password)) {
    return 'Parolda harf va raqam bo‘lishi kerak.';
  }
  if (password.toLowerCase().includes(normalized.split('@')[0])) {
    return 'Parol elektron pochta nomini o‘z ichiga olmasin.';
  }
  return null;
}

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const derived = await scrypt(password.normalize('NFKC'), salt, PASSWORD_BYTES, {
    N: PASSWORD_N,
    r: PASSWORD_R,
    p: PASSWORD_P,
    maxmem: 64 * 1024 * 1024,
  });
  return ['scrypt', PASSWORD_N, PASSWORD_R, PASSWORD_P, salt.toString('base64url'), Buffer.from(derived).toString('base64url')].join('$');
}

export async function verifyPassword(password, encoded) {
  try {
    const [algorithm, n, r, p, saltEncoded, hashEncoded] = String(encoded).split('$');
    if (algorithm !== 'scrypt') return false;
    const expected = Buffer.from(hashEncoded, 'base64url');
    const actual = Buffer.from(await scrypt(password.normalize('NFKC'), Buffer.from(saltEncoded, 'base64url'), expected.length, {
      N: Number(n), r: Number(r), p: Number(p), maxmem: 64 * 1024 * 1024,
    }));
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

export function createSessionToken() {
  const token = randomBytes(32).toString('base64url');
  return { token, tokenHash: hashSessionToken(token) };
}

export function hashSessionToken(token) {
  return createHash('sha256').update(String(token)).digest('hex');
}

export function createLabAccessToken(lab, secret) {
  return createHmac('sha256', secret)
    .update(`${lab.id}.${lab.user_id}.${lab.expires_at}`)
    .digest('base64url');
}

export function safeTokenEqual(left, right) {
  const first = Buffer.from(String(left || ''));
  const second = Buffer.from(String(right || ''));
  return first.length === second.length && first.length > 0 && timingSafeEqual(first, second);
}

export function parseCookies(header) {
  const result = {};
  for (const item of String(header || '').split(';')) {
    const separator = item.indexOf('=');
    if (separator < 1) continue;
    const key = item.slice(0, separator).trim();
    const value = item.slice(separator + 1).trim();
    try { result[key] = decodeURIComponent(value); } catch { result[key] = value; }
  }
  return result;
}

export function sessionCookie(name, value, { maxAge, secure }) {
  const parts = [`${name}=${encodeURIComponent(value)}`, 'Path=/', 'HttpOnly', 'SameSite=Strict'];
  if (secure) parts.push('Secure');
  if (Number.isFinite(maxAge)) parts.push(`Max-Age=${Math.max(0, Math.floor(maxAge))}`);
  return parts.join('; ');
}

export function verifyStripeSignature(payload, signatureHeader, secret, toleranceSeconds = 300) {
  if (!secret || !signatureHeader) return false;
  const parts = String(signatureHeader).split(',').map((part) => part.split('='));
  const timestamp = parts.find(([key]) => key === 't')?.[1];
  const signatures = parts.filter(([key]) => key === 'v1').map(([, value]) => value);
  if (!timestamp || !signatures.length) return false;
  const seconds = Number(timestamp);
  if (!Number.isFinite(seconds) || Math.abs(Math.floor(Date.now() / 1000) - seconds) > toleranceSeconds) return false;
  const expected = createHmac('sha256', secret).update(`${timestamp}.${payload}`).digest();
  return signatures.some((signature) => {
    try {
      const candidate = Buffer.from(signature, 'hex');
      return candidate.length === expected.length && timingSafeEqual(candidate, expected);
    } catch {
      return false;
    }
  });
}

export function safePublicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    plan: row.plan,
    xp: Number(row.xp || 0),
    createdAt: row.created_at,
  };
}
