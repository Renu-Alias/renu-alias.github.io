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
    {/* Sparse dot field background */}
    <div className="absolute inset-0 z-[1]">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </div>

    {/* Radial glow behind the portrait — desktop only */}
    <div
      className="absolute bottom-0 left-1/2 z-[40] -translate-x-1/2 pointer-events-none select-none max-lg:hidden"
      style={{
        width: 'min(75vw, 650px)',
        height: 'min(60vh, 550px)',
        background: 'radial-gradient(ellipse at bottom center, rgba(230,57,70,0.5) 0%, rgba(230,57,70,0.15) 40%, transparent 65%)',
        transform: 'translateX(calc(-50% - 2rem))'
      }}
    />

    {/* ===== DESKTOP LAYOUT (lg+) ===== */}
    <div className="mx-auto flex w-full max-w-container flex-1 flex-col px-6 max-lg:hidden">
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

      {/* Bottom wrapper */}
      <div className="relative mt-auto flex-shrink-0">
        {/* Tagline */}
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

        {/* Bottom row */}
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

      {/* Cutout */}
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
    </div>

    {/* ===== MOBILE/TABLET LAYOUT (< lg) ===== */}
    <div className="mx-auto flex w-full max-w-container flex-1 flex-col px-4 sm:px-6 lg:hidden">
      {/* Spacer for nav */}
      <div className="h-12 sm:h-16" />

      {/* Name */}
      <div className="z-20 mt-4 sm:mt-8">
        <motion.h1
          className="font-display font-bold text-stone-300 leading-[0.9] tracking-[-0.03em] text-center"
          style={{ fontSize: 'clamp(2.2rem, 14vw, 4.5rem)' }}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {nameLetters.map((letter, i) =>
            letter === ' ' ? (
              <span key={i} className="inline-block w-[0.2em]" />
            ) : (
              <motion.span key={i} className="inline-block" variants={letterItem}>
                {letter}
              </motion.span>
            )
          )}
        </motion.h1>
      </div>

      {/* Cutout */}
      <div className="flex-1 relative flex items-center justify-center min-h-0">
        <motion.img
          src="/cutout.png"
          alt=""
          className="pointer-events-none select-none w-auto h-full max-h-[55dvh] object-contain"
          draggable={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Bottom content */}
      <div className="relative z-[70] pb-6 sm:pb-10">
        {/* Tagline */}
        <motion.p
          className="font-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.25em] text-muted text-center leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Full-Stack Developer — System Design — AI/ML
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-4 sm:mt-5 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#about"
            className="inline-block rounded-full bg-accent px-7 py-2.5 sm:px-8 sm:py-3 font-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.25em] text-white shadow-[0_0_16px_rgba(230,57,70,0.25)] transition-all duration-400 hover:bg-accent/90 hover:shadow-[0_0_28px_rgba(230,57,70,0.5)] active:scale-95"
          >
            Explore Work
          </a>
        </motion.div>

        {/* Location & Discipline */}
        <motion.div
          className="mt-4 sm:mt-5 flex items-center justify-center gap-6 sm:gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center">
            <p className="font-mono text-[0.55rem] sm:text-label text-accent">Location</p>
            <p className="font-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.15em] text-primary/80 mt-0.5">
              Kochi, India
            </p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="font-mono text-[0.55rem] sm:text-label text-accent">Discipline</p>
            <p className="font-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.15em] text-primary/80 mt-0.5">
              Full-Stack // AI
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;
