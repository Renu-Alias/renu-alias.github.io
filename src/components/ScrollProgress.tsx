import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.5 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9998] h-[2px] origin-left bg-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.6)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
