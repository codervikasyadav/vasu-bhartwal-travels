'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, MapPin, Users, Star, Mountain } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import TechGrid from '@/components/effects/TechGrid';
import FloatingOrbs from '@/components/effects/FloatingOrbs';
import TechBadge from '@/components/ui/TechBadge';

interface TourDetailHeroProps {
  tour: {
    title: string;
    slug: string;
    image: string;
    duration: string;
    startLocation: string;
    maxGroupSize: number;
    altitude: string;
    rating: number;
    reviewCount: number;
    difficulty: string;
    price: number;
    originalPrice: number;
    dayCount: number;
  };
  discount: number;
}

export default function TourDetailHero({ tour, discount }: TourDetailHeroProps) {
  return (
    <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-void pt-24">
      <Image src={tour.image} alt={tour.title} fill className="object-cover opacity-55" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/30" />
      <TechGrid variant="dark" />
      <FloatingOrbs />

      <div className="absolute top-28 left-6 ui-label text-cyan-400/60 hidden md:block">
        <p>{tour.title}</p>
        <p className="text-white/40 mt-1 font-normal normal-case tracking-normal text-[11px]">{tour.dayCount} day journey</p>
      </div>

      <div className="relative z-10 w-full container-main pb-10 md:pb-14">
        <nav className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/50 mb-6">
          <Link href="/" className="hover:text-cyan-300 transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/packages" className="hover:text-cyan-300 transition-colors">PACKAGES</Link>
          <span>/</span>
          <span className="text-cyan-400/80 truncate max-w-[200px] sm:max-w-none">{tour.title.toUpperCase()}</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <TechBadge variant="cyan">{tour.difficulty}</TechBadge>
              {discount > 0 && (
                <span className="font-mono text-[10px] px-2.5 py-1.5 bg-red-500/90 text-white rounded border border-red-400/50 uppercase tracking-wider">
                  -{discount}% OFF
                </span>
              )}
              <span className="font-mono text-[10px] px-2.5 py-1.5 bg-white/10 text-white/70 rounded border border-white/10 uppercase tracking-wider">
                {tour.dayCount} Days
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              {tour.title}
            </h1>

            <div className="flex flex-wrap gap-3">
              {[
                { icon: Clock, label: tour.duration },
                { icon: MapPin, label: tour.startLocation },
                { icon: Users, label: `Max ${tour.maxGroupSize}` },
                { icon: Mountain, label: tour.altitude },
                { icon: Star, label: `${tour.rating} (${tour.reviewCount})` },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md glass-dark text-white/75 text-xs font-mono border border-white/10"
                >
                  <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-dark rounded-xl px-6 py-7 border border-cyan-500/20 corner-accent min-w-[240px] lg:text-right"
          >
            <p className="ui-label text-cyan-400/80 mb-2 lg:text-right">Package price</p>
            <div className="flex items-baseline gap-2 lg:justify-end">
              <span className="font-heading text-4xl font-bold text-white">{formatPrice(tour.price)}</span>
              {tour.originalPrice > tour.price && (
                <span className="text-lg text-white/40 line-through">{formatPrice(tour.originalPrice)}</span>
              )}
            </div>
            <p className="font-mono text-xs text-white/45 mt-1">per person</p>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 hud-line z-10" />
    </section>
  );
}
