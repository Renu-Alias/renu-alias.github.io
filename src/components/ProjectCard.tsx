import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Project {
  name: string;
  description: string;
  link: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.article
      className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0B0B0C]/90 p-8 shadow-soft transition duration-500 hover:-translate-y-1.5 hover:border-[#E50914] hover:bg-[#121214] hover:shadow-[0_0_50px_rgba(229,9,20,0.12)]"
      initial={{ opacity: 0, y: 50, clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span className="text-sm uppercase tracking-[0.4em] text-white/40">0{index + 1}</span>
      <div className="mt-4 overflow-hidden">
        <motion.h3
          className="font-display text-3xl font-semibold tracking-tight text-white transition"
          whileHover={{ letterSpacing: '0.18em', scale: 1.01, color: '#ffffff' }}
        >
          {project.name}
        </motion.h3>
      </div>
      <p className="mt-5 text-sm leading-7 text-white/70">{project.description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.34em] text-[#E50914] transition hover:text-white"
        >
          GitHub
          <span className="text-[0.65rem] text-white/50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full border border-white/10 px-4 py-2 text-[0.65rem] font-mono uppercase tracking-[0.3em] text-white/70 transition hover:border-[#E50914] hover:text-[#E50914]"
        >
          {open ? 'Close' : 'View Architecture'}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-black/70 p-4">
              <svg viewBox="0 0 320 140" className="h-36 w-full">
                <rect x="20" y="30" width="70" height="34" rx="8" fill="none" stroke="#E50914" strokeWidth="1.2" />
                <rect x="125" y="30" width="70" height="34" rx="8" fill="none" stroke="#E50914" strokeWidth="1.2" />
                <rect x="230" y="30" width="70" height="34" rx="8" fill="none" stroke="#E50914" strokeWidth="1.2" />
                <rect x="125" y="90" width="70" height="34" rx="8" fill="none" stroke="#E50914" strokeWidth="1.2" />
                <path d="M90 47h35M195 47h35M160 64v26" stroke="#E50914" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="160" cy="47" r="5" fill="#E50914" />
                <path d="M125 107h-34v-35" stroke="#E50914" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <p className="mt-3 text-[0.7rem] font-mono uppercase tracking-[0.32em] text-white/45">
                Load balancer • API gateway • Replicated database • RAG pipeline
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
};

export default ProjectCard;
