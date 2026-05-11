import { navItems, telegramBotUrl, telegramChannelUrl } from '../data/siteData.js';
import BrandLogo from './BrandLogo.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-shell footer-grid">
        <div>
          <a className="brand" href="#home" aria-label="HackPro bosh sahifa">
            <BrandLogo />
            <span className="brand-word">HackPro</span>
          </a>
          <p>
            Kiberxavfsizlik, IoT va sun'iy intellekt bo'yicha professional, amaliy va ethical
            technology ta'lim platformasi.
          </p>
        </div>
        <div className="footer-links">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="social-links" aria-label="Ijtimoiy tarmoqlar">
          <a href={telegramBotUrl} target="_blank" rel="noreferrer">
            Telegram bot
          </a>
          <a href={telegramChannelUrl} target="_blank" rel="noreferrer">
            Telegram kanal
          </a>
          <a href="#contact">Manzil</a>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span>(c) 2026 HackPro. Barcha huquqlar himoyalangan.</span>
      </div>
    </footer>
  );
}
