import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely */
export const cn = (...inputs) => twMerge(clsx(inputs));

/** Format date string */
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/** Truncate text */
export const truncate = (text, maxLength = 120) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
};

/** Generate star rating array */
export const getStars = (rating, max = 5) => {
  return Array.from({ length: max }, (_, i) => {
    if (i < Math.floor(rating)) return 'full';
    if (i < rating) return 'half';
    return 'empty';
  });
};

/** Scroll to element */
export const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** WhatsApp link generator */
export const getWhatsAppLink = (phone, message = '') => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}${message ? `?text=${encoded}` : ''}`;
};

/** Format phone number for display */
export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
};
