import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import EngineeringBg from '../EngineeringBg';

const HeroScene = lazy(() => import('../threed/HeroScene'));

const nameLetters = 'RENU ALIAS'.split('');

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 }
  }
};

const letterItem = {
  hidden: { opacity: 0, y: 80, filter: 'blur(16px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } }
};

const Hero = () => (
  <section
    id="hero"
    className="relative flex h-[100dvh] flex-col overflow-hidden"
    style={{ backgroundColor: '#050505' }}
  >
    {/* Engineering blueprint background */}
    <EngineeringBg />

    {/* Background atmosphere */}
    <motion.div
      className="absolute inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 60% at 50% 100%, rgba(230,57,70,0.06) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(rgba(245,245,245,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,245,0.08) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
    </motion.div>

    {/* 3D animated background */}
    <div className="absolute inset-0 z-[1]">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </div>

    {/* Content — flex column, no stacking context */}
    <div className="mx-auto flex w-full max-w-container flex-1 flex-col px-6">
      {/* Name — behind cutout (z-index works because this is a flex item) */}
      <div className="flex flex-1 items-center justify-center pt-[4cm]" style={{ zIndex: 20 }}>
        <motion.h1
          className="font-display font-bold text-stone-300 leading-[0.9] tracking-[-0.04em] text-center whitespace-nowrap"
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

      {/* Tagline + CTA — above cutout */}
      <div className="flex flex-col items-center pb-4 pt-[calc(4rem+4cm)]" style={{ zIndex: 35 }}>
        <motion.p
          className="font-mono text-sm uppercase tracking-[0.3em] text-muted"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Full-Stack Developer — System Design — AI/ML
        </motion.p>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#about"
            className="inline-block rounded-full border-2 border-accent px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] text-accent shadow-[0_0_16px_rgba(230,57,70,0.15)] transition-all duration-400 hover:bg-accent hover:text-white hover:shadow-[0_0_24px_rgba(230,57,70,0.4)] hover:scale-105 active:scale-95"
          >
            Explore Work
          </a>
        </motion.div>
      </div>

      {/* Metadata — at bottom */}
      <div className="flex items-center justify-between pb-6 pt-4" style={{ zIndex: 40 }}>
        <motion.div
          className="space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-label text-accent">Location</p>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary/80">
            [ Kochi, India ]
          </p>
        </motion.div>
        <motion.div
          className="space-y-1 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-label text-accent">Discipline</p>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary/80">
            [ Full-Stack // AI ]
          </p>
        </motion.div>
      </div>
    </div>

    {/* Cutout — absolute, bottom, behind tagline but in front of name */}
    <motion.img
      src="/cutout.png"
      alt=""
      className="absolute bottom-0 left-1/2 z-30 pointer-events-none select-none"
      style={{ height: 'auto', width: 'auto', maxHeight: '68dvh', transform: 'translateX(calc(-50% - 2rem))', transformOrigin: 'bottom center' }}
      draggable={false}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
    />
  </section>
);

export default Hero;
