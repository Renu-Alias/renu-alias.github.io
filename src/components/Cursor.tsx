import { useCallback, useEffect, useRef, useState } from 'react';

const LERP = 0.85;
const DOT_LERP = 0.98;
const MAGNET_STRENGTH = 0.35;
const MAX_PULL = 12;
const interactiveSelectors = ['a', 'button', 'input', 'textarea', 'select', '[role="button"]', '[data-cursor-text]'];

const MagneticCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const labelTextRef = useRef<HTMLSpanElement>(null);
  const labelStateRef = useRef<'hidden' | 'enter' | 'exit'>('hidden');
  const rafRef = useRef(0);

  const mouseX = useRef(-100);
  const mouseY = useRef(-100);
  const dotX = useRef(-100);
  const dotY = useRef(-100);
  const ringX = useRef(-100);
  const ringY = useRef(-100);

  const [showLabel, setShowLabel] = useState(false);
  const [labelText, setLabelText] = useState('');
  const labelTarget = useRef('');
  const hoverTarget = useRef<HTMLElement | null>(null);
  const magnetOffset = useRef({ x: 0, y: 0 });
  const isHover = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      const el = hoverTarget.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - e.clientX;
        const dy = cy - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.min(dist, MAX_PULL) * MAGNET_STRENGTH;
        const angle = Math.atan2(dy, dx);
        magnetOffset.current = {
          x: Math.cos(angle) * pull,
          y: Math.sin(angle) * pull,
        };

        // Magnetic element shift (subtle pull on the target element itself)
        const elPull = Math.min(dist, 6) * 0.3;
        el.style.setProperty('--mx', `${Math.cos(angle) * elPull}px`);
        el.style.setProperty('--my', `${Math.sin(angle) * elPull}px`);
        el.classList.add('magnet-active');
      } else {
        magnetOffset.current = { x: 0, y: 0 };
      }
    };

    const onMouseDown = () => {
      if (ringRef.current) ringRef.current.style.borderWidth = '2px';
    };
    const onMouseUp = () => {
      if (ringRef.current) ringRef.current.style.borderWidth = '';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const loop = () => {
      const mx = mouseX.current + magnetOffset.current.x;
      const my = mouseY.current + magnetOffset.current.y;

      dotX.current += (mx - dotX.current) * DOT_LERP;
      dotY.current += (my - dotY.current) * DOT_LERP;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX.current}px, ${dotY.current}px)`;
        dotRef.current.style.opacity = labelTarget.current ? '0' : '1';
      }

      ringX.current += (mx - ringX.current) * LERP;
      ringY.current += (my - ringY.current) * LERP;

      const activeText = labelTarget.current;
      const ringScale = activeText ? 0.88 : 1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX.current}px, ${ringY.current}px) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.borderColor = activeText ? '#E63946' : 'rgba(230,57,70,0.6)';
        ringRef.current.style.opacity = activeText ? '0.6' : '1';
      }

      // Label follows ring position
      if (labelRef.current && activeText) {
        labelRef.current.style.transform = `translate(${ringX.current}px, ${ringY.current}px) translate(-50%, -50%)`;
        if (labelTextRef.current) labelTextRef.current.textContent = activeText;
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest(interactiveSelectors.join(',')) as HTMLElement | null;
      if (el) {
        if (hoverTarget.current === el) return;
        if (hoverTarget.current && hoverTarget.current !== el) {
          hoverTarget.current.classList.remove('magnet-active');
        }
        const text = el.getAttribute('data-cursor-text') || 'GO';
        labelTarget.current = text;
        hoverTarget.current = el;
        isHover.current = true;
        setLabelText(text);
        setShowLabel(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest(interactiveSelectors.join(',')) as HTMLElement | null;
      if (el && hoverTarget.current === el) {
        const related = e.relatedTarget as HTMLElement | null;
        if (related && el.contains(related)) {
          return;
        }
        el.classList.remove('magnet-active');
        labelTarget.current = '';
        hoverTarget.current = null;
        isHover.current = false;
        setShowLabel(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (hoverTarget.current) {
        hoverTarget.current.classList.remove('magnet-active');
      }
    };
  }, []);

  return (
    <>
      <style>{`
        .magnetic-wrap {
          position: fixed; left: 0; top: 0;
          width: 0; height: 0;
          z-index: 9999; pointer-events: none;
        }
        .magnetic-dot {
          position: fixed; left: 0; top: 0;
          width: 6px; height: 6px;
          margin-left: -3px; margin-top: -3px;
          border-radius: 50%;
          background: #E63946;
          will-change: transform, opacity;
        }
        .magnetic-ring {
          position: fixed; left: 0; top: 0;
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(230,57,70,0.6);
          will-change: transform, opacity, border-color;
          transition: border-width 0.15s ease;
        }
        .magnetic-label {
          position: fixed; left: 0; top: 0;
          padding: 1px 10px;
          font-family: 'JetBrains Mono', 'Consolas', monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #E63946;
          border: 1px solid rgba(230,57,70,0.6);
          border-radius: 999px;
          background: rgba(5,5,5,0.75);
          backdrop-filter: blur(4px);
          white-space: nowrap;
          will-change: transform, opacity;
          pointer-events: none;
          user-select: none;
          line-height: 1.8;
        }
        .magnetic-label.in  { animation: label-in 0.15s ease-out forwards; }
        .magnetic-label.out { animation: label-out 0.12s ease-in forwards; }

        @keyframes label-in {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.82); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes label-out {
          0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.82); }
        }

        [data-cursor-text] {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        [data-cursor-text].magnet-active {
          transform: translate(var(--mx, 0), var(--my, 0));
        }

        @media (hover: none) and (pointer: coarse) {
          .magnetic-wrap { display: none; }
        }
      `}</style>

      <div className="magnetic-wrap">
        <div ref={dotRef} className="magnetic-dot" />
        <div ref={ringRef} className="magnetic-ring" style={{ transform: 'translate(-50%, -50%)' }} />
        <div
          ref={labelRef}
          className={`magnetic-label ${showLabel ? 'in' : 'out'}`}
          style={{ opacity: 0, transform: 'translate(-50%, -50%)' }}
        >
          <span ref={labelTextRef}>{labelText}</span>
        </div>
      </div>
    </>
  );
};

export default MagneticCursor;
