export default function BrandLogo() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <svg viewBox="0 0 48 48" role="img">
        <path className="logo-shield" d="M24 4 8 10v12c0 10.6 6.7 18.6 16 22 9.3-3.4 16-11.4 16-22V10L24 4Z" />
        <path className="logo-cut" d="M16 30V17M32 17v13M16 23h16" />
        <path className="logo-node" d="M14 17h4M30 17h4M14 30h4M30 30h4" />
        <circle className="logo-dot" cx="24" cy="23" r="2.4" />
      </svg>
    </span>
  );
}
