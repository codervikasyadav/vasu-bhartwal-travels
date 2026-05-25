'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';
import { tours } from '@/data/tours';
import { SITE_CONFIG } from '@/lib/constants';
import { formatPrice, openWhatsAppInquiry } from '@/lib/utils';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const tourSlug = searchParams.get('tour');

  const selectedTour = useMemo(
    () => (tourSlug ? tours.find((t) => t.slug === tourSlug) : undefined),
    [tourSlug],
  );

  const [redirected, setRedirected] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    if (!selectedTour) return;
    setForm((prev) => ({
      ...prev,
      subject: prev.subject || `Booking inquiry: ${selectedTour.title}`,
      message:
        prev.message ||
        `I'm interested in the "${selectedTour.title}" package (${formatPrice(selectedTour.price)}, ${selectedTour.duration}).\n\nPlease share availability and booking details.`,
    }));
  }, [selectedTour]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsAppInquiry(SITE_CONFIG.whatsapp, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
      package: selectedTour
        ? {
            title: selectedTour.title,
            slug: selectedTour.slug,
            price: selectedTour.price,
            duration: selectedTour.duration,
          }
        : undefined,
    });
    setRedirected(true);
    setTimeout(() => setRedirected(false), 8000);
  };

  if (redirected) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-10 text-center">
        <CheckCircle className="w-14 h-14 text-[#25D366] mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-charcoal mb-2">Opening WhatsApp…</h3>
        <p className="text-muted text-sm mb-4">
          Your message{selectedTour ? ` for ${selectedTour.title}` : ''} is ready to send. Complete it in WhatsApp and tap Send.
        </p>
        <button
          type="button"
          onClick={() =>
            openWhatsAppInquiry(SITE_CONFIG.whatsapp, {
              name: form.name,
              email: form.email,
              phone: form.phone,
              subject: form.subject,
              message: form.message,
              package: selectedTour
                ? {
                    title: selectedTour.title,
                    slug: selectedTour.slug,
                    price: selectedTour.price,
                    duration: selectedTour.duration,
                  }
                : undefined,
            })
          }
          className="btn btn-primary w-full !py-3"
        >
          <MessageCircle className="w-4 h-4" /> Open WhatsApp again
        </button>
      </motion.div>
    );
  }

  return (
    <>
      {selectedTour && (
        <div className="mb-4 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
          <p className="ui-label text-cyan-600 mb-1">Selected package</p>
          <p className="font-semibold text-charcoal">{selectedTour.title}</p>
          <p className="text-sm text-muted mt-0.5">
            {formatPrice(selectedTour.price)} · {selectedTour.duration}
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-4 hover:!transform-none border-2 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name *"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
          />
          <input
            type="email"
            placeholder="Email Address *"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="tel"
            placeholder="Phone Number *"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input"
          />
          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="input"
          />
        </div>
        <textarea
          placeholder="Your Message *"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="input resize-none"
        />
        <button type="submit" className="btn w-full !py-3.5 text-base bg-[#25D366] hover:bg-[#20b358] text-white border-0">
          <MessageCircle className="w-4 h-4" /> Send via WhatsApp
        </button>
        <p className="text-center text-xs text-muted">
          Opens WhatsApp with your details pre-filled · {SITE_CONFIG.phone}
        </p>
      </form>
    </>
  );
}
