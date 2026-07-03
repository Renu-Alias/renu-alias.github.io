import { motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' }
];

const NavbarResponsive = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md"
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <button
          onClick={() => setOpen((value) => !value)}
          className="text-sm uppercase tracking-[0.35em] text-white/90 transition hover:text-white"
        >
          RENU ALIAS
        </button>

        <div className="hidden items-center gap-8 text-[0.68rem] uppercase tracking-[0.35em] text-white/60 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative transition hover:text-[#7C82FF]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-[#7C82FF] hover:text-[#7C82FF] md:hidden"
          aria-label="Toggle navigation"
        >
          <span className="text-xl">{open ? '×' : '≡'}</span>
        </button>
      </div>

      {open ? (
        <motion.div
          className="border-t border-white/10 bg-black/95 md:hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <div className="space-y-3 px-6 py-4 text-sm uppercase tracking-[0.32em] text-white/70">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-xl border border-white/5 px-4 py-3 transition hover:border-[#7C82FF] hover:text-[#7C82FF]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      ) : null}
    </motion.nav>
  );
};

export default NavbarResponsive;
