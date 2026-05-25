import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function getWhatsAppUrl(phone: string, message?: string): string {
  const encodedMessage = encodeURIComponent(
    message || "Hello! I'd like to know more about your Himalayan tour packages."
  );
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export type WhatsAppInquiryPayload = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  subject?: string;
  travelDate?: string;
  groupSize?: string;
  package?: {
    title: string;
    slug?: string;
    price?: number;
    duration?: string;
  };
};

export function buildWhatsAppInquiryMessage(payload: WhatsAppInquiryPayload): string {
  const lines: string[] = [
    "Hi! I'd like to inquire about a tour with Travel Wale Bhai Ji.",
    '',
  ];

  if (payload.package) {
    lines.push(`*Package:* ${payload.package.title}`);
    if (payload.package.price != null) {
      lines.push(`*Price:* ${formatPrice(payload.package.price)}`);
    }
    if (payload.package.duration) {
      lines.push(`*Duration:* ${payload.package.duration}`);
    }
    lines.push('');
  }

  if (payload.subject?.trim()) {
    lines.push(`*Subject:* ${payload.subject.trim()}`);
  }

  lines.push(
    `*Name:* ${payload.name.trim()}`,
    `*Email:* ${payload.email.trim()}`,
    `*Phone:* ${payload.phone.trim()}`,
  );

  if (payload.travelDate?.trim()) {
    lines.push(`*Preferred travel date:* ${payload.travelDate.trim()}`);
  }
  if (payload.groupSize?.trim()) {
    const size = payload.groupSize.trim();
    const unit = size === '1' ? 'person' : 'people';
    lines.push(`*Group size:* ${size}${size.endsWith('+') ? '' : ` ${unit}`}`);
  }

  if (payload.message?.trim()) {
    lines.push('', '*Message:*', payload.message.trim());
  }

  return lines.join('\n');
}

export function openWhatsAppInquiry(phone: string, payload: WhatsAppInquiryPayload): void {
  const url = getWhatsAppUrl(phone, buildWhatsAppInquiryMessage(payload));
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function calculateDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}
