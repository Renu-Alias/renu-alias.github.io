import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-pitch/80 shadow-[0_0_40px_rgba(0,0,0,0.5)]'
          : 'border-transparent bg-transparent'
      }`}
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-mono text-[0.6rem] sm:text-xs uppercase tracking-[0.25em] text-primary/90 transition hover:text-primary"
      >
        Renu Alias
      </button>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group relative font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted transition hover:text-primary"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* Hamburger button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden relative z-50 flex flex-col items-center justify-center w-11 h-11 gap-[5px]"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <motion.span
          className="block h-px w-5 bg-primary/80"
          animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-px w-5 bg-primary/80"
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-px w-5 bg-primary/80"
          animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-pitch/95 backdrop-blur-xl lg:hidden"
            onClick={closeMenu}
          >
            <nav className="flex h-full flex-col items-center justify-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="font-mono text-base sm:text-lg uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary/80 transition hover:text-primary"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
