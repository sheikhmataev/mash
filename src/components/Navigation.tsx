'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(NAV_LINKS[0]?.href ?? '#capabilities');
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousActive = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const menu = mobileMenuRef.current;
    const focusables = menu?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusables?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }
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
      previousActive?.focus();
    };
  }, [mobileOpen]);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', '')).filter(Boolean);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;
        const sectionId = visibleEntries[0].target.id;
        setActiveHref(`#${sectionId}`);
      },
      {
        root: null,
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'glass py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link href="/" className="flex items-center gap-3" aria-label="Go to homepage">
            <div className="h-8 w-12 overflow-hidden rounded-md bg-white/95 p-1 shadow-[0_0_12px_rgba(255,255,255,0.18)] sm:h-9 sm:w-14">
              <Image
                src="/assets/logo-mark.webp"
                alt="Mash Partners logo"
                width={112}
                height={75}
                sizes="112px"
                priority
                className="h-full w-full scale-[2.15] object-contain"
              />
            </div>
            <span className="hidden font-[family-name:var(--font-space-grotesk)] text-lg font-semibold tracking-tight text-text-primary sm:inline">
              Mash Partners
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                aria-current={activeHref === link.href ? 'page' : undefined}
                className={`text-sm transition-colors duration-300 ${
                  activeHref === link.href
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full border border-accent-violet/30 bg-accent-violet/10 px-5 py-2 text-sm text-accent-violet transition-all duration-300 hover:bg-accent-violet/20 hover:shadow-[0_0_20px_rgba(123,97,255,0.2)]"
            >
              Work With Us
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-dialog"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-text-primary"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-px w-6 bg-text-primary"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-text-primary"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu-dialog"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-bg-deep/95 backdrop-blur-xl md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveHref(link.href);
                  setMobileOpen(false);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                aria-current={activeHref === link.href ? 'page' : undefined}
                className={`font-[family-name:var(--font-space-grotesk)] text-2xl ${
                  activeHref === link.href ? 'text-accent-violet' : 'text-text-primary'
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 rounded-full border border-accent-violet/30 bg-accent-violet/10 px-8 py-3 text-lg text-accent-violet"
            >
              Work With Us
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
