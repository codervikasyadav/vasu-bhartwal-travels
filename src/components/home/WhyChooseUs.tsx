'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, IndianRupee, Headphones } from 'lucide-react';
import { WHY_CHOOSE_US } from '@/lib/constants';
import SectionHeader from '@/components/ui/SectionHeader';
import SectionShell from '@/components/ui/SectionShell';

const iconMap: Record<string, React.ElementType> = { Shield, Award, IndianRupee, Headphones };

const stats = [
  { label: 'Tours Hosted', value: 500, suffix: '+', code: 'Tours' },
  { label: 'Active Travelers', value: 10000, suffix: '+', code: 'Users' },
  { label: 'Trust Score', value: 4.8, suffix: '★', isDecimal: true, code: 'Rating' },
  { label: 'Field Experience', value: 10, suffix: '+', code: 'Years' },
];

function AnimatedCounter({ target, suffix, isDecimal, code }: { target: number; suffix: string; isDecimal?: boolean; code: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target, isDecimal]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-mono text-[9px] text-cyan-400/60 tracking-widest mb-2">{code}</p>
      <p className="font-heading text-3xl md:text-4xl font-bold text-white">
        {isDecimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
      </p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <SectionShell dark grid>
      <div className="container-main flex flex-col items-center">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Trusted Himalayan Travel"
          subtitle="Safety-first journeys, clear pricing, and round-the-clock support for every traveler"
          dark
          align="center"
          className="w-full"
        />

        <div className="w-full flex flex-col gap-12 lg:gap-16">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WHY_CHOOSE_US.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-dark rounded-lg px-6 py-7 corner-accent relative group hover:border-cyan-500/30 transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/20 flex items-center justify-center group-hover:shadow-[0_0_24px_rgba(6,182,212,0.2)] transition-shadow">
                  {Icon && <Icon className="w-6 h-6 text-cyan-400" />}
                </div>
                <h3 className="font-heading font-bold text-white text-base mb-2 text-center">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed text-center">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-transparent to-saffron/10 p-8 md:p-10"
        >
          <p className="ui-label text-cyan-400/80 text-center mb-8">Our Track Record</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 lg:gap-12">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} target={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} code={stat.code} />
            ))}
          </div>
        </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
