'use client'

import React, { useState } from 'react'
import { SessionForm } from './session-form'
import { Button } from '@/components/ui/button'
import { Clock, Plus, Calendar, Users } from 'lucide-react'

interface LogSessionSectionProps {
  onViewChange: (view: 'admin' | 'log-session' | 'invoicing') => void
}

export function LogSessionSection({ onViewChange: _ }: LogSessionSectionProps) {
  const [showSessionForm, setShowSessionForm] = useState(false)

  const handleSessionCreated = () => {
    setShowSessionForm(false)
  }

  if (showSessionForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="py-8">
          <div className="mb-6 max-w-2xl mx-auto px-6">
            <button
              onClick={() => setShowSessionForm(false)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Session Log
            </button>
          </div>
          <SessionForm onSessionCreated={handleSessionCreated} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Log a Session</h1>
          <p className="text-gray-600">Record your therapy sessions and track your hours with patients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today&apos;s Sessions</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Patients</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Sessions</h2>
              <Button
                onClick={() => setShowSessionForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Log New Session
              </Button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Sarah Johnson</h3>
                  <p className="text-sm text-gray-600">Individual Therapy - Articulation</p>
                  <p className="text-xs text-gray-500">Today, 2:00 PM - 3:00 PM</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">$150</p>
                  <p className="text-sm text-gray-600">1 hour</p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Mike Chen</h3>
                  <p className="text-sm text-gray-600">Group Therapy - Language Development</p>
                  <p className="text-xs text-gray-500">Today, 10:00 AM - 11:00 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">$100</p>
                  <p className="text-sm text-gray-600">1 hour</p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Emma Davis</h3>
                  <p className="text-sm text-gray-600">Assessment & Evaluation</p>
                  <p className="text-xs text-gray-500">Yesterday, 3:30 PM - 4:30 PM</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">$200</p>
                  <p className="text-sm text-gray-600">1 hour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
