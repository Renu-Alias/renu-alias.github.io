import { useEffect, useRef } from 'react';

const RED = '#E63946';
const WHITE = '#FFFFFF';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  alpha: number;
}

interface Pulse {
  ax: number; ay: number;
  bx: number; by: number;
  t: number;   // 0 → 1
  color: string;
}

const EDGE_FADE = 0.025;
const PULSE_INTERVAL_MS = 2800;

function getNodeCount(): number {
  const w = window.innerWidth;
  if (w < 480) return 35;
  if (w < 768) return 50;
  if (w < 1024) return 65;
  return 85;
}

function getConnectDist(w: number, h: number): number {
  return Math.min(w, h) * 0.18;
}

const NeuralNetworkBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cvs: HTMLCanvasElement = canvas;
    const c: CanvasRenderingContext2D = ctx;
    let w = 0, h = 0, dpr = 1;
    let nodes: Node[] = [];
    const edgeMap = new Map<string, number>();
    const pulses: Pulse[] = [];
    let pulseTimer = 0;
    let animId = 0;
    let frameSkip = window.innerWidth < 768 ? 2 : 1;
    let frameCount = 0;
    let running = true;

    /* ---------- sizing ---------- */
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      frameSkip = w < 768 ? 2 : 1;

      /* regenerate nodes on significant resize */
      const count = getNodeCount();
      if (nodes.length !== count) {
        nodes = [];
        for (let i = 0; i < count; i++) {
          const isRed = Math.random() < 0.4;
          nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            r: 1.5 + Math.random() * 2.5,
            color: isRed ? RED : WHITE,
            alpha: 0.35 + Math.random() * 0.35,
          });
        }
        edgeMap.clear();
      }
    }
    resize();

    /* ---------- helpers ---------- */
    function edgeKey(a: number, b: number) {
      return a < b ? `${a}-${b}` : `${b}-${a}`;
    }

    /* ---------- spawn a pulse ---------- */
    function spawnPulse() {
      /* pick a currently visible edge */
      const visible: [number, number][] = [];
      for (const [key, opacity] of edgeMap) {
        if (opacity > 0.08) {
          const parts = key.split('-');
          visible.push([+parts[0], +parts[1]]);
        }
      }
      if (visible.length === 0) return;
      const [ai, bi] = visible[Math.floor(Math.random() * visible.length)];
      const a = nodes[ai], b = nodes[bi];
      pulses.push({
        ax: a.x, ay: a.y,
        bx: b.x, by: b.y,
        t: 0,
        color: Math.random() < 0.5 ? RED : WHITE,
      });
    }

    /* ---------- main loop ---------- */
    function frame(now: number) {
      if (!running) return;

      frameCount++;
      if (frameCount % frameSkip !== 0) {
        animId = requestAnimationFrame(frame);
        return;
      }

      c.clearRect(0, 0, w, h);
      const connectDist = getConnectDist(w, h);
      const connectDist2 = connectDist * connectDist;

      /* ---- update nodes ---- */
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) { n.x = 0; n.vx *= -0.8; }
        if (n.x > w) { n.x = w; n.vx *= -0.8; }
        if (n.y < 0) { n.y = 0; n.vy *= -0.8; }
        if (n.y > h) { n.y = h; n.vy *= -0.8; }

        n.vx += (Math.random() - 0.5) * 0.008;
        n.vy += (Math.random() - 0.5) * 0.008;

        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 0.25) {
          n.vx = (n.vx / speed) * 0.25;
          n.vy = (n.vy / speed) * 0.25;
        }
      }

      /* ---- compute edges & draw lines ---- */
      const touched = new Set<string>();

      c.lineWidth = 0.5;

      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < connectDist2 && d2 > 4) {
            const key = edgeKey(i, j);
            touched.add(key);

            const dist = Math.sqrt(d2);
            const targetOpacity = (1 - dist / connectDist) * 0.15;
            const current = edgeMap.get(key) ?? 0;
            const next = current + (targetOpacity - current) * EDGE_FADE;
            edgeMap.set(key, next);

            if (next > 0.003) {
              c.strokeStyle = `rgba(230,57,70,${next})`;
              c.beginPath();
              c.moveTo(ni.x, ni.y);
              c.lineTo(nj.x, nj.y);
              c.stroke();
            }
          }
        }
      }

      /* fade edges that are no longer connected */
      for (const [key, opacity] of edgeMap) {
        if (!touched.has(key)) {
          const next = opacity - EDGE_FADE;
          if (next > 0.001) {
            edgeMap.set(key, next);
            const parts = key.split('-');
            const i = +parts[0], j = +parts[1];
            c.strokeStyle = `rgba(230,57,70,${next})`;
            c.beginPath();
            c.moveTo(nodes[i].x, nodes[i].y);
            c.lineTo(nodes[j].x, nodes[j].y);
            c.stroke();
          } else {
            edgeMap.delete(key);
          }
        }
      }

      /* ---- draw nodes with glow ---- */
      for (const n of nodes) {
        c.beginPath();
        c.arc(n.x, n.y, n.r, 0, Math.PI * 2);

        if (n.color === WHITE) {
          c.shadowColor = 'rgba(255,255,255,0.25)';
          c.fillStyle = `rgba(255,255,255,${n.alpha})`;
        } else {
          c.shadowColor = 'rgba(230,57,70,0.35)';
          c.fillStyle = `rgba(230,57,70,${n.alpha})`;
        }
        c.shadowBlur = n.r * 3;
        c.fill();
      }
      c.shadowBlur = 0;

      /* ---- manage pulses ---- */
      pulseTimer += 16; /* approximate ms per 60fps frame */
      if (pulseTimer >= PULSE_INTERVAL_MS) {
        pulseTimer = 0;
        spawnPulse();
      }

      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.t += 0.014;
        if (pulse.t >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const mx = pulse.ax + (pulse.bx - pulse.ax) * pulse.t;
        const my = pulse.ay + (pulse.by - pulse.ay) * pulse.t;
        const pulseAlpha = Math.sin(pulse.t * Math.PI) * 0.6;

        /* glow ring */
        c.beginPath();
        c.arc(mx, my, 4, 0, Math.PI * 2);
        c.shadowColor = pulse.color === WHITE
          ? 'rgba(255,255,255,0.4)'
          : 'rgba(230,57,70,0.5)';
        c.shadowBlur = 12;
        c.fillStyle = pulse.color === WHITE
          ? `rgba(255,255,255,${pulseAlpha})`
          : `rgba(230,57,70,${pulseAlpha})`;
        c.fill();
        c.shadowBlur = 0;
      }

      animId = requestAnimationFrame(frame);
    }

    /* ---------- lifecycle ---------- */
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
      style={{ zIndex: -1, opacity: 0.15 }}
    />
  );
};

export default NeuralNetworkBg;
