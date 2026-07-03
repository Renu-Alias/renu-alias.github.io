import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import SectionHeader from '../shared/SectionHeader';
import Card from '../shared/Card';
import ProjectScene from '../threed/ProjectScene';

const projectData = [
  {
    name: 'Quantum CLI Marketplace',
    description:
      'Built a high-performance Node.js marketplace with PostgreSQL, GitOps deployment, and reusable API modules for secure developer tooling.',
    link: 'https://github.com/renualias/quantum-cli',
    tags: ['Node.js', 'PostgreSQL', 'GitOps', 'REST']
  },
  {
    name: 'Synapse Automation Engine',
    description:
      'Designed a React-driven enterprise automation dashboard with microservices-ready backend integration and adaptive UX flows.',
    link: 'https://github.com/renualias/synapse-automation',
    tags: ['React', 'Node.js', 'Microservices', 'Tailwind']
  },
  {
    name: 'Pulse Analytics Dashboard',
    description:
      'Built a real-time analytics dashboard with streaming data pipelines, interactive charts, and role-based access control for product teams.',
    link: 'https://github.com/renualias/pulse-analytics',
    tags: ['React', 'WebSockets', 'D3.js', 'RBAC']
  },
  {
    name: 'Echo RAG Pipeline',
    description:
      'Developed a retrieval-augmented generation pipeline for enterprise document search, combining vector embeddings with re-ranking for high-precision answers.',
    link: 'https://github.com/renualias/echo-rag',
    tags: ['Python', 'LangChain', 'Pinecone', 'FastAPI']
  },
  {
    name: 'ZeroDeploy CLI',
    description:
      'Created a serverless deployment CLI with multi-cloud support, infrastructure-as-code generation, and one-command rollback for rapid prototyping.',
    link: 'https://github.com/renualias/zerodeploy-cli',
    tags: ['TypeScript', 'AWS CDK', 'Docker', 'CLI']
  }
];

const Projects = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-container px-6 py-section">
      <SectionHeader num="03" title="Projects" />

      <div className="space-y-6">
        {projectData.map((project, i) => (
          <Card key={project.name} delay={i * 0.1}>
            <div className="grid gap-6 lg:grid-cols-5">
              {/* 3D visual header */}
              <div className="relative h-40 overflow-hidden rounded-xl border border-white/10 bg-pitch lg:col-span-2 lg:h-auto">
                <ProjectScene index={i} />
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <span className="font-mono text-label text-accent">
                  Project 0{i + 1}
                </span>
                <motion.h3
                  className="mt-2 font-display text-display-card font-bold text-primary transition-all duration-400 hover:tracking-wider"
                >
                  {project.name}
                </motion.h3>
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
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="rounded-full border border-accent px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-accent transition hover:bg-accent hover:text-white"
                  >
                    {openIndex === i ? 'Close' : 'Architecture'}
                  </button>
                </div>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                      className="mt-5 overflow-hidden"
                    >
                      <div className="rounded-xl border border-white/10 bg-pitch p-4">
                        <svg viewBox="0 0 320 120" className="h-28 w-full">
                          <rect x="20" y="24" width="70" height="30" rx="6" fill="none" stroke="#E63946" strokeWidth="1.2" />
                          <rect x="125" y="24" width="70" height="30" rx="6" fill="none" stroke="#E63946" strokeWidth="1.2" />
                          <rect x="230" y="24" width="70" height="30" rx="6" fill="none" stroke="#E63946" strokeWidth="1.2" />
                          <rect x="125" y="76" width="70" height="30" rx="6" fill="none" stroke="#E63946" strokeWidth="1.2" />
                          <path d="M90 39h35M195 39h35M160 54v22" stroke="#E63946" strokeWidth="1.2" strokeLinecap="round" />
                          <circle cx="160" cy="39" r="4" fill="#E63946" />
                          <path d="M125 91h-34V56" stroke="#E63946" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted">
                          Load Balancer / API Gateway / Replicated DB / RAG Pipeline
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
