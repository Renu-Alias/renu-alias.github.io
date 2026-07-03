import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const AIPlayground = () => {
  const [prompt, setPrompt] = useState('Show me your systems thinking');
  const [status, setStatus] = useState('Awaiting query');
  const [result, setResult] = useState('Type a prompt to simulate a RAG-powered response about my stack and engineering focus.');
  const [isRunning, setIsRunning] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!prompt.trim()) return;

    setIsRunning(true);
    setStatus('Searching vector database...');
    setResult('');

    window.setTimeout(() => {
      setStatus('Retrieving contexts...');
      window.setTimeout(() => {
        setResult(`Response: ${prompt.trim()} → I specialize in full-stack delivery, resilient system design, and AI workflows using RAG, ML, PostgreSQL, Node.js, React, and cloud-native deployment.`);
        setIsRunning(false);
      }, 900);
    }, 700);
  };

  return (
    <motion.div
      className="mt-10 rounded-[2rem] border border-white/10 bg-[#08080A]/90 p-6 shadow-[0_0_60px_rgba(229,9,20,0.08)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/40">AI Shell</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Live RAG Playground</h3>
        </div>
        <span className="rounded-full border border-[#E50914]/30 bg-[#E50914]/10 px-3 py-1 text-[0.62rem] font-mono uppercase tracking-[0.3em] text-[#E50914]">
          local simulation
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="flex-1 rounded-full border border-white/10 bg-black/70 px-4 py-3 font-mono text-sm text-white outline-none transition focus:border-[#E50914]"
          placeholder="Ask about my architecture stack"
        />
        <button
          type="submit"
          className="rounded-full border border-[#E50914]/40 bg-[#E50914]/10 px-5 py-3 text-[0.68rem] font-mono uppercase tracking-[0.3em] text-[#E50914] transition hover:bg-[#E50914]/20"
        >
          Run query
        </button>
      </form>

      <div className="mt-6 rounded-[1.3rem] border border-white/10 bg-black/80 p-5 font-mono text-sm text-white/70">
        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E50914] shadow-[0_0_10px_rgba(229,9,20,0.8)]" />
          <span>terminal</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={status + result}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-4 space-y-2"
          >
            <p className="text-white/50">&gt; {status}</p>
            {isRunning ? (
              <div className="flex items-center gap-2 text-[#E50914]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E50914]" />
                <span>Executing semantic retrieval...</span>
              </div>
            ) : (
              <p className="leading-7 text-white/80">{result}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AIPlayground;
