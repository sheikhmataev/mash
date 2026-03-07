'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';

const SplineHero = dynamic(() => import('@/components/SplineHero'), {
  ssr: false,
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth < 768 : false),
  );

  const springConfig = { damping: 30, stiffness: 80 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const bgX = useTransform(x, (v) => v * 0.02);
  const bgY = useTransform(y, (v) => v * 0.02);
  const orbX = useTransform(x, (v) => v * -0.01);
  const orbY = useTransform(y, (v) => v * -0.01);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    if (isMobile) {
      return () => window.removeEventListener('resize', handleResize);
    }

    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };

    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [isMobile, mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{ x: bgX, y: bgY }}
      >
        <div className="absolute inset-0 bg-bg-deep" />
        <div
          className="absolute inset-0 animate-gradient opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(123, 97, 255, 0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 30% 70%, rgba(58, 168, 255, 0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 80% 30%, rgba(0, 255, 209, 0.04) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />
        {/* Light sweep overlay */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div
            className="absolute top-0 h-full w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(123, 97, 255, 0.3), transparent)',
              animation: 'sweep 8s ease-in-out infinite',
            }}
          />
        </div>
      </motion.div>

      {/* Orb glow behind Spline */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ x: orbX, y: orbY }}
      >
        <div
          className="h-[500px] w-[500px] rounded-full opacity-20 blur-[100px] md:h-[700px] md:w-[700px]"
          style={{
            background: 'radial-gradient(circle, rgba(123, 97, 255, 0.4) 0%, rgba(58, 168, 255, 0.2) 40%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Spline 3D scene */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 opacity-70">
          <SplineHero className="h-full w-full" deferLoad />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-violet/20 bg-accent-violet/5 px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-violet animate-pulse-glow" />
          <span className="text-xs tracking-widest text-accent-violet uppercase">
            AI Automation Partner
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold leading-[1.08] tracking-tight text-text-primary md:text-7xl lg:text-8xl"
        >
          Building intelligent
          <br />
          <span className="text-gradient">digital systems.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto mt-6 max-w-xl text-base tracking-wide text-text-secondary md:text-lg"
        >
          Digitalization&ensp;&middot;&ensp;AI&ensp;&middot;&ensp;Automation&ensp;&middot;&ensp;Generative Technology
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden rounded-full bg-accent-violet px-8 py-3.5 text-sm font-medium text-white transition-all duration-500 hover:shadow-[0_0_30px_rgba(123,97,255,0.35)]"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/10 px-8 py-3.5 text-sm font-medium text-text-primary transition-all duration-500 hover:border-accent-violet/30 hover:bg-accent-violet/5"
          >
            Work With Us
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] text-text-muted uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="h-8 w-[1px] bg-gradient-to-b from-accent-violet/40 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
