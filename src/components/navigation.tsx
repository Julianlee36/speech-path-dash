'use client'

import React from 'react'
import { Calendar, Users, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavigationProps {
  currentView: 'dashboard' | 'patients' | 'new-patient'
  onViewChange: (view: 'dashboard' | 'patients' | 'new-patient') => void
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => onViewChange('dashboard')}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Speech Path Dash
            </button>
            
            <div className="flex space-x-1">
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => onViewChange('dashboard')}
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Dashboard
              </Button>
              
              <Button
                variant={currentView === 'patients' ? 'default' : 'ghost'}
                onClick={() => onViewChange('patients')}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Patients
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => onViewChange('new-patient')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Patient
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
