'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/layout/Sidebar'
import AdminHeader from '@/components/layout/Header'
import { cn } from '@/lib/utils'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen">
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div
        className={cn('sidebar-transition', collapsed ? 'ml-[72px]' : 'ml-[260px]')}
      >
        <AdminHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
