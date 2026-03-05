'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  delay?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  delay = 0,
  onMouseEnter,
  onMouseLeave,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={
        hover
          ? {
              y: -6,
              transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
            }
          : undefined
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`glass ${glow ? 'glow-violet' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
