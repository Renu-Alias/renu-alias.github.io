import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

const certificateMap: Record<string, { title: string; image: string }> = {
  '1': { title: 'AWS Certified Cloud Practitioner', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80' },
  '2': { title: 'Oracle Certified Java Programmer', image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=80' },
  '3': { title: 'Google Cloud Fundamentals: Core Infrastructure', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80' }
};

const CertificatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const cert = certificateMap[id ?? '1'];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black px-6 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(229,9,20,0.2),transparent_35%)]" />
        <motion.button
          onClick={() => navigate('/')}
          className="fixed top-8 left-8 z-10 rounded-full border border-crimson/60 bg-black/60 px-6 py-3 text-sm uppercase tracking-[0.32em] text-crimson shadow-[0_0_30px_rgba(229,9,20,0.25)] backdrop-blur-md transition hover:border-crimson hover:bg-crimson/10 hover:shadow-[0_0_50px_rgba(229,9,20,0.5)]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur-xl">
          <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/80 shadow-glow">
            <motion.img
              src={cert.image}
              alt={cert.title}
              className="h-[70vh] w-full object-cover"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            />
          </div>
          <motion.p
            className="text-center text-xl font-semibold uppercase tracking-[0.3em] text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {cert.title}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CertificatePage;
