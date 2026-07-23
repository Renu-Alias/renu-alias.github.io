import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import CyberBg from '../components/CyberBg';

const Projects = React.lazy(() => import('../components/sections/Projects'));
const Certifications = React.lazy(() => import('../components/sections/Certifications'));
const Achievements = React.lazy(() => import('../components/sections/Achievements'));
const EventsContests = React.lazy(() => import('../components/sections/EventsContests'));
const Footer = React.lazy(() => import('../components/sections/Footer'));

const SectionFallback = () => (
  <div className="mx-auto max-w-container px-4 sm:px-6 py-section">
    <div className="h-8 w-48 rounded bg-white/[0.03] animate-pulse" />
    <div className="mt-8 space-y-4">
      <div className="h-24 rounded-2xl bg-white/[0.02] animate-pulse" />
      <div className="h-24 rounded-2xl bg-white/[0.02] animate-pulse" />
    </div>
  </div>
);

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.50, 0.95],
    [1, 0.9, 0.7]
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
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div className="absolute top-[22%] right-[4%] h-[520px] w-[520px]" style={{ background: 'radial-gradient(circle at 60% 40%, rgba(230,57,70,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div className="absolute top-[40%] left-[8%] h-[480px] w-[480px]" style={{ background: 'radial-gradient(circle at 40% 50%, rgba(220,50,80,0.06) 0%, transparent 70%)', filter: 'blur(45px)' }} />
          <div className="absolute top-[58%] right-[10%] h-[500px] w-[500px]" style={{ background: 'radial-gradient(circle at 50% 40%, rgba(230,57,70,0.07) 0%, transparent 70%)', filter: 'blur(42px)' }} />
          <div className="absolute top-[76%] left-[15%] h-[440px] w-[440px]" style={{ background: 'radial-gradient(circle at 45% 50%, rgba(220,50,80,0.05) 0%, transparent 70%)', filter: 'blur(38px)' }} />
        </div>
        <div className="relative z-10">
          <About />
          <Skills />
          <React.Suspense fallback={<SectionFallback />}>
            <Projects />
          </React.Suspense>
          <React.Suspense fallback={<SectionFallback />}>
            <Certifications />
          </React.Suspense>
          <React.Suspense fallback={<SectionFallback />}>
            <Achievements />
          </React.Suspense>
          <React.Suspense fallback={<SectionFallback />}>
            <EventsContests />
          </React.Suspense>
          <React.Suspense fallback={null}>
            <Footer />
          </React.Suspense>
        </div>
      </main>
    </>
  );
};

export default HomePage;
