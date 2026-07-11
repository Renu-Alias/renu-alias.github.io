import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect, type RefObject } from 'react';
import * as THREE from 'three';
import { mouse, scrollState } from './shared';

const WHITE_COUNT = 2500;
const RED_COUNT = 500;

/* ---- White particles (background atmosphere) ---- */
function WhiteParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(WHITE_COUNT * 3);
    for (let i = 0; i < WHITE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position;
    const array = attr.array as Float32Array;
    const progress = scrollState.progress;
    const phase = progress * Math.PI * 3;

    for (let i = 0; i < WHITE_COUNT; i++) {
      const t = (i / WHITE_COUNT) * Math.PI * 2;
      const phi = Math.acos(2 * ((i % 600) / 600) - 1);
      const baseR = 1.2 + (i % 10) * 0.4;
      const spread = 1 + progress * 5;
      const r = baseR * spread;
      const wave = Math.sin(t * 3 + clock.getElapsedTime() * 0.4 + progress * 6) * 0.4 * progress;
      array[i * 3] = r * Math.sin(phi + wave) * Math.cos(t + phase);
      array[i * 3 + 1] = r * Math.sin(phi + wave) * Math.sin(t + phase * 0.7);
      array[i * 3 + 2] = r * Math.cos(phi + wave + phase * 0.4);
    }
    attr.needsUpdate = true;
    ref.current.rotation.x = clock.getElapsedTime() * 0.03 + mouse.y * 0.04;
    ref.current.rotation.y = clock.getElapsedTime() * 0.05 + mouse.x * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={WHITE_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#FFFFFF" transparent opacity={0.2} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ---- Red particles (accent nodes — reactive to mouse) ---- */
function RedParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(RED_COUNT * 3);
    for (let i = 0; i < RED_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 3.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position;
    const array = attr.array as Float32Array;
    const progress = scrollState.progress;
    const phase = progress * Math.PI * 3;
    const activity = Math.min(Math.abs(mouse.x) + Math.abs(mouse.y) * 1.5, 1);

    for (let i = 0; i < RED_COUNT; i++) {
      const t = (i / RED_COUNT) * Math.PI * 2;
      const phi = Math.acos(2 * ((i % 500) / 500) - 1);
      const baseR = 1.5 + (i % 8) * 0.45;
      const spread = 1 + progress * 5;
      const r = baseR * spread;
      const wave = Math.sin(t * 3 + clock.getElapsedTime() * 0.4 + progress * 6) * 0.4 * progress;
      array[i * 3] = r * Math.sin(phi + wave) * Math.cos(t + phase);
      array[i * 3 + 1] = r * Math.sin(phi + wave) * Math.sin(t + phase * 0.7);
      array[i * 3 + 2] = r * Math.cos(phi + wave + phase * 0.4);
    }
    attr.needsUpdate = true;

    /* Pulse size/opacity on mouse activity */
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.size = 0.03 + activity * 0.025;
    mat.opacity = 0.4 + activity * 0.35;

    ref.current.rotation.x = clock.getElapsedTime() * 0.03 + mouse.y * 0.06;
    ref.current.rotation.y = clock.getElapsedTime() * 0.05 + mouse.x * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={RED_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#E63946" transparent opacity={0.4} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ---- Mouse tracker ---- */
function MouseTracker() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return null;
}

const PersistentScene = () => (
  <Canvas
    camera={{ position: [0, 0, 7], fov: 50 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
    style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
  >
    <MouseTracker />
    <WhiteParticles />
    <RedParticles />
  </Canvas>
);

export default PersistentScene;
