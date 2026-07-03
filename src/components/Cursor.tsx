import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const interactiveSelectors = ['a', 'button', 'input', 'textarea', 'select', '[role="button"]'];

const Cursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.5 });
  const cursorSpringX = useSpring(cursorX, { stiffness: 240, damping: 28, mass: 0.35 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 240, damping: 28, mass: 0.35 });
  const [interactive, setInteractive] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        mouseX.set(rect.left + rect.width / 2);
        mouseY.set(rect.top + rect.height / 2);
      } else {
        mouseX.set(event.clientX);
        mouseY.set(event.clientY);
      }
    };

    const trackHover = (event: Event) => {
      const target = (event.target as HTMLElement | null)?.closest(interactiveSelectors.join(',')) as HTMLElement | null;
      setInteractive(target);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', trackHover);
    window.addEventListener('mouseout', trackHover);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', trackHover);
      window.removeEventListener('mouseout', trackHover);
    };
  }, [interactive, cursorX, cursorY, mouseX, mouseY]);

  const isHovered = Boolean(interactive);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ x: springX, y: springY, willChange: 'transform' }}
        initial={false}
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-[#E50914]/20"
          animate={{
            scale: isHovered ? 4 : 1,
            opacity: isHovered ? 0.35 : 0.15,
            boxShadow: isHovered ? '0 0 80px rgba(229,9,20,0.6)' : '0 0 30px rgba(229,9,20,0.18)'
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorSpringX, y: cursorSpringY, willChange: 'transform' }}
        initial={false}
      >
        <motion.span
          className="relative block h-2.5 w-2.5 rounded-full bg-white mix-blend-difference"
          animate={{
            scale: isHovered ? 1.6 : 1,
            boxShadow: isHovered ? '0 0 14px rgba(255,255,255,1)' : '0 0 6px rgba(255,255,255,0.9)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        />
      </motion.div>
    </>
  );
};

export default Cursor;
