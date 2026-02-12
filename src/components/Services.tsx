"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Cog, Code2 } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Generativ AI & LLM Utvikling",
    description:
      "Vi bygger intelligente løsninger med de nyeste AI-modellene. Fra skreddersydde chatbots til avanserte språkmodeller tilpasset din virksomhet.",
    features: ["GPT & LLM Integrasjon", "AI-drevne Workflows", "NLP-løsninger"],
  },
  {
    icon: Cog,
    title: "Prosessautomatisering & Digitalisering",
    description:
      "Transformer manuelle prosesser til effektive, automatiserte systemer. Vi digitaliserer hele verdikjeden for økt produktivitet.",
    features: ["RPA & Automatisering", "Systemintegrasjon", "Digital Transformasjon"],
  },
  {
    icon: Code2,
    title: "Skreddersydd Programvareutvikling",
    description:
      "Moderne, skalerbare applikasjoner bygget med de beste teknologiene. Fra web til mobil – vi leverer kvalitet i hver kodelinje.",
    features: ["Fullstack Utvikling", "Cloud & DevOps", "API-design"],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" as const }}
      className="group relative glass-card rounded-2xl p-8 hover:gold-border hover:gold-glow transition-all duration-500"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-mash-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-mash-gold/10 flex items-center justify-center mb-6 group-hover:bg-mash-gold/20 transition-colors duration-300">
          <Icon size={24} className="text-mash-gold" />
        </div>

        <h3 className="text-xl font-semibold mb-3 tracking-tight">
          {service.title}
        </h3>

        <p className="text-white/40 text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {service.features.map((feature) => (
            <span
              key={feature}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/50 border border-white/5"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="tjenester" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-purple-glow opacity-30" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-mash-gold/60 block mb-4">
            Hva vi gjør
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Våre <span className="text-gold-gradient">Tjenester</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
