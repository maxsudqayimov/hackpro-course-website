import http from 'node:http';
import { config } from './config.mjs';
import { audit, nowIso, openDatabase, transaction } from './db.mjs';
import { getLabTemplate } from './lab-catalog.mjs';
import { createLabAccessToken, safeTokenEqual } from './security.mjs';

const db = openDatabase();
const MAX_RESPONSE_BYTES = 2 * 1024 * 1024;

function respond(res, status, body, contentType = 'text/plain; charset=utf-8') {
  const data = Buffer.from(body);
  res.writeHead(status, {
    'Content-Type': contentType,
    'Content-Length': data.length,
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': "default-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'none'",
  });
  res.end(data);
}

const server = http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD', 'POST'].includes(req.method)) return respond(res, 405, 'Method not allowed');
    const url = new URL(req.url, config.labPublicBaseUrl);
    const match = url.pathname.match(/^\/session\/([^/]+)\/?(.*)$/);
    if (!match) return respond(res, 404, 'Laboratoriya topilmadi');
    const labId = decodeURIComponent(match[1]);
    const assetPath = match[2] || '';
    const lab = db.prepare("SELECT * FROM lab_sessions WHERE id = ? AND status = 'running' AND expires_at > ?").get(labId, nowIso());
    if (!lab) return respond(res, 404, 'Laboratoriya faol emas');
    const expectedToken = createLabAccessToken(lab, config.labAccessSecret);
    if (!safeTokenEqual(url.searchParams.get('token'), expectedToken)) return respond(res, 403, 'Kirish kaliti noto‘g‘ri');
    if (req.method === 'POST' && !['api/command', 'api/check'].includes(assetPath)) return respond(res, 405, 'Method not allowed');
    let requestBody;
    if (req.method === 'POST') {
      const chunks = [];
      let total = 0;
      for await (const chunk of req) {
        total += chunk.length;
        if (total > 16_384) return respond(res, 413, 'So‘rov juda katta');
        chunks.push(chunk);
      }
      requestBody = Buffer.concat(chunks);
    }
    const upstreamUrl = `http://${config.labUpstreamHost}:${lab.port}/${assetPath}`;
    const upstream = await fetch(upstreamUrl, {
      method: req.method,
      headers: req.method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
      body: requestBody,
      signal: AbortSignal.timeout(8_000),
      redirect: 'error',
    });
    if (!upstream.ok) return respond(res, 502, 'Laboratoriya javob bermadi');
    let bytes = Buffer.from(await upstream.arrayBuffer());
    if (bytes.length > MAX_RESPONSE_BYTES) return respond(res, 413, 'Laboratoriya javobi juda katta');
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    if (req.method === 'POST' && assetPath === 'api/check' && contentType.includes('application/json')) {
      const payload = JSON.parse(bytes.toString('utf8'));
      if (payload.passed) {
        const template = getLabTemplate(lab.template_id);
        if (template) {
          const awarded = transaction(db, () => {
            const inserted = db.prepare(`INSERT OR IGNORE INTO lab_completions
              (user_id, template_id, lab_session_id, completed_at, xp_awarded) VALUES (?, ?, ?, ?, ?)`)
              .run(lab.user_id, template.id, lab.id, nowIso(), template.xp);
            if (inserted.changes) {
              db.prepare('UPDATE users SET xp = xp + ?, updated_at = ? WHERE id = ?').run(template.xp, nowIso(), lab.user_id);
              audit(db, 'lab.completed', { userId: lab.user_id, metadata: { labId: lab.id, templateId: template.id, xp: template.xp } });
            }
            return inserted.changes ? template.xp : 0;
          });
          payload.awardedXp = awarded;
          payload.completed = true;
          bytes = Buffer.from(JSON.stringify(payload));
        }
      }
    }
    if (req.method === 'HEAD') return respond(res, 200, '', contentType);
    return respond(res, 200, bytes, contentType);
  } catch (error) {
    console.error(error.message);
    return respond(res, 502, 'Laboratoriya gateway xatosi');
  }
});

server.requestTimeout = 12_000;
server.listen(config.labGatewayPort, '0.0.0.0', () => {
  console.log(`HackPro lab gateway ${config.labGatewayPort}-portda ishga tushdi`);
});

function shutdown() {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
