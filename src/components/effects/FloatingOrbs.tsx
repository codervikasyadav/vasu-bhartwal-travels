'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function FloatingOrbs({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)} aria-hidden>
      <motion.div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/20 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-primary/25 blur-[90px]"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-saffron/15 blur-[80px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
