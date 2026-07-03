import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointer = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const prevPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 80;

    const resize = () => {
      width = canvas.clientWidth * window.devicePixelRatio;
      height = canvas.clientHeight * window.devicePixelRatio;
      canvas.width = width;
      canvas.height = height;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const initParticles = () => {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          alpha: 0,
          baseAlpha: Math.random() * 0.35 + 0.08
        });
      }
    };

    const draw = () => {
      if (!ctx) return;
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const px = pointer.current.x;
      const py = pointer.current.y;
      const dx = px - prevPointer.current.x;
      const dy = py - prevPointer.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      prevPointer.current = { x: px, y: py };

      const vortexStrength = Math.min(speed * 0.15, 3);

      for (const p of particles) {
        const distX = p.x - px;
        const distY = p.y - py;
        const dist = Math.sqrt(distX * distX + distY * distY);
        const maxDist = 180;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 0.06;
          const angle = Math.atan2(distY, distX);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;

          const perpX = -distY / dist;
          const perpY = distX / dist;
          p.vx += perpX * vortexStrength * (1 - dist / maxDist) * 0.012;
          p.vy += perpY * vortexStrength * (1 - dist / maxDist) * 0.012;

          p.alpha = p.baseAlpha + (1 - dist / maxDist) * 0.4;
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.03;
        }

        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(p.alpha, 0.5))})`;
        ctx.fill();
      }

      const grid = 72;
      const gridOffsetX = ((px / w) - 0.5) * 18;
      const gridOffsetY = ((py / h) - 0.5) * 18;

      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= w; x += grid) {
        ctx.beginPath();
        const waveAmp = 6 + speed * 0.04;
        ctx.moveTo(x + Math.sin((x + px) * 0.008) * waveAmp + gridOffsetX, 0);
        ctx.lineTo(x + Math.sin((x + px) * 0.008) * waveAmp + gridOffsetX, h);
        ctx.stroke();
      }

      for (let y = 0; y <= h; y += grid) {
        ctx.beginPath();
        const waveAmp2 = 6 + speed * 0.04;
        ctx.moveTo(0, y + Math.cos((y + py) * 0.008) * waveAmp2 + gridOffsetY);
        ctx.lineTo(w, y + Math.cos((y + py) * 0.008) * waveAmp2 + gridOffsetY);
        ctx.stroke();
      }

      const glow1 = ctx.createRadialGradient(px - 30, py - 30, 0, px, py, 280);
      glow1.addColorStop(0, `rgba(229, 9, 20, ${0.08 + speed * 0.003})`);
      glow1.addColorStop(0.5, `rgba(229, 9, 20, ${0.04 + speed * 0.001})`);
      glow1.addColorStop(1, 'rgba(229, 9, 20, 0)');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, w, h);

      const glow2 = ctx.createRadialGradient(px, py, 0, px, py, 120);
      glow2.addColorStop(0, `rgba(255,255,255,${0.02 + speed * 0.002})`);
      glow2.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, w, h);

      rafId = requestAnimationFrame(draw);
    };

    const handleMove = (event: MouseEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY, vx: 0, vy: 0 };
    };

    resize();
    initParticles();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMove);
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-90" />;
};

export default InteractiveBackground;
