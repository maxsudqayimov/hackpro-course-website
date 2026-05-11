import { telegramBotUrl, telegramChannelUrl, telegramRegisterUrl } from '../data/siteData.js';

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.open(telegramRegisterUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-shell contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">Contact</span>
          <h2>HackPro kurslari haqida maslahat oling</h2>
          <p>
            Yo'nalishni tanlang, savolingizni yuboring va jamoamiz sizga o'qish formati,
            kurs dasturi va boshlash jarayoni bo'yicha yordam beradi.
          </p>
          <div className="contact-details">
            <a href="tel:+998934340109">+998 93 434 01 09</a>
            <a href={telegramBotUrl} target="_blank" rel="noreferrer">
              @hackproMbot - ro'yxatdan o'tish
            </a>
            <a href={telegramChannelUrl} target="_blank" rel="noreferrer">
              @hackpro_M - Telegram kanal
            </a>
            <span>Zarafshon shahri, Kelajak markazi</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>Ism</span>
            <input type="text" name="name" placeholder="Ismingiz" />
          </label>
          <label>
            <span>Telefon</span>
            <input type="tel" name="phone" placeholder="+998 __ ___ __ __" />
          </label>
          <label>
            <span>Kurs yo'nalishi</span>
            <select name="course" defaultValue="">
              <option value="" disabled>
                Yo'nalishni tanlang
              </option>
              <option>Kiberxavfsizlik</option>
              <option>IoT - Internet of Things</option>
              <option>Sun'iy intellekt</option>
              <option>Robototexnika</option>
              <option>Dasturlash</option>
            </select>
          </label>
          <label>
            <span>Xabar</span>
            <textarea name="message" rows="5" placeholder="Qaysi kurs sizni qiziqtiryapti?" />
          </label>
          <button className="button primary" type="submit">
            Bot orqali yuborish
          </button>
        </form>
      </div>
    </section>
  );
}
