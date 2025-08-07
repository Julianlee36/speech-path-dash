'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format, parse, differenceInMinutes } from 'date-fns'
import { Search } from 'lucide-react'
import { supabase, type Patient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

const sessionSchema = z.object({
  patient_id: z.string().min(1, 'Patient is required'),
  session_date: z.string().min(1, 'Date is required'),
  start_time: z.string().min(1, 'Start time is required'),
  end_time: z.string().min(1, 'End time is required'),
  service_type: z.enum(['assessment', 'therapy', 'consultation', 'review']),
  location: z.enum(['clinic', 'home_visit', 'telehealth']),
  billing_code: z.string().optional(),
}).refine((data) => {
  const start = parse(data.start_time, 'HH:mm', new Date())
  const end = parse(data.end_time, 'HH:mm', new Date())
  return end > start
}, {
  message: 'End time must be after start time',
  path: ['end_time']
})

type SessionFormData = z.infer<typeof sessionSchema>

interface SessionFormProps {
  onSessionCreated?: () => void
}

export function SessionForm({ onSessionCreated }: SessionFormProps) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showPatientSearch, setShowPatientSearch] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      session_date: format(new Date(), 'yyyy-MM-dd'),
      service_type: 'therapy',
      location: 'clinic'
    }
  })

  const startTime = watch('start_time')
  const endTime = watch('end_time')

  // Calculate duration when times change
  useEffect(() => {
    if (startTime && endTime) {
      try {
        const start = parse(startTime, 'HH:mm', new Date())
        const end = parse(endTime, 'HH:mm', new Date())
        const duration = differenceInMinutes(end, start)
        if (duration > 0) {
          // Duration is calculated automatically by the database
        }
      } catch {
        // Invalid time format
      }
    }
  }, [startTime, endTime])

  // Load patients
  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('status', 'active')
        .order('name')
      
      if (error) throw error
      setPatients(data || [])
    } catch (error) {
      console.error('Error loading patients:', error)
    }
  }

  // Filter patients based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredPatients(patients)
    } else {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredPatients(filtered)
    }
  }, [searchTerm, patients])

  const onSubmit = async (data: SessionFormData) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('sessions')
        .insert({
          patient_id: data.patient_id,
          session_date: data.session_date,
          start_time: data.start_time,
          end_time: data.end_time,
          service_type: data.service_type,
          location: data.location,
          billing_code: data.billing_code || null
        })

      if (error) throw error

      reset()
      onSessionCreated?.()
    } catch (error) {
      console.error('Error creating session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedPatient = patients.find(p => p.id === watch('patient_id'))

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Log Session</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Patient Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Patient *
          </label>
          <div className="relative">
            <Input
              placeholder="Search for a patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowPatientSearch(true)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          
          {showPatientSearch && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  onClick={() => {
                    setValue('patient_id', patient.id)
                    setSearchTerm(patient.name)
                    setShowPatientSearch(false)
                  }}
                >
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-sm text-gray-500">
                    {patient.patient_type} • {patient.dob}
                  </div>
                </button>
              ))}
              {filteredPatients.length === 0 && (
                <div className="px-4 py-2 text-gray-500">
                  No patients found
                </div>
              )}
            </div>
          )}
          
          {selectedPatient && (
            <div className="mt-2 p-3 bg-blue-50 rounded-md">
              <div className="font-medium">{selectedPatient.name}</div>
              <div className="text-sm text-gray-600">
                {selectedPatient.patient_type} • {selectedPatient.dob}
              </div>
            </div>
          )}
          
          {errors.patient_id && (
            <p className="text-sm text-red-600">{errors.patient_id.message}</p>
          )}
        </div>

        {/* Date */}
        <Input
          label="Session Date *"
          type="date"
          {...register('session_date')}
          error={errors.session_date?.message}
        />

        {/* Time Range */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Start Time *"
            type="time"
            {...register('start_time')}
            error={errors.start_time?.message}
          />
          <Input
            label="End Time *"
            type="time"
            {...register('end_time')}
            error={errors.end_time?.message}
          />
        </div>

        {/* Service Type and Location */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Service Type *"
            options={[
              { value: 'assessment', label: 'Assessment' },
              { value: 'therapy', label: 'Therapy' },
              { value: 'consultation', label: 'Consultation' },
              { value: 'review', label: 'Review' }
            ]}
            {...register('service_type')}
            error={errors.service_type?.message}
          />
          <Select
            label="Location *"
            options={[
              { value: 'clinic', label: 'Clinic' },
              { value: 'home_visit', label: 'Home Visit' },
              { value: 'telehealth', label: 'Telehealth' }
            ]}
            {...register('location')}
            error={errors.location?.message}
          />
        </div>

        {/* Billing Code */}
        <Input
          label="Billing Code"
          placeholder="Optional billing code"
          {...register('billing_code')}
          error={errors.billing_code?.message}
        />

        <Button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full"
        >
          {isSubmitting || isLoading ? 'Saving...' : 'Log Session'}
        </Button>
      </form>
    </div>
  )
}
