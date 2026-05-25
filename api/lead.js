const MAX_FIELD_LENGTH = 800;

function clean(value) {
  return String(value || '').trim().slice(0, MAX_FIELD_LENGTH);
}

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
      if (body.length > 16_000) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return json(res, 200, { ok: true });
  }

  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, message: 'Faqat POST so‘rovi qabul qilinadi.' });
  }

  try {
    const rawBody = await readBody(req);
    const payload = JSON.parse(rawBody || '{}');
    const name = clean(payload.name);
    const phone = clean(payload.phone);
    const course = clean(payload.course);
    const format = clean(payload.format);
    const time = clean(payload.time);
    const message = clean(payload.message);
    const language = clean(payload.language || 'uz');
    const source = clean(payload.source || 'contact-form');
    const page = clean(payload.page || req.headers.referer || 'hackpro.uz');
    const leadId = `HP-${Date.now().toString(36).toUpperCase()}`;

    if (name.length < 2 || phone.length < 7 || !course) {
      return json(res, 400, {
        ok: false,
        message: 'Ism, telefon raqam va kurs yo‘nalishini to‘ldiring.',
      });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatIds = String(process.env.ADMIN_CHAT_ID || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (!token || adminChatIds.length === 0) {
      return json(res, 500, {
        ok: false,
        message: 'Telegram CRM sozlanmagan. Vercel env ichiga TELEGRAM_BOT_TOKEN va ADMIN_CHAT_ID kiriting.',
      });
    }

    const text = [
      `HackPro CRM arizasi: ${leadId}`,
      '',
      `Ism: ${name}`,
      `Telefon: ${phone}`,
      `Kurs: ${course}`,
      format ? `Format: ${format}` : null,
      time ? `Qulay vaqt: ${time}` : null,
      `Til: ${language}`,
      `Manba: ${source}`,
      message ? `Xabar: ${message}` : null,
      '',
      `Sahifa: ${page}`,
      `Vaqt: ${new Date().toISOString()}`,
    ]
      .filter(Boolean)
      .join('\n');

    await Promise.all(
      adminChatIds.map((chatId) =>
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            disable_web_page_preview: true,
          }),
        }).then(async (telegramResponse) => {
          if (!telegramResponse.ok) {
            const errorText = await telegramResponse.text();
            throw new Error(errorText);
          }
        }),
      ),
    );

    return json(res, 200, {
      ok: true,
      message: 'Arizangiz yuborildi. Admin tez orada siz bilan bog‘lanadi.',
    });
  } catch (error) {
    return json(res, 500, {
      ok: false,
      message: 'Arizani yuborishda xatolik bo‘ldi. Telegram bot orqali yozib ko‘ring.',
    });
  }
}
