import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import AnimatedText from '../components/AnimatedText';
import RoleCycler from '../components/RoleCycler';
import MotionTextBlock from '../components/MotionTextBlock';
import SectionHeading from '../components/SectionHeading';
import SectionWrapper from '../components/SectionWrapper';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import CertificationCard from '../components/CertificationCard';
import AchievementTimeline from '../components/AchievementTimeline';
import AIPlayground from '../components/AIPlayground';
import AnalyticsTicker from '../components/AnalyticsTicker';

const roles = [
  'Full Stack Developer',
  'System Design',
  'AI Learner (RAG, ML)'
];

const projects = [
  {
    name: 'Quantum CLI Marketplace',
    description:
      'Built a high-performance Node.js marketplace with PostgreSQL, GitOps deployment, and reusable API modules for secure developer tooling.',
    link: 'https://github.com/renualias/quantum-cli'
  },
  {
    name: 'Synapse Automation Engine',
    description:
      'Designed a React-driven enterprise automation dashboard with microservices-ready backend integration and adaptive UX flows.',
    link: 'https://github.com/renualias/synapse-automation'
  }
];

const certifications = [
  { id: '1', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
  { id: '2', title: 'Oracle Certified Java Programmer', issuer: 'Oracle' },
  { id: '3', title: 'Google Cloud Fundamentals: Core Infrastructure', issuer: 'Google Cloud' }
];

const skills = [
  { category: 'Languages', items: ['Python', 'C', 'C++', 'JavaScript', 'Java', 'Dart'] },
  { category: 'Frameworks & Backend', items: ['React', 'Flutter', 'Node.js', 'Express.js'] },
  { category: 'Databases', items: ['PostgreSQL', 'Oracle', 'MySQL', 'MongoDB'] },
  { category: 'Tools & Design', items: ['Linux', 'Git', 'GitHub', 'Canva', 'Figma'] },
  { category: 'Infrastructure', items: ['AWS', 'GCP', 'Vercel', 'Claude'] },
  { category: 'Soft Skills', items: ['Leadership', 'Collaboration', 'Adaptability', 'Problem-solving'] }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <AnalyticsTicker />
      <Navbar />

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(229,9,20,0.12),_transparent_30%),radial-gradient(circle_at_80%_80%,_rgba(255,255,255,0.03),transparent_30%)]" />

      <main className="relative mx-auto min-h-screen max-w-6xl px-6 pt-40 pb-24 text-white">
        <section id="hero" className="flex min-h-screen snap-start items-center">
          <div className="grid w-full gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <motion.div
              className="space-y-8 max-w-3xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="inline-flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.4em] text-white/50"
                variants={childVariants}
              >
                <span className="h-px w-16 bg-white/10" />
                SOFTWARE ENGINEER
                <span className="h-px w-16 bg-white/10" />
              </motion.div>

              <motion.div variants={childVariants}>
                <AnimatedText text="Renu Alias" />
              </motion.div>

              <motion.p
                className="max-w-2xl text-lg leading-8 font-body text-white/70 sm:text-xl"
                variants={childVariants}
              >
                A Kochi-based software engineer crafting scalable full-stack systems, high-performance architecture, and AI-first product experiences.
              </motion.p>

              <motion.div variants={childVariants}>
                <RoleCycler roles={roles} />
              </motion.div>

              <motion.div className="flex flex-wrap gap-4 pt-2" variants={childVariants}>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-white transition hover:border-crimson hover:text-crimson"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-7 py-3 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-white transition hover:border-crimson hover:text-crimson"
                >
                  Contact
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.45, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(229,9,20,0.3),transparent_50%)]" />
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
                  alt="Renu Alias"
                  className="h-full w-full object-cover"
                  style={{
                    maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 72%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 72%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                    WebkitMaskComposite: 'intersect',
                    maskComposite: 'intersect'
                  }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="mt-32 snap-start">
          <SectionWrapper index={0}>
            <SectionHeading title="About Me" subtitle="Engineering robust systems and AI architectures with precision, performance, and premium product polish." />
            <div className="space-y-6 max-w-4xl">
              <MotionTextBlock text="I combine full stack development discipline with production-grade system thinking and AI-first innovation. Every product I build is designed for resilience, speed, and intuitive digital narratives." />
              <MotionTextBlock text="From cloud-native services to generative AI workflows, I create engineering experiences that feel cinematic and deliver measurable impact." />
              <AIPlayground />
            </div>
          </SectionWrapper>
        </section>

        <section id="skills" className="mt-32 snap-start">
          <SectionWrapper index={1}>
            <SectionHeading title="Skills" subtitle="A premium suite of languages, frameworks, databases, and infrastructure tools." />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {skills.map((skill) => (
                <SkillCard key={skill.category} category={skill.category} items={skill.items} />
              ))}
            </div>
          </SectionWrapper>
        </section>

        <section id="projects" className="mt-32 snap-start">
          <SectionWrapper index={2}>
            <SectionHeading title="Projects" subtitle="Engineering stories with clean architecture, strong interfaces, and polished execution." />
            <div className="space-y-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} />
              ))}
            </div>
          </SectionWrapper>
        </section>

        <section id="certifications" className="mt-32 snap-start">
          <SectionWrapper index={3}>
            <SectionHeading title="Certifications" subtitle="Verified certifications that reinforce my cloud, software, and architecture expertise." />
            <div className="grid gap-4 md:grid-cols-2">
              {certifications.map((cert) => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
            </div>
          </SectionWrapper>
        </section>

        <section id="achievements" className="mt-32 snap-start">
          <SectionHeading title="Achievements" subtitle="A technical timeline of hackathons, learnings, and milestone results." />
          <AchievementTimeline />
        </section>

        <section id="contact" className="mt-32 snap-start pb-32">
          <SectionWrapper index={4} className="shadow-glow">
            <div className="mx-auto max-w-4xl text-center">
              <motion.h3
                className="font-display text-5xl font-black uppercase tracking-[0.32em] text-white sm:text-6xl"
                initial={{ opacity: 0, y: 24, letterSpacing: '0.5em' }}
                whileInView={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9 }}
              >
                LET&apos;S ARCHITECT THE FUTURE.
              </motion.h3>
              <p className="mt-6 text-lg text-white/70">
                Based in Kochi, India{' '}
                <span className="inline-flex items-center gap-2 text-crimson">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-crimson" />
                  </span>
                </span>
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <motion.div
                  className="group rounded-3xl border border-white/10 bg-[#0B0B0C] p-6 text-left transition duration-300 hover:border-crimson hover:shadow-[0_0_40px_rgba(229,9,20,0.35)]"
                  whileHover={{ y: -4 }}
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-white/40">Email</p>
                  <a href="mailto:renu.alias@example.com" className="mt-3 block text-lg font-semibold text-white transition group-hover:text-crimson">
                    renu.alias@example.com
                  </a>
                </motion.div>
                <motion.div
                  className="group rounded-3xl border border-white/10 bg-[#0B0B0C] p-6 text-left transition duration-300 hover:border-crimson hover:shadow-[0_0_40px_rgba(229,9,20,0.35)]"
                  whileHover={{ y: -4 }}
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-white/40">GitHub</p>
                  <a href="https://github.com/renualias" target="_blank" rel="noreferrer" className="mt-3 block text-lg font-semibold text-white transition group-hover:text-crimson">
                    /renualias
                  </a>
                </motion.div>
                <motion.div
                  className="group rounded-3xl border border-white/10 bg-[#0B0B0C] p-6 text-left transition duration-300 hover:border-crimson hover:shadow-[0_0_40px_rgba(229,9,20,0.35)]"
                  whileHover={{ y: -4 }}
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.32em] text-white/40">LinkedIn</p>
                  <a href="https://linkedin.com/in/renualias" target="_blank" rel="noreferrer" className="mt-3 block text-lg font-semibold text-white transition group-hover:text-crimson">
                    /in/renualias
                  </a>
                </motion.div>
              </div>
            </div>
          </SectionWrapper>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
