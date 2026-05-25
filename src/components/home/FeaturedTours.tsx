'use client';

import Link from 'next/link';
import { tours } from '@/data/tours';
import PackageCard from '@/components/packages/PackageCard';
import SectionHeader from '@/components/ui/SectionHeader';
import SectionShell from '@/components/ui/SectionShell';
import { ArrowRight } from 'lucide-react';

export default function FeaturedTours() {
  const featuredTours = tours.filter((t) => t.featured).slice(0, 6);

  return (
    <SectionShell id="packages">
      <div className="container-main flex flex-col items-center">
        <SectionHeader
          eyebrow="Popular Packages"
          title="Featured Tour Packages"
          subtitle="High-priority pilgrimage circuits — verified guides, live support, optimized itineraries"
          align="center"
          className="w-full"
        />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {featuredTours.map((tour, index) => (
            <PackageCard key={tour.id} tour={tour} index={index} />
          ))}
        </div>

        <div className="w-full text-center mt-14">
          <Link href="/packages" className="btn btn-secondary text-base group">
            View All Routes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
