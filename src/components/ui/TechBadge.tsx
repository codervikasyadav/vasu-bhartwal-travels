import { cn } from '@/lib/utils';

interface TechBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'cyan' | 'gold' | 'outline';
  className?: string;
  pulse?: boolean;
}

export default function TechBadge({ children, variant = 'default', className, pulse }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 ui-eyebrow text-[10px] sm:text-xs px-3 py-1.5 rounded-md border',
        variant === 'default' && 'bg-white/10 border-white/20 text-white/90',
        variant === 'cyan' && 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300',
        variant === 'gold' && 'bg-saffron/10 border-saffron/30 text-saffron',
        variant === 'outline' && 'bg-transparent border-border text-muted',
        pulse && 'animate-pulse-glow',
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
}
