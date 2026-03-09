'use client';

import { useEffect, useState } from 'react';
import CustomCursor from '@/components/CustomCursor';
import ParticleOverlay from '@/components/ParticleOverlay';

export default function DeferredVisualEffects() {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;
    const win = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const activate = () => setReady(true);

    if (typeof win.requestIdleCallback === 'function') {
      idleId = win.requestIdleCallback(activate, { timeout: 1200 });
    } else {
      timerId = globalThis.setTimeout(activate, 450);
    }

    return () => {
      if (idleId !== null && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleId);
      }
      if (timerId !== null) {
        clearTimeout(timerId);
      }
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <CustomCursor />
      {!isMobile && <ParticleOverlay />}
    </>
  );
}
