import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import SectionHeader from '../shared/SectionHeader';
import Card from '../shared/Card';
import SectionDecoration from '../shared/SectionDecoration';

const certs = [
  { id: '1', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
  { id: '2', title: 'Oracle Certified Java Programmer', issuer: 'Oracle' },
  { id: '3', title: 'Google Cloud Fundamentals', issuer: 'Google Cloud' },
  { id: '4', title: 'Microsoft Azure AI Fundamentals', issuer: 'Microsoft' },
  { id: '5', title: 'MongoDB Associate Developer', issuer: 'MongoDB Inc.' },
  { id: '6', title: 'Certified Kubernetes Administrator', issuer: 'CNCF' },
  { id: '7', title: 'HashiCorp Terraform Associate', issuer: 'HashiCorp' }
];

const certImages: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  '2': 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
  '3': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
  '4': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  '5': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  '6': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  '7': 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80'
};

const Certifications = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="certifications" className="relative mx-auto max-w-container px-6 py-section">
      <SectionDecoration className="bottom-24 left-4" />
      <SectionHeader num="04" title="Certifications" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((cert) => (
          <Card key={cert.id} delay={0.05}>
            <button
              onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
              className="w-full text-left"
            >
              <p className="font-mono text-label text-accent">Certification</p>
              <h3 className="mt-3 font-display text-display-card font-bold text-primary">
                {cert.title}
              </h3>
              <p className="mt-2 font-mono text-sm text-muted">
                Issued by {cert.issuer}
              </p>
              <span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.25em] text-accent">
                {expandedId === cert.id ? 'Close' : 'View Certificate'}
              </span>
            </button>

            <AnimatePresence>
              {expandedId === cert.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                    <img
                      src={certImages[cert.id]}
                      alt={cert.title}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
