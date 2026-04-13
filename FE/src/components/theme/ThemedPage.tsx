'use client'

import { usePageSections, usePageSection } from '@/lib/theme-context'
import { ReactNode } from 'react'

interface SectionMap {
  [sectionId: string]: ReactNode
}

export function ThemedPage({ pageId, sections }: { pageId: string; sections: SectionMap }) {
  const orderedSections = usePageSections(pageId)

  // If no theme loaded yet, render all sections in default order
  if (!orderedSections) {
    return <>{Object.values(sections)}</>
  }

  return (
    <>
      {orderedSections.map(s => {
        const component = sections[s.id]
        return component ? <div key={s.id}>{component}</div> : null
      })}
    </>
  )
}

// Wrapper that hides a section if theme says hidden
export function ThemedSection({ pageId, sectionId, children }: { pageId: string; sectionId: string; children: ReactNode }) {
  const { visible } = usePageSection(pageId, sectionId)
  if (!visible) return null
  return <>{children}</>
}
