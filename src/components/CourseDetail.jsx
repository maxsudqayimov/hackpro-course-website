import { telegramRegisterUrl } from '../data/siteData.js';
import LeadForm from './LeadForm.jsx';

export default function CourseDetail({ course, content }) {
  const { Icon } = course;
  const labels = content.courseDetail;
  const detailLabels = {
    audience: content.language === 'en' ? 'Who is this course for?' : content.language === 'ru' ? 'Для кого этот курс?' : 'Bu kurs kimlar uchun?',
    roadmap: content.language === 'en' ? 'Learning roadmap' : content.language === 'ru' ? 'Карта обучения' : "O'qish yo'l xaritasi",
    skills: content.language === 'en' ? 'Practical skills' : content.language === 'ru' ? 'Практические навыки' : "Amaliy ko'nikmalar",
    seo: content.language === 'en' ? 'Search topics covered' : content.language === 'ru' ? 'Темы для поиска' : 'Google va Yandex uchun mavzular',
    registerTitle: content.language === 'en' ? 'Register for this course online' : content.language === 'ru' ? 'Онлайн запись на этот курс' : "Shu kursga online ro'yxatdan o'ting",
    registerText:
      content.language === 'en'
        ? 'The request goes directly to Telegram CRM with this course selected.'
        : content.language === 'ru'
          ? 'Заявка попадет в Telegram CRM с выбранным курсом.'
          : "Ariza Telegram CRM ga aynan shu kurs tanlangan holda tushadi.",
  };

  return (
    <main className="course-detail-page">
      <section className="section-shell course-detail-hero">
        <a className="back-link" href="/#courses">
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
              <a className="button secondary" href="/#courses">
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

        <article className="course-deep-grid">
          <div>
            <h2>{detailLabels.audience}</h2>
            <ul className="detail-list">
              {(course.audience || []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{detailLabels.roadmap}</h2>
            <div className="roadmap-list">
              {(course.roadmap || []).map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article>
          <h2>{detailLabels.skills}</h2>
          <div className="detail-chip-grid">
            {(course.skills || []).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article>
          <h2>{detailLabels.seo}</h2>
          <div className="detail-chip-grid seo-chip-grid">
            {(course.keywords || []).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article className="course-faq">
          <h2>{content.faqTitle}</h2>
          <div className="faq-list">
            {course.faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </article>

        <article className="course-register-card">
          <div>
            <h2>{detailLabels.registerTitle}</h2>
            <p>{detailLabels.registerText}</p>
          </div>
          <LeadForm content={content} defaultCourse={course.title} source={`course-${course.id}`} compact />
        </article>
      </section>
    </main>
  );
}
