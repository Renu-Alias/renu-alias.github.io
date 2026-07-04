import { useEffect, useRef } from 'react';

const EngineeringBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cvs: HTMLCanvasElement = canvas;
    const c: CanvasRenderingContext2D = ctx;
    let w = 0, h = 0, dpr = 1;
    let animId = 0;
    let running = true;
    let frameCount = 0;
    const isMobile = window.innerWidth < 768;
    const frameSkip = isMobile ? 3 : 1;
    let scanY = 0;
    let scanDir = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      cvs.style.width = w + 'px';
      cvs.style.height = h + 'px';
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      scanY = h * 0.3;
    }
    resize();

    function frame(now: number) {
      if (!running) return;
      frameCount++;
      if (frameCount % frameSkip !== 0) {
        animId = requestAnimationFrame(frame);
        return;
      }

      /* animate scan line */
      scanY += scanDir * (isMobile ? 0.3 : 0.5);
      if (scanY > h * 0.85) { scanY = h * 0.85; scanDir = -1; }
      if (scanY < h * 0.15) { scanY = h * 0.15; scanDir = 1; }

      c.fillStyle = '#050505';
      c.fillRect(0, 0, w, h);

      const fineStep = isMobile ? 60 : 30;
      const majorStep = fineStep * 5;
      const cx = w / 2, cy = h / 2;

      /* fine grid */
      c.strokeStyle = 'rgba(255,255,255,0.03)';
      c.lineWidth = 0.5;
      for (let x = 0; x < w; x += fineStep) {
        c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke();
      }
      for (let y = 0; y < h; y += fineStep) {
        c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke();
      }

      /* major grid */
      c.strokeStyle = 'rgba(230,57,70,0.06)';
      c.lineWidth = 0.5;
      for (let x = 0; x < w; x += majorStep) {
        c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke();
      }
      for (let y = 0; y < h; y += majorStep) {
        c.beginPath(); c.moveTo(0, y); c.lineTo(w, y); c.stroke();
      }

      /* corner brackets */
      c.strokeStyle = 'rgba(255,255,255,0.05)';
      c.lineWidth = 0.5;
      const bs = 30;
      const bm = 20;
      /* top-left */
      c.beginPath(); c.moveTo(bm, bm + bs); c.lineTo(bm, bm); c.lineTo(bm + bs, bm); c.stroke();
      /* top-right */
      c.beginPath(); c.moveTo(w - bm - bs, bm); c.lineTo(w - bm, bm); c.lineTo(w - bm, bm + bs); c.stroke();
      /* bottom-left */
      c.beginPath(); c.moveTo(bm, h - bm - bs); c.lineTo(bm, h - bm); c.lineTo(bm + bs, h - bm); c.stroke();
      /* bottom-right */
      c.beginPath(); c.moveTo(w - bm - bs, h - bm); c.lineTo(w - bm, h - bm); c.lineTo(w - bm, h - bm - bs); c.stroke();

      /* center crosshair */
      c.strokeStyle = 'rgba(230,57,70,0.08)';
      c.lineWidth = 0.5;
      const ch = 40;
      c.beginPath(); c.moveTo(cx - ch, cy); c.lineTo(cx + ch, cy); c.stroke();
      c.beginPath(); c.moveTo(cx, cy - ch); c.lineTo(cx, cy + ch); c.stroke();

      /* construction circle */
      c.strokeStyle = 'rgba(255,255,255,0.04)';
      c.lineWidth = 0.5;
      const dashLen = 6;
      c.setLineDash([dashLen, dashLen]);
      c.beginPath(); c.arc(cx, cy, Math.min(w, h) * 0.18, 0, Math.PI * 2); c.stroke();
      c.beginPath(); c.arc(cx, cy, Math.min(w, h) * 0.1, 0, Math.PI * 2); c.stroke();
      c.setLineDash([]);

      /* axis labels */
      c.fillStyle = 'rgba(255,255,255,0.04)';
      c.font = `${isMobile ? 8 : 10}px "JetBrains Mono", monospace`;
      c.textAlign = 'center';
      for (let x = majorStep; x < w; x += majorStep) {
        c.fillText(String(Math.round(x)), x, 14);
        c.fillText(String(Math.round(x)), x, h - 6);
      }
      c.textAlign = 'right';
      for (let y = majorStep; y < h; y += majorStep) {
        c.fillText(String(Math.round(y)), 46, y + 4);
      }

      /* scan line */
      const scanGlow = 0.08 + Math.sin(now * 0.002) * 0.04;
      c.strokeStyle = `rgba(230,57,70,${scanGlow})`;
      c.lineWidth = 1;
      c.beginPath(); c.moveTo(0, scanY); c.lineTo(w, scanY); c.stroke();

      /* scan line glow */
      const grad = c.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      grad.addColorStop(0, 'rgba(230,57,70,0)');
      grad.addColorStop(0.5, `rgba(230,57,70,${0.03 + Math.sin(now * 0.003) * 0.015})`);
      grad.addColorStop(1, 'rgba(230,57,70,0)');
      c.fillStyle = grad;
      c.fillRect(0, scanY - 30, w, 60);

      /* scan line cross marker */
      c.strokeStyle = `rgba(230,57,70,${0.06 + Math.sin(now * 0.004) * 0.03})`;
      c.lineWidth = 1;
      const sm = 12;
      c.beginPath(); c.moveTo(cx - sm, scanY); c.lineTo(cx + sm, scanY); c.stroke();
      c.beginPath(); c.moveTo(cx, scanY - sm); c.lineTo(cx, scanY + sm); c.stroke();

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    const onResize = () => resize();
    const onVis = () => {
      running = !document.hidden;
      if (running) animId = requestAnimationFrame(frame);
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none select-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default EngineeringBg;
