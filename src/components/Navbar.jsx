import { useState } from 'react';
import { navItems } from '../data/siteData.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <a className="brand" href="#home" onClick={closeMenu} aria-label="HackPro bosh sahifa">
        <span className="brand-mark">H</span>
        <span>HackPro</span>
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
        {navItems.map((item) => (
          <a href={item.href} key={item.label} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={closeMenu}>
          Start Learning
        </a>
      </nav>
    </header>
  );
}
