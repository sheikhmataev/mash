import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASE = {
  smooth: 'power2.out',
  elegant: 'power3.out',
  snappy: 'power4.out',
  slow: 'power1.inOut',
} as const;

export function fadeInUp(
  element: string | Element | Element[],
  options: { delay?: number; duration?: number; y?: number; stagger?: number } = {}
) {
  const { delay = 0, duration = 0.9, y = 40, stagger = 0.15 } = options;
  return gsap.from(element, {
    y,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: EASE.elegant,
  });
}

export function createScrollReveal(
  trigger: string | Element,
  elements: string | Element | Element[],
  options: { y?: number; stagger?: number; start?: string } = {}
) {
  const { y = 50, stagger = 0.12, start = 'top 85%' } = options;
  return gsap.from(elements, {
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
    },
    y,
    opacity: 0,
    duration: 0.9,
    stagger,
    ease: EASE.elegant,
  });
}

export { gsap, ScrollTrigger };
