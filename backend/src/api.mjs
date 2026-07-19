import http from 'node:http';
import { createHash, randomUUID } from 'node:crypto';
import { assertProductionConfig, config } from './config.mjs';
import { audit, nowIso, openDatabase, publicChallenge, removeExpiredSessions, transaction } from './db.mjs';
import {
  HttpError,
  applyCors,
  createRateLimiter,
  json,
  readBody,
  requestIpHash,
  requireTrustedOrigin,
  routeMatch,
  securityHeaders,
} from './http.mjs';
import {
  createSessionToken,
  createLabAccessToken,
  hashPassword,
  hashSessionToken,
  normalizeEmail,
  parseCookies,
  safePublicUser,
  sessionCookie,
  validateRegistration,
  verifyPassword,
  verifyStripeSignature,
} from './security.mjs';
import { createCheckoutSession } from './stripe.mjs';
import { getLabTemplate, labCatalog } from './lab-catalog.mjs';

assertProductionConfig();
const db = openDatabase();
const authLimit = createRateLimiter({ windowMs: 15 * 60_000, max: 12 });
const submissionLimit = createRateLimiter({ windowMs: 60_000, max: 20 });
const dummyPasswordHash = await hashPassword('HackPro-dummy-password-42');

const lessonXp = new Map([
  ['cybersecurity-intro', 50], ['cyber-terms', 55], ['cia-triad', 65], ['modern-threats', 70],
  ['social-engineering', 75], ['incident-basics', 80], ['account-defense', 75], ['device-defense', 80],
  ['html-structure', 50], ['css-layout', 80], ['js-interaction', 90], ['design-system', 80], ['landing-project', 120],
  ['ai-intro', 50], ['prompt-basics', 60], ['ai-safety', 80], ['workflow-map', 80], ['assistant-prototype', 110],
  ['linux-workflow', 60], ['git-collaboration', 70], ['docker-basics', 90], ['cicd-pipeline', 100], ['monitoring-basics', 110],
]);

function sessionUser(req) {
  const token = parseCookies(req.headers.cookie)[config.cookieName];
  if (!token || token.length > 200) return null;
  return db.prepare(`SELECT u.* FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token_hash = ? AND s.expires_at > ?`).get(hashSessionToken(token), nowIso()) || null;
}

function requireUser(req) {
  const user = sessionUser(req);
  if (!user) throw new HttpError(401, 'authentication_required', 'Davom etish uchun tizimga kiring.');
  return user;
}

function createLoginSession(req, userId) {
  const { token, tokenHash } = createSessionToken();
  const createdAt = nowIso();
  const expiresAt = new Date(Date.now() + config.sessionTtlDays * 86_400_000).toISOString();
  db.prepare(`INSERT INTO sessions (token_hash, user_id, expires_at, created_at, ip_hash, user_agent)
    VALUES (?, ?, ?, ?, ?, ?)`)
    .run(tokenHash, userId, expiresAt, createdAt, requestIpHash(req), String(req.headers['user-agent'] || '').slice(0, 300));
  return sessionCookie(config.cookieName, token, {
    maxAge: config.sessionTtlDays * 86_400,
    secure: config.cookieSecure,
  });
}

function clearSessionCookie() {
  return sessionCookie(config.cookieName, '', { maxAge: 0, secure: config.cookieSecure });
}

function submissionPayload(row) {
  return {
    id: row.id,
    challengeId: row.challenge_id,
    language: row.language,
    status: row.status,
    result: row.result_json ? JSON.parse(row.result_json) : null,
    createdAt: row.created_at,
    finishedAt: row.finished_at,
  };
}

function labPayload(row) {
  const running = row.status === 'running' && row.port;
  const accessToken = running ? createLabAccessToken(row, config.labAccessSecret) : null;
  return {
    id: row.id,
    templateId: row.template_id,
    status: row.status,
    url: running ? `${config.labPublicBaseUrl}/session/${row.id}/?token=${encodeURIComponent(accessToken)}` : null,
    expiresAt: row.expires_at,
    error: row.status === 'error' ? row.error_message : null,
  };
}

function requireText(value, field, max) {
  const result = String(value || '').trim();
  if (!result || result.length > max) throw new HttpError(400, 'invalid_input', `${field} noto‘g‘ri.`);
  return result;
}

function workerAvailable() {
  const row = db.prepare("SELECT last_seen_at FROM service_heartbeats WHERE service_name = 'worker'").get();
  return Boolean(row && Date.now() - new Date(row.last_seen_at).getTime() < 15_000);
}

function requireWorker() {
  if (!workerAvailable()) throw new HttpError(503, 'worker_unavailable', 'Kod tekshiruvchi va laboratoriya worker’i hozir ishlamayapti.');
}

async function handleStripeWebhook(req, res) {
  const raw = await readBody(req, { limit: 1_048_576, raw: true });
  const signature = req.headers['stripe-signature'];
  if (!verifyStripeSignature(raw, signature, config.stripeWebhookSecret)) {
    throw new HttpError(400, 'invalid_signature', 'Webhook imzosi noto‘g‘ri.');
  }
  const event = JSON.parse(raw.toString('utf8'));
  if (event.type === 'checkout.session.completed') {
    const session = event.data?.object || {};
    const userId = session.metadata?.user_id || session.client_reference_id;
    const plan = session.metadata?.plan;
    if (userId && ['pro', 'mentor'].includes(plan)) {
      const timestamp = nowIso();
      transaction(db, () => {
        db.prepare('UPDATE users SET plan = ?, updated_at = ? WHERE id = ?').run(plan, timestamp, userId);
        db.prepare(`INSERT INTO payments
          (id, user_id, provider, provider_session_id, provider_customer_id, provider_subscription_id, plan, status, amount, currency, created_at, updated_at)
          VALUES (?, ?, 'stripe', ?, ?, ?, ?, 'paid', ?, ?, ?, ?)
          ON CONFLICT(provider_session_id) DO UPDATE SET status = 'paid', provider_subscription_id = excluded.provider_subscription_id, updated_at = excluded.updated_at`)
          .run(randomUUID(), userId, session.id, session.customer || null, session.subscription || null, plan, session.amount_total || null, session.currency || null, timestamp, timestamp);
        audit(db, 'payment.completed', { userId, metadata: { provider: 'stripe', plan, sessionId: session.id } });
      });
    }
  } else if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data?.object || {};
    const payment = db.prepare('SELECT * FROM payments WHERE provider_subscription_id = ?').get(subscription.id);
    const userId = subscription.metadata?.user_id || payment?.user_id;
    if (userId) {
      transaction(db, () => {
        db.prepare("UPDATE users SET plan = 'free', updated_at = ? WHERE id = ?").run(nowIso(), userId);
        db.prepare("UPDATE payments SET status = 'cancelled', updated_at = ? WHERE provider_subscription_id = ?").run(nowIso(), subscription.id);
        audit(db, 'payment.subscription_cancelled', { userId, metadata: { subscriptionId: subscription.id } });
      });
    }
  }
  return json(res, 200, { received: true });
}

async function handler(req, res) {
  for (const [name, value] of Object.entries(securityHeaders())) res.setHeader(name, value);
  applyCors(req, res);
  if (req.method === 'OPTIONS') return res.writeHead(204).end();

  const url = new URL(req.url, config.apiPublicUrl);
  const pathname = url.pathname.replace(/\/$/, '') || '/';

  if (req.method === 'GET' && pathname === '/api/v1/health') {
    return json(res, 200, { ok: true, service: 'hackpro-platform-api', worker: workerAvailable(), time: nowIso() });
  }
  if (req.method === 'POST' && pathname === '/api/v1/payments/webhook') return handleStripeWebhook(req, res);

  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) requireTrustedOrigin(req);

  if (req.method === 'POST' && pathname === '/api/v1/auth/register') {
    const ipHash = requestIpHash(req);
    authLimit(`${ipHash}:register`);
    const body = await readBody(req);
    const email = normalizeEmail(body.email);
    const displayName = String(body.displayName || '').trim();
    const validationError = validateRegistration({ email, password: body.password, displayName });
    if (validationError) throw new HttpError(400, 'invalid_registration', validationError);
    if (db.prepare('SELECT 1 FROM users WHERE email = ?').get(email)) {
      throw new HttpError(409, 'account_exists', 'Bu elektron pochta bilan akkaunt mavjud.');
    }
    const userId = randomUUID();
    const passwordHash = await hashPassword(body.password);
    const timestamp = nowIso();
    transaction(db, () => {
      db.prepare(`INSERT INTO users (id, email, display_name, password_hash, plan, xp, created_at, updated_at)
        VALUES (?, ?, ?, ?, 'free', 0, ?, ?)`)
        .run(userId, email, displayName, passwordHash, timestamp, timestamp);
      audit(db, 'auth.registered', { userId, ipHash });
    });
    const cookie = createLoginSession(req, userId);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    return json(res, 201, { user: safePublicUser(user) }, { 'Set-Cookie': cookie });
  }

  if (req.method === 'POST' && pathname === '/api/v1/auth/login') {
    const ipHash = requestIpHash(req);
    const body = await readBody(req);
    const email = normalizeEmail(body.email);
    authLimit(`${ipHash}:${createHash('sha256').update(email).digest('hex')}`);
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    const valid = await verifyPassword(String(body.password || ''), user?.password_hash || dummyPasswordHash);
    if (!user || !valid) {
      audit(db, 'auth.login_failed', { ipHash, metadata: { emailHash: createHash('sha256').update(email).digest('hex') } });
      throw new HttpError(401, 'invalid_credentials', 'Elektron pochta yoki parol noto‘g‘ri.');
    }
    const cookie = createLoginSession(req, user.id);
    audit(db, 'auth.login_succeeded', { userId: user.id, ipHash });
    return json(res, 200, { user: safePublicUser(user) }, { 'Set-Cookie': cookie });
  }

  if (req.method === 'POST' && pathname === '/api/v1/auth/logout') {
    const token = parseCookies(req.headers.cookie)[config.cookieName];
    if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(hashSessionToken(token));
    return json(res, 200, { ok: true }, { 'Set-Cookie': clearSessionCookie() });
  }

  if (req.method === 'GET' && pathname === '/api/v1/auth/me') {
    return json(res, 200, { user: safePublicUser(sessionUser(req)) });
  }

  if (req.method === 'GET' && pathname === '/api/v1/progress') {
    const user = requireUser(req);
    const lessons = db.prepare('SELECT lesson_id, completed_at, xp_awarded FROM lesson_progress WHERE user_id = ? ORDER BY completed_at').all(user.id);
    const refreshed = db.prepare('SELECT * FROM users WHERE id = ?').get(user.id);
    return json(res, 200, { lessonIds: lessons.map((row) => row.lesson_id), xp: refreshed.xp });
  }

  const progressParams = routeMatch(pathname, '/api/v1/progress/:lessonId');
  if (req.method === 'PUT' && progressParams) {
    const user = requireUser(req);
    const xp = lessonXp.get(progressParams.lessonId);
    if (!xp) throw new HttpError(404, 'lesson_not_found', 'Dars topilmadi.');
    const body = await readBody(req);
    const completed = body.completed !== false;
    transaction(db, () => {
      if (completed) {
        const result = db.prepare(`INSERT OR IGNORE INTO lesson_progress
          (user_id, lesson_id, completed_at, xp_awarded) VALUES (?, ?, ?, ?)`)
          .run(user.id, progressParams.lessonId, nowIso(), xp);
        if (result.changes) db.prepare('UPDATE users SET xp = xp + ?, updated_at = ? WHERE id = ?').run(xp, nowIso(), user.id);
      } else {
        const row = db.prepare('SELECT xp_awarded FROM lesson_progress WHERE user_id = ? AND lesson_id = ?').get(user.id, progressParams.lessonId);
        if (row) {
          db.prepare('DELETE FROM lesson_progress WHERE user_id = ? AND lesson_id = ?').run(user.id, progressParams.lessonId);
          db.prepare('UPDATE users SET xp = MAX(0, xp - ?), updated_at = ? WHERE id = ?').run(row.xp_awarded, nowIso(), user.id);
        }
      }
    });
    const lessonIds = db.prepare('SELECT lesson_id FROM lesson_progress WHERE user_id = ?').all(user.id).map((row) => row.lesson_id);
    const refreshed = db.prepare('SELECT * FROM users WHERE id = ?').get(user.id);
    return json(res, 200, { lessonIds, user: safePublicUser(refreshed) });
  }

  if (req.method === 'GET' && pathname === '/api/v1/challenges') {
    const challenges = db.prepare('SELECT * FROM challenges WHERE active = 1 ORDER BY difficulty, title').all().map(publicChallenge);
    const user = sessionUser(req);
    const solvedIds = user ? db.prepare('SELECT challenge_id FROM challenge_solves WHERE user_id = ?').all(user.id).map((row) => row.challenge_id) : [];
    return json(res, 200, { challenges, solvedIds });
  }

  if (req.method === 'POST' && pathname === '/api/v1/submissions') {
    const user = requireUser(req);
    requireWorker();
    submissionLimit(user.id);
    const body = await readBody(req, { limit: 32_768 });
    const challenge = db.prepare('SELECT * FROM challenges WHERE id = ? AND active = 1').get(String(body.challengeId || ''));
    if (!challenge) throw new HttpError(404, 'challenge_not_found', 'Challenge topilmadi.');
    const languages = JSON.parse(challenge.languages_json);
    if (!languages.includes(body.language)) throw new HttpError(400, 'language_not_allowed', 'Bu til challenge uchun yoqilmagan.');
    const source = String(body.source || '');
    if (!source.trim() || source.length > 20_000 || source.includes('\u0000')) throw new HttpError(400, 'invalid_source', 'Kod bo‘sh yoki juda katta.');
    const id = randomUUID();
    db.prepare(`INSERT INTO submissions
      (id, user_id, challenge_id, language, source, status, created_at)
      VALUES (?, ?, ?, ?, ?, 'queued', ?)`)
      .run(id, user.id, challenge.id, body.language, source, nowIso());
    audit(db, 'judge.submitted', { userId: user.id, metadata: { submissionId: id, challengeId: challenge.id, language: body.language } });
    return json(res, 202, { submission: submissionPayload(db.prepare('SELECT * FROM submissions WHERE id = ?').get(id)) });
  }

  const submissionParams = routeMatch(pathname, '/api/v1/submissions/:id');
  if (req.method === 'GET' && submissionParams) {
    const user = requireUser(req);
    const row = db.prepare('SELECT * FROM submissions WHERE id = ? AND user_id = ?').get(submissionParams.id, user.id);
    if (!row) throw new HttpError(404, 'submission_not_found', 'Tekshiruv topilmadi.');
    return json(res, 200, { submission: submissionPayload(row) });
  }

  if (req.method === 'GET' && pathname === '/api/v1/lab-templates') {
    const user = sessionUser(req);
    const completedIds = user ? db.prepare('SELECT template_id FROM lab_completions WHERE user_id = ?').all(user.id).map((row) => row.template_id) : [];
    return json(res, 200, { templates: labCatalog.map((template) => ({ ...template, ttlMinutes: config.labTtlMinutes, plan: 'free' })), completedIds });
  }

  if (req.method === 'POST' && pathname === '/api/v1/labs') {
    const user = requireUser(req);
    requireWorker();
    const body = await readBody(req);
    const template = getLabTemplate(String(body.templateId || ''));
    if (!template) throw new HttpError(404, 'lab_template_not_found', 'Laboratoriya topilmadi.');
    const activeCount = db.prepare(`SELECT COUNT(*) AS count FROM lab_sessions
      WHERE user_id = ? AND status IN ('pending','starting','running')`).get(user.id).count;
    if (activeCount >= config.maxLabsPerUser) throw new HttpError(409, 'lab_limit', 'Avvalgi laboratoriyani yoping.');
    const id = randomUUID();
    const expiresAt = new Date(Date.now() + config.labTtlMinutes * 60_000).toISOString();
    db.prepare(`INSERT INTO lab_sessions
      (id, user_id, template_id, status, created_at, expires_at)
      VALUES (?, ?, ?, 'pending', ?, ?)`)
      .run(id, user.id, template.id, nowIso(), expiresAt);
    audit(db, 'lab.requested', { userId: user.id, metadata: { labId: id, templateId: template.id } });
    return json(res, 202, { lab: labPayload(db.prepare('SELECT * FROM lab_sessions WHERE id = ?').get(id)) });
  }

  const labParams = routeMatch(pathname, '/api/v1/labs/:id');
  if (req.method === 'GET' && labParams) {
    const user = requireUser(req);
    const row = db.prepare('SELECT * FROM lab_sessions WHERE id = ? AND user_id = ?').get(labParams.id, user.id);
    if (!row) throw new HttpError(404, 'lab_not_found', 'Laboratoriya topilmadi.');
    return json(res, 200, { lab: labPayload(row) });
  }
  if (req.method === 'DELETE' && labParams) {
    const user = requireUser(req);
    const row = db.prepare('SELECT * FROM lab_sessions WHERE id = ? AND user_id = ?').get(labParams.id, user.id);
    if (!row) throw new HttpError(404, 'lab_not_found', 'Laboratoriya topilmadi.');
    if (['pending', 'starting', 'running'].includes(row.status)) {
      db.prepare("UPDATE lab_sessions SET status = 'stopping' WHERE id = ?").run(row.id);
    }
    return json(res, 202, { lab: labPayload(db.prepare('SELECT * FROM lab_sessions WHERE id = ?').get(row.id)) });
  }

  if (req.method === 'POST' && pathname === '/api/v1/payments/checkout') {
    const user = requireUser(req);
    const body = await readBody(req);
    const plan = body.plan === 'mentor' ? 'mentor' : body.plan === 'pro' ? 'pro' : null;
    if (!plan) throw new HttpError(400, 'invalid_plan', 'Tarif noto‘g‘ri.');
    const session = await createCheckoutSession({ user, plan });
    const timestamp = nowIso();
    db.prepare(`INSERT INTO payments
      (id, user_id, provider, provider_session_id, provider_customer_id, provider_subscription_id, plan, status, created_at, updated_at)
      VALUES (?, ?, 'stripe', ?, ?, ?, ?, 'created', ?, ?)`)
      .run(randomUUID(), user.id, session.id, session.customer || null, session.subscription || null, plan, timestamp, timestamp);
    return json(res, 201, { checkoutUrl: session.url });
  }

  if (req.method === 'GET' && pathname === '/api/v1/studio/drafts') {
    const user = requireUser(req);
    const drafts = db.prepare(`SELECT id, title, content_type AS contentType, summary, status, created_at AS createdAt
      FROM studio_drafts WHERE user_id = ? ORDER BY created_at DESC`).all(user.id);
    return json(res, 200, { drafts });
  }
  if (req.method === 'POST' && pathname === '/api/v1/studio/drafts') {
    const user = requireUser(req);
    const body = await readBody(req);
    const id = randomUUID();
    const title = requireText(body.title, 'Sarlavha', 120);
    const contentType = requireText(body.contentType, 'Kontent turi', 40);
    const summary = requireText(body.summary, 'Tavsif', 2_000);
    const timestamp = nowIso();
    db.prepare(`INSERT INTO studio_drafts
      (id, user_id, title, content_type, summary, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 'draft', ?, ?)`)
      .run(id, user.id, title, contentType, summary, timestamp, timestamp);
    return json(res, 201, { draft: { id, title, contentType, summary, status: 'draft', createdAt: timestamp } });
  }

  throw new HttpError(404, 'not_found', 'API manzili topilmadi.');
}

const server = http.createServer(async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    if (res.headersSent) return res.end();
    if (error instanceof HttpError) return json(res, error.status, { error: { code: error.code, message: error.message } });
    const incidentId = randomUUID();
    console.error(`[${incidentId}]`, error);
    return json(res, 500, { error: { code: 'internal_error', message: 'Serverda kutilmagan xatolik yuz berdi.', incidentId } });
  }
});

server.requestTimeout = 15_000;
server.headersTimeout = 10_000;
server.keepAliveTimeout = 5_000;
server.listen(config.port, '0.0.0.0', () => {
  console.log(`HackPro API ${config.port}-portda ishga tushdi`);
});

const cleanupTimer = setInterval(() => removeExpiredSessions(db), 60 * 60_000);
cleanupTimer.unref();

function shutdown(signal) {
  console.log(`${signal}: server yopilmoqda`);
  server.close(() => {
    db.close();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
