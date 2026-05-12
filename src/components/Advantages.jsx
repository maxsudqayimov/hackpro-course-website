import SectionHeading from './SectionHeading.jsx';

export default function Advantages({ content }) {
  return (
    <section className="section-shell content-section" id="advantages">
      <SectionHeading
        eyebrow={content.advantagesSection.eyebrow}
        title={content.advantagesSection.title}
        text={content.advantagesSection.text}
      />
      <div className="advantage-grid">
        {content.advantages.map(({ title, Icon }) => (
          <article className="advantage-card" key={title}>
            <Icon />
            <h3>{title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
