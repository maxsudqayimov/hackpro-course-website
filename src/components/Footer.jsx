import { telegramBotUrl, telegramChannelUrl } from '../data/siteData.js';
import BrandLogo from './BrandLogo.jsx';

export default function Footer({ content }) {
  return (
    <footer className="footer">
      <div className="section-shell footer-grid">
        <div>
          <a className="brand" href="#home" aria-label={content.homeAria}>
            <BrandLogo />
            <span className="brand-word">HackPro</span>
          </a>
          <p>{content.footer.text}</p>
        </div>
        <div className="footer-links">
          {content.navItems.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="social-links" aria-label={content.footer.socialAria}>
          <a href={telegramBotUrl} target="_blank" rel="noreferrer">
            {content.footer.bot}
          </a>
          <a href={telegramChannelUrl} target="_blank" rel="noreferrer">
            {content.footer.channel}
          </a>
          <a href="#contact">{content.footer.address}</a>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span>{content.footer.copyright}</span>
      </div>
    </footer>
  );
}
