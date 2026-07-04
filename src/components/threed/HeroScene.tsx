import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import type { Points, LineSegments } from 'three';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Ambient background stars (faint white specks)                      */
/* ------------------------------------------------------------------ */
function BackgroundStars({ count = 1000 }) {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 18;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 6;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.004;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#F5F5F5" transparent opacity={0.15} sizeAttenuation />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Neural network — drifting glow nodes + dynamic connection lines    */
/* ------------------------------------------------------------------ */
const NN_NODES = 70;
const MAX_EDGES = 240;
const BOUNDARY = 7.5;
/** Squared distance threshold for a connection to appear */
const CONNECT_DIST2 = 14;

function NeuralNetwork() {
  const dotRef = useRef<Points>(null);
  const lineRef = useRef<LineSegments>(null);

  /* ---- per-node data: px,py,pz, vx,vy,vz, phase ---- */
  const nodeData = useMemo(() => {
    const data = new Float32Array(NN_NODES * 7);
    for (let i = 0; i < NN_NODES; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1 + Math.random() * (BOUNDARY - 1);
      const i7 = i * 7;
      data[i7] = r * Math.sin(phi) * Math.cos(theta);
      data[i7 + 1] = r * Math.sin(phi) * Math.sin(theta);
      data[i7 + 2] = r * Math.cos(phi);
      data[i7 + 3] = (Math.random() - 0.5) * 0.004;
      data[i7 + 4] = (Math.random() - 0.5) * 0.004;
      data[i7 + 5] = (Math.random() - 0.5) * 0.004;
      data[i7 + 6] = Math.random() * Math.PI * 2;
    }
    return data;
  }, []);

  /* ---- shared geometry buffers ---- */
  const dotPositions = useMemo(() => {
    const arr = new Float32Array(NN_NODES * 3);
    for (let i = 0; i < NN_NODES; i++) {
      arr[i * 3] = nodeData[i * 7];
      arr[i * 3 + 1] = nodeData[i * 7 + 1];
      arr[i * 3 + 2] = nodeData[i * 7 + 2];
    }
    return arr;
  }, []);

  const linePositions = useMemo(() => new Float32Array(MAX_EDGES * 6), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    /* ---- update node positions (bounded brownian drift) ---- */
    for (let i = 0; i < NN_NODES; i++) {
      const i7 = i * 7;
      const phase = nodeData[i7 + 6];

      /* Add gentle oscillating force for organic motion */
      nodeData[i7 + 3] += Math.sin(t * 0.15 + phase) * 0.0003;
      nodeData[i7 + 4] += Math.cos(t * 0.12 + phase * 1.3) * 0.0003;
      nodeData[i7 + 5] += Math.sin(t * 0.18 + phase * 0.7) * 0.0003;

      /* Damping */
      nodeData[i7 + 3] *= 0.992;
      nodeData[i7 + 4] *= 0.992;
      nodeData[i7 + 5] *= 0.992;

      /* Apply velocity */
      nodeData[i7] += nodeData[i7 + 3];
      nodeData[i7 + 1] += nodeData[i7 + 4];
      nodeData[i7 + 2] += nodeData[i7 + 5];

      /* Spherical boundary */
      const dx = nodeData[i7], dy = nodeData[i7 + 1], dz = nodeData[i7 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist > BOUNDARY) {
        const ratio = BOUNDARY / dist;
        nodeData[i7] *= ratio;
        nodeData[i7 + 1] *= ratio;
        nodeData[i7 + 2] *= ratio;
        nodeData[i7 + 3] *= -0.4;
        nodeData[i7 + 4] *= -0.4;
        nodeData[i7 + 5] *= -0.4;
      }
    }

    /* ---- update glow dot positions ---- */
    if (dotRef.current) {
      const attr = dotRef.current.geometry.attributes.position;
      const arr = attr.array as Float32Array;
      for (let i = 0; i < NN_NODES; i++) {
        arr[i * 3] = nodeData[i * 7];
        arr[i * 3 + 1] = nodeData[i * 7 + 1];
        arr[i * 3 + 2] = nodeData[i * 7 + 2];
      }
      attr.needsUpdate = true;
    }

    /* ---- rebuild connections between nearby nodes ---- */
    if (lineRef.current) {
      const attr = lineRef.current.geometry.attributes.position;
      const arr = attr.array as Float32Array;
      let edgeCount = 0;

      for (let i = 0; i < NN_NODES && edgeCount < MAX_EDGES; i++) {
        const i7 = i * 7;
        const xi = nodeData[i7], yi = nodeData[i7 + 1], zi = nodeData[i7 + 2];

        for (let j = i + 1; j < NN_NODES && edgeCount < MAX_EDGES; j++) {
          const j7 = j * 7;
          const dx = xi - nodeData[j7];
          const dy = yi - nodeData[j7 + 1];
          const dz = zi - nodeData[j7 + 2];
          const d2 = dx * dx + dy * dy + dz * dz;

          if (d2 < CONNECT_DIST2 && d2 > 0.3) {
            const idx = edgeCount * 6;
            arr[idx] = xi;
            arr[idx + 1] = yi;
            arr[idx + 2] = zi;
            arr[idx + 3] = nodeData[j7];
            arr[idx + 4] = nodeData[j7 + 1];
            arr[idx + 5] = nodeData[j7 + 2];
            edgeCount++;
          }
        }
      }

      /* Collapse unused slots to keep geometry size stable */
      for (let i = edgeCount; i < MAX_EDGES; i++) {
        const idx = i * 6;
        arr[idx] = arr[idx + 3] = 0;
        arr[idx + 1] = arr[idx + 4] = 0;
        arr[idx + 2] = arr[idx + 5] = 0;
      }

      attr.needsUpdate = true;
      lineRef.current.geometry.setDrawRange(0, edgeCount * 2);
    }
  });

  return (
    <group>
      {/* Glowing nodes */}
      <points ref={dotRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NN_NODES}
            array={dotPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#E63946"
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={MAX_EDGES * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#E63946" transparent opacity={0.07} />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene assembly                                                     */
/* ------------------------------------------------------------------ */
const HeroScene = () => (
  <Canvas
    camera={{ position: [0, 0.5, 9], fov: 55 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
    style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
  >
    <BackgroundStars count={1000} />
    <NeuralNetwork />
  </Canvas>
);

export default HeroScene;
