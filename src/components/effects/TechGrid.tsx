'use client';

import { cn } from '@/lib/utils';

interface TechGridProps {
  className?: string;
  variant?: 'light' | 'dark';
  animated?: boolean;
}

export default function TechGrid({ className, variant = 'dark', animated = true }: TechGridProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden',
        className
      )}
      aria-hidden
    >
      <div
        className={cn(
          'absolute inset-0 opacity-[0.35]',
          variant === 'dark'
            ? 'bg-[linear-gradient(rgba(6,182,212,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.12)_1px,transparent_1px)] bg-[size:48px_48px]'
            : 'bg-[linear-gradient(rgba(12,43,78,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(12,43,78,0.06)_1px,transparent_1px)] bg-[size:40px_40px]'
        )}
      />
      {animated && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-scan" />
      )}
      <div
        className={cn(
          'absolute inset-0',
          variant === 'dark'
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,14,23,0.85)_70%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(250,249,247,0.9)_80%)]'
        )}
      />
    </div>
  );
}
