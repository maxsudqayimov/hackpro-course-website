import path from 'node:path';

function integer(name, fallback, min = 1, max = Number.MAX_SAFE_INTEGER) {
  const value = Number.parseInt(process.env[name] || String(fallback), 10);
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${name} noto‘g‘ri qiymatga ega`);
  }
  return value;
}

function boolean(name, fallback = false) {
  const value = process.env[name];
  if (value == null || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

const defaultDatabase = path.resolve(process.cwd(), 'data', 'hackpro.sqlite');
const appOrigin = process.env.APP_ORIGIN || 'http://127.0.0.1:5173,http://localhost:5173';

export const config = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: integer('BACKEND_PORT', 8787, 1, 65535),
  databasePath: path.resolve(process.env.DATABASE_PATH || defaultDatabase),
  appOrigins: appOrigin.split(',').map((value) => value.trim()).filter(Boolean),
  apiPublicUrl: process.env.API_PUBLIC_URL || 'http://127.0.0.1:8787',
  cookieName: process.env.SESSION_COOKIE_NAME || 'hackpro_session',
  cookieSecure: boolean('COOKIE_SECURE', process.env.NODE_ENV === 'production'),
  sessionTtlDays: integer('SESSION_TTL_DAYS', 14, 1, 90),
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  stripeApiVersion: process.env.STRIPE_API_VERSION || '',
  stripePricePro: process.env.STRIPE_PRICE_PRO || '',
  stripePriceMentor: process.env.STRIPE_PRICE_MENTOR || '',
  workerPollMs: integer('WORKER_POLL_MS', 700, 100, 30_000),
  judgeTimeoutMs: integer('JUDGE_TIMEOUT_MS', 5_000, 500, 30_000),
  judgeMaxOutputBytes: integer('JUDGE_MAX_OUTPUT_BYTES', 65_536, 1_024, 1_048_576),
  judgeImageJavaScript: process.env.JUDGE_IMAGE_JAVASCRIPT || 'node:24-alpine',
  judgeImagePython: process.env.JUDGE_IMAGE_PYTHON || 'python:3.13-alpine',
  labImageStation: process.env.LAB_IMAGE_STATION || process.env.LAB_IMAGE_WEB_BASICS || 'hackpro/lab-station:local',
  labNetwork: process.env.LAB_DOCKER_NETWORK || 'hackpro-labs',
  labPublicBaseUrl: (process.env.LAB_PUBLIC_BASE_URL || 'http://127.0.0.1:8790').replace(/\/$/, ''),
  labGatewayPort: integer('LAB_GATEWAY_PORT', 8790, 1, 65535),
  labUpstreamHost: process.env.LAB_UPSTREAM_HOST || '127.0.0.1',
  labAccessSecret: process.env.LAB_ACCESS_SECRET || 'hackpro-local-lab-secret-change-me-2026',
  labTtlMinutes: integer('LAB_TTL_MINUTES', 30, 5, 180),
  maxLabsPerUser: integer('MAX_LABS_PER_USER', 1, 1, 5),
});

export function assertProductionConfig() {
  if (config.nodeEnv !== 'production') return;
  if (!config.cookieSecure) throw new Error('Productionda COOKIE_SECURE=true bo‘lishi kerak');
  if (config.appOrigins.some((origin) => !origin.startsWith('https://'))) {
    throw new Error('Production APP_ORIGIN faqat HTTPS manzillardan iborat bo‘lishi kerak');
  }
  if (config.labAccessSecret.length < 32) throw new Error('Productionda LAB_ACCESS_SECRET kamida 32 belgidan iborat bo‘lishi kerak');
}
