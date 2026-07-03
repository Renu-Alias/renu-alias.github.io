import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

const interactiveSelectors = ['a', 'button', 'input', 'textarea', 'select', '[role="button"]'];

const Cursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 400, damping: 18, mass: 0.1 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 18, mass: 0.1 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      style={{ x: springX, y: springY }}
    />
  );
};

export default Cursor;
