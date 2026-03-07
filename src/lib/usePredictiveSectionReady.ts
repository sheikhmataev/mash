'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

interface PredictiveReadyOptions {
  rootMargin?: string;
  threshold?: number;
  idleTimeoutMs?: number;
  enabled?: boolean;
  onPreload?: () => void;
}

export function usePredictiveSectionReady(
  targetRef: RefObject<HTMLElement | null>,
  {
    rootMargin = '650px 0px',
    threshold = 0.01,
    idleTimeoutMs = 1200,
    enabled = true,
    onPreload,
  }: PredictiveReadyOptions = {},
) {
  const [ready, setReady] = useState(!enabled);
  const preloadDoneRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (preloadDoneRef.current) return;
    preloadDoneRef.current = true;

    if (!onPreload) return;

    const win = window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const run = () => {
      onPreload();
    };

    if (typeof win.requestIdleCallback === 'function') {
      idleId = win.requestIdleCallback(run, { timeout: idleTimeoutMs });
    } else {
      timeoutId = setTimeout(run, Math.min(idleTimeoutMs, 700));
    }

    return () => {
      if (idleId !== null && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [enabled, idleTimeoutMs, onPreload]);

  useEffect(() => {
    if (!enabled) return;
    if (ready) return;
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, ready, rootMargin, targetRef, threshold]);

  return ready;
}
