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
        {content.courses.map(({ id, title, tag, description, Icon }) => (
          <a
            className="course-card"
            href={`#course/${id}`}
            key={id}
            aria-label={`${title} ${content.coursesSection.ariaSuffix}`}
          >
            <div className="course-card-heading">
              <div className="course-icon">
                <Icon />
              </div>
              <div>
                <span>{tag}</span>
                <h3>{title}</h3>
              </div>
            </div>
            <p>{description}</p>
            <strong className="course-more">{content.coursesSection.more}</strong>
          </a>
        ))}
      </div>
    </section>
  );
}
