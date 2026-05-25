import Link from 'next/link';
import { Mountain, Home, ArrowRight } from 'lucide-react';
import TechGrid from '@/components/effects/TechGrid';
import FloatingOrbs from '@/components/effects/FloatingOrbs';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-void px-4 relative overflow-hidden">
      <TechGrid variant="dark" />
      <FloatingOrbs />
      <div className="relative z-10 text-center max-w-lg corner-accent p-10 glass-dark rounded-xl">
        <Mountain className="w-14 h-14 text-cyan-400 mx-auto mb-6 animate-float" />
        <p className="font-mono text-xs text-cyan-400/60 tracking-widest mb-2">ERROR::ROUTE_NOT_FOUND</p>
        <h1 className="font-heading text-7xl md:text-8xl font-bold text-white mb-2">404</h1>
        <h2 className="font-heading text-xl text-white/70 mb-4">Signal Lost in the Mountains</h2>
        <p className="text-white/45 text-sm leading-relaxed mb-10 font-mono">
          The requested route does not exist in our expedition database. Recalibrating...
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn btn-primary w-full sm:w-auto"><Home className="w-4 h-4" /> Return to Base</Link>
          <Link href="/packages" className="btn btn-outline w-full sm:w-auto"><ArrowRight className="w-4 h-4" /> Browse Routes</Link>
        </div>
      </div>
    </div>
  );
}
