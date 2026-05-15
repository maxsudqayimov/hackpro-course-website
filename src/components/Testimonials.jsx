import SectionHeading from './SectionHeading.jsx';

export default function Testimonials({ content }) {
  return (
    <section className="section-shell content-section" id="testimonials">
      <SectionHeading
        eyebrow={content.testimonialsSection.eyebrow}
        title={content.testimonialsSection.title}
        text={content.testimonialsSection.text}
      />
      <div className="testimonial-grid">
        {content.testimonials.map((item) => (
          <article className="testimonial-card" key={`${item.name}-${item.course}`}>
            <div className="testimonial-top">
              <span aria-hidden="true">{item.name.slice(0, 1)}</span>
              <div>
                <strong>{item.name}</strong>
                <small>{item.course}</small>
              </div>
            </div>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
