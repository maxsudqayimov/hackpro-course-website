import { navItems } from '../data/siteData.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-shell footer-grid">
        <div>
          <a className="brand" href="#home" aria-label="HackPro bosh sahifa">
            <span className="brand-mark">H</span>
            <span>HackPro</span>
          </a>
          <p>
            Kiberxavfsizlik, IoT va sun’iy intellekt bo‘yicha professional,
            amaliy va ethical technology ta’lim platformasi.
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
          <a href="#contact">Telegram</a>
          <a href="#contact">LinkedIn</a>
          <a href="#contact">Instagram</a>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <span>© 2026 HackPro. Barcha huquqlar himoyalangan.</span>
      </div>
    </footer>
  );
}
