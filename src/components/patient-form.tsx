'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

const patientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  patient_type: z.enum(['ndis', 'private']),
  ndis_participant_number: z.string().optional(),
})

type PatientFormData = z.infer<typeof patientSchema>

interface PatientFormProps {
  onPatientCreated?: () => void
  onCancel?: () => void
}

export function PatientForm({ onPatientCreated, onCancel }: PatientFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      patient_type: 'private'
    }
  })

  const patientType = watch('patient_type')

  const onSubmit = async (data: PatientFormData) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('patients')
        .insert({
          name: data.name,
          dob: data.dob,
          phone: data.phone || null,
          email: data.email || null,
          patient_type: data.patient_type,
          ndis_participant_number: data.ndis_participant_number || null,
          status: 'active'
        })

      if (error) throw error

      reset()
      onPatientCreated?.()
    } catch (error) {
      console.error('Error creating patient:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Add New Patient</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <Input
          label="Full Name *"
          placeholder="Enter patient's full name"
          {...register('name')}
          error={errors.name?.message}
        />

        {/* Date of Birth */}
        <Input
          label="Date of Birth *"
          type="date"
          {...register('dob')}
          error={errors.dob?.message}
        />

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            placeholder="0412 345 678"
            {...register('phone')}
            error={errors.phone?.message}
          />
          <Input
            label="Email"
            type="email"
            placeholder="patient@email.com"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        {/* Patient Type */}
        <Select
          label="Patient Type *"
          options={[
            { value: 'private', label: 'Private' },
            { value: 'ndis', label: 'NDIS' }
          ]}
          {...register('patient_type')}
          error={errors.patient_type?.message}
        />

        {/* NDIS Participant Number */}
        {patientType === 'ndis' && (
          <Input
            label="NDIS Participant Number"
            placeholder="NDIS123456789"
            {...register('ndis_participant_number')}
            error={errors.ndis_participant_number?.message}
          />
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Saving...' : 'Add Patient'}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
