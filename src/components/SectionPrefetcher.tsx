'use client';

import { useEffect } from 'react';
import { PROJECTS } from '@/lib/constants';

export default function SectionPrefetcher() {
  useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const constrainedNetwork =
      connection?.saveData || connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
    if (constrainedNetwork) return;

    const warmup = () => {
      void import('@splinetool/runtime');
      void fetch('/Process.splinecode', { cache: 'force-cache' }).catch(() => undefined);
      void fetch('/Hero.splinecode', { cache: 'force-cache' }).catch(() => undefined);
      PROJECTS.slice(0, 2).forEach((project) => {
        void fetch(project.previewImage, { cache: 'force-cache' }).catch(() => undefined);
      });
    };

    const win = window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (typeof win.requestIdleCallback === 'function') {
      idleId = win.requestIdleCallback(() => warmup(), { timeout: 1600 });
    } else {
      timeoutId = setTimeout(warmup, 700);
    }

    return () => {
      if (idleId !== null && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return null;
}
