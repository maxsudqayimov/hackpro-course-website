export default function Stats({ content }) {
  return (
    <section className="stats-band">
      <div className="section-shell stats-grid">
        {content.stats.map((item) => (
          <div className="stat-item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
