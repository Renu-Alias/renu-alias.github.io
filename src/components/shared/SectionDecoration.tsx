import React from 'react';
import { motion } from 'framer-motion';

interface SectionDecorationProps {
  className?: string;
}

const SectionDecoration = React.memo(({ className = '' }: SectionDecorationProps) => (
  <motion.div
    className={`pointer-events-none absolute opacity-[0.035] ${className}`}
    animate={{ y: [0, -6, 0], rotate: [0, 1.5, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="85" stroke="#E63946" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="55" stroke="#E63946" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="25" stroke="#E63946" strokeWidth="0.5" />
      <line x1="15" y1="100" x2="185" y2="100" stroke="#E63946" strokeWidth="0.4" />
      <line x1="100" y1="15" x2="100" y2="185" stroke="#E63946" strokeWidth="0.4" />
      <line x1="28" y1="28" x2="172" y2="172" stroke="#E63946" strokeWidth="0.3" />
      <line x1="28" y1="172" x2="172" y2="28" stroke="#E63946" strokeWidth="0.3" />
    </svg>
  </motion.div>
));

SectionDecoration.displayName = 'SectionDecoration';

export default SectionDecoration;
