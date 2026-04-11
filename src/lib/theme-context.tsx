'use client'

import { createContext, useContext, ReactNode } from 'react'

interface ThemeConfig {
  global: Record<string, Record<string, unknown>>
  pages: Record<string, Record<string, { visible: boolean; order: number; values: Record<string, unknown> }>>
}

const ThemeContext = createContext<ThemeConfig | null>(null)

/**
 * ThemeProvider receives server-fetched theme data.
 * No client-side fetching — theme is fetched at build/request time
 * and revalidated via tag when admin publishes changes.
 */
export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode
  initialTheme: ThemeConfig | null
}) {
  return (
    <ThemeContext.Provider value={initialTheme}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook: get a global setting value
export function useGlobal(section: string, key: string, fallback?: unknown) {
  const theme = useContext(ThemeContext)
  if (!theme) return fallback
  return theme.global?.[section]?.[key] ?? fallback
}

// Hook: get a page section's value
export function usePageSection(pageId: string, sectionId: string) {
  const theme = useContext(ThemeContext)
  if (!theme) return { visible: true, values: {} as Record<string, unknown>, order: 0 }
  const section = theme.pages?.[pageId]?.[sectionId]
  return section || { visible: true, values: {} as Record<string, unknown>, order: 0 }
}

// Hook: get sorted visible sections for a page
export function usePageSections(pageId: string) {
  const theme = useContext(ThemeContext)
  if (!theme?.pages?.[pageId]) return null
  const page = theme.pages[pageId]
  return Object.entries(page)
    .map(([id, data]) => ({ id, ...data }))
    .filter(s => s.visible !== false)
    .sort((a, b) => a.order - b.order)
}

// Hook: get a single field from page section
export function useThemeValue(pageId: string, sectionId: string, key: string, fallback?: unknown) {
  const theme = useContext(ThemeContext)
  if (!theme) return fallback
  return theme.pages?.[pageId]?.[sectionId]?.values?.[key] ?? fallback
}
