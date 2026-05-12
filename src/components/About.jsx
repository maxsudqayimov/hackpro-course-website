export default function About({ content }) {
  return (
    <section className="about-section" id="about">
      <div className="section-shell about-grid">
        <div>
          <span className="eyebrow">{content.about.eyebrow}</span>
          <h2>{content.about.title}</h2>
        </div>
        <div className="about-copy">
          {content.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
