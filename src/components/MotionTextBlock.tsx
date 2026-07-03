import { motion } from 'framer-motion';

interface MotionTextBlockProps {
  text: string;
}

const MotionTextBlock = ({ text }: MotionTextBlockProps) => {
  const words = text.split(' ');

  return (
    <p className="max-w-3xl text-lg leading-9 sm:text-xl">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block mr-[0.35em]"
          initial={{ opacity: 0.08, y: 8, color: 'rgba(255,255,255,0.2)' }}
          whileInView={{ opacity: 1, y: 0, color: 'rgba(255,255,255,0.92)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: index * 0.035, ease: 'easeOut' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

export default MotionTextBlock;
