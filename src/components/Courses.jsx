import SectionHeading from './SectionHeading.jsx';
import { courses } from '../data/siteData.js';

export default function Courses() {
  return (
    <section className="section-shell content-section" id="courses">
      <SectionHeading
        eyebrow="Courses"
        title="Uchta kuchli texnologiya yo‘nalishi"
        text="HackPro kurslari xavfsiz, qonuniy va kasbiy amaliyotga tayangan holda tuzilgan."
      />
      <div className="course-grid">
        {courses.map(({ title, tag, description, Icon }) => (
          <article className="course-card" key={title}>
            <div className="course-icon">
              <Icon />
            </div>
            <span>{tag}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
