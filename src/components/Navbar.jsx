import { useState } from 'react';
import { navItems, telegramRegisterUrl } from '../data/siteData.js';
import BrandLogo from './BrandLogo.jsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <a className="brand" href="#home" onClick={closeMenu} aria-label="HackPro bosh sahifa">
        <BrandLogo />
        <span className="brand-word">HackPro</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Menyuni ochish"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span />
        <span />
      </button>

      <nav className={isOpen ? 'nav-links open' : 'nav-links'} aria-label="Asosiy menyu">
        {navItems.map(({ href, label, Icon }) => (
          <a href={href} key={label} onClick={closeMenu}>
            <Icon />
            <span>{label}</span>
          </a>
        ))}
        <a
          className="nav-cta"
          href={telegramRegisterUrl}
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          <span className="nav-cta-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21 4 3 11l7 2 2 7 9-16Z" />
              <path d="m10 13 4-4" />
            </svg>
          </span>
          Bot orqali yozilish
        </a>
      </nav>
    </header>
  );
}
