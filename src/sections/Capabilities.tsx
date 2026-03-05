'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { CAPABILITIES } from '@/lib/constants';
import VideoPlaceholder from '@/components/VideoPlaceholder';

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || !scrollRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth - window.innerWidth;

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
  }, []);

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
          className="flex min-h-screen items-center gap-8 px-6 pt-24 lg:px-12"
          style={{ width: `${CAPABILITIES.length * 420 + 200}px` }}
        >
          {/* Spacer for header */}
          <div className="w-[120px] shrink-0" />

          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group glass glow-border relative w-[360px] shrink-0 overflow-hidden p-8 transition-all duration-500 hover:bg-[rgba(23,26,33,0.8)]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-accent-violet/20 bg-accent-violet/5 text-2xl text-accent-violet transition-all duration-500 group-hover:bg-accent-violet/10 group-hover:shadow-[0_0_20px_rgba(123,97,255,0.15)]">
                {cap.icon}
              </div>

              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-text-primary">
                {cap.title}
              </h3>
              <p className="mt-1 text-sm text-accent-violet/70">{cap.subtitle}</p>

              <div className="mt-4 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
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
