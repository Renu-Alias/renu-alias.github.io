import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SectionHeader from '../shared/SectionHeader';
import Card from '../shared/Card';

interface Cert {
  id: string;
  title: string;
  issuer: string;
  issuerShort: string;
  date: string;
  category: 'ai-cloud' | 'foundational';
}

const certs: Cert[] = [
  { id: '1', title: 'Claude 101', issuer: 'Anthropic', issuerShort: 'Anthropic', date: 'Jan 2025', category: 'ai-cloud' },
  { id: '2', title: 'Claude Code 101', issuer: 'Anthropic', issuerShort: 'Anthropic', date: 'June 2026', category: 'ai-cloud' },
  { id: '3', title: 'Getting Started with AWS Cloud Essentials', issuer: 'Amazon Web Services', issuerShort: 'AWS', date: 'June 2026', category: 'ai-cloud' },
  { id: '4', title: 'Java (Basic)', issuer: 'HackerRank', issuerShort: 'HackerRank', date: 'June 2025', category: 'foundational' },
  { id: '5', title: 'SQL (Basic)', issuer: 'HackerRank', issuerShort: 'HackerRank', date: 'May 2024', category: 'foundational' },
  { id: '6', title: 'Programming in Java', issuer: 'NPTEL', issuerShort: 'NPTEL', date: 'Oct 2024', category: 'foundational' },
];

const certImages: Record<string, string> = {
  '1': '/certificates/1.png',
  '2': '/certificates/2.png',
  '3': '/certificates/3.png',
  '4': '/certificates/4.png',
  '5': '/certificates/5.png',
  '6': '/certificates/6.png',
};

const AnthropicLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none">
    <path d="M12 2L2 22h5l2.5-7h5L17 22h5L12 2z" fill="#E63946" />
  </svg>
);

const AWSLogo = () => (
  <svg viewBox="0 0 40 24" className="h-5 w-9 shrink-0" fill="none">
    <text x="0" y="17" fontFamily="Arial,sans-serif" fontWeight="900" fontSize="13" fill="#FF9900">aws</text>
  </svg>
);

const HackerRankLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none">
    <polygon points="12,2 21,6.5 21,17.5 12,22 3,17.5 3,6.5" stroke="#00EA64" strokeWidth="1.5" />
    <path d="M9.5 8v8M14.5 8v8M9.5 12h5" stroke="#00EA64" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const NPTELLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#1a6ba0" strokeWidth="1.2" />
    <path d="M7.5 7v10M7.5 7l9 10M16.5 7v10" stroke="#1a6ba0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IssuerLogo = ({ issuer }: { issuer: string }) => {
  switch (issuer) {
    case 'Anthropic': return <AnthropicLogo />;
    case 'Amazon Web Services': return <AWSLogo />;
    case 'HackerRank': return <HackerRankLogo />;
    case 'NPTEL': return <NPTELLogo />;
    default:
      return (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5">
          <span className="font-mono text-xs text-muted">{issuer[0]}</span>
        </div>
      );
  }
};

const isPdf = (path: string) => /\.pdf$/i.test(path);

const cardVariant = (i: number) => ({
  hidden: { opacity: 0, scale: 0.88, rotateX: 8 },
  visible: {
    opacity: 1, scale: 1, rotateX: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }
  }
});

const Certifications = () => {
  const [modalId, setModalId] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalId(null);
    };
    if (modalId) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalId]);

  const cert = certs.find(c => c.id === modalId);
  const imgSrc = modalId ? certImages[modalId] : '';

  return (
    <motion.section
      id="certifications"
      className="relative mx-auto max-w-container px-6 py-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <SectionHeader num="04" title="Certifications" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.id}
            variants={cardVariant(i)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="h-full"
          >
            <Card className="flex flex-col border-l-[3px] border-l-accent h-full w-full min-h-[180px]">
              {/* Issuer header */}
              <div className="flex items-center gap-3">
                <IssuerLogo issuer={cert.issuer} />
                <span className="font-mono text-sm text-muted">{cert.issuer}</span>
              </div>

              {/* Title */}
              <h3 className="mt-3 font-display text-display-card font-bold text-primary leading-snug">
                {cert.title}
              </h3>

              {/* Date */}
              <p className="mt-1 font-mono text-sm text-muted">
                Issued: {cert.date}
              </p>

              {/* Spacer */}
              <div className="flex-1" />

              {/* CTA */}
              <motion.button
                onClick={() => setModalId(cert.id)}
                className="group/cta mt-4 inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.25em] text-accent transition hover:text-primary"
              >
                View Certificate
                <motion.span
                  className="inline-block"
                  initial={false}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  →
                </motion.span>
              </motion.button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalId && cert && imgSrc && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setModalId(null)}
            />

            {/* Modal content */}
            <motion.div
              ref={modalRef}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/10 bg-pitch shadow-2xl"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close button */}
              <button
                onClick={() => setModalId(null)}
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-pitch/90 text-muted backdrop-blur-sm transition hover:border-accent/50 hover:text-accent"
                aria-label="Close"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>

              {/* Certificate display */}
              {isPdf(imgSrc) ? (
                <embed src={imgSrc} type="application/pdf" className="max-h-[85vh] w-full" style={{ minHeight: '60vh' }} />
              ) : (
                <img
                  src={imgSrc}
                  alt={cert.title}
                  className="max-h-[85vh] w-auto object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Certifications;
