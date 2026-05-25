'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import SectionHeader from '@/components/ui/SectionHeader';
import SectionShell from '@/components/ui/SectionShell';

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase();

  return (
    <SectionShell className="section-compact !pb-8 lg:!pb-10">
      <div className="container-main max-w-4xl w-full flex flex-col items-center">
        <SectionHeader
          eyebrow="Guest Reviews"
          title="Traveler Stories"
          subtitle="Real reviews from pilgrims and adventurers who traveled with us"
          align="center"
          className="w-full"
        />

        <div className="relative min-h-[320px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="tech-card p-8 md:p-10 relative corner-accent"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-cyan-500/10" />
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < testimonials[active].rating ? 'fill-saffron text-saffron' : 'text-border'}`} />
                ))}
              </div>
              <p className="text-charcoal/80 text-lg leading-relaxed mb-8 font-light">
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-primary flex items-center justify-center text-white font-bold text-sm">
                  {getInitials(testimonials[active].name)}
                </div>
                <div>
                  <p className="font-semibold text-charcoal">{testimonials[active].name}</p>
                  <p className="font-mono text-xs text-muted">{testimonials[active].tour} · {testimonials[active].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'bg-cyan-500 w-10' : 'bg-border w-3 hover:bg-cyan-300'}`}
              aria-label={`Report ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
