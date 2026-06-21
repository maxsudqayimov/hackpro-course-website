import { createHash, createHmac, randomBytes, timingSafeEqual, pbkdf2Sync } from 'node:crypto';

const COOKIE_NAME = 'hp_lms_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const MAX_BODY_SIZE = 250_000;

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > MAX_BODY_SIZE) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => resolve(body ? JSON.parse(body) : {}));
    req.on('error', reject);
  });
}

function requireConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const secret = process.env.LMS_SESSION_SECRET;

  if (!url || !key || !secret) {
    const missing = [
      !url && 'SUPABASE_URL',
      !key && 'SUPABASE_SERVICE_ROLE_KEY',
      !secret && 'LMS_SESSION_SECRET',
    ].filter(Boolean);

    const error = new Error(`LMS sozlanmagan: ${missing.join(', ')}`);
    error.status = 500;
    throw error;
  }

  return { url: url.replace(/\/$/, ''), key, secret };
}

function cookieFlags(req) {
  const forwardedProto = String(req.headers['x-forwarded-proto'] || '');
  const isSecure = forwardedProto === 'https' || process.env.VERCEL === '1';
  return `Path=/; HttpOnly; SameSite=Lax${isSecure ? '; Secure' : ''}`;
}

function clean(value, limit = 500) {
  return String(value || '').trim().slice(0, limit);
}

function parseCookies(req) {
  return Object.fromEntries(
    String(req.headers.cookie || '')
      .split(';')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const index = item.indexOf('=');
        if (index === -1) {
          return [decodeURIComponent(item), ''];
        }
        return [decodeURIComponent(item.slice(0, index)), decodeURIComponent(item.slice(index + 1))];
      }),
  );
}

function signSession(payload, secret) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${signature}`;
}

function verifySession(token, secret) {
  if (!token || !token.includes('.')) {
    return null;
  }

  const [data, signature] = token.split('.');
  const expected = createHmac('sha256', secret).update(data).digest('base64url');
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}

function passwordHash(password, salt) {
  return pbkdf2Sync(password, salt, 120_000, 32, 'sha256').toString('hex');
}

function makePassword(password) {
  const salt = randomBytes(16).toString('hex');
  return { salt, hash: passwordHash(password, salt) };
}

function verifyPassword(password, salt, hash) {
  const actual = Buffer.from(passwordHash(password, salt), 'hex');
  const expected = Buffer.from(hash, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

async function supabase(path, options = {}) {
  const config = requireConfig();
  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
      'Content-Type': 'application/json',
      Prefer: options.prefer || 'return=representation',
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = new Error(payload?.message || payload?.hint || text || 'Supabase xatosi');
    error.status = response.status;
    throw error;
  }

  return payload;
}

async function getUserByLogin(login) {
  const rows = await supabase(`lms_users?login=eq.${encodeURIComponent(login)}&select=*`);
  return rows[0] || null;
}

async function getUserById(id) {
  const rows = await supabase(`lms_users?id=eq.${encodeURIComponent(id)}&select=id,login,full_name,role,is_active`);
  return rows[0] || null;
}

async function requireUser(req, role) {
  const config = requireConfig();
  const session = verifySession(parseCookies(req)[COOKIE_NAME], config.secret);
  if (!session?.uid) {
    const error = new Error('Avval tizimga kiring.');
    error.status = 401;
    throw error;
  }

  const user = await getUserById(session.uid);
  if (!user?.is_active) {
    const error = new Error('Akkaunt faol emas.');
    error.status = 403;
    throw error;
  }

  if (role && user.role !== role) {
    const error = new Error('Bu amal uchun admin huquqi kerak.');
    error.status = 403;
    throw error;
  }

  return user;
}

async function listCourses() {
  const courses = await supabase(
    'lms_courses?is_published=eq.true&select=id,title,slug,description,level,cover_url,sort_order&order=sort_order.asc',
  );
  const lessons = await supabase(
    'lms_lessons?is_published=eq.true&select=id,course_id,title,description,sort_order,duration_minutes&order=sort_order.asc',
  );

  return courses.map((course) => ({
    ...course,
    lessons: lessons.filter((lesson) => lesson.course_id === course.id),
  }));
}

async function listAdminCourses() {
  const courses = await supabase('lms_courses?select=*&order=sort_order.asc');
  const lessons = await supabase('lms_lessons?select=*&order=sort_order.asc');
  return courses.map((course) => ({
    ...course,
    lessons: lessons.filter((lesson) => lesson.course_id === course.id),
  }));
}

async function getLesson(userId, lessonId) {
  const rows = await supabase(
    `lms_lessons?id=eq.${encodeURIComponent(lessonId)}&is_published=eq.true&select=*,course:lms_courses(id,title,slug)`,
  );
  const lesson = rows[0];
  if (!lesson) {
    const error = new Error('Dars topilmadi.');
    error.status = 404;
    throw error;
  }

  const existingProgress = await supabase(
    `lms_progress?user_id=eq.${encodeURIComponent(userId)}&lesson_id=eq.${encodeURIComponent(lesson.id)}&select=status`,
  );

  if (existingProgress[0]?.status === 'completed') {
    await supabase(
      `lms_progress?user_id=eq.${encodeURIComponent(userId)}&lesson_id=eq.${encodeURIComponent(lesson.id)}`,
      {
        method: 'PATCH',
        prefer: 'return=minimal',
        body: JSON.stringify({ last_opened_at: new Date().toISOString() }),
      },
    );
  } else {
    await supabase('lms_progress?on_conflict=user_id,lesson_id', {
      method: 'POST',
      prefer: 'resolution=merge-duplicates,return=minimal',
      body: JSON.stringify({
        user_id: userId,
        lesson_id: lesson.id,
        status: 'started',
        last_opened_at: new Date().toISOString(),
      }),
    });
  }

  return lesson;
}

async function getProgress(userId) {
  return supabase(`lms_progress?user_id=eq.${encodeURIComponent(userId)}&select=lesson_id,status,completed_at,last_opened_at`);
}

async function completeLesson(userId, lessonId) {
  await supabase('lms_progress?on_conflict=user_id,lesson_id', {
    method: 'POST',
    prefer: 'resolution=merge-duplicates,return=representation',
    body: JSON.stringify({
      user_id: userId,
      lesson_id: lessonId,
      status: 'completed',
      completed_at: new Date().toISOString(),
      last_opened_at: new Date().toISOString(),
    }),
  });
}

function buildSlug(title) {
  const fallback = createHash('sha1').update(`${title}-${Date.now()}`).digest('hex').slice(0, 8);
  return (
    clean(title, 120)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || fallback
  );
}

async function upsertCourse(payload) {
  const course = {
    title: clean(payload.title, 140),
    slug: clean(payload.slug, 160) || buildSlug(payload.title),
    description: clean(payload.description, 1200),
    level: clean(payload.level, 80),
    cover_url: clean(payload.cover_url, 1000),
    sort_order: Number(payload.sort_order || 0),
    is_published: Boolean(payload.is_published),
  };

  if (!course.title) {
    const error = new Error('Kurs nomini kiriting.');
    error.status = 400;
    throw error;
  }

  if (payload.id) {
    const rows = await supabase(`lms_courses?id=eq.${encodeURIComponent(payload.id)}`, {
      method: 'PATCH',
      body: JSON.stringify(course),
    });
    return rows[0];
  }

  const rows = await supabase('lms_courses', {
    method: 'POST',
    body: JSON.stringify(course),
  });
  return rows[0];
}

async function upsertLesson(payload) {
  const lesson = {
    course_id: clean(payload.course_id, 80),
    title: clean(payload.title, 180),
    description: clean(payload.description, 1200),
    video_url: clean(payload.video_url, 1200),
    body: clean(payload.body, 20_000),
    resources_url: clean(payload.resources_url, 1200),
    duration_minutes: Number(payload.duration_minutes || 0),
    sort_order: Number(payload.sort_order || 0),
    is_published: Boolean(payload.is_published),
  };

  if (!lesson.course_id || !lesson.title) {
    const error = new Error('Kurs va dars nomini kiriting.');
    error.status = 400;
    throw error;
  }

  if (payload.id) {
    const rows = await supabase(`lms_lessons?id=eq.${encodeURIComponent(payload.id)}`, {
      method: 'PATCH',
      body: JSON.stringify(lesson),
    });
    return rows[0];
  }

  const rows = await supabase('lms_lessons', {
    method: 'POST',
    body: JSON.stringify(lesson),
  });
  return rows[0];
}

async function createUser(payload) {
  const password = clean(payload.password, 200);
  const login = clean(payload.login, 120).toLowerCase();
  if (!login || password.length < 6) {
    const error = new Error('Login va kamida 6 belgili parol kiriting.');
    error.status = 400;
    throw error;
  }

  const { salt, hash } = makePassword(password);
  const rows = await supabase('lms_users', {
    method: 'POST',
    body: JSON.stringify({
      login,
      full_name: clean(payload.full_name, 180),
      role: payload.role === 'admin' ? 'admin' : 'student',
      password_salt: salt,
      password_hash: hash,
      is_active: payload.is_active !== false,
    }),
  });
  return rows[0];
}

async function countAdmins() {
  const rows = await supabase('lms_users?role=eq.admin&select=id');
  return rows.length;
}

async function handleAction(req, res, action) {
  const config = requireConfig();

  if (action === 'login') {
    const body = await readBody(req);
    const login = clean(body.login, 120).toLowerCase();
    const password = clean(body.password, 200);
    const user = await getUserByLogin(login);

    if (!user?.is_active || !verifyPassword(password, user.password_salt, user.password_hash)) {
      return json(res, 401, { ok: false, message: 'Login yoki parol xato.' });
    }

    const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
    const token = signSession({ uid: user.id, role: user.role, exp: expires }, config.secret);
    res.setHeader(
      'Set-Cookie',
      `${COOKIE_NAME}=${encodeURIComponent(token)}; ${cookieFlags(req)}; Max-Age=${SESSION_TTL_SECONDS}`,
    );
    return json(res, 200, {
      ok: true,
      user: { id: user.id, login: user.login, full_name: user.full_name, role: user.role },
    });
  }

  if (action === 'logout') {
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=; ${cookieFlags(req)}; Max-Age=0`);
    return json(res, 200, { ok: true });
  }

  if (action === 'bootstrap-admin') {
    const body = await readBody(req);
    const bootstrapSecret = process.env.LMS_BOOTSTRAP_SECRET;
    if (!bootstrapSecret || clean(body.secret, 300) !== bootstrapSecret) {
      return json(res, 403, { ok: false, message: 'Bootstrap kaliti xato.' });
    }

    if ((await countAdmins()) > 0) {
      return json(res, 409, { ok: false, message: 'Admin allaqachon yaratilgan.' });
    }

    const created = await createUser({
      ...body,
      role: 'admin',
      is_active: true,
    });
    return json(res, 200, {
      ok: true,
      user: { id: created.id, login: created.login, full_name: created.full_name, role: created.role },
    });
  }

  const user = await requireUser(req);

  if (action === 'me') {
    return json(res, 200, { ok: true, user, progress: await getProgress(user.id) });
  }

  if (action === 'catalog') {
    return json(res, 200, { ok: true, courses: await listCourses(), progress: await getProgress(user.id) });
  }

  if (action === 'lesson') {
    const lessonId = clean(new URL(req.url, 'http://localhost').searchParams.get('id'), 80);
    return json(res, 200, { ok: true, lesson: await getLesson(user.id, lessonId), progress: await getProgress(user.id) });
  }

  if (action === 'complete') {
    const body = await readBody(req);
    await completeLesson(user.id, clean(body.lesson_id, 80));
    return json(res, 200, { ok: true, progress: await getProgress(user.id) });
  }

  if (action === 'admin-courses') {
    await requireUser(req, 'admin');
    return json(res, 200, { ok: true, courses: await listAdminCourses() });
  }

  if (action === 'admin-save-course') {
    await requireUser(req, 'admin');
    return json(res, 200, { ok: true, course: await upsertCourse(await readBody(req)) });
  }

  if (action === 'admin-save-lesson') {
    await requireUser(req, 'admin');
    return json(res, 200, { ok: true, lesson: await upsertLesson(await readBody(req)) });
  }

  if (action === 'admin-create-user') {
    await requireUser(req, 'admin');
    const created = await createUser(await readBody(req));
    return json(res, 200, {
      ok: true,
      user: { id: created.id, login: created.login, full_name: created.full_name, role: created.role },
    });
  }

  return json(res, 404, { ok: false, message: 'Endpoint topilmadi.' });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return json(res, 200, { ok: true });
  }

  try {
    const action = clean(new URL(req.url, 'http://localhost').searchParams.get('action'), 80);
    return await handleAction(req, res, action);
  } catch (error) {
    return json(res, error.status || 500, {
      ok: false,
      message: error.message || 'LMS server xatosi.',
    });
  }
}
