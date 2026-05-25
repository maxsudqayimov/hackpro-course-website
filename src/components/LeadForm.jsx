import { useState } from 'react';
import { telegramRegisterUrl } from '../data/siteData.js';

export default function LeadForm({ content, defaultCourse = '', source = 'website', compact = false }) {
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const labels = content.registrationForm;

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
          format: formData.get('format'),
          time: formData.get('time'),
          message: formData.get('message'),
          language: content.language,
          source,
          page: window.location.href,
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
    <form className={`contact-form lead-form${compact ? ' lead-form-compact' : ''}`} onSubmit={handleSubmit}>
      <label>
        <span>{labels.name}</span>
        <input type="text" name="name" placeholder={labels.namePlaceholder} required />
      </label>
      <label>
        <span>{labels.phone}</span>
        <input type="tel" name="phone" placeholder="+998 __ ___ __ __" required />
      </label>
      <label>
        <span>{labels.course}</span>
        <select name="course" defaultValue={defaultCourse} required>
          <option value="" disabled>
            {labels.chooseCourse}
          </option>
          {content.courses.map((course) => (
            <option key={course.id} value={course.title}>
              {course.title}
            </option>
          ))}
        </select>
      </label>
      <div className="lead-form-row">
        <label>
          <span>{labels.format}</span>
          <select name="format" defaultValue={labels.formats[0]}>
            {labels.formats.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{labels.time}</span>
          <select name="time" defaultValue={labels.times[0]}>
            {labels.times.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span>{labels.message}</span>
        <textarea name="message" rows={compact ? '3' : '4'} placeholder={labels.messagePlaceholder} />
      </label>
      <button className="button primary" type="submit" disabled={status.type === 'loading'}>
        {status.type === 'loading' ? content.contactStatus.sending : labels.submit}
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
  );
}
