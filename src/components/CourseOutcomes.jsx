export default function CourseOutcomes({ content }) {
  const { outcomesSection } = content;

  return (
    <section className="section-shell course-outcomes" id="course-results">
      <h2>{outcomesSection.title}</h2>
      <div className="outcome-grid">
        {outcomesSection.items.map((item) => (
          <article className={`outcome-card ${item.size || ''}`} key={item.title}>
            <div className="outcome-copy">
              <h3>{item.title}</h3>
              {item.text.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <img src={item.image} alt="" loading="lazy" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  );
}
