"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Zap, Shield, TrendingUp } from "lucide-react";

const stats = [
  { label: "Teknologier", value: "20+", icon: Zap },
  { label: "Kundetilfredshet", value: "100%", icon: Shield },
  { label: "Prosjekter", value: "∞", icon: TrendingUp },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="om-oss" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-mash-gold/60 block mb-4">
              Om oss
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Bygget for{" "}
              <span className="text-gold-gradient">fremtiden</span>
            </h2>
            <p className="text-white/40 leading-relaxed mb-6">
              Mash Partners AS er et norsk teknologiselskap som spesialiserer seg
              på digitalisering, kunstig intelligens og automatisering. Vi
              kombinerer dyp teknisk kompetanse med en forståelse av norsk
              næringsliv for å levere løsninger som faktisk skaper verdi.
            </p>
            <p className="text-white/40 leading-relaxed mb-8">
              Basert i Lillehammer, jobber vi med bedrifter over hele Norge som
              ønsker å ta steget inn i fremtiden. Vår tilnærming er alltid
              skreddersydd – ingen standardpakker, bare presise løsninger for
              dine unike behov.
            </p>

            <div className="flex items-center gap-2 text-white/50">
              <MapPin size={16} className="text-mash-gold" />
              <span className="text-sm">Lillehammer, Norge</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" as const }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-mash-gold/5 to-transparent rounded-bl-full" />

              <h3 className="text-lg font-semibold mb-2">Vår Filosofi</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Vi tror på at teknologi skal være en katalysator for vekst, ikke
                en barriere. Derfor bygger vi løsninger som er intuitive,
                skalerbare og fremtidsrettede. Kvalitet over kvantitet – alltid.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.1,
                      ease: "easeOut" as const,
                    }}
                    className="glass-card rounded-xl p-5 text-center"
                  >
                    <Icon
                      size={18}
                      className="text-mash-gold mx-auto mb-3"
                    />
                    <div className="text-2xl font-bold text-gold-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/40">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
