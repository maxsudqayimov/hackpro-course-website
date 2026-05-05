import { stats } from '../data/siteData.js';

export default function Stats() {
  return (
    <section className="stats-band">
      <div className="section-shell stats-grid">
        {stats.map((item) => (
          <div className="stat-item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
