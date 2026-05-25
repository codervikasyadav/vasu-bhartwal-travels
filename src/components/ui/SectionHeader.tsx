'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: React.ReactNode;
  dark?: boolean;
  align?: 'center' | 'left';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  dark = false,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={cn(
        'mb-8 lg:mb-10 w-full flex flex-col',
        isCenter ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-3xl items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'flex items-center gap-3 mb-3 w-full',
            isCenter && 'justify-center'
          )}
        >
          <span
            className={cn(
              'h-px w-8 bg-gradient-to-r from-transparent',
              dark ? 'to-cyan-400/70' : 'to-cyan-500'
            )}
          />
          <span className={cn('ui-eyebrow text-xs shrink-0', dark ? 'text-cyan-400' : 'text-cyan-600')}>
            {eyebrow}
          </span>
          <span
            className={cn(
              'h-px w-8 bg-gradient-to-l from-transparent',
              dark ? 'to-cyan-400/70' : 'to-cyan-500'
            )}
          />
        </div>
      )}
      <h2
        className={cn(
          'font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight w-full',
          isCenter ? 'text-center' : 'text-left',
          dark ? 'text-white' : 'text-charcoal'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <div
          className={cn(
            'mt-4 w-full text-base md:text-lg leading-relaxed',
            isCenter ? 'text-center max-w-2xl mx-auto' : 'text-left',
            dark ? 'text-white/60' : 'text-muted'
          )}
        >
          {subtitle}
        </div>
      )}
      <div
        className={cn(
          'mt-4 flex items-center gap-2 w-full',
          isCenter && 'justify-center'
        )}
      >
        <span className="h-1 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-saffron animate-border-flow" />
        <span className={cn('ui-label text-[10px]', dark ? 'text-cyan-400/50' : 'text-muted')}>•</span>
        <span className="h-1 w-12 rounded-full bg-gradient-to-l from-cyan-500 to-saffron animate-border-flow" />
      </div>
    </motion.header>
  );
}
