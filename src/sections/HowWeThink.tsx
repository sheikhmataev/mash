'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '@/lib/animations';
import { PHILOSOPHY } from '@/lib/constants';

export default function HowWeThink() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const pillars = sectionRef.current.querySelectorAll('.pillar');
    const lines = sectionRef.current.querySelectorAll('.connect-line');

    pillars.forEach((pillar, i) => {
      gsap.from(pillar, {
        scrollTrigger: {
          trigger: pillar,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        delay: i * 0.2,
        ease: 'power3.out',
      });
    });

    lines.forEach((line, i) => {
      gsap.from(line, {
        scrollTrigger: {
          trigger: line,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        scaleX: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.3 + i * 0.2,
        ease: 'power2.out',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (sectionRef.current?.contains(t.trigger as Element)) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(123, 97, 255, 0.15), transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] text-accent-violet uppercase"
          >
            Our Philosophy
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-text-primary md:text-5xl"
          >
            How We Think
          </motion.h2>
        </div>

        <div className="flex flex-col items-center gap-0 md:flex-row md:gap-0">
          {PHILOSOPHY.map((item, i) => (
            <div key={item.title} className="flex items-center">
              <div className="pillar group glass glow-border relative w-full p-8 transition-all duration-500 hover:bg-[rgba(23,26,33,0.8)] md:w-[320px]">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-accent-violet/20 bg-accent-violet/5 font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-accent-violet">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
              {i < PHILOSOPHY.length - 1 && (
                <div className="connect-line mx-2 hidden h-[1px] w-12 origin-left bg-gradient-to-r from-accent-violet/30 to-accent-blue/20 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
