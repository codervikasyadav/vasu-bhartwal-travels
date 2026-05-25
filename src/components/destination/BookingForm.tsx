'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle, Radio } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { formatPrice, openWhatsAppInquiry } from '@/lib/utils';

type TourBookingInfo = {
  title: string;
  slug?: string;
  price?: number;
  duration?: string;
};

export default function BookingForm({ tour }: { tour?: TourBookingInfo }) {
  const [redirected, setRedirected] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    groupSize: '2',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsAppInquiry(SITE_CONFIG.whatsapp, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      travelDate: formData.travelDate,
      groupSize: formData.groupSize,
      message: formData.message,
      subject: tour ? `Booking: ${tour.title}` : undefined,
      package: tour,
    });
    setRedirected(true);
    setTimeout(() => setRedirected(false), 8000);
  };

  if (redirected) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="tech-card p-8 text-center corner-accent"
      >
        <CheckCircle className="w-14 h-14 text-[#25D366] mx-auto mb-4" />
        <p className="font-mono text-[10px] text-cyan-600 tracking-widest mb-2">STATUS::WHATSAPP_READY</p>
        <h3 className="font-heading text-xl font-bold text-charcoal mb-2">Opening WhatsApp…</h3>
        <p className="text-muted text-sm mb-4">
          Your booking inquiry{tour ? ` for ${tour.title}` : ''} is pre-filled. Tap Send in WhatsApp to reach us.
        </p>
        <button
          type="button"
          onClick={() =>
            openWhatsAppInquiry(SITE_CONFIG.whatsapp, {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              travelDate: formData.travelDate,
              groupSize: formData.groupSize,
              message: formData.message,
              subject: tour ? `Booking: ${tour.title}` : undefined,
              package: tour,
            })
          }
          className="btn w-full !py-3 !rounded-md bg-[#25D366] hover:bg-[#20b358] text-white border-0"
        >
          <MessageCircle className="w-4 h-4" /> Open WhatsApp again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="tech-card p-6 pt-7 corner-accent">
      <div className="flex items-center gap-2 mb-4">
        <Radio className="w-4 h-4 text-cyan-500 animate-pulse shrink-0" />
        <span className="ui-label text-cyan-600">Reservation Desk</span>
      </div>
      <h3 className="font-heading text-lg font-bold text-charcoal mb-5">Book Your Journey</h3>
      {tour && (
        <p className="text-sm text-muted mb-4 px-3 py-2.5 bg-cyan-500/5 border border-cyan-500/15 rounded-md text-left">
          <span className="ui-label text-cyan-600 block mb-1">Selected package</span>
          {tour.title}
          {tour.price != null && (
            <span className="block text-cyan-600 mt-1">
              {formatPrice(tour.price)}
              {tour.duration ? ` · ${tour.duration}` : ''}
            </span>
          )}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your Name *"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input"
        />
        <input
          type="email"
          placeholder="Email Address *"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input"
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="input"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            value={formData.travelDate}
            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
            className="input"
          />
          <select
            value={formData.groupSize}
            onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
            className="input"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'Person' : 'People'}
              </option>
            ))}
            <option value="10+">10+ People</option>
          </select>
        </div>
        <textarea
          placeholder="Special requests or travel notes..."
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="input resize-none"
        />
        <button
          type="submit"
          className="btn w-full !py-3 !rounded-md bg-[#25D366] hover:bg-[#20b358] text-white border-0"
        >
          <MessageCircle className="w-4 h-4" /> Send via WhatsApp
        </button>
      </form>
    </div>
  );
}
