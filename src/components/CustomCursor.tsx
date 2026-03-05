'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  const smoothScale = useSpring(scale, { damping: 20, stiffness: 400 });

  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth <= 768) return;

    const selector = 'a, button, [data-cursor-grow]';

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const grow = () => scale.set(2.5);
    const shrink = () => scale.set(1);
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(selector)) {
        grow();
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest(selector)) {
        shrink();
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, scale]);

  return (
    <>
      <motion.div
        ref={dotRef}
        className="custom-cursor-layer pointer-events-none fixed top-0 left-0 z-[9999] hidden h-8 w-8 rounded-full border border-accent-violet/50 mix-blend-difference md:block"
        style={{ x, y, scale: smoothScale }}
      />
      <motion.div
        className="custom-cursor-layer pointer-events-none fixed top-0 left-0 z-[9999] hidden h-8 w-8 items-center justify-center rounded-full md:flex"
        style={{ x, y }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-accent-violet" />
      </motion.div>
    </>
  );
}
