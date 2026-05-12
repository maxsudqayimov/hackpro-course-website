import { telegramBotUrl, telegramRegisterUrl } from '../data/siteData.js';

export default function BotConnect({ content }) {
  const { bot } = content;

  return (
    <section className="bot-connect" id="telegram-bot">
      <div className="section-shell bot-connect-grid">
        <div className="bot-connect-copy">
          <span className="eyebrow">{bot.eyebrow}</span>
          <h2>{bot.title}</h2>
          <p>{bot.text}</p>
          <div className="bot-actions">
            <a className="button primary" href={telegramRegisterUrl} target="_blank" rel="noreferrer">
              {bot.register}
            </a>
            <a className="button secondary" href={telegramBotUrl} target="_blank" rel="noreferrer">
              {bot.open}
            </a>
          </div>
        </div>

        <div className="bot-phone" aria-label={bot.phoneAria}>
          <div className="bot-phone-header">
            <span />
            <strong>@hackproMbot</strong>
          </div>
          <div className="bot-chat">
            <div className="bot-message">{bot.welcome}</div>
            <div className="bot-menu-preview">
              {bot.menu.map((item, index) => (
                <span key={item}>
                  <b>{String(index + 1).padStart(2, '0')}</b> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
