import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Certifications from '../components/sections/Certifications';
import Achievements from '../components/sections/Achievements';
import EventsContests from '../components/sections/EventsContests';
import Footer from '../components/sections/Footer';
import CyberBg from '../components/CyberBg';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.92],
    [1, 0.8, 0.35]
  );

  return (
    <>
      <Hero />
      <main className="relative">
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: bgOpacity }}
        >
          <CyberBg />
        </motion.div>
        <div className="relative z-10">
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Achievements />
          <EventsContests />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default HomePage;
