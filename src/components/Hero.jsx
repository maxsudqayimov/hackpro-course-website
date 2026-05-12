import { telegramRegisterUrl } from '../data/siteData.js';

export default function Hero({ content }) {
  const { hero } = content;

  return (
    <section className="hero section-shell" id="home">
      <div className="hero-copy">
        <span className="eyebrow">{hero.eyebrow}</span>
        <h1>{hero.title}</h1>
        <p>{hero.text}</p>
        <div className="hero-actions">
          <a className="button primary" href="#courses">
            {hero.primary}
          </a>
          <a className="button secondary" href={telegramRegisterUrl} target="_blank" rel="noreferrer">
            {hero.secondary}
          </a>
        </div>
        <div className="trust-row" aria-label={hero.trustAria}>
          {hero.trust.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="hero-visual" aria-label={hero.visualAria}>
        <div className="visual-grid" />
        <div className="dashboard-panel panel-main">
          <div className="panel-header">
            <span />
            <span />
            <span />
          </div>
          <div className="terminal-line good">secure-lab / ethical-mode enabled</div>
          <div className="terminal-line">network.scan: classroom sandbox</div>
          <div className="terminal-line accent">ai.model: project assistant ready</div>
          <div className="metric-wave">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="dashboard-panel panel-card panel-iot">
          <span className="panel-label">{hero.iotLabel}</span>
          <strong>128</strong>
          <small>{hero.iotText}</small>
        </div>
        <div className="dashboard-panel panel-card panel-ai">
          <span className="panel-label">{hero.aiLabel}</span>
          <strong>94%</strong>
          <small>{hero.aiText}</small>
        </div>
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
      </div>
    </section>
  );
}
