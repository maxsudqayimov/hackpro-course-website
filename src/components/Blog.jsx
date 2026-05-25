import SectionHeading from './SectionHeading.jsx';

export default function Blog({ content }) {
  return (
    <section className="section-shell content-section blog-section" id="blog">
      <SectionHeading
        eyebrow={content.blogSection.eyebrow}
        title={content.blogSection.title}
        text={content.blogSection.text}
      />
      <div className="blog-grid">
        {content.blogPosts.map((post) => (
          <a className="blog-card" href={post.path} key={post.id}>
            <span>{post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <div className="blog-card-footer">
              <small>{post.readTime}</small>
              <strong>{content.blogSection.more}</strong>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
