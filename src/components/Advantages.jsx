import SectionHeading from './SectionHeading.jsx';
import { advantages } from '../data/siteData.js';

export default function Advantages() {
  return (
    <section className="section-shell content-section" id="advantages">
      <SectionHeading
        eyebrow="Advantages"
        title="Nima uchun HackPro?"
        text="Talabalar va IT mutaxassislari uchun ishonchli, premium va natijaga yo‘naltirilgan o‘quv tajribasi."
      />
      <div className="advantage-grid">
        {advantages.map(({ title, Icon }) => (
          <article className="advantage-card" key={title}>
            <Icon />
            <h3>{title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
