"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-mash-black" />

      <motion.div
        className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(201, 168, 76, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, rgba(201, 168, 76, 0.1) 50%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }} />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mash-black to-transparent" />
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block text-xs tracking-[0.4em] uppercase text-mash-gold/80 font-medium px-4 py-2 rounded-full gold-border">
            Digitalisering &middot; AI &middot; Automatisering
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8"
        >
          Fremtidens Teknologi.
          <br />
          <span className="text-gold-gradient">I Dag.</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Vi leverer skreddersydde løsninger innen digitalisering, generativ AI
          og automatisering for moderne bedrifter.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#kontakt"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-mash-gold-dark via-mash-gold to-mash-gold-light text-mash-black font-semibold text-sm tracking-wide hover:shadow-lg hover:shadow-mash-gold/20 transition-all duration-300"
          >
            Start Prosjektet
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#tjenester"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full gold-border text-white/70 hover:text-white hover:bg-white/5 text-sm tracking-wide transition-all duration-300"
          >
            Utforsk Tjenester
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
        >
          <motion.div className="w-1 h-2 rounded-full bg-mash-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
