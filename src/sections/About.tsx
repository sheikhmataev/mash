'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Horizon background */}
      <div className="absolute inset-0">
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2"
          style={{
            background: 'linear-gradient(0deg, rgba(123, 97, 255, 0.04) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute bottom-1/3 left-0 right-0 h-[1px] opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(123, 97, 255, 0.3), rgba(58, 168, 255, 0.2), transparent)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] text-accent-violet uppercase"
        >
          Our Vision
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-8"
        >
          <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-relaxed text-text-primary md:text-4xl lg:text-5xl">
            &ldquo;We partner with companies ready for the next{' '}
            <span className="text-gradient">technological shift.</span>&rdquo;
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary"
        >
          Mash Partners is not a web agency. We are a technology partner building
          the future — engineering intelligent systems, automating complexity, and
          creating digital experiences that define what comes next.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mx-auto mt-12 h-[1px] w-24 bg-gradient-to-r from-transparent via-accent-violet/40 to-transparent"
        />
      </div>
    </section>
  );
}
