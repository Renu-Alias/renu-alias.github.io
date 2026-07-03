import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef, type MouseEvent } from 'react';

interface SkillCardProps {
  category: string;
  items: string[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
};

const SkillCard = ({ category, items }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const target = cardRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    mouseX.set(px);
    mouseY.set(py);
  };

  const reset = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, perspective: 900 }}
      className="group rounded-[1.75rem] border border-white/5 bg-[#0B0B0C] p-7 shadow-soft transition duration-300 hover:border-[#E50914] hover:bg-[#111114] hover:shadow-[0_0_40px_rgba(229,9,20,0.08)]"
    >
      <h3 className="font-mono text-sm uppercase tracking-[0.35em] text-white/50">{category}</h3>
      <motion.div
        className="mt-6 grid gap-3 text-sm text-white/70 sm:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {items.map((item) => (
          <motion.span
            key={item}
            variants={itemVariants}
            className="rounded-xl border border-white/5 bg-[#09090B] px-3 py-2 text-center font-mono text-xs transition duration-300 group-hover:border-[#E50914] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(229,9,20,0.15)]"
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SkillCard;
