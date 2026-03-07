'use client';

import { useEffect, useState } from 'react';

export function useDeviceMotionProfile() {
  const [isMobileLike, setIsMobileLike] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches),
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia('(pointer: coarse)');
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setIsMobileLike(window.innerWidth < 768 || mobileQuery.matches);
      setPrefersReducedMotion(reducedQuery.matches);
    };

    update();
    window.addEventListener('resize', update, { passive: true });
    mobileQuery.addEventListener('change', update);
    reducedQuery.addEventListener('change', update);

    return () => {
      window.removeEventListener('resize', update);
      mobileQuery.removeEventListener('change', update);
      reducedQuery.removeEventListener('change', update);
    };
  }, []);

  return { isMobileLike, prefersReducedMotion };
}
