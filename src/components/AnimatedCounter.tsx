'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useDeviceMotionProfile } from '@/lib/useDeviceMotionProfile';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  label,
  duration = 2,
}: AnimatedCounterProps) {
  const { isMobileLike, prefersReducedMotion } = useDeviceMotionProfile();
  const lowMotion = isMobileLike || prefersReducedMotion;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const end = value;
    const animationDuration = lowMotion ? Math.min(duration, 1.1) : duration;
    const startTime = performance.now();
    let animationId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (animationDuration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        animationId = requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [isInView, value, duration, lowMotion]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: lowMotion ? 0.4 : 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-center"
    >
      <div className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold text-text-primary md:text-6xl">
        {count}
        <span className="text-gradient">{suffix}</span>
      </div>
      <div className="mt-2 text-sm tracking-widest text-text-secondary uppercase">
        {label}
      </div>
    </motion.div>
  );
}
