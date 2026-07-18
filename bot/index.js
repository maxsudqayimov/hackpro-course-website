import { center } from './config.js';
import { getAdminChatIds, getRequiredEnv, loadEnv } from './env.js';
import {
  getLeadStats,
  readLeads,
  readState,
  saveInquiry,
  saveLead,
  saveState,
} from './storage.js';

loadEnv();

const token = getRequiredEnv('TELEGRAM_BOT_TOKEN');
const adminChatIds = getAdminChatIds();
const miniAppUrl = String(process.env.MINI_APP_URL || '').trim();
const apiBase = `https://api.telegram.org/bot${token}`;
const sessions = new Map();
const requestTimeoutMs = Number(process.env.TELEGRAM_REQUEST_TIMEOUT_MS || 60000);

const botCommands = [
  { command: 'start', description: 'Asosiy menyu' },
  { command: 'courses', description: 'Kurslar ro‘yxati' },
  { command: 'lessons', description: 'Darsliklar' },
  { command: 'register', description: 'Kursga yozilish' },
  { command: 'ask', description: 'Adminga savol yuborish' },
  { command: 'contact', description: 'Kontaktlar' },
  { command: 'app', description: 'HackPro Mini App' },
  { command: 'help', description: 'Yordam' },
  { command: 'id', description: 'Chat ID ni ko‘rish' },
];

function mainMenuKeyboard() {
  const rows = [
    [{ text: '📚 Kurslar', callback_data: 'menu:courses' }],
    [{ text: '📖 Darsliklar', callback_data: 'menu:lessons' }],
    [{ text: '🌐 Sayt haqida', callback_data: 'menu:website' }],
    [{ text: '⚙️ Zamonaviy tizimlar', callback_data: 'menu:systems' }],
    [{ text: "📝 Ro'yxatdan o'tish", callback_data: 'register:start' }],
    [{ text: '💬 Admin bilan aloqa', callback_data: 'inquiry:start' }],
    [{ text: '❓ Savol-javob', callback_data: 'menu:faq' }],
    [{ text: '📞 Kontaktlar', callback_data: 'menu:contact' }],
  ];

  if (miniAppUrl) {
    rows.unshift([{ text: '⚡ HackPro Mini App', web_app: { url: miniAppUrl } }]);
  }

  return {
    inline_keyboard: rows,
  };
}

function coursesKeyboard(prefix = 'course:view') {
  return {
    inline_keyboard: [
      ...center.courses.map((course) => [
        { text: `${course.icon} ${course.title}`, callback_data: `${prefix}:${course.id}` },
      ]),
      [{ text: '🏠 Asosiy menyu', callback_data: 'menu:home' }],
    ],
  };
}

function formatKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: '🏫 Offline', callback_data: 'register:format:Offline' },
        { text: '💻 Online', callback_data: 'register:format:Online' },
      ],
      [{ text: "🔄 Farqi yo'q", callback_data: "register:format:Farqi yo'q" }],
      [{ text: '✖️ Bekor qilish', callback_data: 'register:cancel' }],
    ],
  };
}

function contactRequestKeyboard() {
  return {
    keyboard: [[{ text: '📱 Telefon raqamni yuborish', request_contact: true }], ['✖️ Bekor qilish']],
    resize_keyboard: true,
    one_time_keyboard: true,
  };
}

function removeKeyboard() {
  return { remove_keyboard: true };
}

function courseById(id) {
  return center.courses.find((course) => course.id === id);
}

function lessonById(id) {
  return center.lessons.find((lesson) => lesson.id === id);
}

function lessonPageById(lessonId, pageId) {
  return lessonById(lessonId)?.pages.find((page) => page.id === pageId);
}

function lessonsKeyboard() {
  return {
    inline_keyboard: [
      ...center.lessons.map((lesson) => [
        { text: `${lesson.icon} ${lesson.title}`, callback_data: `lesson:list:${lesson.id}` },
      ]),
      [{ text: '🏠 Asosiy menyu', callback_data: 'menu:home' }],
    ],
  };
}

function lessonPagesKeyboard(lessonId) {
  const lesson = lessonById(lessonId);
  return {
    inline_keyboard: [
      ...(lesson?.pages || []).map((page) => [
        { text: `${page.icon} ${page.title}`, callback_data: `lesson:view:${lessonId}:${page.id}` },
      ]),
      [{ text: '📖 Darsliklar', callback_data: 'menu:lessons' }],
      [{ text: '🏠 Asosiy menyu', callback_data: 'menu:home' }],
    ],
  };
}

function userLabel(user = {}) {
  const name = [user.first_name, user.last_name].filter(Boolean).join(' ');
  return user.username ? `${name || user.username} (@${user.username})` : name || 'Telegram user';
}

function leadText(lead) {
  return [
    `Yangi ariza: ${center.name}`,
    '',
    `Ism: ${lead.name}`,
    `Telefon: ${lead.phone}`,
    `Kurs: ${lead.course}`,
    `Format: ${lead.format}`,
    `Xabar: ${lead.note || "Yo'q"}`,
    '',
    `Telegram: ${lead.telegramName}`,
    `Chat ID: ${lead.chatId}`,
  ].join('\n');
}

function inquiryText(inquiry) {
  return [
    `Yangi savol: ${center.name}`,
    '',
    `Ism: ${inquiry.name}`,
    `Telefon: ${inquiry.phone || "Yo'q"}`,
    `Xabar: ${inquiry.message}`,
    '',
    `Telegram: ${inquiry.telegramName}`,
    `Chat ID: ${inquiry.chatId}`,
  ].join('\n');
}

async function api(method, params = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  let response;
  try {
    response = await fetch(`${apiBase}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      signal: controller.signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`${method} timeout after ${requestTimeoutMs}ms`);
    }
    const cause = error.cause?.code || error.cause?.message || error.message;
    throw new Error(`${method} network error: ${cause}`);
  } finally {
    clearTimeout(timeout);
  }

  const payload = await response.json();
  if (!payload.ok) {
    throw new Error(`${method} failed: ${payload.description || 'unknown error'}`);
  }

  return payload.result;
}

async function sendMessage(chatId, text, extra = {}) {
  return api('sendMessage', {
    chat_id: chatId,
    text,
    disable_web_page_preview: true,
    ...extra,
  });
}

async function sendPhoto(chatId, photo, caption, extra = {}) {
  return api('sendPhoto', {
    chat_id: chatId,
    photo,
    caption,
    ...extra,
  });
}

async function editMessage(chatId, messageId, text, extra = {}) {
  return api('editMessageText', {
    chat_id: chatId,
    message_id: messageId,
    text,
    disable_web_page_preview: true,
    ...extra,
  });
}

async function answerCallback(callbackQueryId) {
  return api('answerCallbackQuery', { callback_query_id: callbackQueryId });
}

async function configureMiniAppMenuButton() {
  if (!miniAppUrl) {
    console.warn('MINI_APP_URL berilmagan. Telegram pastki Mini App tugmasi sozlanmadi.');
    return;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(miniAppUrl);
  } catch {
    throw new Error('MINI_APP_URL to\u2018g\u2018ri URL emas. Masalan: https://hackpro.uz/miniapp');
  }

  if (parsedUrl.protocol !== 'https:') {
    throw new Error('Telegram Mini App uchun MINI_APP_URL https:// bilan boshlanishi kerak.');
  }

  await api('setChatMenuButton', {
    menu_button: {
      type: 'web_app',
      text: 'Mini App',
      web_app: { url: miniAppUrl },
    },
  });

  console.log(`Telegram pastki Mini App tugmasi sozlandi: ${miniAppUrl}`);
}

async function notifyAdmins(lead) {
  if (adminChatIds.length === 0) {
    console.warn('ADMIN_CHAT_ID berilmagan. Ariza faqat leads.json fayliga saqlandi.');
    return;
  }

  const results = await Promise.allSettled(
    adminChatIds.map((adminChatId) => sendMessage(adminChatId, leadText(lead))),
  );

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Admin xabar yuborilmadi (${adminChatIds[index]}):`, result.reason?.message || result.reason);
    }
  });
}

async function notifyAdminsAboutInquiry(inquiry) {
  if (adminChatIds.length === 0) {
    console.warn('ADMIN_CHAT_ID berilmagan. Savol faqat inquiries.json fayliga saqlandi.');
    return;
  }

  const results = await Promise.allSettled(
    adminChatIds.map((adminChatId) => sendMessage(adminChatId, inquiryText(inquiry))),
  );

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Admin savol yuborilmadi (${adminChatIds[index]}):`, result.reason?.message || result.reason);
    }
  });
}

async function showHome(chatId, messageId, { withLogo = false } = {}) {
  const text = [
    `Assalomu alaykum! ${center.name} botiga xush kelibsiz.`,
    '',
    center.intro,
    '',
    "Quyidagi menyudan kerakli bo'limni tanlang.",
  ].join('\n');

  const payload = { reply_markup: mainMenuKeyboard() };
  if (messageId) {
    await editMessage(chatId, messageId, text, payload);
  } else if (withLogo && center.logoUrl) {
    await sendPhoto(chatId, center.logoUrl, text, payload);
  } else {
    await sendMessage(chatId, text, payload);
  }
}

async function showMiniApp(chatId) {
  if (!miniAppUrl) {
    await sendMessage(
      chatId,
      'Mini App manzili hali sozlanmagan. Administrator .env fayliga MINI_APP_URL qiymatini qo‘shishi kerak.',
    );
    return;
  }

  await sendMessage(
    chatId,
    'HackPro Mini App orqali kurslarni ko‘ring va bir necha soniyada ro‘yxatdan o‘ting.',
    {
      reply_markup: {
        inline_keyboard: [[{ text: '⚡ Mini Appni ochish', web_app: { url: miniAppUrl } }]],
      },
    },
  );
}

async function handleMiniAppData(message) {
  let payload;
  try {
    payload = JSON.parse(message.web_app_data?.data || '{}');
  } catch {
    await sendMessage(message.chat.id, 'Mini App ma’lumotini o‘qib bo‘lmadi. Qayta urinib ko‘ring.');
    return;
  }

  if (payload.action !== 'register') {
    await sendMessage(message.chat.id, 'Mini Appdan noma’lum amal qabul qilindi.');
    return;
  }

  const name = String(payload.name || '').trim().slice(0, 160);
  const phone = String(payload.phone || '').trim().slice(0, 80);
  const course = String(payload.course || '').trim().slice(0, 160);
  const format = String(payload.format || '').trim().slice(0, 80);
  const note = String(payload.message || '').trim().slice(0, 800);

  if (name.length < 2 || phone.length < 7 || !course) {
    await sendMessage(message.chat.id, 'Ariza ma’lumotlari to‘liq emas. Mini App formasini qayta to‘ldiring.');
    return;
  }

  const savedLead = await saveLead({
    chatId: message.chat.id,
    telegramName: userLabel(message.from),
    username: message.from?.username || '',
    name,
    phone,
    course,
    format,
    note,
    source: 'telegram-mini-app',
  });

  await notifyAdmins(savedLead);
  await sendMessage(
    message.chat.id,
    `Arizangiz qabul qilindi, ${name.split(' ')[0]}! HackPro administratori tez orada siz bilan bog‘lanadi.`,
    { reply_markup: mainMenuKeyboard() },
  );
}

async function showCourses(chatId, messageId) {
  const text = [
    `📚 ${center.name} kurslari`,
    '',
    ...center.courses.map(
      (course, index) =>
        `${index + 1}. ${course.icon} ${course.title}\n📚 ${course.lessons} · ⏱ ${course.duration}\n💳 ${course.price}\n👥 ${course.students} · ${course.format}`,
    ),
    '',
    "Batafsil ma'lumot olish uchun kursni tanlang.",
  ].join('\n\n');

  const payload = { reply_markup: coursesKeyboard() };
  if (messageId) {
    await editMessage(chatId, messageId, text, payload);
  } else {
    await sendMessage(chatId, text, payload);
  }
}

async function showWebsite(chatId, messageId) {
  const text = [
    `🌐 ${center.website.title}`,
    '',
    center.website.description,
    '',
    ...center.website.sections.map((section, index) => `${index + 1}. ${section}`),
    '',
    "Saytdan botga o'tgan foydalanuvchilar shu yerning o'zida ro'yxatdan o'tishi mumkin.",
  ].join('\n');

  const payload = {
    reply_markup: {
        inline_keyboard: [
          [{ text: "📝 Ro'yxatdan o'tish", callback_data: 'register:start' }],
          [{ text: '⚙️ Zamonaviy tizimlar', callback_data: 'menu:systems' }],
          [{ text: '🏠 Asosiy menyu', callback_data: 'menu:home' }],
        ],
      },
  };

  if (messageId) {
    await editMessage(chatId, messageId, text, payload);
  } else {
    await sendMessage(chatId, text, payload);
  }
}

async function showSystems(chatId, messageId) {
  const text = [
    '⚙️ HackPro zamonaviy tizimlari',
    '',
    ...center.systems.map((system, index) => `${index + 1}. ${system.title}\n${system.description}`),
  ].join('\n\n');

  const payload = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📝 Ro'yxatdan o'tish", callback_data: 'register:start' }],
        [{ text: '📚 Kurslar', callback_data: 'menu:courses' }],
        [{ text: '🏠 Asosiy menyu', callback_data: 'menu:home' }],
      ],
    },
  };

  if (messageId) {
    await editMessage(chatId, messageId, text, payload);
  } else {
    await sendMessage(chatId, text, payload);
  }
}

async function showLessons(chatId, messageId) {
  const text = [
    '📖 HackPro darsliklari',
    '',
    ...center.lessons.map(
      (lesson, index) => `${index + 1}. ${lesson.icon} ${lesson.title}\n${lesson.description}`,
    ),
    '',
    "Kerakli darslik bo'limini tanlang.",
  ].join('\n\n');

  const payload = { reply_markup: lessonsKeyboard() };
  if (messageId) {
    await editMessage(chatId, messageId, text, payload);
  } else {
    await sendMessage(chatId, text, payload);
  }
}

async function showLesson(chatId, messageId, lessonId) {
  const lesson = lessonById(lessonId);
  if (!lesson) {
    await showLessons(chatId, messageId);
    return;
  }

  const text = [
    `${lesson.icon} ${lesson.title}`,
    '',
    lesson.description,
    '',
    ...lesson.pages.map((page, index) => `${index + 1}. ${page.icon} ${page.title}`),
    '',
    "O'qimoqchi bo'lgan sahifani tanlang.",
  ].join('\n');

  const payload = { reply_markup: lessonPagesKeyboard(lessonId) };
  if (messageId) {
    await editMessage(chatId, messageId, text, payload);
  } else {
    await sendMessage(chatId, text, payload);
  }
}

async function showLessonPage(chatId, messageId, lessonId, pageId) {
  const lesson = lessonById(lessonId);
  const page = lessonPageById(lessonId, pageId);
  if (!lesson || !page) {
    await showLessons(chatId, messageId);
    return;
  }

  const text = [`${page.icon} ${page.title}`, '', page.body].join('\n');
  const payload = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '⬅️ Sahifalar', callback_data: `lesson:list:${lessonId}` }],
        [{ text: '📖 Darsliklar', callback_data: 'menu:lessons' }],
        [{ text: '🏠 Asosiy menyu', callback_data: 'menu:home' }],
      ],
    },
  };

  if (messageId) {
    await editMessage(chatId, messageId, text, payload);
  } else {
    await sendMessage(chatId, text, payload);
  }
}

async function showCourse(chatId, messageId, courseId) {
  const course = courseById(courseId);
  if (!course) {
    await showCourses(chatId, messageId);
    return;
  }

  await editMessage(
    chatId,
    messageId,
    [
      `${course.icon} ${course.title}`,
      '',
      course.description,
      '',
      `📚 Darslar: ${course.lessons}`,
      `⏱ Davomiyligi: ${course.duration}`,
      `💳 Narxi: ${course.price}`,
      `👥 O'quvchilar: ${course.students}`,
      `🏫 Format: ${course.format}`,
      '',
      "Kursda o'rganasiz:",
      ...(course.topics || []).map((topic) => `• ${topic}`),
    ].join('\n'),
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "📝 Shu kursga yozilish", callback_data: `register:course:${course.id}` }],
          [{ text: '📚 Kurslar ro\'yxati', callback_data: 'menu:courses' }],
          [{ text: '🏠 Asosiy menyu', callback_data: 'menu:home' }],
        ],
      },
    },
  );
}

async function showFaq(chatId, messageId) {
  const text = [
    '❓ Savol-javob',
    '',
    ...center.faqs.map((item) => `${item.question}\n${item.answer}`),
  ].join('\n\n');

  const payload = {
    reply_markup: {
      inline_keyboard: [[{ text: '🏠 Asosiy menyu', callback_data: 'menu:home' }]],
    },
  };

  if (messageId) {
    await editMessage(chatId, messageId, text, payload);
  } else {
    await sendMessage(chatId, text, payload);
  }
}

async function showContact(chatId, messageId) {
  const text = [
    '📞 Kontaktlar',
    '',
    `Telefon: ${center.phone}`,
    `Telegram: ${center.telegram}`,
    `Admin: ${center.admin}`,
    `Manzil: ${center.address}`,
    `Ish vaqti: ${center.workHours}`,
  ].join('\n');

  const payload = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "📝 Ro'yxatdan o'tish", callback_data: 'register:start' }],
        [{ text: '💬 Admin bilan aloqa', callback_data: 'inquiry:start' }],
        [{ text: '🏠 Asosiy menyu', callback_data: 'menu:home' }],
      ],
    },
  };

  if (messageId) {
    await editMessage(chatId, messageId, text, payload);
  } else {
    await sendMessage(chatId, text, payload);
  }
}

async function startRegistration(chatId, from, selectedCourseId) {
  const selectedCourse = selectedCourseId ? courseById(selectedCourseId) : null;
  sessions.set(chatId, {
    step: 'name',
    lead: {
      chatId,
      telegramName: userLabel(from),
      username: from?.username || '',
      course: selectedCourse?.title || '',
    },
  });

  await sendMessage(
    chatId,
    selectedCourse
      ? `${selectedCourse.title} kursi uchun ariza boshladik.\n\nIsmingizni yozing.`
      : "Ro'yxatdan o'tish uchun ismingizni yozing.",
    {
      reply_markup: {
        inline_keyboard: [[{ text: '✖️ Bekor qilish', callback_data: 'register:cancel' }]],
      },
    },
  );
}

async function startInquiry(chatId, from) {
  sessions.set(chatId, {
    type: 'inquiry',
    step: 'inquiry_name',
    inquiry: {
      chatId,
      telegramName: userLabel(from),
      username: from?.username || '',
    },
  });

  await sendMessage(chatId, "Savolingizni adminga yuboramiz. Avval ismingizni yozing.", {
    reply_markup: {
      inline_keyboard: [[{ text: '✖️ Bekor qilish', callback_data: 'register:cancel' }]],
    },
  });
}

async function finishInquiry(chatId) {
  const session = sessions.get(chatId);
  if (!session?.inquiry) {
    return;
  }

  const savedInquiry = await saveInquiry(session.inquiry);
  sessions.delete(chatId);
  await notifyAdminsAboutInquiry(savedInquiry);
  await sendMessage(chatId, "Savolingiz qabul qilindi. Admin tez orada siz bilan bog'lanadi.", {
    reply_markup: removeKeyboard(),
  });
  await showHome(chatId);
}

async function continueRegistration(chatId, message) {
  const session = sessions.get(chatId);
  if (!session) {
    return false;
  }

  const text = message.text?.trim();
  if (text?.toLowerCase().includes('bekor qilish') || text === '/cancel') {
    sessions.delete(chatId);
    await sendMessage(chatId, "Ro'yxatdan o'tish bekor qilindi.", {
      reply_markup: removeKeyboard(),
    });
    await showHome(chatId);
    return true;
  }

  if (session.type === 'inquiry') {
    if (session.step === 'inquiry_name') {
      if (!text || text.length < 2) {
        await sendMessage(chatId, "Iltimos, ismingizni to'liqroq yozing.");
        return true;
      }

      session.inquiry.name = text;
      session.step = 'inquiry_phone';
      await sendMessage(chatId, "Telefon raqamingizni yuboring yoki '-' deb o'tkazib yuboring.", {
        reply_markup: contactRequestKeyboard(),
      });
      return true;
    }

    if (session.step === 'inquiry_phone') {
      session.inquiry.phone = message.contact?.phone_number || (text === '-' ? '' : text || '');
      session.step = 'inquiry_message';
      await sendMessage(chatId, 'Savolingizni yozing.', { reply_markup: removeKeyboard() });
      return true;
    }

    if (session.step === 'inquiry_message') {
      if (!text || text.length < 3) {
        await sendMessage(chatId, "Iltimos, savolingizni to'liqroq yozing.");
        return true;
      }

      session.inquiry.message = text;
      await finishInquiry(chatId);
      return true;
    }
  }

  if (session.step === 'name') {
    if (!text || text.length < 2) {
      await sendMessage(chatId, "Iltimos, ismingizni to'liqroq yozing.");
      return true;
    }

    session.lead.name = text;
    session.step = 'phone';
    await sendMessage(
      chatId,
      "Telefon raqamingizni yuboring. Tugmadan foydalanishingiz yoki +998 bilan yozishingiz mumkin.",
      { reply_markup: contactRequestKeyboard() },
    );
    return true;
  }

  if (session.step === 'phone') {
    const phone = message.contact?.phone_number || text;
    if (!phone || !/^\+?\d[\d\s()-]{7,}$/.test(phone)) {
      await sendMessage(chatId, "Telefon raqam noto'g'ri ko'rinyapti. Masalan: +998 90 123 45 67");
      return true;
    }

    session.lead.phone = phone;

    if (session.lead.course) {
      session.step = 'format';
      await sendMessage(chatId, 'Telefon raqam qabul qilindi.', {
        reply_markup: removeKeyboard(),
      });
      await sendMessage(chatId, "Qaysi formatda o'qimoqchisiz?", {
        reply_markup: formatKeyboard(),
      });
      return true;
    }

    session.step = 'course';
    await sendMessage(chatId, 'Telefon raqam qabul qilindi.', {
      reply_markup: removeKeyboard(),
    });
    await sendMessage(chatId, "Qaysi kurs sizni qiziqtiryapti?", {
      reply_markup: coursesKeyboard('register:course'),
    });
    return true;
  }

  if (session.step === 'course') {
    await sendMessage(chatId, "Iltimos, kursni pastdagi tugmalar orqali tanlang.", {
      reply_markup: coursesKeyboard('register:course'),
    });
    return true;
  }

  if (session.step === 'format') {
    await sendMessage(chatId, "Iltimos, o'qish formatini pastdagi tugmalar orqali tanlang.", {
      reply_markup: formatKeyboard(),
    });
    return true;
  }

  if (session.step === 'note') {
    session.lead.note = text || '';
    await finishRegistration(chatId);
    return true;
  }

  return true;
}

async function finishRegistration(chatId) {
  const session = sessions.get(chatId);
  if (!session) {
    return;
  }

  const savedLead = await saveLead(session.lead);
  sessions.delete(chatId);
  await notifyAdmins(savedLead);

  await sendMessage(
    chatId,
    [
      "Arizangiz qabul qilindi.",
      '',
      `${center.name} jamoasi tez orada siz bilan bog'lanadi.`,
      `Telefon: ${center.phone}`,
    ].join('\n'),
    { reply_markup: removeKeyboard() },
  );
  await showHome(chatId);
}

async function showAdminLeads(chatId) {
  if (!adminChatIds.includes(String(chatId))) {
    await sendMessage(chatId, "Bu buyruq faqat admin uchun.");
    return;
  }

  const leads = await readLeads();
  const latest = leads.slice(0, 10);
  if (latest.length === 0) {
    await sendMessage(chatId, "Hali arizalar yo'q.");
    return;
  }

  await sendMessage(
    chatId,
    latest
      .map(
        (lead, index) =>
          `${index + 1}. ${lead.name} - ${lead.phone}\n${lead.course}, ${lead.format}\n${new Date(
            lead.createdAt,
          ).toLocaleString('uz-UZ')}`,
      )
      .join('\n\n'),
  );
}

async function showAdminStats(chatId) {
  if (!adminChatIds.includes(String(chatId))) {
    await sendMessage(chatId, "Bu buyruq faqat admin uchun.");
    return;
  }

  const stats = await getLeadStats();
  const byCourse = Object.entries(stats.byCourse)
    .map(([course, count]) => `${course}: ${count}`)
    .join('\n');

  await sendMessage(
    chatId,
    [`Jami arizalar: ${stats.total}`, '', byCourse || "Kurslar bo'yicha ariza yo'q"].join('\n'),
  );
}

async function handleCallback(callbackQuery) {
  await answerCallback(callbackQuery.id);

  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data || '';

  if (data === 'menu:home') {
    sessions.delete(chatId);
    await showHome(chatId, messageId);
    return;
  }

  if (data === 'menu:courses') {
    await showCourses(chatId, messageId);
    return;
  }

  if (data === 'menu:lessons') {
    await showLessons(chatId, messageId);
    return;
  }

  if (data === 'menu:website') {
    await showWebsite(chatId, messageId);
    return;
  }

  if (data === 'menu:systems') {
    await showSystems(chatId, messageId);
    return;
  }

  if (data === 'menu:faq') {
    await showFaq(chatId, messageId);
    return;
  }

  if (data === 'menu:contact') {
    await showContact(chatId, messageId);
    return;
  }

  if (data.startsWith('course:view:')) {
    await showCourse(chatId, messageId, data.replace('course:view:', ''));
    return;
  }

  if (data.startsWith('lesson:list:')) {
    await showLesson(chatId, messageId, data.replace('lesson:list:', ''));
    return;
  }

  if (data.startsWith('lesson:view:')) {
    const [, , lessonId, pageId] = data.split(':');
    await showLessonPage(chatId, messageId, lessonId, pageId);
    return;
  }

  if (data === 'register:start') {
    await startRegistration(chatId, callbackQuery.from);
    return;
  }

  if (data === 'inquiry:start') {
    await startInquiry(chatId, callbackQuery.from);
    return;
  }

  if (data === 'register:cancel') {
    sessions.delete(chatId);
    await sendMessage(chatId, "Ro'yxatdan o'tish bekor qilindi.", {
      reply_markup: removeKeyboard(),
    });
    await showHome(chatId);
    return;
  }

  if (data.startsWith('register:course:')) {
    const course = courseById(data.replace('register:course:', ''));
    if (!course) {
      await showCourses(chatId, messageId);
      return;
    }

    const session = sessions.get(chatId);
    if (!session) {
      await startRegistration(chatId, callbackQuery.from, course.id);
      return;
    }

    session.lead.course = course.title;
    session.step = 'format';
    await sendMessage(chatId, "Qaysi formatda o'qimoqchisiz?", {
      reply_markup: formatKeyboard(),
    });
    return;
  }

  if (data.startsWith('register:format:')) {
    const session = sessions.get(chatId);
    if (!session) {
      await startRegistration(chatId, callbackQuery.from);
      return;
    }

    session.lead.format = data.replace('register:format:', '');
    session.step = 'note';
    await sendMessage(
      chatId,
      "Savolingiz yoki qulay vaqtni yozing. Agar qo'shimcha xabar bo'lmasa, '-' deb yuboring.",
      { reply_markup: removeKeyboard() },
    );
  }
}

async function handleMessage(message) {
  const chatId = message.chat.id;
  const text = message.text?.trim();

  if (message.web_app_data?.data) {
    await handleMiniAppData(message);
    return;
  }

  if (await continueRegistration(chatId, message)) {
    return;
  }

  if (text?.startsWith('/start')) {
    if (text.includes('register')) {
      await startRegistration(chatId, message.from);
      return;
    }

    if (text.includes('website')) {
      await showWebsite(chatId);
      return;
    }

    await showHome(chatId, null, { withLogo: true });
    return;
  }

  if (text === '/menu') {
    await showHome(chatId);
    return;
  }

  if (text === '/courses') {
    await showCourses(chatId);
    return;
  }

  if (text === '/lessons') {
    await showLessons(chatId);
    return;
  }

  if (text === '/site') {
    await showWebsite(chatId);
    return;
  }

  if (text === '/systems') {
    await showSystems(chatId);
    return;
  }

  if (text === '/register') {
    await startRegistration(chatId, message.from);
    return;
  }

  if (text === '/contact') {
    await showContact(chatId);
    return;
  }

  if (text === '/app' || text === '/miniapp') {
    await showMiniApp(chatId);
    return;
  }

  if (text === '/ask') {
    await startInquiry(chatId, message.from);
    return;
  }

  if (text === '/id') {
    await sendMessage(chatId, `Sizning chat ID: ${chatId}`);
    return;
  }

  if (text === '/cancel') {
    await sendMessage(chatId, "Bekor qilinadigan faol jarayon yo'q.");
    return;
  }

  if (text === '/help') {
    await sendMessage(
      chatId,
      [
        'Buyruqlar:',
        '/start - 🏠 asosiy menyu',
        '/courses - 📚 kurslar',
        '/lessons - 📖 darsliklar',
        '/site - 🌐 sayt haqida',
        '/systems - ⚙️ zamonaviy tizimlar',
        "/register - 📝 ro'yxatdan o'tish",
        '/ask - 💬 adminga savol yuborish',
        '/contact - 📞 kontaktlar',
        '/app - ⚡ HackPro Mini App',
        '/id - 🆔 chat ID ni ko\'rish',
        '/cancel - ✖️ jarayonni bekor qilish',
      ].join('\n'),
    );
    return;
  }

  if (text === '/leads') {
    await showAdminLeads(chatId);
    return;
  }

  if (text === '/stats') {
    await showAdminStats(chatId);
    return;
  }

  await sendMessage(chatId, "Kerakli bo'limni tanlang yoki /menu buyrug'ini yuboring.", {
    reply_markup: mainMenuKeyboard(),
  });
}

async function handleUpdate(update) {
  try {
    if (update.callback_query) {
      await handleCallback(update.callback_query);
      return;
    }

    if (update.message) {
      await handleMessage(update.message);
    }
  } catch (error) {
    console.error('Update error:', error);
    const chatId = update.message?.chat?.id || update.callback_query?.message?.chat?.id;
    if (chatId) {
      await sendMessage(chatId, "Kutilmagan xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.");
    }
  }
}

async function poll() {
  const state = await readState();
  let offset = Number(state.offset || 0);
  let retryDelay = 3000;

  await api('deleteWebhook', { drop_pending_updates: false });
  await api('setMyCommands', { commands: botCommands });
  await configureMiniAppMenuButton();
  console.log(`${center.name} Telegram bot ishga tushdi. Offset: ${offset || 'new'}`);

  while (true) {
    try {
      const updates = await api('getUpdates', {
        offset,
        timeout: 25,
        allowed_updates: ['message', 'callback_query'],
      });

      for (const update of updates) {
        await handleUpdate(update);
        offset = update.update_id + 1;
        await saveState({
          offset,
          lastUpdateId: update.update_id,
          lastUpdateAt: new Date().toISOString(),
          lastOkAt: new Date().toISOString(),
          lastError: null,
          lastErrorAt: null,
        });
      }

      retryDelay = 3000;
    } catch (error) {
      console.error('Polling error:', error.message);
      await saveState({
        lastError: error.message,
        lastErrorAt: new Date().toISOString(),
      });
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      retryDelay = Math.min(30000, retryDelay + 3000);
    }
  }
}

poll().catch((error) => {
  console.error('Fatal bot error:', error);
  process.exit(1);
});
