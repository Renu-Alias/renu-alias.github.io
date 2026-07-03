import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Certification {
  id: string;
  title: string;
  issuer: string;
}

interface CertificationCardProps {
  cert: Certification;
}

const CertificationCard = ({ cert }: CertificationCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() => navigate(`/certificate/${cert.id}`)}
      className="group w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/60 p-7 text-left transition duration-300 hover:-translate-y-1.5 hover:border-crimson hover:bg-white/[0.07] hover:shadow-[0_0_40px_rgba(229,9,20,0.12)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-white/60">Certification</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{cert.title}</h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-white/70 transition group-hover:border-crimson group-hover:text-crimson group-hover:shadow-[0_0_20px_rgba(229,9,20,0.15)]">
          View
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-white/60">Issued by {cert.issuer}</p>
    </motion.button>
  );
};

export default CertificationCard;
