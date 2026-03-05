'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LAB_ENTRIES } from '@/lib/constants';
import { createNeuralNetwork } from '@/lib/particles';

function LabCard({
  entry,
  index,
}: {
  entry: (typeof LAB_ENTRIES)[number];
  index: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const colors = ['123, 97, 255', '58, 168, 255', '0, 255, 209', '255, 60, 172'];
    const net = createNeuralNetwork(canvasRef.current, {
      nodeCount: 12,
      color: colors[index % colors.length],
    });
    return () => net.destroy();
  }, [index]);

  const statusColors: Record<string, string> = {
    'Active Research': 'text-accent-cyan border-accent-cyan/20 bg-accent-cyan/5',
    Prototype: 'text-accent-violet border-accent-violet/20 bg-accent-violet/5',
    'In Development': 'text-accent-blue border-accent-blue/20 bg-accent-blue/5',
    Concept: 'text-accent-magenta border-accent-magenta/20 bg-accent-magenta/5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.7 }}
      className="group glass glow-border relative overflow-hidden p-6 transition-all duration-500 hover:bg-[rgba(23,26,33,0.8)]"
    >
      {/* Canvas neural network background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-20 transition-opacity duration-500 group-hover:opacity-40"
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`rounded-full border px-3 py-1 text-[10px] tracking-wider uppercase ${
              statusColors[entry.status] || 'text-text-muted border-text-muted/20'
            }`}
          >
            {entry.status}
          </span>
          <div className="flex items-center gap-1">
            <div className="h-1 w-1 animate-pulse-glow rounded-full bg-accent-violet" />
            <div
              className="h-1 w-1 animate-pulse-glow rounded-full bg-accent-blue"
              style={{ animationDelay: '0.5s' }}
            />
            <div
              className="h-1 w-1 animate-pulse-glow rounded-full bg-accent-cyan"
              style={{ animationDelay: '1s' }}
            />
          </div>
        </div>

        <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-text-primary">
          {entry.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {entry.description}
        </p>

        {/* Animated border bottom */}
        <div className="mt-5 h-[1px] overflow-hidden bg-white/5">
          <div
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-accent-violet/40 to-transparent"
            style={{ animation: 'sweep 4s ease-in-out infinite' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function AILab() {
  return (
    <section id="lab" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(58, 168, 255, 0.2), transparent 70%)' }}
        />
        <div
          className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(123, 97, 255, 0.15), transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-12">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] text-accent-violet uppercase"
          >
            Research & Development
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-text-primary md:text-5xl"
          >
            AI Lab
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-3 max-w-lg text-text-secondary"
          >
            Active experiments and internal tools pushing the boundaries of what&apos;s possible.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {LAB_ENTRIES.map((entry, i) => (
            <LabCard key={entry.title} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
