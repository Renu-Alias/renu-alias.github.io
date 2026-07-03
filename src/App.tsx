import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Cursor from './components/Cursor';
import HomePage from './pages/HomePage';
import CertificatePage from './pages/CertificatePage';
import InteractiveBackground from './components/InteractiveBackground';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-[#000000] text-white overflow-hidden">
      <InteractiveBackground />
      <Cursor />
      <ScrollProgress />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'300\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '300px 300px' }} />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/certificate/:id" element={<CertificatePage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
