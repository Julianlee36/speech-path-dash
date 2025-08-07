'use client'

import React from 'react'
import { Settings, Clock, FileText, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavigationProps {
  currentView: 'admin' | 'log-session' | 'invoicing'
  onViewChange: (view: 'admin' | 'log-session' | 'invoicing') => void
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => onViewChange('admin')}
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Speech Path Dash
            </button>
            
            <div className="flex space-x-1">
              <Button
                variant={currentView === 'admin' ? 'default' : 'ghost'}
                onClick={() => onViewChange('admin')}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Admin
              </Button>
              
              <Button
                variant={currentView === 'log-session' ? 'default' : 'ghost'}
                onClick={() => onViewChange('log-session')}
                className="flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                Log a Session
              </Button>

              <Button
                variant={currentView === 'invoicing' ? 'default' : 'ghost'}
                onClick={() => onViewChange('invoicing')}
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Invoicing
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentView === 'admin' && (
              <Button
                onClick={() => onViewChange('admin')}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Patient
              </Button>
            )}
            {currentView === 'log-session' && (
              <Button
                onClick={() => onViewChange('log-session')}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Session
              </Button>
            )}
            {currentView === 'invoicing' && (
              <Button
                onClick={() => onViewChange('invoicing')}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Invoice
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
