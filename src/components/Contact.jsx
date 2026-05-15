import { useState } from 'react';
import {
  instagramUrl,
  telegramAdminUrl,
  telegramBotUrl,
  telegramChannelUrl,
  telegramRegisterUrl,
} from '../data/siteData.js';

export default function Contact({ content }) {
  const { contact } = content;
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ type: 'loading', message: content.contactStatus.sending });

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          course: formData.get('course'),
          message: formData.get('message'),
          language: content.language,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || content.contactStatus.error);
      }

      form.reset();
      setStatus({ type: 'success', message: data.message || content.contactStatus.success });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || content.contactStatus.error });
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-shell contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">{contact.eyebrow}</span>
          <h2>{contact.title}</h2>
          <p>{contact.text}</p>
          <div className="contact-details">
            <a href="tel:+998934340109">+998 93 434 01 09</a>
            <a href={telegramBotUrl} target="_blank" rel="noreferrer">
              {contact.registerLabel}
            </a>
            <a href={telegramChannelUrl} target="_blank" rel="noreferrer">
              {contact.channelLabel}
            </a>
            <a href={telegramAdminUrl} target="_blank" rel="noreferrer">
              {contact.adminLabel}
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              {contact.instagramLabel}
            </a>
            <span>{contact.address}</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>{contact.fields.name}</span>
            <input type="text" name="name" placeholder={contact.fields.namePlaceholder} required />
          </label>
          <label>
            <span>{contact.fields.phone}</span>
            <input type="tel" name="phone" placeholder="+998 __ ___ __ __" required />
          </label>
          <label>
            <span>{contact.fields.course}</span>
            <select name="course" defaultValue="" required>
              <option value="" disabled>
                {contact.fields.chooseCourse}
              </option>
              {content.courses.map((course) => (
                <option key={course.id} value={course.title}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{contact.fields.message}</span>
            <textarea name="message" rows="5" placeholder={contact.fields.messagePlaceholder} />
          </label>
          <button className="button primary" type="submit" disabled={status.type === 'loading'}>
            {status.type === 'loading' ? content.contactStatus.sending : contact.fields.submit}
          </button>
          {status.message ? (
            <p className={`form-status ${status.type}`}>
              {status.message}{' '}
              {status.type === 'error' ? (
                <a href={telegramRegisterUrl} target="_blank" rel="noreferrer">
                  Telegram
                </a>
              ) : null}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
