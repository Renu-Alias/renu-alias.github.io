import { AnimatePresence, motion } from 'framer-motion';
import { useState, useCallback } from 'react';

const contacts = [
  {
    label: 'EMAIL',
    value: 'renualiasmeleth@gmail.com',
    href: 'mailto:renualiasmeleth@gmail.com',
    action: 'copy' as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 4l10 8 10-8" />
      </svg>
    )
  },
  {
    label: 'GITHUB',
    value: '/Renu-Alias',
    href: 'https://github.com/Renu-Alias',
    action: 'link' as const,
    icon: (
      <svg viewBox="3.9 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    )
  },
  {
    label: 'LINKEDIN',
    value: 'renu-alias',
    href: 'https://www.linkedin.com/in/renu-alias-0022a2329/',
    action: 'link' as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M8 11v5" />
        <path d="M8 8h.01" />
        <path d="M12 16v-5" />
        <path d="M16 16v-3a2 2 0 0 0-4 0" />
      </svg>
    )
  }
];

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const Footer = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const active = hovered || focused;

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* fallback */
    }
  }, []);

  const handleClick = useCallback((item: typeof contacts[0]) => {
    if (item.action === 'copy') {
      handleCopy(item.value);
    } else {
      window.open(item.href, '_blank', 'noopener');
    }
  }, [handleCopy]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, item: typeof contacts[0]) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(item);
    }
  }, [handleClick]);
  const isActive = (label: string) => active === label;
  const isSeg0Active = isActive('EMAIL') || isActive('GITHUB');
  const isSeg1Active = isActive('GITHUB') || isActive('LINKEDIN');

  return (
    <motion.section
      id="contact"
      className="relative overflow-hidden mx-auto max-w-container px-6 py-section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(230,57,70,0.12)_0%,transparent_60%)' }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="font-display text-display-section font-bold text-primary">
          LET&apos;S ARCHITECT
          <br />
          THE FUTURE.
        </h2>

        <p className="mt-4 font-mono text-sm text-muted">
          Based in Kochi, India
        </p>

        {/* Nodes container */}
        <div className="relative mt-16 md:mt-20">
          {/* === Desktop layout === */}
          <div className="hidden md:block">
            {/* Circles row with connector SVG */}
            <div className="relative h-14">
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 14"
                preserveAspectRatio="none"
              >
                <line x1="6" y1="7" x2="47" y2="7" stroke="#E63946" strokeWidth="1" strokeDasharray="3 4" className="transition-opacity duration-300" style={{ opacity: isSeg0Active ? 0.5 : 0.25 }} />
                <line x1="53" y1="7" x2="94" y2="7" stroke="#E63946" strokeWidth="1" strokeDasharray="3 4" className="transition-opacity duration-300" style={{ opacity: isSeg1Active ? 0.5 : 0.25 }} />
              </svg>

              <div className="flex flex-row justify-between items-center h-full">
                {contacts.map((item) => (
                  <div
                    key={item.label}
                    className={`relative w-14${item.label !== 'LINKEDIN' ? ' -ml-0.5' : ''}`}
                    onMouseEnter={() => setHovered(item.label)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setFocused(item.label)}
                    onBlur={() => setFocused(null)}
                  >
                    <button
                      onClick={() => handleClick(item)}
                      onKeyDown={(e) => handleKeyDown(e, item)}
                      aria-label={`${item.label} — ${item.value}`}
                      tabIndex={0}
                      className="relative flex items-center justify-center w-14 h-14 rounded-full border outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-pitch"
                      style={{
                        borderColor: isActive(item.label) ? '#E63946' : 'rgba(230,57,70,0.5)',
                        borderWidth: '1.5px'
                      }}
                    >
                      <span
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          border: '1px solid rgba(230,57,70,0.3)',
                          animation: isActive(item.label) ? 'ping-slow 1.5s ease-out infinite' : 'none',
                        }}
                      />
                      <span
                        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500"
                        style={{
                          background: 'radial-gradient(circle, rgba(230,57,70,0.15) 0%, transparent 70%)',
                          opacity: isActive(item.label) ? 1 : 0,
                        }}
                      />
                      <span className="relative text-accent" style={{ color: isActive(item.label) ? '#E63946' : 'rgba(230,57,70,0.7)' }}>
                        {item.icon}
                      </span>
                    </button>
                    <AnimatePresence>
                      {(isActive(item.label) || (item.action === 'copy' && copied)) && (
                        <motion.span
                          key={copied && item.action === 'copy' ? 'copied' : item.value}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className={`font-mono text-[0.6rem] tracking-[0.2em] text-accent/80 absolute bottom-full mb-3 whitespace-nowrap left-1/2 -translate-x-1/2 pointer-events-none${item.value.includes('@') ? '' : ' uppercase'}`}
                        >
                          {item.action === 'copy' && copied ? 'Copied!' : item.value}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Labels row */}
            <div className="flex flex-row justify-between mt-4">
              {contacts.map((item) => (
                <div key={item.label} className={item.label !== 'LINKEDIN' ? '-ml-0.5' : ''}>
                  <span className="font-mono text-label text-muted tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* === Mobile layout === */}
          <div className="md:hidden relative">
            {/* Mobile connector SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 30 100"
              preserveAspectRatio="none"
              style={{ opacity: 0.25 }}
            >
              <line x1="15" y1="17" x2="15" y2="83" stroke="#E63946" strokeWidth="1" strokeDasharray="3 4" />
            </svg>

            <div className="flex flex-col items-center justify-center gap-14 relative">
              {contacts.map((item) => (
                <div
                  key={item.label}
                  className="relative flex flex-col items-center gap-4"
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setFocused(item.label)}
                  onBlur={() => setFocused(null)}
                >
                  <button
                    onClick={() => handleClick(item)}
                    onKeyDown={(e) => handleKeyDown(e, item)}
                    aria-label={`${item.label} — ${item.value}`}
                    tabIndex={0}
                    className="relative flex items-center justify-center w-14 h-14 rounded-full border outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-pitch"
                    style={{
                      borderColor: isActive(item.label) ? '#E63946' : 'rgba(230,57,70,0.5)',
                      borderWidth: '1.5px'
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        border: '1px solid rgba(230,57,70,0.3)',
                        animation: isActive(item.label) ? 'ping-slow 1.5s ease-out infinite' : 'none',
                      }}
                    />
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500"
                      style={{
                        background: 'radial-gradient(circle, rgba(230,57,70,0.15) 0%, transparent 70%)',
                        opacity: isActive(item.label) ? 1 : 0,
                      }}
                    />
                    <span className="relative text-accent" style={{ color: isActive(item.label) ? '#E63946' : 'rgba(230,57,70,0.7)' }}>
                      {item.icon}
                    </span>
                  </button>
                  <span className="font-mono text-label text-muted tracking-wider">
                    {item.label}
                  </span>
                  <AnimatePresence>
                    {(isActive(item.label) || (item.action === 'copy' && copied)) && (
                      <motion.span
                        key={copied && item.action === 'copy' ? 'copied' : item.value}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className={`font-mono text-[0.6rem] tracking-[0.2em] text-accent/80 absolute bottom-full mb-3 whitespace-nowrap left-1/2 -translate-x-1/2 pointer-events-none${item.value.includes('@') ? '' : ' uppercase'}`}
                      >
                        {item.action === 'copy' && copied ? 'Copied!' : item.value}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-24 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">
          &copy; Renu Alias
        </p>
      </div>
    </motion.section>
  );
};

export default Footer;
