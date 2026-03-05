'use client';

import { motion } from 'framer-motion';
import { TECH_CATEGORIES } from '@/lib/constants';

export default function TechStack() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-[400px] w-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(123, 97, 255, 0.3), transparent 70%)' }}
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
            Our Ecosystem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-text-primary md:text-5xl"
          >
            Technology Stack
          </motion.h2>
        </div>

        {/* Orbital layout */}
        <div className="relative flex flex-col items-center">
          {/* Center core */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 mb-12 flex h-28 w-28 items-center justify-center"
          >
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-accent-violet/20" />
            <div className="absolute inset-2 animate-spin-slow rounded-full border border-accent-blue/10" style={{ animationDirection: 'reverse', animationDuration: '20s' }} />
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent-violet/30 bg-accent-violet/10">
              <span className="font-[family-name:var(--font-space-grotesk)] text-xs font-bold text-accent-violet">AI</span>
            </div>
          </motion.div>

          {/* Category rings */}
          <div className="grid w-full gap-6 md:grid-cols-3 lg:grid-cols-5">
            {TECH_CATEGORIES.map((category, i) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="glass group p-5 text-center transition-all duration-500 hover:bg-[rgba(23,26,33,0.8)] hover:shadow-[0_0_30px_rgba(123,97,255,0.08)]"
              >
                <h3 className="mb-3 font-[family-name:var(--font-space-grotesk)] text-sm font-semibold tracking-wide text-accent-violet uppercase">
                  {category.name}
                </h3>
                <div className="flex flex-col gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm text-text-secondary transition-colors duration-300 group-hover:text-text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
