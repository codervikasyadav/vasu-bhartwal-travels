'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight, Mountain, MapPin, Star } from 'lucide-react';
import SnowfallEffect from '@/components/effects/Snowfall';
import TechGrid from '@/components/effects/TechGrid';
import FloatingOrbs from '@/components/effects/FloatingOrbs';
import TechBadge from '@/components/ui/TechBadge';
import { SITE_CONFIG } from '@/lib/constants';

const stats = [
  { label: 'TOURS', value: SITE_CONFIG.stats.tours, icon: Mountain },
  { label: 'TRAVELERS', value: SITE_CONFIG.stats.travelers, icon: MapPin },
  { label: 'RATING', value: SITE_CONFIG.stats.rating, icon: Star },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ lat: '30.0869° N', lng: '78.2676° E', alt: '3,658m' });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -60]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCoords({
        lat: `${(30 + Math.sin(now.getSeconds() / 10) * 0.01).toFixed(4)}° N`,
        lng: `${(78 + Math.cos(now.getSeconds() / 8) * 0.01).toFixed(4)}° E`,
        alt: `${3580 + (now.getSeconds() % 20)}m`,
      });
    };
    tick();
    const id = setInterval(tick, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-void">
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <Image src="/images/hero/hero-bg.png" alt="Himalayan Mountains" fill className="object-cover opacity-70" priority quality={90} />
      </motion.div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-void/90 via-void/50 to-void/95" />
      <TechGrid variant="dark" />
      <FloatingOrbs />
      <SnowfallEffect />

      {/* HUD corners */}
      <div className="absolute top-24 left-4 md:left-8 z-20 text-[10px] text-cyan-400/70 hidden md:block">
        <p className="font-semibold tracking-wide">Sacred Himalayan Journeys</p>
        <p className="text-white/50 mt-1 font-medium">Est. {SITE_CONFIG.founded} · Uttarakhand</p>
      </div>
      <div className="absolute top-24 right-4 md:right-8 z-20 text-[10px] text-right text-cyan-400/70 hidden md:block">
        <p>Location {coords.lat}</p>
        <p>{coords.lng}</p>
        <p className="text-saffron/80">Altitude {coords.alt}</p>
      </div>

      <motion.div
        className="relative z-[15] w-full container-main pt-28 pb-20 flex flex-col items-center"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <TechBadge variant="cyan" pulse>
              Premium Pilgrimage Tours · Est. {SITE_CONFIG.founded}
            </TechBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6 text-center"
          >
            <span className="gradient-text-dark">Sacred Journeys</span>
            <span className="block mt-2 text-white/95 font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Engineered for the <span className="text-cyan-400">Himalayas</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed text-center"
          >
            Precision-planned pilgrimage &amp; adventure routes across Uttarakhand — real-time support, certified guides, zero compromise.
          </motion.p>

          <div className="flex flex-col items-center w-full max-w-2xl mx-auto gap-10 sm:gap-12 md:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-5 sm:gap-8 md:gap-10 w-full px-2"
          >
            <Link href="/packages" className="btn btn-primary text-base !px-8 !py-4 w-full sm:w-auto sm:min-w-[200px]">
              Explore Packages <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn btn-outline text-base !px-8 !py-4 w-full sm:w-auto sm:min-w-[200px]">
              Book Your Trip
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="grid grid-cols-3 gap-5 sm:gap-6 md:gap-8 w-full px-2 pt-2"
          >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="hero-stat-card"
                >
                  <stat.icon className="w-4 h-4 text-cyan-400 mb-2 shrink-0" />
                  <p className="font-heading text-lg md:text-xl font-bold text-white leading-none">{stat.value}</p>
                  <p className="stat-label text-cyan-300">{stat.label}</p>
                </motion.div>
              ))}
          </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-[15] hud-line" />

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[15] flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="font-mono text-[10px] text-cyan-400/50 tracking-widest">SCROLL</span>
        <ChevronDown className="w-5 h-5 text-cyan-400/60" />
      </motion.div>
    </section>
  );
}
