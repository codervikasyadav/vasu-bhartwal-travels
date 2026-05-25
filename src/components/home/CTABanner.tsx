'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Zap } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import TechGrid from '@/components/effects/TechGrid';
import FloatingOrbs from '@/components/effects/FloatingOrbs';

export default function CTABanner() {
  return (
    <section className="section relative overflow-hidden bg-void">
      <TechGrid variant="dark" />
      <FloatingOrbs />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-saffron/5" />

      <div className="container-main relative z-10 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 ui-eyebrow text-cyan-400">
              <Zap className="w-4 h-4" /> Begin Your Adventure
            </div>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight text-center">
            Plan Your <span className="gradient-text-dark">Himalayan Adventure</span>
          </h2>
          <p className="text-center text-white/55 text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            Book early and unlock <span className="text-saffron font-semibold">20% early-bird savings</span> — limited slots per season
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn btn-primary text-base !px-8 !py-4 w-full sm:w-auto">
              Start Booking <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`tel:${SITE_CONFIG.phone}`} className="btn btn-outline text-base !px-8 !py-4 w-full sm:w-auto font-mono">
              <Phone className="w-4 h-4" /> {SITE_CONFIG.phone}
            </a>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 hud-line" />
    </section>
  );
}
