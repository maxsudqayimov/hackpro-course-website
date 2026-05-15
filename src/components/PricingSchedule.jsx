import { telegramRegisterUrl } from '../data/siteData.js';
import SectionHeading from './SectionHeading.jsx';

export default function PricingSchedule({ content }) {
  const { pricingSection } = content;

  return (
    <section className="section-shell content-section" id="pricing">
      <SectionHeading
        eyebrow={pricingSection.eyebrow}
        title={pricingSection.title}
        text={pricingSection.text}
      />
      <div className="pricing-layout">
        <div className="pricing-grid">
          {content.pricing.map((item) => (
            <article className="pricing-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a className="button secondary" href={telegramRegisterUrl} target="_blank" rel="noreferrer">
                {pricingSection.cta}
              </a>
            </article>
          ))}
        </div>
        <aside className="schedule-card">
          <h3>{pricingSection.scheduleTitle}</h3>
          <ul>
            {pricingSection.schedule.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="button primary" href={telegramRegisterUrl} target="_blank" rel="noreferrer">
            {pricingSection.cta}
          </a>
        </aside>
      </div>
    </section>
  );
}
