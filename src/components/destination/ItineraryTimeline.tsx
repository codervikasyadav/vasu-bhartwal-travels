'use client';

import { motion } from 'framer-motion';
import { ItineraryDay } from '@/types';
import { Mountain, MapPin, Utensils, Home, Route } from 'lucide-react';

export default function ItineraryTimeline({ itinerary }: { itinerary: ItineraryDay[] }) {
  return (
    <div className="relative">
      {/* Vertical data line */}
      <div className="absolute left-[23px] top-4 bottom-4 w-px hidden md:block bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent" />

      <div className="space-y-4">
        {itinerary.map((day, i) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.06, duration: 0.45 }}
            className="flex gap-4 md:gap-6"
          >
            {/* Day node */}
            <div className="hidden md:flex flex-col items-center shrink-0 w-12">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-primary flex flex-col items-center justify-center text-white font-mono text-[10px] font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)] border border-cyan-400/30 relative z-10">
                <span className="text-[8px] opacity-70">DAY</span>
                <span className="text-sm leading-none">{String(day.day).padStart(2, '0')}</span>
              </div>
              {i < itinerary.length - 1 && (
                <div className="w-px flex-1 min-h-[16px] bg-cyan-500/20 mt-2" />
              )}
            </div>

            {/* Card */}
            <article className="flex-1 tech-card p-5 md:p-6 group">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <span className="md:hidden font-mono text-[10px] text-cyan-600 tracking-widest uppercase mb-1 block">
                    Day {String(day.day).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-charcoal group-hover:text-cyan-700 transition-colors">
                    {day.title}
                  </h3>
                </div>
                <Route className="w-5 h-5 text-cyan-500/40 shrink-0 group-hover:text-cyan-500 transition-colors" />
              </div>

              <p className="text-muted text-sm leading-relaxed mb-4 border-l-2 border-cyan-500/20 pl-4">
                {day.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {day.altitude && (
                  <MetaChip icon={Mountain} label="ALT" value={day.altitude} />
                )}
                {day.distance && (
                  <MetaChip icon={MapPin} label="DIST" value={day.distance} />
                )}
                {day.meals && (
                  <MetaChip icon={Utensils} label="MEALS" value={day.meals} />
                )}
                {day.accommodation && (
                  <MetaChip icon={Home} label="STAY" value={day.accommodation} />
                )}
              </div>
            </article>
          </motion.div>
        ))}
      </div>

      {/* Timeline footer */}
      <div className="mt-6 flex items-center gap-3 p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/15">
        <span className="font-mono text-[10px] text-cyan-600 tracking-widest">ENDPOINT</span>
        <span className="h-px flex-1 bg-cyan-500/20" />
        <span className="font-mono text-xs text-muted">{itinerary.length} days · route complete</span>
      </div>
    </div>
  );
}

function MetaChip({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-snow border border-border/60 min-w-0">
      <Icon className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
      <span className="font-mono text-[9px] text-cyan-600/70 tracking-wider shrink-0">{label}</span>
      <span className="text-xs text-charcoal truncate font-medium">{value}</span>
    </div>
  );
}
