'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SectionReveal({ children, className = '', id }: SectionRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const elements = ref.current.querySelectorAll('[data-reveal]');
    elements.forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.08,
        ease: 'power3.out',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (ref.current?.contains(t.trigger as Element)) t.kill();
      });
    };
  }, []);

  return (
    <section ref={ref} id={id} className={`section-padding relative ${className}`}>
      {children}
    </section>
  );
}
