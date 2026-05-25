'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Terminal, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/SocialIcons';
import { SITE_DEVELOPER } from '@/lib/constants';
import SectionHeader from '@/components/ui/SectionHeader';
import SectionShell from '@/components/ui/SectionShell';

export default function DeveloperSection() {
  const dev = SITE_DEVELOPER;

  return (
    <SectionShell className="bg-cream section-compact !pt-8 lg:!pt-10">
      <div className="container-main max-w-5xl flex flex-col items-center">
        <SectionHeader
          eyebrow="Built With Care"
          title="Meet the Developer"
          subtitle="The person behind this website — design, code, and everything you see here"
          align="center"
          className="w-full"
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border-2 border-cyan-500/40 bg-white shadow-[0_8px_32px_rgba(6,182,212,0.12)] p-6 md:p-8 lg:p-10"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 lg:gap-12">
            <div className="relative w-40 h-48 sm:w-44 sm:h-52 shrink-0 rounded-xl overflow-hidden border-2 border-cyan-500/50 shadow-md bg-snow">
              <Image
                src={dev.image}
                alt={dev.name}
                fill
                className="object-cover object-top"
                sizes="176px"
              />
            </div>

            <div className="flex-1 min-w-0 w-full text-left">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-5 h-5 text-cyan-600 shrink-0" />
                <span className="ui-label text-cyan-700">{dev.role}</span>
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-1">{dev.name}</h3>
              <p className="text-saffron-dark font-semibold text-sm mb-4">{dev.title}</p>

              <p className="text-charcoal/75 text-sm md:text-base leading-relaxed mb-5">{dev.bio}</p>

              <div className="flex items-center gap-2 text-charcoal/70 text-sm mb-5">
                <MapPin className="w-4 h-4 text-cyan-600 shrink-0" />
                {dev.location}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {dev.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-semibold rounded-md bg-cyan-500/10 text-cyan-800 border-2 border-cyan-500/25"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={dev.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-charcoal text-white text-sm font-semibold hover:bg-primary transition-colors border-2 border-charcoal"
                >
                  <ExternalLink className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={dev.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border-2 border-cyan-500/35 text-charcoal text-sm font-semibold hover:border-cyan-500 hover:text-cyan-700 transition-colors bg-white"
                >
                  <InstagramIcon className="w-4 h-4" /> Instagram
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
