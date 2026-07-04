import { useEffect, useRef } from 'react';

const RED = '#E63946';
const WHITE = '#FFFFFF';

interface Seg {
  x1: number; y1: number;
  x2: number; y2: number;
}

interface Trace {
  segs: Seg[];
  vias: { x: number; y: number }[];
  comps: { x: number; y: number; w: number; h: number }[];
  color: string;
  totalLen: number;
  speed: number;
  t: number;
  lastLit: number[];
}

/* ---------- grid-based orthogonal traces with density falloff ---------- */
function genTraces(w: number, h: number, now: number): Trace[] {
  const cellSize = w < 768 ? 48 : 65;
  const cols = Math.ceil(w / cellSize) + 2;
  const rows = Math.ceil(h / cellSize) + 2;
  const cx = w / 2, cy = h / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);

  const activity = (px: number, py: number): number => {
    const dist = Math.sqrt((px - cx) ** 2 + (py - cy) ** 2);
    return 0.08 + Math.min(dist / maxDist, 1) * 0.52;
  };

  const right: boolean[][] = [];
  const down: boolean[][] = [];

  for (let r = 0; r < rows; r++) {
    right[r] = [];
    for (let c = 0; c < cols; c++) {
      const px = (c + 0.5) * cellSize;
      const py = (r + 0.5) * cellSize;
      right[r][c] = c < cols - 1 && Math.random() < activity(px, py);
    }
  }

  for (let r = 0; r < rows; r++) {
    down[r] = [];
    for (let c = 0; c < cols; c++) {
      if (r === rows - 1) { down[r][c] = false; continue; }
      const px = (c + 0.5) * cellSize;
      const py = (r + 0.5) * cellSize;
      down[r][c] = Math.random() < activity(px, py);
    }
  }

  const K = (r: number, c: number) => r * cols + c;
  const graph = new Map<number, number[]>();
  const addEdge = (a: number, b: number) => {
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);
    graph.get(a)!.push(b);
    graph.get(b)!.push(a);
  };

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (right[r][c]) addEdge(K(r, c), K(r, c + 1));
      if (down[r][c]) addEdge(K(r, c), K(r + 1, c));
    }

  const visited = new Set<number>();
  const traces: Trace[] = [];

  const toPt = (k: number) => ({
    x: ((k % cols) + 0.5 + (Math.random() - 0.5) * 0.2) * cellSize,
    y: (Math.floor(k / cols) + 0.5 + (Math.random() - 0.5) * 0.2) * cellSize,
  });

  for (const [startK] of graph) {
    if (visited.has(startK)) continue;
    if ((graph.get(startK)?.length || 0) > 2) continue;

    const path: number[] = [startK];
    visited.add(startK);

    const walk = (from: number, into: number) => {
      if (visited.has(into)) return;
      if ((graph.get(into)?.length || 0) > 2) return;
      visited.add(into);
      path.push(into);
      const nbs = graph.get(into)!.filter(n => n !== from);
      if (nbs.length === 1) walk(into, nbs[0]);
    };

    const nbs = graph.get(startK)!;
    if (nbs.length >= 1) walk(startK, nbs[0]);
    if (path.length === 1) continue;

    const segs: Seg[] = [];
    const vias: { x: number; y: number }[] = [];
    const comps: { x: number; y: number; w: number; h: number }[] = [];
    const pts = path.map(k => toPt(k));
    let totalLen = 0;

    for (let i = 0; i < pts.length; i++) {
      const { x, y } = pts[i];
      vias.push({ x, y });
      if (i > 0) {
        segs.push({ x1: pts[i - 1].x, y1: pts[i - 1].y, x2: x, y2: y });
        totalLen += Math.sqrt((x - pts[i - 1].x) ** 2 + (y - pts[i - 1].y) ** 2);
      }
      if (i > 0 && i < pts.length - 1 && Math.random() < 0.07) {
        const isHoriz = Math.abs(pts[i].x - pts[i - 1].x) > Math.abs(pts[i].y - pts[i - 1].y);
        comps.push({
          x: x - (isHoriz ? 5 : 2.5), y: y - (isHoriz ? 2.5 : 5),
          w: isHoriz ? 10 : 5, h: isHoriz ? 5 : 10,
        });
      }
    }

    const color = Math.random() < 0.35 ? RED : WHITE;
    /* speed chosen so full traversal takes ~3 s */
    const speed = totalLen > 0 ? 1 / (3 + Math.random() * 2) : 0.25;
    traces.push({
      segs, vias, comps, color, totalLen, speed,
      t: -1,
      lastLit: new Array(segs.length).fill(now),
    });
  }

  return traces;
}

/* ---------- component ---------- */
const CircuitBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cvs: HTMLCanvasElement = canvas;
    const c: CanvasRenderingContext2D = ctx;
    let w = 0, h = 0, dpr = 1;
    let traces: Trace[] = [];
    let animId = 0;
    let running = true;
    let frameCount = 0;
    const frameSkip = window.innerWidth < 768 ? 2 : 1;
    let nextPulseAt = 0;

    function segLen(s: Seg) {
      const dx = s.x2 - s.x1, dy = s.y2 - s.y1;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function segPos(s: Seg, t: number): { x: number; y: number } {
      return { x: s.x1 + (s.x2 - s.x1) * t, y: s.y1 + (s.y2 - s.y1) * t };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      cvs.style.width = w + 'px';
      cvs.style.height = h + 'px';
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      traces = genTraces(w, h, performance.now());
      nextPulseAt = performance.now() + 1000 + Math.random() * 1500;
    }
    resize();

    function frame(now: number) {
      if (!running) return;
      frameCount++;
      if (frameCount % frameSkip !== 0) {
        animId = requestAnimationFrame(frame);
        return;
      }

      /* --- manage pulse scheduler: max 3 concurrent, fire every 2-4 s --- */
      const active = traces.filter(t => t.t >= 0);
      if (active.length < 3 && now >= nextPulseAt) {
        const inactive = traces.filter(t => t.t < 0);
        if (inactive.length > 0) {
          const tr = inactive[Math.floor(Math.random() * inactive.length)];
          tr.t = 0;
          tr.lastLit.fill(now);
        }
        nextPulseAt = now + 2000 + Math.random() * 2000;
      }

      /* fill background */
      c.fillStyle = '#0A0A0A';
      c.fillRect(0, 0, w, h);

      /* --- render --- */
      for (const tr of traces) {
        if (tr.t < 0) {
          /* base dim state — etched texture at ~11% */
          for (const s of tr.segs) {
            c.strokeStyle = tr.color === WHITE
              ? 'rgba(255,255,255,0.11)'
              : 'rgba(230,57,70,0.11)';
            c.lineWidth = 1.5;
            c.beginPath();
            c.moveTo(s.x1, s.y1);
            c.lineTo(s.x2, s.y2);
            c.stroke();
          }
          for (const v of tr.vias) {
            c.beginPath();
            c.arc(v.x, v.y, 2, 0, Math.PI * 2);
            c.fillStyle = tr.color === WHITE
              ? 'rgba(255,255,255,0.09)'
              : 'rgba(230,57,70,0.09)';
            c.fill();
          }
          for (const comp of tr.comps) {
            c.strokeStyle = tr.color === WHITE
              ? 'rgba(255,255,255,0.04)'
              : 'rgba(230,57,70,0.04)';
            c.lineWidth = 0.5;
            c.strokeRect(comp.x, comp.y, comp.w, comp.h);
          }
          continue;
        }

        /* advance pulse */
        tr.t += tr.speed;

        if (tr.t >= 1) {
          /* pulse finished — dim all to base, mark inactive */
          tr.lastLit.fill(0);
          tr.t = -1;
          continue;
        }

        const signalPos = tr.t * tr.totalLen;

        let accumulated = 0;
        let activeIdx = -1;
        let activeT = 0;
        for (let i = 0; i < tr.segs.length; i++) {
          const sl = segLen(tr.segs[i]);
          if (signalPos >= accumulated && signalPos < accumulated + sl) {
            activeIdx = i;
            activeT = (signalPos - accumulated) / sl;
            break;
          }
          accumulated += sl;
        }

        if (activeIdx === -1) continue;

        /* mark segments at or before signal as lit */
        for (let i = 0; i < tr.segs.length; i++) {
          if (i <= activeIdx) tr.lastLit[i] = now;
        }

        /* --- draw segments --- */
        for (let i = 0; i < tr.segs.length; i++) {
          const age = tr.lastLit[i] > 0 ? (now - tr.lastLit[i]) / 1000 : 99;
          let alpha = 0.11;
          if (i === activeIdx) {
            alpha = 0.7;
          } else if (age < 0.15) {
            alpha = 0.6;
          } else if (age < 1.5) {
            alpha = 0.6 * (1 - (age - 0.15) / 1.35) + 0.11;
          }
          c.strokeStyle = tr.color === WHITE
            ? `rgba(255,255,255,${alpha})`
            : `rgba(230,57,70,${alpha})`;
          c.lineWidth = 1.5;
          c.beginPath();
          c.moveTo(tr.segs[i].x1, tr.segs[i].y1);
          c.lineTo(tr.segs[i].x2, tr.segs[i].y2);
          c.stroke();
        }

        /* --- draw vias --- */
        for (let i = 0; i < tr.vias.length; i++) {
          const viaIdx = Math.min(i, tr.lastLit.length - 1);
          const age = tr.lastLit[viaIdx] > 0 ? (now - tr.lastLit[viaIdx]) / 1000 : 99;
          let alpha = 0.09;
          if (i === activeIdx || i === activeIdx + 1) {
            alpha = 0.55;
          } else if (age < 0.5) {
            alpha = 0.4 * (1 - age / 0.5) + 0.09;
          }
          if (alpha > 0.01) {
            c.beginPath();
            c.arc(tr.vias[i].x, tr.vias[i].y, 2.5, 0, Math.PI * 2);
            c.fillStyle = tr.color === WHITE
              ? `rgba(255,255,255,${alpha})`
              : `rgba(230,57,70,${alpha})`;
            c.fill();
          }
        }

        /* --- draw components --- */
        for (const comp of tr.comps) {
          const compIdx = tr.comps.indexOf(comp);
          const lastLitIdx = Math.min(compIdx + 1, tr.lastLit.length - 1);
          const age = tr.lastLit[lastLitIdx] > 0 ? (now - tr.lastLit[lastLitIdx]) / 1000 : 99;
          const alpha = age < 1.5 ? 0.35 * (1 - age / 1.5) + 0.04 : 0.04;
          c.strokeStyle = tr.color === WHITE
            ? `rgba(255,255,255,${alpha})`
            : `rgba(230,57,70,${alpha})`;
          c.lineWidth = 0.5;
          c.strokeRect(comp.x, comp.y, comp.w, comp.h);
        }

        /* --- pulse glow dot --- */
        if (activeIdx >= 0) {
          const pos = segPos(tr.segs[activeIdx], activeT);
          const glow = 0.7 + Math.sin(now * 0.008) * 0.15;
          c.shadowColor = tr.color === WHITE
            ? 'rgba(255,255,255,0.35)'
            : 'rgba(230,57,70,0.6)';
          c.shadowBlur = 12;
          c.beginPath();
          c.arc(pos.x, pos.y, 3.5, 0, Math.PI * 2);
          c.fillStyle = tr.color === WHITE
            ? `rgba(255,255,255,${glow})`
            : `rgba(230,57,70,${glow})`;
          c.fill();
          c.shadowBlur = 0;
        }
      }

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

export default CircuitBg;
