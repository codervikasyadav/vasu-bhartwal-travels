'use client';

import { Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { tours } from '@/data/tours';
import { TOUR_CATEGORIES } from '@/lib/constants';
import PackageCard from '@/components/packages/PackageCard';
import PageHero from '@/components/ui/PageHero';
import { cn } from '@/lib/utils';

function categoryHref(slug: string) {
  return slug === 'all' ? '/packages' : `/packages?category=${slug}`;
}

function PackagesContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const filteredTours = useMemo(() => {
    if (activeCategory === 'all') return tours;
    return tours.filter((t) => t.category === activeCategory);
  }, [activeCategory]);

  const activeLabel = TOUR_CATEGORIES.find((c) => c.slug === activeCategory)?.name ?? 'All Packages';

  return (
    <>
      <PageHero
        title="Our Tour Packages"
        subtitle="Browse curated pilgrimage routes — live availability across all Himalayan destinations"
        image="/images/hero/hero-bg.png"
        code="PACKAGES"
      />

      <section className="sticky top-[4.5rem] lg:top-[4.75rem] z-30 glass-light border-b border-cyan-500/10 shadow-sm">
        <div className="container-main">
          <p className="ui-label text-cyan-600/80 py-3 border-b border-border/50 text-center">Browse by category</p>
          <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 py-4 min-w-max sm:min-w-0 sm:flex-wrap">
              {TOUR_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <Link
                    key={cat.slug}
                    href={categoryHref(cat.slug)}
                    scroll={false}
                    className={cn(
                      'px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wide whitespace-nowrap transition-all shrink-0 border',
                      isActive
                        ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.3)]'
                        : 'bg-white text-muted border-border hover:border-cyan-500/40 hover:text-cyan-700'
                    )}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-snow relative">
        <div className="container-main">
          <p className="font-mono text-xs text-muted mb-8 text-center">
            Showing <span className="text-cyan-600 font-bold">{filteredTours.length}</span> packages
            {activeCategory !== 'all' && (
              <> in <span className="text-charcoal font-bold">{activeLabel}</span></>
            )}
          </p>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {filteredTours.map((tour, index) => (
              <PackageCard key={tour.id} tour={tour} index={index} />
            ))}
          </motion.div>

          {filteredTours.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted text-lg mb-4">No tours found in this category</p>
              <Link href="/packages" className="btn btn-secondary text-sm">
                View All Packages
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function PackagesFallback() {
  return (
    <>
      <PageHero
        title="Our Tour Packages"
        subtitle="Choose from our carefully curated collection of pilgrimage and adventure tours"
        image="/images/hero/hero-bg.png"
      />
      <section className="sticky top-[4.5rem] lg:top-20 z-30 bg-white/95 border-b border-border">
        <div className="container-main py-4">
          <div className="h-10 bg-cream rounded-full w-48 animate-pulse" />
        </div>
      </section>
      <section className="section bg-snow">
        <div className="container-main grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-96 bg-cream rounded-xl animate-pulse" />
          ))}
        </div>
      </section>
    </>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<PackagesFallback />}>
      <PackagesContent />
    </Suspense>
  );
}
