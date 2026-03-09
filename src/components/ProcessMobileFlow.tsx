'use client';

import { motion } from 'framer-motion';
import { PROCESS_PIPELINE_LABELS } from '@/lib/constants';

type ProcessMobileFlowProps = {
  reducedMotion: boolean;
};

export default function ProcessMobileFlow({ reducedMotion }: ProcessMobileFlowProps) {
  const connectorCount = PROCESS_PIPELINE_LABELS.length - 1;
  const STAGGER = 0.35;
  const TRAVEL_DURATION = 0.68;
  const TURNAROUND_PAUSE = 0.22;
  const downPhaseEnd = connectorCount * STAGGER + TRAVEL_DURATION;
  const upPhaseStart = downPhaseEnd + TURNAROUND_PAUSE;
  const upPhaseEnd = upPhaseStart + connectorCount * STAGGER + TRAVEL_DURATION;
  const cycleDuration = upPhaseEnd + TURNAROUND_PAUSE;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl px-4 py-6">
      <div className="pointer-events-none absolute inset-0 opacity-45">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(123,97,255,0.18),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(58,168,255,0.14),transparent_42%)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(123, 97, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />

      <ol className="relative z-10 mx-auto flex max-w-xl flex-col gap-7 pb-3">
        {PROCESS_PIPELINE_LABELS.map((label, index) => {
          const isLast = index === PROCESS_PIPELINE_LABELS.length - 1;
          const alignRight = index % 2 === 1;
          const downStart = index * STAGGER;
          const downEnd = downStart + TRAVEL_DURATION;
          const upStart = upPhaseStart + (connectorCount - 1 - index) * STAGGER;
          const upEnd = upStart + TRAVEL_DURATION;

          return (
            <motion.li
              key={label}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 18, x: reducedMotion ? 0 : alignRight ? 10 : -10 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.45, delay: reducedMotion ? 0 : index * 0.06 }}
              className={`relative w-[88%] ${alignRight ? 'self-end' : 'self-start'}`}
            >
              <div className="glass group relative overflow-hidden rounded-xl border border-white/12 bg-bg-surface/40 px-4 py-3 shadow-[0_0_22px_rgba(123,97,255,0.09)]">
                {!reducedMotion && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(123,97,255,0.18),transparent)]"
                    animate={{ x: ['-120%', '130%'] }}
                    transition={{ duration: 2.4, delay: index * 0.12, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
                  />
                )}
                <p className="text-[12px] leading-snug tracking-[0.06em] text-text-primary uppercase">
                  {label}
                </p>
              </div>

              {!isLast && (
                <div
                  className={`pointer-events-none absolute -bottom-8 h-8 w-[1px] bg-gradient-to-b from-accent-violet/60 to-accent-blue/30 ${
                    alignRight ? 'left-6' : 'right-6'
                  }`}
                >
                  {!reducedMotion && (
                    <>
                      <motion.span
                        className="absolute left-1/2 top-0 h-3 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-accent-cyan to-transparent shadow-[0_0_10px_rgba(0,255,209,0.7)]"
                        animate={{ y: [0, 23], opacity: [0, 1, 0] }}
                        transition={{
                          duration: TRAVEL_DURATION,
                          delay: downStart,
                          repeat: Infinity,
                          repeatDelay: cycleDuration - TRAVEL_DURATION,
                          ease: 'easeInOut',
                        }}
                      />
                      <motion.span
                        className="absolute left-1/2 top-[23px] h-3 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-t from-accent-cyan to-transparent shadow-[0_0_10px_rgba(0,255,209,0.7)]"
                        animate={{ y: [0, -23], opacity: [0, 1, 0] }}
                        transition={{
                          duration: TRAVEL_DURATION,
                          delay: upStart,
                          repeat: Infinity,
                          repeatDelay: cycleDuration - TRAVEL_DURATION,
                          ease: 'easeInOut',
                        }}
                      />
                      <motion.span
                        className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(0,255,209,0.7)]"
                        animate={{ y: [0, 23], opacity: [0, 1, 0] }}
                        transition={{
                          duration: TRAVEL_DURATION,
                          delay: downStart,
                          repeat: Infinity,
                          repeatDelay: cycleDuration - TRAVEL_DURATION,
                          ease: 'easeInOut',
                        }}
                      />
                      <motion.span
                        className="absolute left-1/2 top-[23px] h-2 w-2 -translate-x-1/2 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(0,255,209,0.7)]"
                        animate={{ y: [0, -23], opacity: [0, 1, 0] }}
                        transition={{
                          duration: TRAVEL_DURATION,
                          delay: upStart,
                          repeat: Infinity,
                          repeatDelay: cycleDuration - TRAVEL_DURATION,
                          ease: 'easeInOut',
                        }}
                      />
                    </>
                  )}
                </div>
              )}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
