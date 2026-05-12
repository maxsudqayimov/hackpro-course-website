import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Courses from './components/Courses.jsx';
import Systems from './components/Systems.jsx';
import BotConnect from './components/BotConnect.jsx';
import About from './components/About.jsx';
import Advantages from './components/Advantages.jsx';
import Stats from './components/Stats.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import AiChat from './components/AiChat.jsx';
import CourseDetail from './components/CourseDetail.jsx';
import { defaultLanguage, getSiteContent } from './data/siteData.js';

function getInitialLanguage() {
  return localStorage.getItem('hackpro-language') || defaultLanguage;
}

function getCurrentCourse(courses) {
  const hash = window.location.hash.replace('#course/', '');
  if (!window.location.hash.startsWith('#course/')) {
    return null;
  }

  return courses.find((course) => course.id === hash) || null;
}

export default function App() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const content = useMemo(() => getSiteContent(language), [language]);
  const [activeCourse, setActiveCourse] = useState(() => getCurrentCourse(content.courses));

  const handleLanguageChange = (nextLanguage) => {
    localStorage.setItem('hackpro-language', nextLanguage);
    setLanguage(nextLanguage);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const course = getCurrentCourse(content.courses);
      setActiveCourse(course);

      requestAnimationFrame(() => {
        if (course) {
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

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [content.courses]);

  useEffect(() => {
    document.documentElement.lang = language;
    setActiveCourse(getCurrentCourse(content.courses));
  }, [content.courses, language]);

  useEffect(() => {
    if (activeCourse) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
    }
  }, [activeCourse]);

  return (
    <>
      <Navbar content={content} language={language} onLanguageChange={handleLanguageChange} />
      {activeCourse ? (
        <CourseDetail course={activeCourse} content={content} />
      ) : (
        <main>
          <Hero content={content} />
          <Courses content={content} />
          <Systems content={content} />
          <BotConnect content={content} />
          <About content={content} />
          <Advantages content={content} />
          <Stats content={content} />
          <Contact content={content} />
        </main>
      )}
      <Footer content={content} />
      <AiChat content={content} />
    </>
  );
}
