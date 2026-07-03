import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoleCyclerProps {
  roles: string[];
}

const RoleCycler = ({ roles }: RoleCyclerProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrent((value) => (value + 1) % roles.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative flex items-center gap-3">
      <span className="h-5 w-0.5 bg-[#E50914] shadow-[0_0_10px_rgba(229,9,20,0.6)]" />
      <div className="relative h-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[current]}
            className="block text-sm font-mono uppercase tracking-[0.32em] text-white/80"
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {roles[current]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoleCycler;
