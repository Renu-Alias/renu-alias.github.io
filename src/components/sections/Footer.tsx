import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

const contacts = [
  {
    label: 'EMAIL',
    value: 'renualiasmeleth@gmail.com',
    href: 'mailto:renualiasmeleth@gmail.com',
    action: 'copy' as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
    )
  },
  {
    label: 'GITHUB',
    value: '/Renu-Alias',
    href: 'https://github.com/Renu-Alias',
    action: 'link' as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    )
  },
  {
    label: 'LINKEDIN',
    value: 'renu-alias',
    href: 'https://www.linkedin.com/in/renu-alias-0022a2329/',
    action: 'link' as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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

  return (
    <motion.section
      id="contact"
      className="relative mx-auto w-full max-w-container px-4 sm:px-6 pt-section pb-12 sm:pb-16 md:pb-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] md:h-[500px] md:w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(230,57,70,0.12)_0%,transparent_60%)' }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute left-[15%] top-[65%] h-[180px] w-[180px] sm:h-[240px] sm:w-[240px] md:h-[300px] md:w-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(230,57,70,0.06)_0%,transparent_60%)' }}
        animate={{ x: [0, 15, -8, 0], y: [0, -10, 8, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-[20%] bottom-[10%] h-[120px] w-[120px] sm:h-[160px] sm:w-[160px] md:h-[200px] md:w-[200px] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(230,57,70,0.04)_0%,transparent_60%)' }}
        animate={{ x: [0, -12, 6, 0], y: [0, 8, -6, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="font-display font-bold text-primary" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', lineHeight: '1.05', letterSpacing: '-0.02em' }}>
          LET&apos;S ARCHITECT
          <br />
          THE FUTURE.
        </h2>

        <p className="mt-4 font-mono text-sm text-muted">
          Based in Kochi, India
        </p>

        {/* Contact links */}
        <div className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 justify-items-center">
            {contacts.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-3 cursor-pointer outline-none group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-pitch rounded-lg px-2 py-1"
                onClick={() => handleClick(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setFocused(item.label)}
                onBlur={() => setFocused(null)}
                tabIndex={0}
                role="button"
                aria-label={`${item.label} — ${item.value}`}
              >
                <span className="text-accent/60 group-hover:text-accent transition-colors duration-300 h-6 w-6">
                  {item.icon}
                </span>
                <p className="font-mono text-label text-accent tracking-wider">
                  {item.label}
                </p>
                <p className="font-mono text-xs text-muted/60 group-hover:text-muted transition-colors duration-300 text-center">
                  {item.action === 'copy' && copied ? 'Copied!' : item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 sm:mt-16 md:mt-24 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">
          &copy; Renu Alias
        </p>
      </div>
    </motion.section>
  );
};

export default Footer;
