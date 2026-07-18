import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Courses from './components/Courses.jsx';
import CourseOutcomes from './components/CourseOutcomes.jsx';
import Systems from './components/Systems.jsx';
import PricingSchedule from './components/PricingSchedule.jsx';
import Registration from './components/Registration.jsx';
import BotConnect from './components/BotConnect.jsx';
import About from './components/About.jsx';
import Advantages from './components/Advantages.jsx';
import Stats from './components/Stats.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import AiChat from './components/AiChat.jsx';
import CourseDetail from './components/CourseDetail.jsx';
import Blog from './components/Blog.jsx';
import BlogDetail from './components/BlogDetail.jsx';
import Analytics from './components/Analytics.jsx';
import IntroReveal from './components/IntroReveal.jsx';
import SiteBackground from './components/SiteBackground.jsx';
import { defaultLanguage, getSiteContent } from './data/siteData.js';

function getInitialLanguage() {
  return localStorage.getItem('hackpro-language') || defaultLanguage;
}

function getCurrentCourse(courses) {
  const pathMatch = window.location.pathname.match(/^\/courses\/([^/]+)\/?$/);
  const pathId = pathMatch ? decodeURIComponent(pathMatch[1]) : null;
  const hashId = window.location.hash.startsWith('#course/')
    ? window.location.hash.replace('#course/', '')
    : null;
  const courseId = pathId || hashId;

  return courseId ? courses.find((course) => course.id === courseId) || null : null;
}

function getCurrentBlog(posts) {
  const pathMatch = window.location.pathname.match(/^\/blog\/([^/]+)\/?$/);
  const pathId = pathMatch ? decodeURIComponent(pathMatch[1]) : null;
  const hashId = window.location.hash.startsWith('#blog/')
    ? window.location.hash.replace('#blog/', '')
    : null;
  const postId = pathId || hashId;

  return postId
    ? posts.find((post) => post.id === postId || post.path?.replace(/^\/blog\//, '') === postId) || null
    : null;
}

function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

export default function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const content = useMemo(() => getSiteContent(language), [language]);
  const [activeCourse, setActiveCourse] = useState(() => getCurrentCourse(content.courses));
  const [activeBlog, setActiveBlog] = useState(() => getCurrentBlog(content.blogPosts || []));

  const handleLanguageChange = (nextLanguage) => {
    localStorage.setItem('hackpro-language', nextLanguage);
    setLanguage(nextLanguage);
  };

  useEffect(() => {
    const syncRoute = () => {
      const course = getCurrentCourse(content.courses);
      const blog = getCurrentBlog(content.blogPosts || []);
      setActiveCourse(course);
      setActiveBlog(blog);

      requestAnimationFrame(() => {
        if (course || blog) {
          window.scrollTo(0, 0);
          return;
        }

        const targetId = window.location.hash.replace('#', '');
        const target = targetId ? document.getElementById(targetId) : null;
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    };

    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    syncRoute();

    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, [content.blogPosts, content.courses]);

  useEffect(() => {
    document.documentElement.lang = language;
    setActiveCourse(getCurrentCourse(content.courses));
    setActiveBlog(getCurrentBlog(content.blogPosts || []));
  }, [content.blogPosts, content.courses, language]);

  useEffect(() => {
    const title = activeCourse?.seoTitle || activeBlog?.seoTitle || content.seo.title;
    const description = activeCourse?.seoDescription || activeBlog?.seoDescription || content.seo.description;
    const canonicalPath = activeCourse?.path || activeBlog?.path || '/';
    const canonicalUrl = `https://hackpro.uz${canonicalPath}`;

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
  }, [activeBlog, activeCourse, content.seo]);

  useEffect(() => {
    if (activeCourse || activeBlog) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
    }
  }, [activeBlog, activeCourse]);

  return (
    <>
      <SiteBackground />
      <IntroReveal />
      <Navbar content={content} language={language} onLanguageChange={handleLanguageChange} />
      {activeCourse ? (
        <CourseDetail course={activeCourse} content={content} />
      ) : activeBlog ? (
        <BlogDetail post={activeBlog} content={content} />
      ) : (
        <main>
          <Hero content={content} />
          <Courses content={content} />
          <Registration content={content} />
          <CourseOutcomes content={content} />
          <Systems content={content} />
          <PricingSchedule content={content} />
          <BotConnect content={content} />
          <Blog content={content} />
          <About content={content} />
          <Advantages content={content} />
          <Stats content={content} />
          <Contact content={content} />
        </main>
      )}
      <Footer content={content} />
      <AiChat content={content} />
      <Analytics />
    </>
  );
}
