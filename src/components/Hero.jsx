export default function Hero() {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-copy">
        <span className="eyebrow">Professional technology academy</span>
        <h1>Kelajak texnologiyalarini HackPro bilan o‘rganing</h1>
        <p>
          Kiberxavfsizlik, IoT va sun’iy intellekt bo‘yicha amaliy kurslar:
          real loyihalar, mentor yordami va IT karyera uchun aniq yo‘l xaritasi.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#courses">
            Kurslarni ko‘rish
          </a>
          <a className="button secondary" href="#contact">
            Bog‘lanish
          </a>
        </div>
        <div className="trust-row" aria-label="Platforma afzalliklari">
          <span>Ethical cybersecurity</span>
          <span>Real IoT labs</span>
          <span>AI project studio</span>
        </div>
      </div>

      <div className="hero-visual" aria-label="HackPro texnologiya platformasi ko‘rinishi">
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
          <span className="panel-label">IoT Nodes</span>
          <strong>128</strong>
          <small>connected devices</small>
        </div>
        <div className="dashboard-panel panel-card panel-ai">
          <span className="panel-label">AI Studio</span>
          <strong>94%</strong>
          <small>model accuracy lab</small>
        </div>
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
      </div>
    </section>
  );
}
