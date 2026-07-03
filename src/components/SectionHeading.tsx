import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <div className="mb-10 max-w-3xl">
    <motion.div
      className="mb-4 flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-white/50"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <span className="h-px flex-1 bg-white/10" />
      <span>SECTION</span>
      <span className="h-px flex-1 bg-white/10" />
    </motion.div>

    <motion.h2
      className="font-display text-3xl font-semibold uppercase tracking-[0.24em] text-white sm:text-4xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
    >
      {title.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.035 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h2>

    {subtitle ? (
      <motion.p
        className="mt-4 max-w-2xl text-base leading-8 text-white/60"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {subtitle}
      </motion.p>
    ) : null}
  </div>
);

export default SectionHeading;
