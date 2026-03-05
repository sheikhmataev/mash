'use client';

import { METRICS } from '@/lib/constants';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function Trust() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[120px]"
          style={{ background: 'linear-gradient(90deg, rgba(123, 97, 255, 0.3), rgba(58, 168, 255, 0.2))' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="animate-float text-center"
              style={{ animationDelay: `${METRICS.indexOf(metric) * 0.5}s` }}
            >
              <AnimatedCounter
                value={metric.value}
                suffix={metric.suffix}
                label={metric.label}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
