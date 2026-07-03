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


    {/* Layer 2: Name — behind cutout */}
    <div className="absolute inset-0 z-20">
      <div className="relative h-full mx-auto w-full max-w-container px-6">
        <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
          <motion.h1
            className="font-display font-bold text-stone-300 leading-[0.9] tracking-[-0.04em] text-center whitespace-nowrap"
            style={{ fontSize: 'clamp(4.5rem, 15vw, 13.5rem)' }}
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
      </div>
    </div>

    {/* Layer 3: Cutout — bottom-aligned, zoomed out */}
    <img
      src="cutout.png"
      alt=""
      className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 h-auto w-auto pointer-events-none select-none"
      style={{ maxHeight: '75vh', width: 'auto' }}
      draggable={false}
    />

    {/* Layer 4: Tagline + CTA — above cutout */}
    <div className="absolute inset-0 z-[35]">
      <div className="relative h-full mx-auto w-full max-w-container px-6">
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
    <div className="pointer-events-none absolute inset-x-0 bottom-12 z-40 mx-auto flex items-end justify-between max-w-container px-6">
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
      className="absolute bottom-4 left-1/2 z-40 -translate-x-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
    >
      <div className="scroll-indicator-pulse h-10 w-px bg-accent" />
    </motion.div>
  </section>
);

export default Hero;
