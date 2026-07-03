import { motion } from 'framer-motion';

const accent = '#7C82FF';

const HeroUpdated = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* film grain overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.02),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'240\' height=\'240\'%3E%3Cg fill=\'none\' stroke=\'rgba(255,255,255,0.04)\' stroke-width=\'1\' opacity=\'0.18\'%3E%3Cpath d=\'M0 0h240M0 40h240M0 80h240M0 120h240M0 160h240M0 200h240M0 240h240M0 0v240M40 0v240M80 0v240M120 0v240M160 0v240M200 0v240M240 0v240\'/%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

      <div className="absolute inset-0 z-10 bg-black/70" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-[1500px] items-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[2rem] border border-white/5 bg-black/10">
          {/* Background portrait behind copy */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80"
                alt="Renu Alias"
                className="h-full w-full object-cover object-center grayscale opacity-80"
                style={{
                  filter: 'grayscale(1) contrast(1.05) brightness(0.88)',
                  transform: 'scale(1.05)'
                }}
              />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)0%,rgba(0,0,0,0.68)40%,rgba(0,0,0,0.95)90%)]" />
          </motion.div>

          <div className="relative z-30 grid w-full gap-8 px-6 py-10 md:grid-cols-[1.2fr_0.8fr] lg:px-12 xl:px-16">
            <motion.div
              className="flex flex-col justify-center gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
              }}
            >
              <motion.div
                className="space-y-2 overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-left font-display uppercase leading-[0.88] tracking-[-0.03em] text-white sm:text-[clamp(4rem,6vw,8rem)] md:text-[clamp(5rem,7vw,9rem)] lg:text-[clamp(6rem,8vw,11rem)]">
                  <motion.span
                    className="block"
                    variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                  >
                    RENU
                  </motion.span>
                  <motion.span
                    className="block"
                    variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                  >
                    ALIAS
                  </motion.span>
                </div>
              </motion.div>

              <motion.div
                className="max-w-xl"
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-mono text-sm uppercase tracking-[0.38em] text-white/60 sm:text-base">
                  FULL-STACK / SYSTEMS / AI
                </p>
              </motion.div>

              <motion.div
                className="mt-4 flex flex-wrap gap-3"
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                {['About', 'Skills', 'Projects', 'Certifications', 'Achievements', 'Contact'].map((label) => (
                  <a
                    key={label}
                    href={`#${label.toLowerCase()}`}
                    className="rounded-full border border-white/10 px-4 py-2 text-[0.7rem] uppercase tracking-[0.3em] text-white/60 transition hover:border-[#7C82FF] hover:text-[#7C82FF]"
                  >
                    {label}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative flex h-full min-h-[380px] items-end justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="pointer-events-none absolute inset-0 rounded-[1.85rem] border border-white/10 bg-black/20" />
              <div className="relative h-[380px] w-full overflow-hidden rounded-[1.85rem] border border-white/10 bg-black/25 shadow-[0_40px_120px_rgba(0,0,0,0.45)] sm:h-[420px]">
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80"
                    alt="Renu Alias"
                    className="h-full w-full object-cover object-center" 
                    style={{ filter: 'grayscale(1) contrast(1.1) brightness(0.82)' }}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.95)_80%)]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-10 z-40 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex h-16 flex-col items-center justify-between text-white/60">
          <span className="block h-10 w-[1px] rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-[#7C82FF] animate-bounce-slow" />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-6 z-40 flex items-center justify-between px-6 text-white/70 sm:px-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="space-y-1">
          <p className="font-mono text-[0.63rem] uppercase tracking-[0.32em] text-[#7C82FF]">LOC</p>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/70">Kochi, IN</p>
        </div>
        <div className="space-y-1 text-right">
          <p className="font-mono text-[0.63rem] uppercase tracking-[0.32em] text-[#7C82FF]">ROLE</p>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/70">Full-Stack // AI</p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroUpdated;
