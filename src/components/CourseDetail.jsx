import { telegramRegisterUrl } from '../data/siteData.js';

export default function CourseDetail({ course }) {
  const { Icon } = course;

  return (
    <main className="course-detail-page">
      <section className="section-shell course-detail-hero">
        <a className="back-link" href="#courses">
          Kurslarga qaytish
        </a>

        <div className="course-detail-grid">
          <div className="course-detail-copy">
            <span className="eyebrow">{course.tag}</span>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <div className="course-detail-actions">
              <a className="button primary" href={telegramRegisterUrl} target="_blank" rel="noreferrer">
                Shu kursga yozilish
              </a>
              <a className="button secondary" href="#courses">
                Boshqa kurslar
              </a>
            </div>
          </div>

          <aside className="course-detail-panel">
            <div className="course-detail-icon">
              <Icon />
            </div>
            <dl>
              <div>
                <dt>Muddat</dt>
                <dd>{course.duration}</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>{course.format}</dd>
              </div>
              <div>
                <dt>Natija</dt>
                <dd>Amaliy loyiha va portfolio</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="section-shell course-detail-content">
        <article>
          <h2>Nimalar o'rganiladi?</h2>
          <div className="detail-chip-grid">
            {course.modules.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article>
          <h2>Kurs yakunida</h2>
          <ul className="detail-list">
            {course.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article>
          <h2>Amaliy loyihalar</h2>
          <div className="detail-project-grid">
            {course.projects.map((item) => (
              <div key={item}>
                <strong>{item}</strong>
                <p>Mentor nazorati ostida bosqichma-bosqich bajariladigan portfolio loyihasi.</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
