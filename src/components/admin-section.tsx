'use client'

import React, { useState } from 'react'
import { PatientList } from './patient-list'
import { PatientForm } from './patient-form'
import { Button } from '@/components/ui/button'
import { Users, DollarSign } from 'lucide-react'

interface AdminSectionProps {
  onViewChange: (view: 'admin' | 'log-session' | 'invoicing') => void
}

export function AdminSection({ onViewChange: _ }: AdminSectionProps) {
  const [currentAdminView, setCurrentAdminView] = useState<'patients' | 'session-types' | 'new-patient'>('patients')

  const handlePatientCreated = () => {
    setCurrentAdminView('patients')
  }

  const renderAdminContent = () => {
    switch (currentAdminView) {
      case 'patients':
        return <PatientList />
      case 'session-types':
        return (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Session Types & Costs</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Individual Therapy Session</h3>
                  <p className="text-gray-600 mb-2">One-on-one speech therapy session</p>
                  <p className="text-green-600 font-semibold">$150/hour</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Group Therapy Session</h3>
                  <p className="text-gray-600 mb-2">Group speech therapy session (2-4 patients)</p>
                  <p className="text-green-600 font-semibold">$100/hour per patient</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Assessment & Evaluation</h3>
                  <p className="text-gray-600 mb-2">Comprehensive speech and language assessment</p>
                  <p className="text-green-600 font-semibold">$200/session</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 'new-patient':
        return (
          <div className="py-8">
            <div className="mb-6 max-w-2xl mx-auto px-6">
              <button
                onClick={() => setCurrentAdminView('patients')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Patients
              </button>
            </div>
            <PatientForm 
              onPatientCreated={handlePatientCreated}
              onCancel={() => setCurrentAdminView('patients')}
            />
          </div>
        )
      default:
        return <PatientList />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center space-x-8 h-16">
            <Button
              variant={currentAdminView === 'patients' ? 'default' : 'ghost'}
              onClick={() => setCurrentAdminView('patients')}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Patients
            </Button>
            
            <Button
              variant={currentAdminView === 'session-types' ? 'default' : 'ghost'}
              onClick={() => setCurrentAdminView('session-types')}
              className="flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              Session Types & Costs
            </Button>
          </div>
        </div>
      </div>

      {renderAdminContent()}
    </div>
  )
}
