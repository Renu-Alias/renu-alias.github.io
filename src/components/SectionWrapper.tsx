import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

const variants = [
  {
    initial: { opacity: 0, y: 60, filter: 'blur(8px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' }
  },
  {
    initial: { opacity: 0, x: -80, rotateY: 5 },
    whileInView: { opacity: 1, x: 0, rotateY: 0 }
  },
  {
    initial: { opacity: 0, scale: 0.92, clipPath: 'inset(0 0 100% 0)' },
    whileInView: { opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }
  },
  {
    initial: { opacity: 0, y: 60, skewX: '-2deg', filter: 'blur(4px)' },
    whileInView: { opacity: 1, y: 0, skewX: '0deg', filter: 'blur(0px)' }
  },
  {
    initial: { opacity: 0, y: 40, clipPath: 'inset(0 0 10% 0)' },
    whileInView: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }
  }
];

const SectionWrapper = ({ children, className = '', index = 0 }: SectionWrapperProps) => {
  const v = variants[index % variants.length];

  return (
    <motion.div
      className={`rounded-[2rem] border border-white/10 bg-black/70 p-10 shadow-soft ${className}`}
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default SectionWrapper;
