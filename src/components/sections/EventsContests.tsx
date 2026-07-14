import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../shared/SectionHeader';

const events = [
  {
    type: 'Hackathon',
    name: 'Nexus AI Hackathon',
    date: '2026',
    description: 'A 16-hour hackathon focused on shipping production-ready applications with real-time collaboration and cross-functional team building.',
    hasCert: false
  },
  {
    type: 'Coding Contest',
    name: 'ICPC AlgoQueen 2026',
    date: '2026',
    description: 'An algorithmic contest featuring problem-solving under time constraints, with a focus on data structures, algorithms and mathematical optimization.',
    hasCert: false
  },

  {
    type: 'Coding Contest',
    name: 'DSArena Coding Contest',
    date: '2025',
    description: 'Competitive programming contest featuring algorithmic challenges across data structures and algorithms with time-constrained problem-solving.',
    hasCert: true
  },
  {
    type: 'Coding Contest',
    name: 'Ode to Code',
    date: '2026',
    description: 'Time-bound coding competition that tested algorithmic thinking, problem-solving, and DSA proficiency.',
    hasCert: true
  },
  {
    type: 'Open Source',
    name: 'GirlScript Summer of Code',
    date: '2026',
    description: 'Contributed to real-world open-source projects, collaborating with mentors and contributors through code reviews and pull requests.',
    hasCert: true
  },
  {
    type: 'Open Source',
    name: 'Social Summer of Code',
    date: '2026',
    description: 'Actively contributed to community-driven open-source initiatives, following best practices in version control, documentation, and collaborative development.',
    hasCert: true
  },
  {
    type: 'Program',
    name: 'Intel AI for All',
    date: '2026',
    description: 'Completed Intel\'s AI for All program covering fundamentals of artificial intelligence, AI Aware and AI Appreciation.',
    hasCert: true
  },
  {
    type: 'Event',
    name: 'IEDC Techxcel 2.0',
    date: '2025',
    description: 'Startup ideation and pitching event focused on innovation, entrepreneurship, and business problem-solving.',
    hasCert: true
  },
  
  {
    type: 'Contest',
    name: 'IEDC OneTank Event - Pre Event',
    date: '2025',
    description: 'Pre-event competition for the flagship OneTank event, designed to help teams refine their startup pitches through mentor feedback.',
    hasCert: false
  },
  {
    type: 'Event',
    name: 'Dev Summit',
    date: '2026',
    description: 'Attended deep-dive technical sessions on transformer architectures and fine-tuning large language models.',
    hasCert: true
  }
];

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }
  })
};

const allEvents = [...events, ...events];
const setSize = events.length;

const EventsContests = () => {
  const [openCert, setOpenCert] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number>(0);
  const speedRef = useRef(0.5);

  /* Continuous smooth auto-scroll with seamless loop */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const tick = () => {
      if (!isHovered) {
        const card = el.querySelector('.event-card') as HTMLElement | null;
        const cardWidth = card?.offsetWidth || 320;
        const singleWidth = (cardWidth + 20) * setSize;

        let next = el.scrollLeft + speedRef.current;
        if (singleWidth > 0 && next >= singleWidth - 4) {
          next -= singleWidth;
        }
        el.scrollLeft = next;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovered]);

  return (
    <motion.section
      id="events"
      className="mx-auto max-w-container px-4 sm:px-6 py-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeader num="06" title="Events & Contests" />

      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-pitch to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-pitch to-transparent" />

        {/* Carousel track */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="flex gap-5 overflow-x-auto py-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {allEvents.map((event, i) => (
            <motion.div
              key={`${event.name}-${i}`}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="event-card flex-shrink-0 w-[80vw] sm:w-[70vw] md:w-[55vw] lg:w-[42vw] xl:w-[36vw] 2xl:w-[420px] snap-start"
            >
              <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04] hover:-translate-y-1">
                <span className="absolute right-5 top-4 font-mono text-[2rem] font-bold leading-none text-white/[0.07] select-none pointer-events-none">
                  {event.date}
                </span>

                <span className="font-mono text-label text-accent">{event.type}</span>

                <h3 className="mt-4 font-display text-display-card font-bold text-primary">
                  {event.name}
                </h3>
                <p className="mt-3 font-mono text-body text-muted leading-relaxed">
                  {event.description}
                </p>

                {event.hasCert && (
                  <div className="mt-5">
                    <button
                      onClick={() => setOpenCert(openCert === `${event.name}-${i}` ? null : `${event.name}-${i}`)}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent transition hover:text-primary"
                    >
                      <span className="h-px w-4 bg-accent/50" />
                      {openCert === `${event.name}-${i}` ? 'Hide' : 'Certificate'}
                    </button>

                    <AnimatePresence>
                      {openCert === `${event.name}-${i}` && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 flex items-center gap-4 rounded-xl border border-white/10 bg-pitch p-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
                              <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2l3 7h7l-5 5 2 7-7-4-7 4 2-7-5-5h7z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-mono text-xs font-medium text-primary">
                                Certificate of Achievement
                              </p>
                              <p className="mt-0.5 font-mono text-[0.6rem] text-muted">
                                {event.name} ({event.date})
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default EventsContests;
