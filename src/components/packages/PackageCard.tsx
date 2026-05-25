'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, MapPin, Star, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import { Tour } from '@/types';
import { TOUR_CATEGORIES } from '@/lib/constants';
import { formatPrice, calculateDiscount } from '@/lib/utils';

interface PackageCardProps {
  tour: Tour;
  index?: number;
}

const difficultyColors: Record<string, string> = {
  Easy: 'bg-mountain/15 text-mountain border-mountain/30',
  Moderate: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/25',
  Challenging: 'bg-saffron/10 text-saffron-dark border-saffron/25',
  Difficult: 'bg-red-500/10 text-red-600 border-red-500/25',
};

function MetaRow({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0 py-1.5 px-2 rounded-md bg-snow/80 border border-border/50">
      <Icon className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
      <span className="text-xs text-muted truncate font-medium">{label}</span>
    </div>
  );
}

export default function PackageCard({ tour, index = 0 }: PackageCardProps) {
  const discount = calculateDiscount(tour.originalPrice, tour.price);
  const categoryLabel = TOUR_CATEGORIES.find((c) => c.slug === tour.category)?.name ?? 'Tour Package';

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link href={`/packages/${tour.slug}`} className="block h-full group">
        <article className="tech-card h-full flex flex-col overflow-hidden">
          <div className="relative h-56 shrink-0 overflow-hidden">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-cyan-900/10" />

            <div className="absolute top-0 left-0 right-0 p-3 flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {tour.popular && (
                  <span className="px-2 py-1 bg-saffron text-void text-[10px] font-bold uppercase tracking-wide rounded flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Hot
                  </span>
                )}
                {tour.featured && !tour.popular && (
                  <span className="px-2 py-1 bg-cyan-500 text-white text-[10px] font-bold uppercase tracking-wide rounded">
                    Featured
                  </span>
                )}
              </div>
              {discount > 0 && (
                <span className="px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded">
                  -{discount}%
                </span>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/95 to-transparent">
              <div className="flex items-end justify-between">
                <div>
                  <p className="ui-label text-cyan-300/90 mb-1">From</p>
                  <span className="font-heading text-2xl font-bold text-white">{formatPrice(tour.price)}</span>
                  {tour.originalPrice > tour.price && (
                    <span className="text-sm text-white/40 line-through ml-2">{formatPrice(tour.originalPrice)}</span>
                  )}
                </div>
                <span className="w-8 h-8 rounded-md bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 p-5">
            <p className="ui-label text-cyan-600 mb-2 text-center">
              {categoryLabel}
            </p>
            <h3 className="font-heading text-lg font-bold text-charcoal group-hover:text-cyan-700 transition-colors line-clamp-2 min-h-[3rem] mb-3 leading-snug">
              {tour.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed line-clamp-2 min-h-[2.75rem] mb-4">
              {tour.shortDescription}
            </p>

            <div className="space-y-1.5 mb-4">
              <MetaRow icon={Clock} label={tour.duration} />
              <MetaRow icon={MapPin} label={tour.startLocation} />
              <MetaRow icon={Users} label={`Max ${tour.maxGroupSize} people`} />
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 mt-auto border-t border-border">
              <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded border ${difficultyColors[tour.difficulty]}`}>
                {tour.difficulty}
              </span>
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-saffron text-saffron" />
                <span className="text-sm font-bold text-charcoal">{tour.rating}</span>
                <span className="text-[10px] text-muted">({tour.reviewCount})</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
