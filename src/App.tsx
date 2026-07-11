import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Spotlight from './components/Spotlight';
import HomePage from './pages/HomePage';
import ScrollProgress from './components/shared/ScrollProgress';
import AnimatedGrain from './components/shared/AnimatedGrain';
import { scrollState } from './components/threed/shared';

/* Lazy-load the heavy 3D canvas */
const PersistentScene = React.lazy(
  () => import('./components/threed/PersistentScene')
);

function App() {
  const [show3d, setShow3d] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    /* Preload Three.js vendor chunk immediately (don't wait for RAF) */
    import('./components/threed/PersistentScene');

    /* Defer 3D mount until after first paint */
    const id = requestAnimationFrame(() => setShow3d(true));

    /* Mobile detection */
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);

    /* Scroll tracking for 3D scene */
    const handleScroll = () => {
      const docHeight = document.body.scrollHeight - window.innerHeight;
      scrollState.progress = docHeight > 0 ? window.scrollY / docHeight : 0;
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', checkWidth);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AnimatedGrain />
      <ScrollProgress />
      <Cursor />
      <Spotlight />
      <Navbar />

      {/* 3D background — only on desktop, loaded after paint */}
      {show3d && !isMobile && (
        <React.Suspense fallback={null}>
          <PersistentScene />
        </React.Suspense>
      )}

      <HomePage />
    </>
  );
}

export default App;
