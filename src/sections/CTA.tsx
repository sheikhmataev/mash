'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CTA() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
      {/* Gradient transition background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, var(--bg-deep) 0%, rgba(123, 97, 255, 0.06) 40%, rgba(123, 97, 255, 0.1) 60%, var(--bg-deep) 100%)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-[600px] w-[600px] rounded-full opacity-20 blur-[150px]"
            style={{ background: 'radial-gradient(circle, rgba(123, 97, 255, 0.3), transparent 70%)' }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs tracking-[0.3em] text-accent-violet uppercase">
            Start Building
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-text-primary md:text-5xl">
            Enter Partnership
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text-secondary">
            Tell us about your vision. We&apos;ll architect the intelligence behind it.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="glass glow-border mt-12 p-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs tracking-wider text-text-muted uppercase"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full rounded-lg border border-white/5 bg-bg-deep/60 px-4 py-3 text-sm text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent-violet/30 focus:shadow-[0_0_20px_rgba(123,97,255,0.1)]"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="mb-1.5 block text-xs tracking-wider text-text-muted uppercase"
              >
                Company
              </label>
              <input
                id="company"
                type="text"
                className="w-full rounded-lg border border-white/5 bg-bg-deep/60 px-4 py-3 text-sm text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent-violet/30 focus:shadow-[0_0_20px_rgba(123,97,255,0.1)]"
                placeholder="Your company"
              />
            </div>

            <div>
              <label
                htmlFor="vision"
                className="mb-1.5 block text-xs tracking-wider text-text-muted uppercase"
              >
                What are you trying to build?
              </label>
              <textarea
                id="vision"
                rows={4}
                className="w-full resize-none rounded-lg border border-white/5 bg-bg-deep/60 px-4 py-3 text-sm text-text-primary outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent-violet/30 focus:shadow-[0_0_20px_rgba(123,97,255,0.1)]"
                placeholder="Describe your vision..."
              />
            </div>

            <button
              type="submit"
              className="group relative mt-2 w-full overflow-hidden rounded-lg bg-accent-violet py-3.5 text-sm font-medium text-white transition-all duration-500 hover:shadow-[0_0_30px_rgba(123,97,255,0.35)]"
            >
              <span className="relative z-10">{submitted ? 'Message Sent' : 'Send Message'}</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
            {submitted && (
              <p className="text-center text-xs tracking-wide text-accent-cyan">
                Thanks! We received your message and will get back to you.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
