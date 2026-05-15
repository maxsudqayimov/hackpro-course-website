import SectionHeading from './SectionHeading.jsx';

export default function Courses({ content }) {
  return (
    <section className="section-shell content-section" id="courses">
      <SectionHeading
        eyebrow={content.coursesSection.eyebrow}
        title={content.coursesSection.title}
        text={content.coursesSection.text}
      />
      <div className="course-grid">
        {content.courses.map(
          ({ id, title, tag, description, duration, path, cardLabel, cardImage, cardImageAlt, cardAccent, Icon }) => (
          <a
            className="course-card"
            href={path}
            key={id}
            aria-label={`${title} ${content.coursesSection.ariaSuffix}`}
            style={{ '--course-accent': cardAccent }}
          >
            <img className="course-card-image" src={cardImage} alt={cardImageAlt} loading="lazy" />
            <div className="course-card-overlay">
              <div className="course-card-heading">
                <span>{cardLabel}</span>
                <div className="course-icon">
                  <Icon />
                </div>
              </div>
              <h3>{title}</h3>
              <strong className="course-duration">{duration}</strong>
              <p>{description}</p>
              <div className="course-card-bottom">
                <small>{tag}</small>
                <strong className="course-more">{content.coursesSection.more}</strong>
              </div>
            </div>
          </a>
          ),
        )}
      </div>
    </section>
  );
}
