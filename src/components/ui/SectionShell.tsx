import { cn } from '@/lib/utils';
import TechGrid from '@/components/effects/TechGrid';

interface SectionShellProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  grid?: boolean;
  id?: string;
}

export default function SectionShell({ children, className, dark = false, grid = true, id }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        'section relative overflow-hidden',
        dark ? 'bg-void text-white' : 'bg-snow',
        className
      )}
    >
      {grid && <TechGrid variant={dark ? 'dark' : 'light'} />}
      <div className="relative z-10">{children}</div>
    </section>
  );
}
