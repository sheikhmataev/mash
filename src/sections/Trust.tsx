'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { useDeviceMotionProfile } from '@/lib/useDeviceMotionProfile';

const PARTNERS = [
  { name: 'Kronomods', src: '/assets/partners/kronomods.png', scale: 1.5 },
  { name: 'Lillehammer Taxi', src: '/assets/partners/lillehammer-taxi.png', scale: 1.45 },
  { name: 'Lillehammer Moske', src: '/assets/partners/lillehammer-moske.png', scale: 1.45 },
];

export default function Trust() {
  const { isMobileLike, prefersReducedMotion } = useDeviceMotionProfile();
  const lowMotion = isMobileLike || prefersReducedMotion;
  const sliderDuration = lowMotion ? 34 : 24;

  return (
    <section id="partners" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[540px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[130px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(123, 97, 255, 0.24), rgba(58, 168, 255, 0.16) 45%, transparent 78%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-6 lg:px-12">
        <div className="mb-10 text-center md:mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] text-accent-violet uppercase"
          >
            Our Partners
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: lowMotion ? 0.42 : 0.72 }}
            className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-text-primary md:text-5xl"
          >
            Trusted by teams we build with
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06, duration: lowMotion ? 0.38 : 0.65 }}
            className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base"
          >
            Long-term collaboration across mobility, commerce, and community platforms.
          </motion.p>
        </div>

        <div className="relative overflow-hidden px-1 py-5 md:px-2 md:py-7">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(120deg, rgba(123,97,255,0.08), rgba(12,18,32,0.55), rgba(58,168,255,0.08))',
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-6 bg-gradient-to-r from-bg-deep via-bg-deep/65 to-transparent md:w-12" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-6 bg-gradient-to-l from-bg-deep via-bg-deep/65 to-transparent md:w-12" />

          <InfiniteSlider
            gap={28}
            duration={sliderDuration}
            durationOnHover={sliderDuration + 10}
            reverse
            paused={prefersReducedMotion}
            className="w-full"
          >
            {PARTNERS.map((partner) => (
              <div
                key={`row-1-${partner.name}`}
                className="group relative flex h-20 min-w-[170px] items-center justify-center rounded-2xl border border-white/12 bg-[rgba(255,255,255,0.08)] px-3 shadow-[0_10px_40px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:scale-[1.01] hover:bg-[rgba(255,255,255,0.12)] md:h-28 md:min-w-[240px] md:px-5"
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 48%, rgba(255,255,255,0.01) 100%)',
                  }}
                />
                <div className="relative z-10 h-14 w-[180px] overflow-hidden md:h-20 md:w-[280px]">
                  <Image
                    src={partner.src}
                    alt={`${partner.name} logo`}
                    width={360}
                    height={144}
                    sizes="(max-width: 768px) 180px, 280px"
                    className="h-full w-full object-contain opacity-100"
                    style={{ transform: `scale(${partner.scale})` }}
                  />
                </div>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
