'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { AdminSection } from '@/components/admin-section'
import { LogSessionSection } from '@/components/log-session-section'
import { InvoicingSection } from '@/components/invoicing-section'

export default function Home() {
  const [currentView, setCurrentView] = useState<'admin' | 'log-session' | 'invoicing'>('admin')

  const renderContent = () => {
    switch (currentView) {
      case 'admin':
        return <AdminSection onViewChange={setCurrentView} />
      case 'log-session':
        return <LogSessionSection onViewChange={setCurrentView} />
      case 'invoicing':
        return <InvoicingSection onViewChange={setCurrentView} />
      default:
        return <AdminSection onViewChange={setCurrentView} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      {renderContent()}
    </div>
  )
}
