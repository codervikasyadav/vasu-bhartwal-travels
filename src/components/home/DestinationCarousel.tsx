'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import SectionShell from '@/components/ui/SectionShell';
import TechGrid from '@/components/effects/TechGrid';

const destinations = [
  { name: 'Kedarnath', slug: 'kedarnath', image: '/images/destinations/kedarnath.png', tours: 3, elev: '3,583m' },
  { name: 'Badrinath', slug: 'badrinath', image: '/images/destinations/badrinath.png', tours: 2, elev: '3,300m' },
  { name: 'Adi Kailash', slug: 'adi-kailash', image: '/images/destinations/adi-kailash.png', tours: 2, elev: '5,945m' },
  { name: 'Om Parvat', slug: 'om-parvat', image: '/images/destinations/om-parvat.png', tours: 1, elev: '4,100m' },
  { name: 'Valley of Flowers', slug: 'adventure', image: '/images/destinations/valley-of-flowers.png', tours: 4, elev: '3,658m' },
  { name: 'Char Dham', slug: 'char-dham', image: '/images/destinations/char-dham.png', tours: 2, elev: 'Multi' },
];

export default function DestinationCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' });
  };

  return (
    <SectionShell dark grid className="!pb-8">
      <div className="container-main mb-10 flex flex-col items-center">
        <SectionHeader
          eyebrow="Destinations"
          title="Target Destinations"
          subtitle="Pick a destination — matching tours appear instantly"
          dark
          align="center"
          className="w-full"
        />
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 glass-dark rounded-lg flex items-center justify-center text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 glass-dark rounded-lg flex items-center justify-center text-cyan-300 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto hide-scrollbar px-6 md:px-14 lg:px-20 pb-8 snap-x snap-mandatory">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="min-w-[300px] md:min-w-[340px] snap-center shrink-0"
            >
              <Link href={`/packages?category=${dest.slug}`}>
                <div className="relative h-[400px] rounded-lg overflow-hidden group border border-cyan-500/10 hover:border-cyan-500/40 transition-all">
                  <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="340px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
                  <TechGrid variant="dark" className="opacity-30" />

                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className="font-mono text-[9px] text-cyan-400 bg-void/60 px-2 py-1 rounded border border-cyan-500/20">
                      ALT {dest.elev}
                    </span>
                    <span className="w-8 h-8 rounded-md bg-cyan-500/20 flex items-center justify-center text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-2xl font-bold text-white mb-1">{dest.name}</h3>
                    <p className="font-mono text-xs text-cyan-400">{dest.tours} routes available</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}