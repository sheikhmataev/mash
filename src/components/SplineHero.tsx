'use client';

import { useEffect, useRef, useState } from 'react';

const PLACEHOLDER_SCENE = '/Hero.splinecode';

function SplineLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border border-accent-violet/20" />
        <div className="absolute inset-0 h-24 w-24 animate-spin-slow rounded-full border-t border-accent-violet/60" />
        <div className="absolute inset-3 h-18 w-18 animate-pulse-glow rounded-full bg-accent-violet/10" />
      </div>
    </div>
  );
}

export default function SplineHero({
  scene = PLACEHOLDER_SCENE,
  className = '',
  playOnlyWhenInView = false,
  deferLoad = false,
  mobileFitContain = false,
}: {
  scene?: string;
  className?: string;
  playOnlyWhenInView?: boolean;
  deferLoad?: boolean;
  mobileFitContain?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!playOnlyWhenInView);
  const [shouldLoad, setShouldLoad] = useState(!deferLoad);
  const [isMobile, setIsMobile] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth < 768 : false),
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(isInView);
  const appRef = useRef<{
    load: (url: string) => Promise<void>;
    dispose: () => void;
    stop?: () => void;
    play?: () => void;
  } | null>(null);
  const normalizedScene = scene.endsWith('.splinecode') ? scene : `${scene}.splinecode`;

  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!deferLoad) return;
    const element = containerRef.current;
    if (!element) return;
    const preloadMargin = isMobile ? '900px 0px' : '500px 0px';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        window.setTimeout(() => setShouldLoad(true), isMobile ? 60 : 120);
        observer.disconnect();
      },
      { rootMargin: preloadMargin, threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [deferLoad, isMobile]);

  useEffect(() => {
    if (!playOnlyWhenInView) return;
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [playOnlyWhenInView]);

  useEffect(() => {
    if (!shouldLoad) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let maxWaitId: ReturnType<typeof setTimeout> | null = null;
    setLoaded(false);

    // Suppress the harmless "Missing property" spam from Spline's
    // internal buildTimeline loop (fires every rAF tick when a scene
    // timeline references a property that was deleted in the editor).
    const origError = console.error;
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0] === 'Missing property') return;
      origError.apply(console, args);
    };

    const init = async () => {
      try {
        const runtimeModule = (await import('@splinetool/runtime')) as {
          Application: new (canvas: HTMLCanvasElement) => {
            load: (url: string) => Promise<void>;
            dispose: () => void;
            stop?: () => void;
            play?: () => void;
          };
        };

        if (cancelled) return;
        const app = new runtimeModule.Application(canvas);
        appRef.current = app;
        await app.load(normalizedScene);
        if (playOnlyWhenInView && !isInViewRef.current) {
          app.stop?.();
        }
      } catch {
        // Scene failed to load — loader fades out so page stays usable.
      } finally {
        if (!cancelled) {
          setLoaded(true);
        }
      }
    };

    void init();
    maxWaitId = setTimeout(() => {
      if (!cancelled) setLoaded(true);
    }, 2800);

    return () => {
      cancelled = true;
      if (maxWaitId) clearTimeout(maxWaitId);
      console.error = origError;
      if (appRef.current) {
        appRef.current.dispose();
        appRef.current = null;
      }
    };
  }, [normalizedScene, shouldLoad, playOnlyWhenInView]);

  useEffect(() => {
    if (!playOnlyWhenInView || !appRef.current) return;
    if (isInView) {
      appRef.current.play?.();
    } else {
      appRef.current.stop?.();
    }
  }, [isInView, playOnlyWhenInView]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 z-10">
          <SplineLoader />
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          transform: mobileFitContain && isMobile ? 'scale(0.9)' : 'scale(1)',
          transformOrigin: 'center',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      />
    </div>
  );
}
