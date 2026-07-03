import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
  {
    title: 'Kochi Hackathon Champion',
    date: '2025',
    description: 'Led a team to build a production-ready web app that won Best System Architecture.'
  },
  {
    title: 'AI Systems Sprint',
    date: '2024',
    description: 'Designed a retrieval-augmented workflow for smarter decision-making in enterprise apps.'
  },
  {
    title: 'Open Source Contributor',
    date: '2023',
    description: 'Published reusable tools for React and cloud automation with a focus on reliability and performance.'
  }
];

const AchievementTimeline = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#09090B]/90 p-8 shadow-soft">
      <div className="absolute left-10 top-6 h-full w-[1px] bg-white/10" />
      <motion.div
        className="absolute left-10 top-6 h-full w-[1px] origin-top bg-[#E50914] shadow-[0_0_16px_rgba(229,9,20,0.6)]"
        style={{ scaleY: lineProgress }}
      />
      <div className="relative ml-16 space-y-12">
        {milestones.map((milestone, index) => (
          <motion.article
            key={milestone.title}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0B0B0C]/90 p-6 shadow-soft transition duration-300 hover:border-white/20"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute left-[-22px] top-7 h-4 w-4 rounded-full bg-[#E50914] shadow-[0_0_24px_rgba(229,9,20,0.7)]"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
            />
            <p className="text-sm uppercase tracking-[0.3em] text-white/40">{milestone.date}</p>
            <h4 className="mt-3 text-2xl font-semibold text-white">{milestone.title}</h4>
            <p className="mt-3 text-sm leading-7 text-white/70">{milestone.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default AchievementTimeline;
