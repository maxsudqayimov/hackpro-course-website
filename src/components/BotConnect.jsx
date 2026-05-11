import { telegramBotUrl, telegramRegisterUrl } from '../data/siteData.js';

export default function BotConnect() {
  return (
    <section className="bot-connect" id="telegram-bot">
      <div className="section-shell bot-connect-grid">
        <div className="bot-connect-copy">
          <span className="eyebrow">Telegram bot</span>
          <h2>Saytdan botga bir bosishda o'ting</h2>
          <p>
            HackPro botida kurslarni tanlash, zamonaviy tizimlar bilan tanishish, savol-javoblarni
            ko'rish va ro'yxatdan o'tish bir joyda jamlangan.
          </p>
          <div className="bot-actions">
            <a className="button primary" href={telegramRegisterUrl} target="_blank" rel="noreferrer">
              Ro'yxatdan o'tish
            </a>
            <a className="button secondary" href={telegramBotUrl} target="_blank" rel="noreferrer">
              Botni ochish
            </a>
          </div>
        </div>

        <div className="bot-phone" aria-label="Telegram bot menyusi namunasi">
          <div className="bot-phone-header">
            <span />
            <strong>@hackproMbot</strong>
          </div>
          <div className="bot-chat">
            <div className="bot-message">Assalomu alaykum! HackPro botiga xush kelibsiz.</div>
            <div className="bot-menu-preview">
              <span><b>01</b> Kurslar</span>
              <span><b>02</b> Sayt haqida</span>
              <span><b>03</b> Tizimlar</span>
              <span><b>04</b> Ro'yxatdan o'tish</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
