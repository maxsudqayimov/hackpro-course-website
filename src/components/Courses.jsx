import SectionHeading from './SectionHeading.jsx';
import { courses } from '../data/siteData.js';

export default function Courses() {
  return (
    <section className="section-shell content-section" id="courses">
      <SectionHeading
        eyebrow="Courses"
        title="Beshta kuchli texnologiya yo'nalishi"
        text="HackPro kurslari xavfsiz, qonuniy va kasbiy amaliyotga tayangan holda tuzilgan."
      />
      <div className="course-grid">
        {courses.map(({ id, title, tag, description, Icon }) => (
          <a className="course-card" href={`#course/${id}`} key={title} aria-label={`${title} kursi haqida batafsil`}>
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
            <strong className="course-more">Batafsil ko'rish</strong>
          </a>
        ))}
      </div>
    </section>
  );
}
