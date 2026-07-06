import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';

const HeroScene = lazy(() => import('../threed/HeroScene'));

const nameLetters = 'RENU ALIAS'.split('');

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.5 }
  }
};

const letterItem = {
  hidden: { opacity: 0, y: 100, scale: 0.6 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 2.4, ease: [0.22, 1, 0.36, 1] }
  }
};

const Hero = () => (
  <section
    id="hero"
    className="relative flex h-[100dvh] flex-col overflow-hidden"
    style={{ backgroundColor: '#050505' }}
  >
    {/* 3D animated background */}
    <div className="absolute inset-0 z-[1]">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </div>

    {/* Flex content: name + bottom row — no tagline here */}
    <div className="mx-auto flex w-full max-w-container flex-1 flex-col px-6">
      {/* Name */}
      <div className="relative z-20 flex flex-1 items-center justify-center">
        <motion.h1
          className="font-display font-bold text-stone-300 leading-[0.9] tracking-[-0.04em] text-center whitespace-nowrap -mt-[2cm]"
          style={{ fontSize: 'clamp(3.7rem, 14.8vw, 14.4rem)' }}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {nameLetters.map((letter, i) =>
            letter === ' ' ? (
              <span key={i} className="inline-block w-[0.25em]" />
            ) : (
              <motion.span key={i} className="inline-block" variants={letterItem}>
                {letter}
              </motion.span>
            )
          )}
        </motion.h1>
      </div>

      {/* Bottom wrapper — sits at bottom, tagline 4px above */}
      <div className="relative mt-auto flex-shrink-0">
        {/* Tagline — exactly 4px above the bottom row */}
        <div className="absolute left-1/2 z-[70] -translate-x-1/2" style={{ bottom: 'calc(100% - 14px)' }}>
          <motion.p
            className="font-mono text-sm uppercase tracking-[0.3em] text-muted whitespace-nowrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Full-Stack Developer — System Design — AI/ML
          </motion.p>
        </div>

        {/* Bottom row: Location | CTA | Discipline */}
        <div className="relative z-[70] flex items-center justify-between pb-10 pt-6">
        <motion.div
          className="space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-label text-accent">Location</p>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary/80">
            [ Kochi, India ]
          </p>
        </motion.div>

        <motion.div
          className="mt-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#about"
            className="inline-block rounded-full bg-accent px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] text-white shadow-[0_0_16px_rgba(230,57,70,0.25)] transition-all duration-400 hover:bg-accent/90 hover:shadow-[0_0_28px_rgba(230,57,70,0.5)] hover:scale-105 active:scale-95"
          >
            Explore Work
          </a>
        </motion.div>

        <motion.div
          className="space-y-1 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 4.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-label text-accent">Discipline</p>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary/80">
            [ Full-Stack // AI ]
          </p>
        </motion.div>
      </div>
      </div>
    </div>

    {/* Cutout — in front of name, bottom-aligned */}
    <motion.img
      src="/cutout.png"
      alt=""
      className="absolute bottom-0 left-1/2 z-[60] pointer-events-none select-none"
      style={{ height: 'auto', width: 'auto', maxHeight: '68dvh', transform: 'translateX(calc(-50% - 2rem))', transformOrigin: 'bottom center' }}
      draggable={false}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0, ease: [0.16, 1, 0.3, 1] }}
    />
  </section>
);

export default Hero;
