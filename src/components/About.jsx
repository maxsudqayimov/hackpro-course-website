export default function About({ content }) {
  return (
    <section className="about-section" id="about">
      <div className="section-shell about-grid">
        <div className="about-copy">
          <span className="eyebrow">{content.about.eyebrow}</span>
          <h2>{content.about.title}</h2>
          {content.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
