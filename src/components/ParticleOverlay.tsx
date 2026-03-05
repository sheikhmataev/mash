'use client';

import { useEffect, useRef } from 'react';
import { createParticleSystem } from '@/lib/particles';

export default function ParticleOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const system = createParticleSystem(canvasRef.current, {
      count: 50,
      color: '123, 97, 255',
      maxRadius: 1.5,
      speed: 0.15,
    });
    return () => system.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 h-full w-full opacity-40"
    />
  );
}
