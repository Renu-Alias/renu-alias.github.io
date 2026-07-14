import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionHeader from '../shared/SectionHeader';
import Card from '../shared/Card';

const milestones = [
  {
    title: 'Nexus AI Hackathon Winner',
    date: 'March 2026',
    description: 'Secured third place in a 16-hour hackathon, shipping a production-ready application under tight deadlines with real-time collaboration and cross-functional teamwork.'
  },
  {
    title: 'CEFR C2 — Cambridge LinguaSkill Business',
    date: '2024',
    description: 'Attested CEFR C2 proficiency on the Cambridge LinguaSkill Business examination, demonstrating mastery-level command of professional English communication across reading, writing, listening, and speaking.'
  },
  {
    title: "GSSoC '26 Contributor",
    date: '2026',
    description: 'GirlScript Summer of Code — contributed to real-world open-source projects under the Open Source Track, collaborating with maintainers through structured pull requests, code reviews, and feature development.'
  },
  {
    title: "SSoC '26 Contributor",
    date: '2026',
    description: 'Social Summer of Code — actively contributed to community-focused open-source initiatives, building tools for social impact and following collaborative development workflows.'
  }
];

const itemVariant = (i: number) => ({
  hidden: { opacity: 0, y: 50, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }
  }
});

const Achievements = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center']
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.section
      id="achievements"
      className="mx-auto max-w-container px-4 sm:px-6 py-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeader num="05" title="Achievements" />

      <div ref={ref} className="relative">
        <div className="absolute left-[0.875rem] sm:left-[1.125rem] top-8 bottom-8 w-px bg-white/10" />
        <motion.div
          className="absolute left-[0.875rem] sm:left-[1.125rem] top-8 w-px origin-top bg-accent"
          style={{ scaleY: lineScale, boxShadow: '0 0 12px rgba(230,57,70,0.5)' }}
        />

        <div className="relative space-y-8 sm:space-y-12 pl-8 sm:pl-12">
          {milestones.map((m, i) => (
            <motion.div
              key={m.title}
              className="relative"
              variants={itemVariant(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <div
                className="absolute -left-[1.125rem] sm:-left-[1.875rem] top-7 h-4 w-4 rounded-full bg-accent shadow-[0_0_12px_rgba(230,57,70,0.5)] node-pulse"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <Card>
                <p className="font-mono text-label text-accent">{m.date}</p>
                <h3 className="mt-2 font-display text-display-card font-bold text-primary">
                  {m.title}
                </h3>
                <p className="mt-3 font-mono text-body text-muted leading-relaxed">
                  {m.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Achievements;
