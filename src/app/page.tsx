'use client'

import React, { useState } from 'react'
import { DailyDashboard } from '@/components/daily-dashboard'
import { SessionForm } from '@/components/session-form'
import { PatientList } from '@/components/patient-list'
import { PatientForm } from '@/components/patient-form'
import { Navigation } from '@/components/navigation'

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'patients' | 'new-patient'>('dashboard')
  const [showSessionForm, setShowSessionForm] = useState(false)

  const handleSessionCreated = () => {
    setShowSessionForm(false)
  }

  const handlePatientCreated = () => {
    setCurrentView('patients')
  }

  const renderContent = () => {
    if (showSessionForm) {
      return (
        <div className="py-8">
          <div className="mb-6 max-w-2xl mx-auto px-6">
            <button
              onClick={() => setShowSessionForm(false)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>
          <SessionForm onSessionCreated={handleSessionCreated} />
        </div>
      )
    }

    switch (currentView) {
      case 'dashboard':
        return <DailyDashboard onNewSession={() => setShowSessionForm(true)} />
      case 'patients':
        return <PatientList />
      case 'new-patient':
        return (
          <div className="py-8">
            <div className="mb-6 max-w-2xl mx-auto px-6">
              <button
                onClick={() => setCurrentView('patients')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Patients
              </button>
            </div>
            <PatientForm 
              onPatientCreated={handlePatientCreated}
              onCancel={() => setCurrentView('patients')}
            />
          </div>
        )
      default:
        return <DailyDashboard onNewSession={() => setShowSessionForm(true)} />
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
