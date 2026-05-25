import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants';
import { InstagramIcon, FacebookIcon, YoutubeIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import TechGrid from '@/components/effects/TechGrid';

const popularTours = [
  { name: 'Char Dham Yatra', href: '/packages/char-dham-yatra' },
  { name: 'Kedarnath Yatra', href: '/packages/kedarnath-yatra' },
  { name: 'Adi Kailash Trek', href: '/packages/adi-kailash-om-parvat' },
  { name: 'Valley of Flowers', href: '/packages/valley-of-flowers-trek' },
  { name: 'Badrinath Yatra', href: '/packages/badrinath-yatra' },
  { name: 'Chopta Tungnath', href: '/packages/chopta-tungnath-trek' },
];

const socialLinks = [
  { icon: InstagramIcon, href: SITE_CONFIG.social.instagram, label: 'Instagram' },
  { icon: FacebookIcon, href: SITE_CONFIG.social.facebook, label: 'Facebook' },
  { icon: YoutubeIcon, href: SITE_CONFIG.social.youtube, label: 'YouTube' },
  { icon: TwitterIcon, href: SITE_CONFIG.social.twitter, label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="relative bg-void text-white overflow-hidden border-t border-cyan-500/10">
      <TechGrid variant="dark" animated={false} />
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent relative z-10" />

      <div className="container-main py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <Image src="/images/logo.png" alt="Travel Wale Bhai Ji" width={48} height={48} className="rounded-full ring-2 ring-cyan-500/30 group-hover:ring-cyan-400/60 transition-all" unoptimized />
              <div>
                <span className="font-heading text-lg font-bold text-white block">Travel Wale Bhai Ji</span>
                <span className="font-mono text-[9px] text-cyan-400/60 tracking-widest">HQ::UTTARAKHAND</span>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Curated Himalayan journeys — pilgrimage, adventure, and sacred routes across Uttarakhand.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:text-cyan-300 transition-all text-white/60" aria-label={social.label}>
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[10px] text-cyan-400/70 tracking-widest uppercase mb-5">Navigation</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/55 hover:text-cyan-300 transition-colors text-sm">{link.name}</Link>
                </li>
              ))}
              <li><Link href="/packages" className="text-white/55 hover:text-cyan-300 transition-colors text-sm">All Routes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] text-cyan-400/70 tracking-widest uppercase mb-5">Routes</h3>
            <ul className="space-y-2.5">
              {popularTours.map((tour) => (
                <li key={tour.name}>
                  <Link href={tour.href} className="text-white/55 hover:text-cyan-300 transition-colors text-sm">{tour.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] text-cyan-400/70 tracking-widest uppercase mb-5">Contact_Node</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-white/55 text-sm">{SITE_CONFIG.address}</span>
              </li>
              <li>
                <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-3 text-white/55 hover:text-cyan-300 text-sm transition-colors">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />{SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 text-white/55 hover:text-cyan-300 text-sm transition-colors">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />{SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-white/55 text-sm">Mon – Sat: 9AM – 7PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-heading font-bold text-white mb-1">Mission Briefing</h3>
              <p className="text-white/45 text-sm">Subscribe for route updates &amp; offers</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto max-w-md">
              <input type="email" placeholder="operator@email.com" className="input flex-1 !bg-white/5 !border-white/15 !text-white !rounded-md placeholder:text-white/30 font-mono text-sm" />
              <button className="btn btn-secondary !py-3 !px-4 shrink-0 !rounded-md"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-white/35">© {new Date().getFullYear()} {SITE_CONFIG.name} · ALL_SYSTEMS</p>
          <div className="flex gap-6 font-mono text-[10px]">
            <Link href="/privacy" className="text-white/35 hover:text-cyan-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/35 hover:text-cyan-400 transition-colors">Terms</Link>
            <Link href="/refund" className="text-white/35 hover:text-cyan-400 transition-colors">Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
