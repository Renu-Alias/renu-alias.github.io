import { useEffect, useRef } from 'react';

const RED = '#ff3b4d';
const DARK = '#2b2b2b';
const BG = '#050506';

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

interface Star {
  x: number; y: number;
  size: number;
  baseAlpha: number;
  color: string;
  vx: number; vy: number;
  phase: number;
  weight: number;
}

interface Square {
  x: number; y: number;
  size: number;
  phase: number;
  speed: number;
}

interface Ring {
  cx: number; cy: number;
  radius: number;
  angle: number;
  speed: number;
  dotCount: number;
  alpha: number;
  color: string;
}

interface Nebula {
  x: number; y: number;
  radius: number;
  alpha: number;
  vx: number; vy: number;
}

interface Ember {
  x: number; y: number;
  size: number;
  phase: number;
  speed: number;
  vx: number;
}

const CyberBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cvs = canvas;
    const c = ctx;
    let w = 0, h = 0, dpr = 1;
    let animId = 0;
    let running = true;
    let time = 0;
    let mouseX = 0, mouseY = 0;
    let frameCount = 0;

    const isMobile = window.innerWidth < 768;
    const frameSkip = isMobile ? 2 : 0;

    let vignette: CanvasGradient | null = null;

    let stars: Star[] = [];
    let squares: Square[] = [];
    let rings: Ring[] = [];
    let nebulas: Nebula[] = [];
    let embers: Ember[] = [];

    const clusterCenters = [
      { cx: 0, cy: 0 },
      { cx: 0, cy: 0 },
      { cx: 0, cy: 0 },
      { cx: 0, cy: 0 },
    ];

    function init() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      cvs.style.width = w + 'px';
      cvs.style.height = h + 'px';
      c.setTransform(dpr, 0, 0, dpr, 0, 0);

      clusterCenters[0] = { cx: w * 0.15, cy: h * 0.65 };
      clusterCenters[1] = { cx: w * 0.08, cy: h * 0.8 };
      clusterCenters[2] = { cx: w * 0.25, cy: h * 0.5 };
      clusterCenters[3] = { cx: w * 0.05, cy: h * 0.4 };

      const density = isMobile ? 2000 : 1400;
      const starCount = Math.floor((w * h) / density);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const isRed = Math.random() < 0.1;
        const leftBias = Math.pow(Math.random(), 2);
        stars.push({
          x: isRed ? Math.random() * w * 0.55 : leftBias * w * 0.75,
          y: Math.random() * h,
          size: rand(1, 3),
          baseAlpha: isRed ? rand(0.12, 0.4) : rand(0.06, 0.2),
          color: isRed ? RED : DARK,
          vx: rand(-0.015, 0.015),
          vy: rand(-0.01, 0.01),
          phase: rand(0, Math.PI * 2),
          weight: rand(0.3, 1),
        });
      }

      const sqDensity = isMobile ? 35000 : 20000;
      const sqCount = Math.floor((w * h) / sqDensity);
      squares = [];
      for (let i = 0; i < sqCount; i++) {
        const cl = clusterCenters[Math.floor(Math.random() * clusterCenters.length)];
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * w * 0.12;
        squares.push({
          x: cl.cx + Math.cos(angle) * dist,
          y: cl.cy + Math.sin(angle) * dist,
          size: rand(3, 6),
          phase: rand(0, Math.PI * 2),
          speed: rand(0.002, 0.006),
        });
      }

      rings = [];
      const ringData = [
        { cx: w * 0.15, cy: h * 0.35, rMin: 300, rMax: 500 },
        { cx: w * 0.3, cy: h * 0.6, rMin: 400, rMax: 700 },
        { cx: w * -0.1, cy: h * 0.5, rMin: 600, rMax: 900 },
        { cx: w * 0.4, cy: h * 0.2, rMin: 350, rMax: 550 },
      ];
      for (const rd of ringData) {
        const r = rand(rd.rMin, rd.rMax);
        rings.push({
          cx: rd.cx,
          cy: rd.cy,
          radius: r,
          angle: rand(0, Math.PI * 2),
          speed: rand(0.00008, 0.00025) * (Math.random() < 0.5 ? 1 : -1),
          dotCount: Math.floor(r * (isMobile ? 0.12 : 0.2)),
          alpha: rand(0.015, 0.05),
          color: Math.random() < 0.2 ? RED : DARK,
        });
      }

      nebulas = [
        { x: w * 0.1, y: h * 0.3, radius: rand(250, 400), alpha: rand(0.025, 0.06), vx: rand(-0.015, 0.015), vy: rand(-0.01, 0.01) },
        { x: w * 0.05, y: h * 0.6, radius: rand(300, 500), alpha: rand(0.015, 0.04), vx: rand(0.01, 0.025), vy: rand(-0.012, 0.005) },
        { x: w * 0.2, y: h * 0.8, radius: rand(200, 350), alpha: rand(0.015, 0.035), vx: rand(-0.01, 0.01), vy: rand(-0.015, 0) },
      ];

      const emDensity = isMobile ? 70000 : 40000;
      const emberCount = Math.floor((w * h) / emDensity);
      embers = [];
      for (let i = 0; i < emberCount; i++) {
        embers.push({
          x: rand(0, w * 0.35),
          y: rand(0, h),
          size: rand(8, 24),
          phase: rand(0, Math.PI * 2),
          speed: rand(0.0015, 0.005),
          vx: rand(-0.004, 0.004),
        });
      }

      vignette = c.createRadialGradient(w * 0.5, h * 0.5, Math.min(w, h) * 0.15, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(0.5, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.3)');
    }

    init();

    function handleMouse(e: MouseEvent) {
      mouseX = (e.clientX / w) * 2 - 1;
      mouseY = (e.clientY / h) * 2 - 1;
    }
    window.addEventListener('mousemove', handleMouse);

    function frame(now: number) {
      if (!running) return;
      frameCount++;
      if (frameCount % (frameSkip + 1) !== 0) {
        animId = requestAnimationFrame(frame);
        return;
      }

      time += 0.001;

      c.fillStyle = BG;
      c.fillRect(0, 0, w, h);

      const mx = mouseX || 0;
      const my = mouseY || 0;

      // Layer 4: Nebula
      for (const n of nebulas) {
        n.x += n.vx + mx * 0.25;
        n.y += n.vy + my * 0.12;
        const nr = n.radius;
        if (n.x < -nr) n.x = w + nr;
        if (n.x > w + nr) n.x = -nr;
        if (n.y < -nr) n.y = h + nr;
        if (n.y > h + nr) n.y = -nr;

        const grad = c.createRadialGradient(n.x, n.y, 0, n.x, n.y, nr);
        grad.addColorStop(0, `rgba(255,59,77,${n.alpha * 0.6})`);
        grad.addColorStop(0.35, `rgba(255,59,77,${n.alpha * 0.3})`);
        grad.addColorStop(1, 'rgba(255,59,77,0)');
        c.fillStyle = grad;
        c.fillRect(0, 0, w, h);
      }

      // Layer 3: Orbit Rings
      for (const ring of rings) {
        ring.angle += ring.speed;
        const rcx = ring.cx + mx * 2;
        const rcy = ring.cy + my * 1.5;

        for (let i = 0; i < ring.dotCount; i++) {
          const a = (i / ring.dotCount) * Math.PI * 2 + ring.angle;
          const px = rcx + Math.cos(a) * ring.radius;
          const py = rcy + Math.sin(a) * ring.radius;

          if (px < -10 || px > w + 10 || py < -10 || py > h + 10) continue;

          const dotAlpha = ring.alpha * (0.5 + 0.5 * Math.sin(a * 3 + time * 0.5));
          if (dotAlpha < 0.003) continue;

          c.fillStyle = ring.color === RED
            ? `rgba(255,59,77,${dotAlpha})`
            : `rgba(43,43,43,${dotAlpha})`;
          c.fillRect(px - 1, py - 1, 2, 2);
        }
      }

      // Layer 1: Stars (fillRect instead of arc for speed)
      for (const s of stars) {
        const sx = s.x + s.vx + mx * 0.5 * s.weight;
        const sy = s.y + s.vy + my * 0.3 * s.weight;
        const flicker = 0.7 + 0.3 * Math.sin(time * 0.5 + s.phase);
        const alpha = s.baseAlpha * flicker;
        if (alpha < 0.003) continue;

        c.fillStyle = s.color === RED
          ? `rgba(255,59,77,${alpha})`
          : `rgba(43,43,43,${alpha})`;
        c.fillRect(sx - s.size / 2, sy - s.size / 2, s.size, s.size);
      }

      // Layer 2: Pixel Squares (additive, glow via expanded rect instead of shadowBlur)
      c.save();
      c.globalCompositeOperation = 'lighter';
      for (const sq of squares) {
        sq.phase += sq.speed;
        const sqAlpha = Math.sin(sq.phase) * 0.5 + 0.5;
        sq.y -= 0.015 + sq.speed * 4;

        if (sq.y < -20) {
          const cl = clusterCenters[Math.floor(Math.random() * clusterCenters.length)];
          sq.x = cl.cx + rand(-w * 0.08, w * 0.08);
          sq.y = cl.cy + rand(-h * 0.04, h * 0.04);
          sq.phase = 0;
        }

        const sqx = sq.x + mx * 3;
        const sqy = sq.y + my * 2;

        const glowSize = sq.size * 3;
        c.fillStyle = `rgba(255,59,77,${sqAlpha * 0.08})`;
        c.fillRect(sqx - glowSize / 2, sqy - glowSize / 2, glowSize, glowSize);

        c.fillStyle = `rgba(255,59,77,${sqAlpha * 0.85})`;
        c.fillRect(sqx - sq.size / 2, sqy - sq.size / 2, sq.size, sq.size);
      }
      c.restore();

      // Layer 5: Embers (additive, no canvas filter — draw two circles for soft glow)
      c.save();
      c.globalCompositeOperation = 'lighter';
      for (const em of embers) {
        em.phase += em.speed;
        const emAlpha = (Math.sin(em.phase) * 0.5 + 0.5) * 0.12;
        em.y -= 0.008 + em.speed * 2;
        em.x += em.vx + mx * 1.5;

        if (em.y < -30) {
          em.x = rand(0, w * 0.35);
          em.y = h + rand(0, 40);
          em.phase = 0;
        }
        em.x = Math.max(-20, Math.min(w * 0.4, em.x));

        c.fillStyle = `rgba(255,59,77,${emAlpha * 0.5})`;
        c.fillRect(em.x - em.size * 2, em.y - em.size * 2, em.size * 4, em.size * 4);

        c.fillStyle = `rgba(255,59,77,${emAlpha})`;
        c.fillRect(em.x - em.size, em.y - em.size, em.size * 2, em.size * 2);
      }
      c.restore();

      // Vignette
      c.fillStyle = vignette!;
      c.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    const onResize = () => init();
    const onVis = () => {
      running = !document.hidden;
      if (running) animId = requestAnimationFrame(frame);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none select-none"
    />
  );
};

export default CyberBg;
