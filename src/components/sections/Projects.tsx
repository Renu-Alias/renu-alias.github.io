import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Card from '../shared/Card';

const ProjectScene = React.lazy(() => import('../threed/ProjectScene'));

const projectData = [
  {
    name: 'Meridian',
    description:
      'A peer-driven blogging platform for engineers and tech enthusiasts with stack-matched discovery, living posts and impact-based global ranking.',
    link: 'https://github.com/Renu-Alias/Meridian.git',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis']
  },
  {
    name: 'CodeSage',
    description:
      'AI-powered code analysis and tutoring platform that helps beginner programmers debug, understand and improve their code through personalized feedback and learning insights.',
    link: 'https://github.com/Renu-Alias/CodeSage.git',
    tags: ['Python', 'React', 'OpenAI', 'FastAPI']
  },
  {
    name: 'Sentinel',
    description:
      'Real-time automated piracy detection system with hashing and dual-mode fingerprinting.',
    link: 'https://github.com/Renu-Alias/Sentinel.git',
    tags: ['Python', 'OpenCV', 'FFmpeg', 'FastAPI']
  },
  {
    name: 'LiteCPU16',
    description:
      'A minimal embedded 16-bit single cycle RISC-V processor.',
    link: 'https://github.com/Renu-Alias/LiteCPU16.git',
    tags: ['Verilog', 'RISC-V', 'FPGA', 'Embedded']
  },
  {
    name: 'DormShare',
    description:
      'A hyper-local, peer-to-peer micro-leasing marketplace, designed exclusively for college campuses.',
    link: 'https://github.com/Renu-Alias/DormShare.git',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind']
  }
];

const cardVariant = (i: number) => ({
  hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 },
  visible: {
    opacity: 1, x: 0, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  }
});

const shapeForIndex = [0, 1, 2, 3, 4];

const Projects = () => {

  return (
    <motion.section
      id="projects"
      className="mx-auto max-w-container px-4 sm:px-6 py-section"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeader num="03" title="Projects" />

      <div className="space-y-6">
        {projectData.map((project, i) => (
          <motion.div
            key={project.name}
            variants={cardVariant(i)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <Card>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-5">
                <div className="relative h-32 sm:h-40 overflow-hidden rounded-xl border border-white/10 bg-pitch lg:col-span-2 lg:h-auto">
                  <Suspense fallback={<div className="absolute inset-0 bg-white/[0.02] animate-pulse" />}>
                    <ProjectScene index={shapeForIndex[i]} />
                  </Suspense>
                </div>

                <div className="lg:col-span-3">
                  <span className="font-mono text-label text-accent">
                    Project 0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-display-card font-bold text-primary transition-all duration-400 hover:tracking-wider">
                    {project.name}
                  </h3>
                  <p className="mt-4 font-mono text-body text-muted leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted transition-all duration-300 hover:border-accent hover:text-primary hover:shadow-[0_0_12px_rgba(230,57,70,0.08)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs uppercase tracking-[0.25em] text-accent transition hover:text-primary"
                    >
                      View on GitHub →
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
