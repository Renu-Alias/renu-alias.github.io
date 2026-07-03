import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/5 px-8 py-4 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'bg-black/60 shadow-[0_0_60px_rgba(0,0,0,0.5)]' : 'bg-black/40'
      }`}
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-base font-bold uppercase tracking-[0.3em] text-white/90 transition hover:text-white"
        >
          Renu Alias
        </button>
        <span className="hidden h-3 w-px bg-white/10 sm:block" />
        <span className="hidden text-[0.6rem] uppercase tracking-[0.4em] text-white/40 sm:block">
          Full-Stack / Systems / AI
        </span>
      </div>

      <div className="flex items-center gap-8 text-xs uppercase tracking-[0.35em] text-white/50">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group relative overflow-hidden transition hover:text-white"
          >
            {item.label}
            <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#E50914] transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
