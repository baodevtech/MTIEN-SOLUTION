'use client'

import { usePageSection } from '@/lib/theme-context'

/**
 * Hook to get theme values for a specific section with fallback to defaults.
 * Usage: const t = useTheme('home', 'hero')
 *        t('title', 'Default Title')
 */
export function useTheme(pageId: string, sectionId: string) {
  const { values } = usePageSection(pageId, sectionId)
  
  return function get<T = string>(key: string, fallback?: T): T {
    const val = values?.[key]
    if (val !== undefined && val !== null && val !== '') return val as T
    return (fallback ?? '') as T
  }
}
