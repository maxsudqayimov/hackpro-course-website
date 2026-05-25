import { telegramRegisterUrl } from '../data/siteData.js';

export default function BlogDetail({ post, content }) {
  const labels = content.blogDetail;

  return (
    <main className="blog-detail-page">
      <section className="section-shell blog-detail-hero">
        <a className="back-link" href="/#blog">
          {labels.back}
        </a>
        <div className="blog-detail-card">
          <span className="eyebrow">{post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="blog-meta">
            <span>{post.readTime}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </section>

      <section className="section-shell blog-detail-content">
        {post.sections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            {section.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.list ? (
              <ul className="detail-list">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
        <aside className="blog-cta">
          <div>
            <span className="eyebrow">{labels.ctaEyebrow}</span>
            <h2>{labels.ctaTitle}</h2>
            <p>{labels.ctaText}</p>
          </div>
          <a className="button primary" href={telegramRegisterUrl} target="_blank" rel="noreferrer">
            {labels.cta}
          </a>
        </aside>
      </section>
    </main>
  );
}
