import { telegramRegisterUrl } from '../data/siteData.js';

export default function CourseDetail({ course, content }) {
  const { Icon } = course;
  const labels = content.courseDetail;

  return (
    <main className="course-detail-page">
      <section className="section-shell course-detail-hero">
        <a className="back-link" href="#courses">
          {labels.back}
        </a>

        <div className="course-detail-grid">
          <div className="course-detail-copy">
            <span className="eyebrow">{course.tag}</span>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <div className="course-detail-actions">
              <a className="button primary" href={telegramRegisterUrl} target="_blank" rel="noreferrer">
                {labels.register}
              </a>
              <a className="button secondary" href="#courses">
                {labels.otherCourses}
              </a>
            </div>
          </div>

          <aside className="course-detail-panel">
            <div className="course-detail-icon">
              <Icon />
            </div>
            <dl>
              <div>
                <dt>{labels.duration}</dt>
                <dd>{course.duration}</dd>
              </div>
              <div>
                <dt>{labels.format}</dt>
                <dd>{course.format}</dd>
              </div>
              <div>
                <dt>{labels.result}</dt>
                <dd>{labels.resultText}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="section-shell course-detail-content">
        <article>
          <h2>{labels.modulesTitle}</h2>
          <div className="detail-chip-grid">
            {course.modules.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article>
          <h2>{labels.outcomesTitle}</h2>
          <ul className="detail-list">
            {course.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article>
          <h2>{labels.projectsTitle}</h2>
          <div className="detail-project-grid">
            {course.projects.map((item) => (
              <div key={item}>
                <strong>{item}</strong>
                <p>{labels.projectText}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
