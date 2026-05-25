'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';

export default function DestinationGallery({ images, title }: { images: string[]; title: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const open = (i: number) => { setActiveIndex(i); setLightboxOpen(true); };
  const next = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <span className="ui-label text-cyan-600 shrink-0">Photo Gallery</span>
        <span className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
        <span className="font-mono text-xs text-muted">{images.length} captures</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => open(i)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative aspect-[4/3] rounded-lg overflow-hidden group border border-border hover:border-cyan-500/40 transition-all text-left"
          >
            <Image src={img} alt={`${title} photo ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="300px" />
            <div className="absolute inset-0 bg-void/0 group-hover:bg-void/50 transition-all flex items-center justify-center">
              <Expand className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="absolute top-2 left-2 font-mono text-[8px] text-white/90 bg-void/60 px-1.5 py-0.5 rounded border border-white/10">
              IMG_{String(i + 1).padStart(2, '0')}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-void/95 flex items-center justify-center backdrop-blur-sm"
            onClick={() => setLightboxOpen(false)}
          >
            <div className="absolute top-6 left-6 font-mono text-xs text-cyan-400/60">
              VIEW::{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>
            <button type="button" onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 w-10 h-10 glass-dark rounded-lg flex items-center justify-center text-white/70 hover:text-white border border-white/10">
              <X className="w-5 h-5" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 glass-dark rounded-lg flex items-center justify-center text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 glass-dark rounded-lg flex items-center justify-center text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20">
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-[90vw] h-[80vh] max-w-5xl border border-cyan-500/20 rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[activeIndex]} alt={`${title} ${activeIndex + 1}`} fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
