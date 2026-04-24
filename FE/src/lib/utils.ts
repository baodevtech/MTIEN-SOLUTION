import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Resolve a media URL from the admin backend.
 * - Absolute URLs (http/https) and data URIs pass through unchanged.
 * - Relative paths (e.g. `/uploads/general/foo.png`) are prefixed with
 *   NEXT_PUBLIC_ADMIN_API_URL so <Image> can resolve them.
 * - Empty / null / undefined returns an empty string (caller should gate render).
 */
export function getImageUrl(src?: string | null): string {
  if (!src) return '';
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  const base = (process.env.NEXT_PUBLIC_ADMIN_API_URL || '').replace(/\/$/, '');
  const path = src.startsWith('/') ? src : `/${src}`;
  return `${base}${path}`;
}
