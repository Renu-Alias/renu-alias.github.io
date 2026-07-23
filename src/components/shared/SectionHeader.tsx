import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  num: string;
  title: string;
}

const SectionHeader = React.memo(({ num, title }: SectionHeaderProps) => (
  <motion.div
    className="mb-8 sm:mb-12 lg:mb-16"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    }}
  >
    <div className="mb-4 flex items-center gap-6">
      <motion.span
        className="font-mono text-xs uppercase tracking-[0.2em] text-accent"
        variants={{
          hidden: { opacity: 0, x: -8 },
          visible: { opacity: 1, x: 0 }
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        // {num}.
      </motion.span>
      <motion.span
        className="h-px flex-1 bg-white/10"
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1 }
        }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
    <motion.h2
      className="font-display text-display-section font-bold text-primary"
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {title}
    </motion.h2>
  </motion.div>
));

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
