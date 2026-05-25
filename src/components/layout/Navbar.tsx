'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG, TOUR_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);

  const isSolid = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setPackagesOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500',
          isSolid
            ? 'glass-dark shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-cyan-500/10'
            : 'bg-transparent'
        )}
      >
        <div className="container-main">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-[4.5rem] lg:h-[4.75rem] gap-4 lg:gap-8">
            <Link href="/" className="flex items-center gap-3 group shrink-0 min-w-0">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="Travel Wale Bhai Ji"
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-cyan-500/30 group-hover:ring-cyan-400/60 transition-all"
                  priority
                  unoptimized
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-mountain rounded-full border-2 border-void animate-pulse-glow" />
              </div>
              <div className="hidden sm:block">
                <span className="font-heading text-base lg:text-lg font-bold text-white block leading-tight">
                  Travel Wale Bhai Ji
                </span>
                <span className="text-[10px] font-semibold text-cyan-400/80 tracking-[0.15em] uppercase">
                  Sacred Journeys
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.name === 'Packages' && setPackagesOpen(true)}
                  onMouseLeave={() => link.name === 'Packages' && setPackagesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1.5 px-4 xl:px-5 py-2.5 text-sm font-medium rounded-md transition-all whitespace-nowrap',
                      pathname === link.href || (link.href === '/packages' && pathname.startsWith('/packages'))
                        ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/20'
                        : 'text-white/75 hover:text-cyan-300 hover:bg-white/5 border border-transparent'
                    )}
                  >
                    {link.name}
                    {link.name === 'Packages' && (
                      <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', packagesOpen && 'rotate-180')} />
                    )}
                  </Link>

                  {link.name === 'Packages' && (
                    <AnimatePresence>
                      {packagesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 glass-dark rounded-lg border border-cyan-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden py-2 z-[60]"
                        >
                          <p className="font-mono text-[9px] text-cyan-400/60 px-4 py-2 tracking-widest border-b border-white/5">
                            SELECT_ROUTE
                          </p>
                          {TOUR_CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/packages?category=${cat.slug}`}
                              className="block px-4 py-2.5 text-white/70 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors text-sm border-l-2 border-transparent hover:border-cyan-500"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="hidden xl:flex items-center gap-2 text-white/60 hover:text-cyan-300 transition-colors text-sm font-mono"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span className="hidden 2xl:inline">{SITE_CONFIG.phone}</span>
              </a>
              <Link href="/contact" className="btn btn-primary hidden sm:inline-flex !py-2.5 !px-4 !text-xs !rounded-md">
                Book Now
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-cyan-500/10 rounded-md border border-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-void/80 z-40 lg:hidden backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 w-[min(340px,90vw)] h-full bg-void-light z-50 lg:hidden overflow-y-auto border-l border-cyan-500/20"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded-full" unoptimized />
                    <div>
                      <span className="font-heading text-white font-bold">Travel Wale Bhai Ji</span>
                      <p className="font-mono text-[9px] text-cyan-400/60 tracking-widest">MOBILE_NAV</p>
                    </div>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="w-9 h-9 flex items-center justify-center text-white/50 hover:text-white rounded-md border border-white/10">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div key={link.name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          'block px-4 py-3 rounded-md transition-colors text-base font-medium',
                          pathname === link.href ? 'text-cyan-300 bg-cyan-500/10' : 'text-white/80 hover:text-cyan-300 hover:bg-white/5'
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="font-mono text-[9px] text-cyan-400/50 tracking-widest px-4 mb-3">ROUTES</p>
                  {TOUR_CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/packages?category=${cat.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2 text-white/55 hover:text-cyan-300 text-sm transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-3 px-4 py-2 text-white/65 hover:text-cyan-300 font-mono text-sm">
                    <Phone className="w-4 h-4" /> {SITE_CONFIG.phone}
                  </a>
                  <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn btn-primary w-full !py-3">
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
