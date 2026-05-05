export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="section-shell contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">Contact</span>
          <h2>HackPro kurslari haqida maslahat oling</h2>
          <p>
            Yo‘nalishni tanlang, savolingizni yuboring va jamoamiz sizga o‘qish formati,
            kurs dasturi va boshlash jarayoni bo‘yicha yordam beradi.
          </p>
          <div className="contact-details">
            <a href="tel:+998901234567">+998 90 123 45 67</a>
            <a href="https://t.me/hackpro_uz" target="_blank" rel="noreferrer">
              @hackpro_uz
            </a>
            <span>Toshkent shahri, IT Park hududi</span>
          </div>
        </div>

        <form className="contact-form">
          <label>
            <span>Ism</span>
            <input type="text" name="name" placeholder="Ismingiz" />
          </label>
          <label>
            <span>Telefon</span>
            <input type="tel" name="phone" placeholder="+998 __ ___ __ __" />
          </label>
          <label>
            <span>Kurs yo‘nalishi</span>
            <select name="course" defaultValue="">
              <option value="" disabled>
                Yo‘nalishni tanlang
              </option>
              <option>Kiberxavfsizlik</option>
              <option>IoT — Internet of Things</option>
              <option>Sun’iy intellekt</option>
            </select>
          </label>
          <label>
            <span>Xabar</span>
            <textarea name="message" rows="5" placeholder="Qaysi kurs sizni qiziqtiryapti?" />
          </label>
          <button className="button primary" type="submit">
            Xabar yuborish
          </button>
        </form>
      </div>
    </section>
  );
}
