'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import TechGrid from '@/components/effects/TechGrid';
import FloatingOrbs from '@/components/effects/FloatingOrbs';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image?: string;
  align?: 'center' | 'bottom';
  children?: React.ReactNode;
  className?: string;
  gradient?: boolean;
  code?: string;
}

export default function PageHero({
  title,
  subtitle,
  image,
  align = 'center',
  children,
  className,
  gradient = false,
  code = 'PAGE',
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative flex overflow-hidden bg-void',
        align === 'center'
          ? 'min-h-[50vh] items-center justify-center pt-24'
          : 'min-h-[55vh] items-end pt-24',
        gradient && !image && 'bg-gradient-to-br from-void via-primary-dark to-void',
        className
      )}
    >
      {image && (
        <>
          <Image src={image} alt={title} fill className="object-cover opacity-50" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/60 to-void/90" />
        </>
      )}
      <TechGrid variant="dark" />
      <FloatingOrbs />

      {align !== 'center' && (
        <div className="absolute top-28 left-6 ui-label text-cyan-400/50 hidden md:block">
          {code}
        </div>
      )}

      <div
        className={cn(
          'relative z-10 w-full container-main py-16',
          align === 'center' && 'flex justify-center',
          align === 'bottom' && '!pb-12 !pt-24'
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn(
            'w-full max-w-3xl flex flex-col items-center',
            align === 'center' && 'mx-auto text-center'
          )}
        >
          <span className="ui-eyebrow text-cyan-400 mb-4 block w-full text-center">
            {code}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight w-full text-center">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 w-full text-center text-white/55 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
              {subtitle}
            </p>
          )}
          <div className="hud-line w-full max-w-md mx-auto mt-8" />
          {children}
        </motion.div>
      </div>
    </section>
  );
}
