import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import type { Points } from 'three';

function DotField({ count = 400 }) {
  const ref = useRef<Points>(null);

  const { positions, velocities, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 5 + Math.random() * 20;
      const i3 = i * 3;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = (Math.random() - 0.5) * 16;
      pos[i3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 4;
      vel[i3] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002;
      ph[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, velocities: vel, phases: ph };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes.position;
    const arr = attr.array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      /* Oscillating force for organic drift */
      arr[i3] += Math.sin(t * 0.08 + phases[i]) * 0.0006 + velocities[i3];
      arr[i3 + 1] += Math.cos(t * 0.06 + phases[i] * 1.3) * 0.0006 + velocities[i3 + 1];
      arr[i3 + 2] += Math.sin(t * 0.07 + phases[i] * 0.7) * 0.0006 + velocities[i3 + 2];

      /* Spherical boundary */
      const dx = arr[i3], dy = arr[i3 + 1], dz = arr[i3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist > 26) {
        const ratio = 25 / dist;
        arr[i3] *= ratio;
        arr[i3 + 1] *= ratio;
        arr[i3 + 2] *= ratio;
      }
    }

    attr.needsUpdate = true;
    ref.current.rotation.y = t * 0.0015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#F5F5F5" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
}

const HeroScene = () => (
  <Canvas
    camera={{ position: [0, 0.5, 9], fov: 55 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
    style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
  >
    <DotField count={1500} />
  </Canvas>
);

export default HeroScene;
