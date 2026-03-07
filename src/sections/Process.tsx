'use client';

import { motion } from 'framer-motion';
import VideoPlaceholder from '@/components/VideoPlaceholder';
import dynamic from 'next/dynamic';

const SplineHero = dynamic(() => import('@/components/SplineHero'), {
  ssr: false,
});

export default function Process() {
  return (
    <section id="process" className="section-padding relative">
      <VideoPlaceholder gradient="default" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] text-accent-violet uppercase"
          >
            How We Deliver
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-text-primary md:text-5xl"
          >
            Connected Delivery Pipeline
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto mt-4 max-w-2xl text-sm tracking-wide text-text-secondary md:text-base"
          >
            One integrated flow from architecture to scale.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="glass glow-border overflow-hidden rounded-2xl"
        >
          <div className="relative h-[320px] max-h-[72vh] w-full sm:h-[400px] md:h-[520px]">
            <SplineHero
              scene="/Process.splinecode"
              className="h-full w-full"
              playOnlyWhenInView
              deferLoad
              mobileFitContain
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
