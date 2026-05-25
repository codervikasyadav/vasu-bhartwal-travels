import { cn } from '@/lib/utils';

interface TourSectionBlockProps {
  code: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function TourSectionBlock({ code, title, children, className, id }: TourSectionBlockProps) {
  return (
    <section id={id} className={cn('scroll-mt-28', className)}>
      <header className="mb-8 max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/50" />
          <span className="font-mono text-[10px] text-cyan-600 tracking-[0.25em] uppercase shrink-0">
            {code}
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500/50" />
        </div>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal">{title}</h2>
      </header>
      <div className="text-left">{children}</div>
    </section>
  );
}
