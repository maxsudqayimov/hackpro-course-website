import { useMemo, useState } from 'react';
import { courses, modernSystems, telegramRegisterUrl } from '../data/siteData.js';

const quickPrompts = [
  'Qaysi kursni tanlay?',
  'Kiberxavfsizlik haqida',
  "Sun'iy intellekt kursi",
  'Robototexnika kursi',
  'Dasturlash kursi',
  'Kontaktlar',
];

function normalize(text) {
  return text.toLowerCase().replace(/'/g, '').replace(/`/g, '');
}

function buildCourseAnswer(course) {
  return `${course.title}: ${course.description} Bu yo'nalish amaliy topshiriqlar, mentor yordami va portfolio uchun loyiha bilan o'rganiladi.`;
}

function findCourse(titlePart) {
  return courses.find((course) => normalize(course.title).includes(titlePart));
}

function getAssistantReply(input) {
  const query = normalize(input);

  if (!query.trim()) {
    return "Savolingizni yozing. Masalan: qaysi kursni tanlay, AI kursi, kontakt yoki ro'yxatdan o'tish.";
  }

  if (query.includes('kiber') || query.includes('security') || query.includes('xavfsiz')) {
    return buildCourseAnswer(findCourse('kiber') || courses[0]);
  }

  if (query.includes('iot') || query.includes('arduino') || query.includes('esp') || query.includes('sensor')) {
    return buildCourseAnswer(findCourse('iot') || courses[1]);
  }

  if (
    query.includes('ai') ||
    query.includes('suniy') ||
    query.includes('intellekt') ||
    query.includes('machine') ||
    query.includes('data')
  ) {
    return buildCourseAnswer(findCourse('suniy') || courses[2]);
  }

  if (query.includes('robot') || query.includes('mexatron') || query.includes('motor')) {
    return buildCourseAnswer(findCourse('robot') || courses[3]);
  }

  if (
    query.includes('dastur') ||
    query.includes('program') ||
    query.includes('web') ||
    query.includes('javascript') ||
    query.includes('frontend') ||
    query.includes('backend')
  ) {
    return buildCourseAnswer(findCourse('dastur') || courses[4]);
  }

  if (query.includes('tizim') || query.includes('crm') || query.includes('bot') || query.includes('laborator')) {
    return `HackPro zamonaviy tizimlari: ${modernSystems
      .map((system) => system.title)
      .join(', ')}. Bu tizimlar o'quv jarayonini sayt, Telegram bot va amaliy laboratoriyalar bilan bog'laydi.`;
  }

  if (query.includes('narx') || query.includes('tolov') || query.includes('pul')) {
    return "Narxlar kurs formati va guruhga qarab belgilanadi. Eng aniq ma'lumot uchun Telegram bot orqali ro'yxatdan o'ting, admin siz bilan bog'lanadi.";
  }

  if (query.includes('kontakt') || query.includes('telefon') || query.includes('manzil') || query.includes('qayer')) {
    return "Kontakt: +998 93 434 01 09. Manzil: Zarafshon shahri, Kelajak markazi. Telegram bot orqali ham ariza qoldirishingiz mumkin.";
  }

  if (query.includes('yozil') || query.includes('royxat') || query.includes('start') || query.includes('oqish')) {
    return "Ro'yxatdan o'tish uchun pastdagi Telegram tugmasini bosing. Bot ismingiz, telefon raqamingiz, kurs va o'qish formatini so'raydi.";
  }

  if (query.includes('qaysi') || query.includes('tanla') || query.includes('maslahat')) {
    return "Agar xavfsizlik va tarmoq sizga qiziq bo'lsa Kiberxavfsizlikni, qurilmalar va sensorlar yoqsa IoT yoki Robototexnikani, data va avtomatlashtirish qiziqtirsa Sun'iy intellektni, sayt va ilova yaratish yoqsa Dasturlashni tanlang.";
  }

  return "Men HackPro kurslari, zamonaviy tizimlar, kontaktlar va ro'yxatdan o'tish bo'yicha yordam beraman. Savolingizni biroz aniqroq yozing yoki tezkor tugmalardan birini tanlang.";
}

export default function AiChat() {
  const initialMessages = useMemo(
    () => [
      {
        id: 'welcome',
        role: 'assistant',
        text: "Salom! Men HackPro AI yordamchisiman. Kurs tanlash, ro'yxatdan o'tish yoki kontaktlar bo'yicha savol bering.",
      },
    ],
    [],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };
    const assistantMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text: getAssistantReply(trimmed),
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput('');
    setIsOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className={isOpen ? 'ai-chat open' : 'ai-chat'}>
      {isOpen ? (
        <section className="ai-chat-panel" aria-label="HackPro AI chat">
          <div className="ai-chat-header">
            <div>
              <span>HackPro AI</span>
              <small>Online yordamchi</small>
            </div>
            <button type="button" aria-label="Chatni yopish" onClick={() => setIsOpen(false)}>
              X
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((message) => (
              <div className={`ai-message ${message.role}`} key={message.id}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="ai-quick-prompts">
            {quickPrompts.map((prompt) => (
              <button type="button" key={prompt} onClick={() => sendMessage(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          <form className="ai-chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Savolingizni yozing"
              aria-label="AI chat savoli"
            />
            <button type="submit" aria-label="AI chatga yuborish">
              Yuborish
            </button>
          </form>

          <a className="ai-chat-link" href={telegramRegisterUrl} target="_blank" rel="noreferrer">
            Telegram bot orqali ro'yxatdan o'tish
          </a>
        </section>
      ) : null}

      <button
        className="ai-chat-toggle"
        type="button"
        aria-label="AI chatni ochish"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span>AI</span>
        <strong>Chat</strong>
      </button>
    </div>
  );
}
