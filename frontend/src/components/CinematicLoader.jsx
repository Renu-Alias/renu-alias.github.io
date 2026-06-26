import { useEffect, useRef, useState } from 'react';

const BOOT_LINES = [
  '> booting src_explorer v1.0.4-stable...',
  '> mounting /portfolio...',
  '> loading live_feed...',
  '> auth: Open_to_Collaborate ✓',
];

export default function CinematicLoader({ onComplete }) {
  const [phase, setPhase] = useState('boot');
  const [visibleLines, setVisibleLines] = useState([]);
  const [percent, setPercent] = useState(0);
  const linesRef = useRef([]);
  const lineRefs = useRef([]);

  useEffect(() => {
    const bootLines = BOOT_LINES;
    let timeout;
    let interval;

    const startBoot = () => {
      linesRef.current = bootLines.map((_, i) => setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, i * 280));
    };

    startBoot();

    const allBootTime = bootLines.length * 280 + 400;
    timeout = setTimeout(() => {
      setPhase('progress');
    }, allBootTime);

    const startProgress = () => {
      interval = setInterval(() => {
        setPercent(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setPhase('reveal');
              setTimeout(() => {
                onComplete && onComplete();
              }, 900);
            }, 300);
            return 100;
          }
          return p + 1;
        });
      }, 20);
    };

    const progressTimeout = setTimeout(startProgress, allBootTime);

    return () => {
      linesRef.current.forEach(clearTimeout);
      clearTimeout(timeout);
      clearTimeout(progressTimeout);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className={`loader-overlay${phase === 'reveal' ? ' exit' : ''}`}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            ref={el => lineRefs.current[i] = el}
            className={`loader-text${visibleLines.includes(i) ? ' visible' : ''}`}
            style={{ transitionDelay: visibleLines.includes(i) ? `${i * 50}ms` : '0ms' }}
          >
            {line}
          </div>
        ))}

        {visibleLines.length === BOOT_LINES.length && (
          <div
            className={`loader-line${phase !== 'boot' ? ' visible' : ''}`}
            style={{ marginTop: '16px' }}
          >
            <div style={{ height: '1px', background: 'var(--terminal)', width: '100%' }} />
          </div>
        )}

        {(phase === 'progress' || phase === 'reveal') && (
          <div className={`loader-percent visible`} style={{ marginTop: '8px' }}>
            {String(percent).padStart(3, '0')}%
          </div>
        )}
      </div>
    </div>
  );
}
