"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer id="kontakt" className="relative pt-32 pb-8 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-mash-gold/60 block mb-4">
            Kontakt oss
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Klar for å <span className="text-gold-gradient">starte?</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto leading-relaxed mb-10">
            Ta kontakt med oss i dag for en uforpliktende samtale om hvordan vi
            kan hjelpe din virksomhet med å ta steget inn i fremtiden.
          </p>
          <a
            href="mailto:abdulsamad@sheikh.as"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-mash-gold-dark via-mash-gold to-mash-gold-light text-mash-black font-semibold text-sm tracking-wide hover:shadow-lg hover:shadow-mash-gold/20 transition-all duration-300"
          >
            <Mail size={16} />
            Send oss en e-post
          </a>
        </motion.div>

        <div className="glass rounded-2xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-mash-gold/10 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-mash-gold" />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">E-post</h4>
                <a
                  href="mailto:abdulsamad@sheikh.as"
                  className="text-sm text-white/40 hover:text-mash-gold transition-colors"
                >
                  abdulsamad@sheikh.as
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-mash-gold/10 flex items-center justify-center shrink-0">
                <Phone size={18} className="text-mash-gold" />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Telefon</h4>
                <a
                  href="tel:+4746961676"
                  className="text-sm text-white/40 hover:text-mash-gold transition-colors"
                >
                  +47 469 61 676
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-mash-gold/10 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-mash-gold" />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Adresse</h4>
                <p className="text-sm text-white/40">
                  Storgata 144, 2615 Lillehammer
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} Mash Partners AS. Alle rettigheter
            reservert.
          </div>
          <div className="text-sm text-white/20">
            Org.nr: 936 620 566 &middot; Lillehammer, Norge
          </div>
        </div>
      </div>
    </footer>
  );
}
