import { motion } from 'framer-motion';
import NavbarResponsive from '../components/NavbarResponsive';
import HeroUpdated from '../components/HeroUpdated';
import MotionTextBlock from '../components/MotionTextBlock';
import SectionHeading from '../components/SectionHeading';
import SectionWrapper from '../components/SectionWrapper';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import CertificationCard from '../components/CertificationCard';
import AchievementTimeline from '../components/AchievementTimeline';

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

const HomePage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <NavbarResponsive />

      <HeroUpdated />

      <main className="relative mx-auto max-w-6xl px-6 pb-24 text-white">
        <section id="about" className="relative mt-20 snap-start">
          <SectionWrapper>
            <SectionHeading index="01" title="About Me" />
            <div className="space-y-6 max-w-4xl">
              <MotionTextBlock text="A Kochi-based engineer combining full stack development discipline with production-grade system thinking and AI-first innovation. Every product I build is designed for resilience, speed, and intuitive digital narratives." />
              <MotionTextBlock text="From cloud-native services to generative AI workflows, I create engineering experiences that feel cinematic and deliver measurable impact." />
            </div>
          </SectionWrapper>
        </section>

        <section id="skills" className="mt-28 snap-start">
          <SectionWrapper>
            <SectionHeading index="02" title="Skills" />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {skills.map((skill) => (
                <SkillCard key={skill.category} category={skill.category} items={skill.items} />
              ))}
            </div>
          </SectionWrapper>
        </section>

        <section id="projects" className="mt-28 snap-start">
          <SectionWrapper>
            <SectionHeading index="03" title="Projects" />
            <div className="space-y-5">
              {projects.map((project, index) => (
                <ProjectCard key={project.name} project={project} index={index} />
              ))}
            </div>
          </SectionWrapper>
        </section>

        <section id="certifications" className="mt-28 snap-start">
          <SectionWrapper>
            <SectionHeading index="04" title="Certifications" />
            <div className="grid gap-4 md:grid-cols-2">
              {certifications.map((cert) => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
            </div>
          </SectionWrapper>
        </section>

        <section id="achievements" className="mt-28 snap-start">
          <SectionHeading index="05" title="Achievements" />
          <AchievementTimeline />
        </section>

        <section id="contact" className="mt-28 snap-start pb-32">
          <SectionWrapper>
            <div className="mx-auto max-w-4xl text-center">
              <motion.h3
                className="font-heading text-5xl font-bold uppercase tracking-[0.24em] text-white sm:text-6xl"
                initial={{ opacity: 0, y: 24, letterSpacing: '0.5em' }}
                whileInView={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9 }}
              >
                LET&apos;S ARCHITECT THE FUTURE.
              </motion.h3>
              <p className="mt-6 font-mono text-sm uppercase tracking-[0.3em] text-white/70">
                Based in Kochi, India{' '}
                <span className="inline-flex items-center gap-2 text-crimson">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-crimson" />
                  </span>
                </span>
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <motion.div
                  className="group rounded-2xl border border-white/[0.04] bg-[#09090B] p-6 text-left backdrop-blur-md transition duration-300 hover:border-crimson hover:shadow-[0_0_40px_rgba(229,9,20,0.35)]"
                  whileHover={{ y: -4 }}
                >
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-white/40">Email</p>
                  <a href="mailto:renu.alias@example.com" className="mt-3 block font-mono text-sm uppercase tracking-[0.22em] text-white transition group-hover:text-crimson">
                    renu.alias@example.com
                  </a>
                </motion.div>
                <motion.div
                  className="group rounded-2xl border border-white/[0.04] bg-[#09090B] p-6 text-left backdrop-blur-md transition duration-300 hover:border-crimson hover:shadow-[0_0_40px_rgba(229,9,20,0.35)]"
                  whileHover={{ y: -4 }}
                >
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-white/40">GitHub</p>
                  <a href="https://github.com/renualias" target="_blank" rel="noreferrer" className="mt-3 block font-mono text-sm uppercase tracking-[0.22em] text-white transition group-hover:text-crimson">
                    /renualias
                  </a>
                </motion.div>
                <motion.div
                  className="group rounded-2xl border border-white/[0.04] bg-[#09090B] p-6 text-left backdrop-blur-md transition duration-300 hover:border-crimson hover:shadow-[0_0_40px_rgba(229,9,20,0.35)]"
                  whileHover={{ y: -4 }}
                >
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.35em] text-white/40">LinkedIn</p>
                  <a href="https://linkedin.com/in/renualias" target="_blank" rel="noreferrer" className="mt-3 block font-mono text-sm uppercase tracking-[0.22em] text-white transition group-hover:text-crimson">
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
