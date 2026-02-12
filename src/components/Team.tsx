"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User } from "lucide-react";

const team = [
  {
    name: "Bilal Rasulovich Mataev",
    role: "Medgründer & Styremedlem",
    bio: "Strategi og forretningsutvikling med fokus på AI-drevne løsninger for norsk næringsliv.",
  },
  {
    name: "Abdulsamad Sheikh",
    role: "Medgründer & Daglig leder",
    bio: "Fullstack-utvikler og tech lead med ekspertise innen moderne webutvikling og kunstig intelligens.",
  },
  {
    name: "Abdul-Malik Rustamovisj Dagijev",
    role: "Medgründer & Styremedlem",
    bio: "Spesialisert på prosessoptimalisering, digitalisering og automatisering av virksomhetsprosesser.",
  },
];

function TeamCard({
  member,
  index,
}: {
  member: (typeof team)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" as const }}
      className="group glass-card rounded-2xl p-8 text-center hover:gold-border transition-all duration-500 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-mash-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-mash-gold/20 to-mash-purple/20 flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:border-mash-gold/30 transition-colors duration-500">
          <User size={32} className="text-white/40 group-hover:text-mash-gold/60 transition-colors duration-500" />
        </div>

        <h3 className="text-lg font-semibold mb-1 tracking-tight">
          {member.name}
        </h3>
        <p className="text-mash-gold/70 text-sm mb-4 font-medium">
          {member.role}
        </p>
        <p className="text-white/35 text-sm leading-relaxed">{member.bio}</p>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="team" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-purple-glow opacity-20" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-mash-gold/60 block mb-4">
            Nøkkelpersoner
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Møt <span className="text-gold-gradient">Teamet</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
