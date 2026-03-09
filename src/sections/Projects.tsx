'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PROJECTS } from '@/lib/constants';
import { useDeviceMotionProfile } from '@/lib/useDeviceMotionProfile';
import { usePredictiveSectionReady } from '@/lib/usePredictiveSectionReady';

export default function Projects() {
  const { isMobileLike, prefersReducedMotion } = useDeviceMotionProfile();
  const lowMotion = isMobileLike || prefersReducedMotion;
  const [expandedPreview, setExpandedPreview] = useState<number | null>(null);
  const [previewOpenMode, setPreviewOpenMode] = useState<'button' | 'hover' | null>(null);
  const [isOverlayHovered, setIsOverlayHovered] = useState(false);
  const [missingPreviewIndices, setMissingPreviewIndices] = useState<number[]>([]);
  const previewDialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const openTimeoutRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const HOVER_INTENT_DELAY_MS = 420;
  const HOVER_CLOSE_DELAY_MS = 120;
  const projectsReady = usePredictiveSectionReady(sectionRef, {
    rootMargin: '750px 0px',
  });

  useEffect(() => {
    if (expandedPreview !== null) {
      document.body.classList.add('live-preview-open');
    } else {
      document.body.classList.remove('live-preview-open');
    }

    return () => {
      document.body.classList.remove('live-preview-open');
      if (openTimeoutRef.current) window.clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    };
  }, [expandedPreview]);

  useEffect(() => {
    if (expandedPreview === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandedPreview(null);
        setPreviewOpenMode(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [expandedPreview]);

  useEffect(() => {
    if (expandedPreview === null || previewOpenMode !== 'button') return;
    if (expandedPreview === null) return;
    const previousFocus = triggerRef.current;
    document.body.style.overflow = 'hidden';
    const dialog = previewDialogRef.current;
    const focusables = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusables?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previousFocus?.focus();
    };
  }, [expandedPreview, previewOpenMode]);

  const handleCardMouseEnter = (index: number) => {
    if (lowMotion) return;
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    if (openTimeoutRef.current) window.clearTimeout(openTimeoutRef.current);
    openTimeoutRef.current = window.setTimeout(() => {
      setPreviewOpenMode('hover');
      setExpandedPreview(index);
    }, HOVER_INTENT_DELAY_MS);
  };

  const handleCardMouseLeave = () => {
    if (lowMotion) return;
    if (openTimeoutRef.current) {
      window.clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      if (!isOverlayHovered && previewOpenMode === 'hover') {
        setExpandedPreview(null);
        setPreviewOpenMode(null);
      }
    }, HOVER_CLOSE_DELAY_MS);
  };

  const handleOverlayMouseEnter = () => {
    if (previewOpenMode !== 'hover') return;
    setIsOverlayHovered(true);
    if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
  };

  const handleOverlayMouseLeave = () => {
    setIsOverlayHovered(false);
    setExpandedPreview(null);
    setPreviewOpenMode(null);
  };

  const markPreviewMissing = (index: number) => {
    setMissingPreviewIndices((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  return (
    <section ref={sectionRef} id="projects" className="section-padding relative overflow-hidden">
      {/* Exhibition space background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 animate-gradient opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 20% 30%, rgba(123, 97, 255, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(58, 168, 255, 0.04) 0%, transparent 50%), linear-gradient(180deg, rgba(11, 13, 16, 0) 0%, rgba(17, 19, 23, 0.5) 50%, rgba(11, 13, 16, 0) 100%)',
            backgroundSize: '200% 200%',
          }}
        />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(123, 97, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 97, 255, 0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] text-accent-violet uppercase"
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-text-primary md:text-5xl"
          >
            Digital Gallery
          </motion.h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsReady ? PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={lowMotion ? { once: true, amount: 0.14 } : { once: true, margin: '-50px' }}
              transition={{
                duration: lowMotion ? 0.4 : 0.7,
                delay: lowMotion ? i * 0.04 : i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={
                lowMotion
                  ? undefined
                  : { y: -6, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
              }
              onMouseEnter={() => handleCardMouseEnter(i)}
              onMouseLeave={handleCardMouseLeave}
              className="glass group relative p-6 transition-all duration-500 hover:shadow-[0_0_40px_rgba(123,97,255,0.1)]"
            >
              <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-lg border border-white/5 bg-bg-deep/80">
                {!missingPreviewIndices.includes(i) ? (
                  <Image
                    src={project.previewImage}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={i < 2 ? 'eager' : 'lazy'}
                    priority={i < 2}
                    onError={() => markPreviewMissing(i)}
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      background: `radial-gradient(ellipse at ${30 + i * 10}% ${40 + i * 5}%, rgba(123, 97, 255, 0.08) 0%, rgba(17, 19, 23, 0.8) 70%)`,
                    }}
                  >
                    <div className="rounded-full border border-accent-violet/20 bg-accent-violet/10 px-3 py-1.5 text-[10px] tracking-wider text-accent-violet uppercase">
                      Add preview in public/assets
                    </div>
                  </div>
                )}
              </div>

              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-text-primary">
                {project.title}
              </h3>

              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-accent-violet/10 bg-accent-violet/5 px-2.5 py-0.5 text-[10px] tracking-wider text-accent-violet/70 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {project.description}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Open ${project.title} live website (opens in new tab)`}
                  className="inline-flex items-center gap-2 text-xs text-text-muted transition-colors duration-300 group-hover:text-accent-violet"
                >
                  <span>Open Live Website</span>
                  <svg className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H18m0 0v4.5M18 6l-7.5 7.5M7.5 18h-1.5A1.5 1.5 0 014.5 16.5V6A1.5 1.5 0 016 4.5h10.5A1.5 1.5 0 0118 6v1.5" />
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setPreviewOpenMode('button');
                    setExpandedPreview(i);
                  }}
                  className="inline-flex rounded-full border border-white/15 px-4 py-1.5 text-xs text-text-primary transition-colors duration-300 hover:border-accent-violet/30 hover:text-accent-violet"
                >
                  Preview Site
                </button>
              </div>
            </motion.div>
          )) : Array.from({ length: 3 }).map((_, i) => (
            <div key={`project-skeleton-${i}`} className="glass shimmer relative p-6">
              <div className="mb-5 aspect-[16/10] rounded-lg border border-white/5 bg-white/8" />
              <div className="h-5 w-2/3 rounded bg-white/10" />
              <div className="mt-3 space-y-2">
                <div className="h-3 w-full rounded bg-white/8" />
                <div className="h-3 w-4/5 rounded bg-white/8" />
              </div>
              <div className="mt-5 h-3 w-1/2 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>

      {/* Expanded preview overlay */}
      <AnimatePresence>
        {expandedPreview !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-preview-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="live-preview-overlay fixed inset-0 z-[100] flex items-center justify-center bg-bg-deep/95 backdrop-blur-xl"
            onMouseEnter={handleOverlayMouseEnter}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleOverlayMouseLeave();
              }
            }}
          >
            <motion.div
              ref={previewDialogRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onMouseLeave={() => {
                if (previewOpenMode === 'hover') {
                  handleOverlayMouseLeave();
                }
              }}
              className="relative h-[85vh] w-[90vw] overflow-hidden rounded-2xl border border-accent-violet/20 shadow-[0_0_80px_rgba(123,97,255,0.2)]"
            >
              <iframe
                src={PROJECTS[expandedPreview].url}
                title={`${PROJECTS[expandedPreview].title} live preview`}
                className="h-full w-full bg-white"
              />
              
              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 glass border-t border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4
                      id="project-preview-title"
                      className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-text-primary"
                    >
                      {PROJECTS[expandedPreview].title}
                    </h4>
                    <p className="mt-0.5 text-xs text-text-muted">Live preview</p>
                  </div>
                  <a
                    href={PROJECTS[expandedPreview].url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${PROJECTS[expandedPreview].title} full site (opens in new tab)`}
                    className="rounded-full bg-accent-violet px-4 py-2 text-xs font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(123,97,255,0.4)]"
                  >
                    Open Full Site
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleOverlayMouseLeave}
                  className="absolute right-3 top-3 rounded-full border border-white/20 bg-bg-deep/70 px-2 py-1 text-[10px] tracking-wide text-text-primary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
