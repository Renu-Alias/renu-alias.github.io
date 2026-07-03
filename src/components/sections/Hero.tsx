import { motion } from 'framer-motion';

const nameLetters = 'RENU ALIAS'.split('');

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.035, delayChildren: 0.3 }
  }
};

const letterItem = {
  hidden: { opacity: 0, y: 80, filter: 'blur(16px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const Hero = () => (
  <section
    id="hero"
    className="relative flex min-h-screen items-center justify-center overflow-hidden bg-pitch"
  >
    {/* Portrait — clearly visible, grayscale, dark gradient overlay for legibility */}
    <div className="absolute inset-0">
      <img
        src="Me.jpeg"
        alt=""
        className="h-full w-full object-cover object-[center_30%]"
        style={{ filter: 'grayscale(100%) contrast(1.08)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-pitch/80 via-pitch/30 to-pitch/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-pitch/40 to-transparent" />
    </div>

    {/* Content — name absolutely centered, tagline + CTA independently positioned below */}
    <div className="absolute inset-0 z-20">
      <div className="relative h-full mx-auto w-full max-w-container px-6">
        {/* Name — fixed at viewport center */}
        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
          <motion.h1
            className="font-display font-bold text-stone-300 leading-[0.9] tracking-[-0.04em] text-center whitespace-nowrap"
            style={{ fontSize: 'clamp(4rem, 14vw, 13.75rem)' }}
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

        {/* Tagline + CTA — positioned below name */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center" style={{ top: 'calc(50% + 14rem)' }}>
          <motion.p
            className="font-mono text-sm uppercase tracking-[0.3em] text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
          >
            Full-Stack Developer — System Design — AI
          </motion.p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5, ease: 'easeOut' }}
          >
            <a
              href="#about"
              className="inline-block rounded-full border border-accent px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] text-accent transition-all duration-400 hover:bg-accent hover:text-white hover:scale-105 active:scale-95"
            >
              Explore Work
            </a>
          </motion.div>
        </div>
      </div>
    </div>

    {/* Bottom metadata */}
    <div className="pointer-events-none absolute inset-x-0 bottom-12 z-20 mx-auto flex items-end justify-between max-w-container px-6">
      <motion.div
        className="space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
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
        transition={{ duration: 0.6, delay: 1.9 }}
      >
        <p className="font-mono text-label text-accent">Discipline</p>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary/80">
          [ Full-Stack // AI ]
        </p>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
    >
      <div className="scroll-indicator-pulse h-10 w-px bg-accent" />
    </motion.div>
  </section>
);

export default Hero;
