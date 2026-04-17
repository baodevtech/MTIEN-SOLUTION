'use client'

import { createContext, useContext, ReactNode } from 'react'

export interface SiteSettingsClient {
  shopMaintenance?: boolean
  maintenance?: boolean
}

const SettingsContext = createContext<SiteSettingsClient>({})

export function SettingsProvider({
  children,
  settings,
}: {
  children: ReactNode
  settings: SiteSettingsClient
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SettingsContext)
}
