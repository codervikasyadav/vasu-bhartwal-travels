'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/SocialIcons';
import SectionHeader from '@/components/ui/SectionHeader';
import SectionShell from '@/components/ui/SectionShell';
import { SITE_CONFIG } from '@/lib/constants';

const galleryImages = [
  { src: '/images/destinations/kedarnath.png', likes: '2.4K' },
  { src: '/images/destinations/valley-of-flowers.png', likes: '3.1K' },
  { src: '/images/destinations/adi-kailash.png', likes: '1.8K' },
  { src: '/images/destinations/char-dham.png', likes: '4.2K' },
  { src: '/images/destinations/badrinath.png', likes: '2.7K' },
  { src: '/images/destinations/om-parvat.png', likes: '1.5K' },
  { src: '/images/destinations/adventure-trek.png', likes: '3.8K' },
  { src: '/images/hero/hero-bg.png', likes: '5.1K' },
];

export default function InstagramGallery() {
  return (
    <SectionShell className="section-compact !pt-8 lg:!pt-10">
      <div className="container-main flex flex-col items-center">
        <SectionHeader
          eyebrow="Photo Gallery"
          title="Moments From the Trail"
          align="center"
          className="w-full"
          subtitle={
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-cyan-600 hover:underline font-semibold"
            >
              @vikasyadav_ll
            </a>
          }
        />

        <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mt-2">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="relative aspect-square w-full min-h-[140px] rounded-lg overflow-hidden group cursor-pointer border-2 border-border hover:border-cyan-500/40 transition-all shadow-sm"
            >
              <Image src={img.src} alt={`Capture ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="25vw" />
              <div className="absolute inset-0 bg-void/0 group-hover:bg-void/60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-white font-mono text-xs">
                  <Heart className="w-4 h-4 fill-saffron text-saffron" />
                  {img.likes}
                  <InstagramIcon className="w-4 h-4" />
                </div>
              </div>
              <span className="absolute top-2 left-2 font-mono text-[8px] text-white/80 bg-void/50 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                IMG_{String(i + 1).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="w-full text-center mt-6">
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-semibold rounded-md hover:shadow-[0_0_24px_rgba(6,182,212,0.4)] transition-all text-sm"
          >
            <InstagramIcon className="w-4 h-4" /> Access Visual Feed
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
