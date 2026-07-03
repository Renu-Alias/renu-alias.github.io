import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

const AnalyticsTicker = () => {
  const [time, setTime] = useState('');
  const [depth, setDepth] = useState(0);
  const [latency, setLatency] = useState('18ms');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' }));
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setDepth(Math.min(100, Math.round((scrollTop / maxScroll) * 100)));
      setLatency(`${18 + Math.round(Math.random() * 8)}ms`);
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const locationLabel = useMemo(() => 'Kochi, India | IST', []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-x-0 top-0 z-[60] border-b border-white/10 bg-black/70 px-4 py-2 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 overflow-hidden text-[0.63rem] font-mono uppercase tracking-[0.35em] text-white/60">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#E50914] shadow-[0_0_10px_rgba(229,9,20,0.8)]" />
          <span>SYS CORE</span>
        </div>
        <div className="hidden items-center gap-4 sm:flex">
          <span>LATENCY {latency}</span>
          <span>DEPTH {depth}%</span>
          <span>{locationLabel}</span>
          <span>{time}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsTicker;
