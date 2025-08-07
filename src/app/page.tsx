'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { AdminSection } from '@/components/admin-section'
import { LogSessionSection } from '@/components/log-session-section'
import { InvoicingSection } from '@/components/invoicing-section'

export default function Home() {
  const [currentView, setCurrentView] = useState<'admin' | 'log-session' | 'invoicing'>('admin')
  const [adminAction, setAdminAction] = useState<string | undefined>()

  const handleViewChange = (view: 'admin' | 'log-session' | 'invoicing', action?: string) => {
    setCurrentView(view)
    if (action) {
      setAdminAction(action)
    }
  }

  const renderContent = () => {
    switch (currentView) {
      case 'admin':
        return <AdminSection onViewChange={handleViewChange} initialAction={adminAction} />
      case 'log-session':
        return <LogSessionSection onViewChange={handleViewChange} />
      case 'invoicing':
        return <InvoicingSection onViewChange={handleViewChange} />
      default:
        return <AdminSection onViewChange={handleViewChange} initialAction={adminAction} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentView={currentView}
        onViewChange={handleViewChange}
      />
      {renderContent()}
    </div>
  )
}
