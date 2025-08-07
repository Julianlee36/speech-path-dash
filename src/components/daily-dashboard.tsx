'use client'

import React, { useState, useEffect } from 'react'
import { format, startOfDay, endOfDay } from 'date-fns'
import { Calendar, Clock, Users, Plus } from 'lucide-react'
import { supabase, type SessionWithPatient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

interface DailyDashboardProps {
  onNewSession: () => void
}

export function DailyDashboard({ onNewSession }: DailyDashboardProps) {
  const [sessions, setSessions] = useState<SessionWithPatient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalHours: 0,
    patientsSeen: 0,
    totalSessions: 0
  })

  useEffect(() => {
    loadTodaySessions()
  }, [])

  const loadTodaySessions = async () => {
    setIsLoading(true)
    try {
      const today = new Date()
      const startOfToday = startOfDay(today)
      const endOfToday = endOfDay(today)

      const { data, error } = await supabase
        .from('sessions')
        .select(`
          *,
          patient:patients(*)
        `)
        .gte('session_date', format(startOfToday, 'yyyy-MM-dd'))
        .lte('session_date', format(endOfToday, 'yyyy-MM-dd'))
        .order('start_time', { ascending: true })

      if (error) throw error

      setSessions(data || [])
      
      // Calculate stats
      const totalMinutes = data?.reduce((sum, session) => sum + session.duration_minutes, 0) || 0
      const uniquePatients = new Set(data?.map(session => session.patient_id) || []).size
      
      setStats({
        totalHours: Math.round((totalMinutes / 60) * 10) / 10,
        patientsSeen: uniquePatients,
        totalSessions: data?.length || 0
      })
    } catch (error) {
      console.error('Error loading sessions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (time: string) => {
    return format(new Date(`2000-01-01T${time}`), 'h:mm a')
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Today's Sessions</h1>
          <p className="text-gray-600 mt-1">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>
        <Button onClick={onNewSession} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Log Session
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Patients Seen</p>
              <p className="text-2xl font-bold text-gray-900">{stats.patientsSeen}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSessions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Today's Sessions</h2>
        </div>
        
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">
            Loading sessions...
          </div>
        ) : sessions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No sessions logged today</p>
            <p className="text-sm">Start by logging your first session</p>
            <Button onClick={onNewSession} className="mt-4">
              Log Session
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Billing
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {session.patient.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {session.patient.patient_type}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatTime(session.start_time)} - {formatTime(session.end_time)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDuration(session.duration_minutes)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {session.service_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {session.location.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.billing_code || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
