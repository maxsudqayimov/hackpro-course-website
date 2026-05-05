import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Courses from './components/Courses.jsx';
import About from './components/About.jsx';
import Advantages from './components/Advantages.jsx';
import Stats from './components/Stats.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Courses />
        <About />
        <Advantages />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
