import SectionHeading from './SectionHeading.jsx';
import { modernSystems } from '../data/siteData.js';

export default function Systems() {
  return (
    <section className="section-shell content-section" id="systems">
      <SectionHeading
        eyebrow="Modern systems"
        title="HackPro ichidagi zamonaviy tizimlar"
        text="O'quv jarayoni sayt, Telegram bot, amaliy laboratoriyalar va avtomatlashtirilgan ariza tizimi bilan birga ishlaydi."
      />
      <div className="systems-grid">
        {modernSystems.map(({ title, description, tags, Icon }) => (
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
