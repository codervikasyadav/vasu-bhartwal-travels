'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '@/data/faq';
import SectionHeader from '@/components/ui/SectionHeader';
import SectionShell from '@/components/ui/SectionShell';

function FAQItem({ question, answer, isOpen, onToggle, index }: {
  question: string; answer: string; isOpen: boolean; onToggle: () => void; index: number;
}) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-white hover:border-cyan-500/30 transition-colors">
      <button onClick={onToggle} className="flex items-center justify-between w-full p-5 text-left gap-4 group">
        <div className="flex items-start gap-4 min-w-0">
          <span className="font-mono text-xs text-cyan-600 shrink-0 pt-0.5">{String(index + 1).padStart(2, '0')}</span>
          <span className="font-medium text-charcoal group-hover:text-cyan-700 transition-colors">{question}</span>
        </div>
        <span className="flex-shrink-0 w-8 h-8 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          {isOpen ? <Minus className="w-4 h-4 text-cyan-600" /> : <Plus className="w-4 h-4 text-muted" />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="px-5 pb-5 pl-14 text-muted leading-relaxed text-sm border-t border-border/50 pt-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const half = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, half);
  const rightFaqs = faqs.slice(half);

  return (
    <SectionShell className="bg-cream section-compact !pt-8 lg:!pt-10">
      <div className="container-main flex flex-col items-center">
        <SectionHeader
          eyebrow="Help Center"
          title="Frequently Asked Questions"
          subtitle="Helpful answers for planning your Himalayan journey"
          align="center"
          className="w-full"
        />
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl">
          <div className="space-y-3">
            {leftFaqs.map((faq, i) => (
              <FAQItem key={i} index={i} question={faq.question} answer={faq.answer} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
            ))}
          </div>
          <div className="space-y-3">
            {rightFaqs.map((faq, i) => {
              const realIndex = i + half;
              return <FAQItem key={realIndex} index={realIndex} question={faq.question} answer={faq.answer} isOpen={openIndex === realIndex} onToggle={() => setOpenIndex(openIndex === realIndex ? null : realIndex)} />;
            })}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
