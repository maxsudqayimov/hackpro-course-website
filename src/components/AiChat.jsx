import { useEffect, useMemo, useState } from 'react';
import { telegramRegisterUrl } from '../data/siteData.js';

function normalize(text) {
  return text.toLowerCase().replace(/'/g, '').replace(/`/g, '');
}

function buildCourseAnswer(course) {
  return course;
}

function findCourse(courses, titlePart) {
  return courses.find((course) => normalize(course.title).includes(titlePart));
}

function getAssistantReply(input, content) {
  const query = normalize(input);
  const { aiChat, courses, modernSystems } = content;

  if (!query.trim()) {
    return aiChat.empty;
  }

  if (
    query.includes('kiber') ||
    query.includes('cyber') ||
    query.includes('security') ||
    query.includes('xavfsiz') ||
    query.includes('безопас')
  ) {
    const course = buildCourseAnswer(findCourse(courses, 'kiber') || findCourse(courses, 'cyber') || courses[0]);
    return `${course.title}: ${course.description} ${aiChat.courseSuffix}`;
  }

  if (query.includes('iot') || query.includes('arduino') || query.includes('esp') || query.includes('sensor')) {
    const course = buildCourseAnswer(findCourse(courses, 'iot') || courses[1]);
    return `${course.title}: ${course.description} ${aiChat.courseSuffix}`;
  }

  if (
    query.includes('ai') ||
    query.includes('suniy') ||
    query.includes('intellekt') ||
    query.includes('искус') ||
    query.includes('интел') ||
    query.includes('machine') ||
    query.includes('data')
  ) {
    const course =
      buildCourseAnswer(
        findCourse(courses, 'suniy') ||
          findCourse(courses, 'intelligence') ||
          findCourse(courses, 'интел') ||
          courses[2],
      );
    return `${course.title}: ${course.description} ${aiChat.courseSuffix}`;
  }

  if (query.includes('robot') || query.includes('робот') || query.includes('mexatron') || query.includes('motor')) {
    const course = buildCourseAnswer(findCourse(courses, 'robot') || findCourse(courses, 'робот') || courses[3]);
    return `${course.title}: ${course.description} ${aiChat.courseSuffix}`;
  }

  if (
    query.includes('dastur') ||
    query.includes('program') ||
    query.includes('программ') ||
    query.includes('web') ||
    query.includes('javascript') ||
    query.includes('frontend') ||
    query.includes('backend')
  ) {
    const course =
      buildCourseAnswer(
        findCourse(courses, 'dastur') ||
          findCourse(courses, 'program') ||
          findCourse(courses, 'программ') ||
          courses[4],
      );
    return `${course.title}: ${course.description} ${aiChat.courseSuffix}`;
  }

  if (
    query.includes('tizim') ||
    query.includes('system') ||
    query.includes('систем') ||
    query.includes('crm') ||
    query.includes('bot') ||
    query.includes('laborator')
  ) {
    return `${aiChat.systemsPrefix}: ${modernSystems
      .map((system) => system.title)
      .join(', ')}. ${aiChat.systemsSuffix}`;
  }

  if (query.includes('narx') || query.includes('tolov') || query.includes('pul') || query.includes('price') || query.includes('cost') || query.includes('цена') || query.includes('стоим')) {
    return aiChat.price;
  }

  if (query.includes('kontakt') || query.includes('contact') || query.includes('контакт') || query.includes('telefon') || query.includes('phone') || query.includes('manzil') || query.includes('address') || query.includes('qayer')) {
    return aiChat.contact;
  }

  if (query.includes('yozil') || query.includes('royxat') || query.includes('register') || query.includes('запис') || query.includes('start') || query.includes('oqish')) {
    return aiChat.register;
  }

  if (query.includes('qaysi') || query.includes('which') || query.includes('choose') || query.includes('какой') || query.includes('tanla') || query.includes('maslahat')) {
    return aiChat.advice;
  }

  return aiChat.fallback;
}

export default function AiChat({ content }) {
  const { aiChat } = content;
  const initialMessages = useMemo(
    () => [
      {
        id: 'welcome',
        role: 'assistant',
        text: aiChat.welcome,
      },
    ],
    [aiChat.welcome],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  useEffect(() => {
    setMessages(initialMessages);
    setInput('');
  }, [initialMessages]);

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
      text: getAssistantReply(trimmed, content),
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
        <section className="ai-chat-panel" aria-label={aiChat.aria}>
          <div className="ai-chat-header">
            <div>
              <span>{aiChat.title}</span>
              <small>{aiChat.subtitle}</small>
            </div>
            <button type="button" aria-label={aiChat.close} onClick={() => setIsOpen(false)}>
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
            {aiChat.prompts.map((prompt) => (
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
              placeholder={aiChat.input}
              aria-label={aiChat.inputAria}
            />
            <button type="submit" aria-label={aiChat.sendAria}>
              {aiChat.send}
            </button>
          </form>

          <a className="ai-chat-link" href={telegramRegisterUrl} target="_blank" rel="noreferrer">
            {aiChat.link}
          </a>
        </section>
      ) : null}

      <button
        className="ai-chat-toggle"
        type="button"
        aria-label={aiChat.openAria}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span>{aiChat.toggleTop}</span>
        <strong>{aiChat.toggleBottom}</strong>
      </button>
    </div>
  );
}
