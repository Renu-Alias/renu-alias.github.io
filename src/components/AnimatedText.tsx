import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText = ({ text, className = '' }: AnimatedTextProps) => (
  <motion.h1
    className={`font-display text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl ${className}`}
  >
    {text.split(' ').map((word, wordIdx) => (
      <span key={`${word}-${wordIdx}`} className="inline-block mr-[0.25em]">
        {word.split('').map((char, charIdx) => (
          <motion.span
            key={`${char}-${charIdx}`}
            className="inline-block"
            initial={{ opacity: 0, y: 60, filter: 'blur(16px)', letterSpacing: '0.3em' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0em' }}
            transition={{ duration: 0.8, delay: wordIdx * 0.12 + charIdx * 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    ))}
  </motion.h1>
);

export default AnimatedText;
