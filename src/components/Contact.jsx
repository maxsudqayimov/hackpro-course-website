import { telegramBotUrl, telegramChannelUrl, telegramRegisterUrl } from '../data/siteData.js';

export default function Contact({ content }) {
  const { contact } = content;

  const handleSubmit = (event) => {
    event.preventDefault();
    window.open(telegramRegisterUrl, '_blank', 'noopener,noreferrer');
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
            <span>{contact.address}</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>{contact.fields.name}</span>
            <input type="text" name="name" placeholder={contact.fields.namePlaceholder} />
          </label>
          <label>
            <span>{contact.fields.phone}</span>
            <input type="tel" name="phone" placeholder="+998 __ ___ __ __" />
          </label>
          <label>
            <span>{contact.fields.course}</span>
            <select name="course" defaultValue="">
              <option value="" disabled>
                {contact.fields.chooseCourse}
              </option>
              {content.courses.map((course) => (
                <option key={course.id}>{course.title}</option>
              ))}
            </select>
          </label>
          <label>
            <span>{contact.fields.message}</span>
            <textarea name="message" rows="5" placeholder={contact.fields.messagePlaceholder} />
          </label>
          <button className="button primary" type="submit">
            {contact.fields.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
