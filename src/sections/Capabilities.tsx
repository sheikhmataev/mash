'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/lib/animations';
import { CAPABILITIES } from '@/lib/constants';
import VideoPlaceholder from '@/components/VideoPlaceholder';

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [enablePinnedScroll, setEnablePinnedScroll] = useState(false);

  useEffect(() => {
    const updateMode = () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setEnablePinnedScroll(!reduced);
    };

    updateMode();
    window.addEventListener('resize', updateMode);
    return () => window.removeEventListener('resize', updateMode);
  }, []);

  useEffect(() => {
    if (!enablePinnedScroll) return;
    if (!sectionRef.current || !scrollRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth - window.innerWidth;
    if (scrollWidth <= 0) return;

    const tween = gsap.to(scrollRef.current, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [enablePinnedScroll]);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative overflow-hidden"
    >
      <VideoPlaceholder gradient="blue" />

      <div className="relative z-10">
        {/* Section header */}
        <div className="absolute top-12 left-0 z-20 px-6 lg:px-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] text-accent-violet uppercase"
          >
            What We Build
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-text-primary md:text-4xl"
          >
            Capability Spectrum
          </motion.h2>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={scrollRef}
          className={`flex min-h-screen items-center gap-6 px-6 pt-24 lg:px-12 ${
            enablePinnedScroll ? '' : 'mobile-swipe-track overflow-x-auto snap-x snap-mandatory'
          }`}
        >
          {/* Spacer for header */}
          <div className={`${enablePinnedScroll ? 'w-8 md:w-[120px]' : 'w-2'} shrink-0`} />

          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className={`group glass glow-border relative shrink-0 overflow-hidden p-8 transition-all duration-500 hover:bg-[rgba(23,26,33,0.8)] ${
                enablePinnedScroll
                  ? 'w-[82vw] max-w-[360px] md:w-[52vw] lg:w-[360px]'
                  : 'w-[85vw] max-w-[360px] snap-start'
              }`}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-accent-violet/20 bg-accent-violet/5 text-2xl text-accent-violet transition-all duration-500 group-hover:bg-accent-violet/10 group-hover:shadow-[0_0_20px_rgba(123,97,255,0.15)]">
                {cap.icon}
              </div>

              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-text-primary">
                {cap.title}
              </h3>
              <p className="mt-1 text-sm text-accent-violet/70">{cap.subtitle}</p>

              <div className="mt-4 max-h-40 overflow-hidden opacity-100 transition-all duration-500 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100">
                <p className="text-sm leading-relaxed text-text-secondary">
                  {cap.description}
                </p>
              </div>

              <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-accent-violet/20 via-accent-blue/10 to-transparent" />

              <div className="mt-4 flex items-center gap-2 text-xs text-text-muted transition-colors duration-300 group-hover:text-accent-violet">
                <span>Explore</span>
                <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
