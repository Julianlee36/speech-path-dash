'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileText, Plus, Send, Eye, Download, DollarSign } from 'lucide-react'

interface InvoicingSectionProps {
  onViewChange: (view: 'admin' | 'log-session' | 'invoicing') => void
}

export function InvoicingSection({ onViewChange }: InvoicingSectionProps) {
  const [currentInvoiceView, setCurrentInvoiceView] = useState<'overview' | 'create' | 'pending'>('overview')

  const renderInvoiceContent = () => {
    switch (currentInvoiceView) {
      case 'overview':
        return (
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Invoicing</h1>
              <p className="text-gray-600">Create, manage, and send invoices to your patients.</p>
            </div>

            {/* Invoice Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Invoices</p>
                    <p className="text-2xl font-bold text-orange-600">5</p>
                  </div>
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-green-600">$2,450</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Paid This Month</p>
                    <p className="text-2xl font-bold text-blue-600">$1,800</p>
                  </div>
                  <Download className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Recent Invoices */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Invoices</h2>
                  <Button
                    onClick={() => setCurrentInvoiceView('create')}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Invoice
                  </Button>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Sarah Johnson</h3>
                      <p className="text-sm text-gray-600">Invoice #INV-2024-001</p>
                      <p className="text-xs text-gray-500">Due: Dec 15, 2024</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                        Pending
                      </span>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">$450</p>
                        <p className="text-sm text-gray-600">3 sessions</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Mike Chen</h3>
                      <p className="text-sm text-gray-600">Invoice #INV-2024-002</p>
                      <p className="text-xs text-gray-500">Due: Dec 20, 2024</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Paid
                      </span>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">$300</p>
                        <p className="text-sm text-gray-600">2 sessions</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Emma Davis</h3>
                      <p className="text-sm text-gray-600">Invoice #INV-2024-003</p>
                      <p className="text-xs text-gray-500">Due: Dec 25, 2024</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                        Pending
                      </span>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">$200</p>
                        <p className="text-sm text-gray-600">1 session</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'create':
        return (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="mb-6">
              <button
                onClick={() => setCurrentInvoiceView('overview')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Invoicing
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Invoice</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Patient
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select a patient...</option>
                    <option>Sarah Johnson</option>
                    <option>Mike Chen</option>
                    <option>Emma Davis</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Period
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Start Date"
                    />
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="End Date"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentInvoiceView('overview')}
                  >
                    Cancel
                  </Button>
                  <Button className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Create Invoice
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderInvoiceContent()}
    </div>
  )
}
