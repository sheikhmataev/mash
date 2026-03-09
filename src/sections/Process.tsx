'use client';

import { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import VideoPlaceholder from '@/components/VideoPlaceholder';
import dynamic from 'next/dynamic';
import ProcessMobileFlow from '@/components/ProcessMobileFlow';
import { usePredictiveSectionReady } from '@/lib/usePredictiveSectionReady';
import { useDeviceMotionProfile } from '@/lib/useDeviceMotionProfile';

const SplineHero = dynamic(() => import('@/components/SplineHero'), {
  ssr: false,
});

export default function Process() {
  const { isMobileLike, prefersReducedMotion } = useDeviceMotionProfile();
  const lowMotion = isMobileLike || prefersReducedMotion;
  const sectionRef = useRef<HTMLElement>(null);
  const preloadProcessScene = useCallback(() => {
    void import('@splinetool/runtime');
    void fetch('/Process.splinecode', { cache: 'force-cache' }).catch(() => undefined);
  }, []);
  const processReady = usePredictiveSectionReady(sectionRef, {
    rootMargin: '900px 0px',
    onPreload: preloadProcessScene,
  });

  return (
    <section ref={sectionRef} id="process" className="section-padding relative">
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
            transition={{ delay: 0.05, duration: lowMotion ? 0.45 : 0.8 }}
            className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-text-primary md:text-5xl"
          >
            Connected Delivery Pipeline
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: lowMotion ? 0.4 : 0.8 }}
            className="mx-auto mt-4 max-w-2xl text-sm tracking-wide text-text-secondary md:text-base"
          >
            One integrated flow from architecture to scale.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: lowMotion ? 0.45 : 0.9 }}
          className="glass glow-border rounded-2xl"
        >
          <div
            className={`relative w-full overflow-hidden rounded-2xl sm:aspect-auto md:h-[520px] ${
              isMobileLike
                ? 'h-auto'
                : 'h-[clamp(360px,72vh,500px)] sm:h-[400px]'
            }`}
          >
            {processReady ? (
              isMobileLike ? (
                <ProcessMobileFlow reducedMotion={prefersReducedMotion} />
              ) : (
                <div
                  className="h-full w-full overflow-hidden"
                  style={{ touchAction: 'pan-y' }}
                >
                  <div className="h-full w-full">
                    <SplineHero
                      scene="/Process.splinecode"
                      className="h-full w-full"
                      playOnlyWhenInView
                      replayEveryMs={prefersReducedMotion ? 0 : 11000}
                      replayDelayMs={prefersReducedMotion ? 0 : 120}
                      deferLoad
                      disablePointerEvents
                    />
                  </div>
                </div>
              )
            ) : (
              <div className="shimmer absolute inset-0 flex items-center justify-center bg-bg-surface/35">
                <div className="rounded-full border border-accent-violet/20 px-4 py-2 text-xs tracking-[0.2em] text-text-secondary uppercase">
                  Loading pipeline
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
