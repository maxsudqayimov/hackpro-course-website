import SectionHeading from './SectionHeading.jsx';

export default function Systems({ content }) {
  return (
    <section className="section-shell content-section" id="systems">
      <SectionHeading
        eyebrow={content.systemsSection.eyebrow}
        title={content.systemsSection.title}
        text={content.systemsSection.text}
      />
      <div className="systems-grid">
        {content.modernSystems.map(({ title, description, tags, Icon }) => (
          <article className="system-card" key={title}>
            <div className="system-card-top">
              <div className="course-icon">
                <Icon />
              </div>
              <h3>{title}</h3>
            </div>
            <p>{description}</p>
            <div className="system-tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
