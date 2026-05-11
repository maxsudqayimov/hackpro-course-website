import { useEffect, useState } from 'react';
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
import { courses } from './data/siteData.js';

function getCurrentCourse() {
  const hash = window.location.hash.replace('#course/', '');
  if (!window.location.hash.startsWith('#course/')) {
    return null;
  }

  return courses.find((course) => course.id === hash) || null;
}

export default function App() {
  const [activeCourse, setActiveCourse] = useState(getCurrentCourse);

  useEffect(() => {
    const handleHashChange = () => {
      const course = getCurrentCourse();
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
  }, []);

  useEffect(() => {
    if (activeCourse) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
    }
  }, [activeCourse]);

  return (
    <>
      <Navbar />
      {activeCourse ? (
        <CourseDetail course={activeCourse} />
      ) : (
        <main>
          <Hero />
          <Courses />
          <Systems />
          <BotConnect />
          <About />
          <Advantages />
          <Stats />
          <Contact />
        </main>
      )}
      <Footer />
      <AiChat />
    </>
  );
}
