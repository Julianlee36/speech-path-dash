'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const patientSchema = z.object({
  // Patient Information
  patient_name: z.string().min(1, 'Patient name is required'),
  dob: z.string().optional(),
  
  // Guardian/Parent Information (optional for adult clients)
  guardian_name: z.string().optional(),
  relation_to_patient: z.string().optional(),
  
  // Funding and Contact Information
  funding_type: z.enum(['ndis', 'private', 'medicare', 'other']),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  phone_number: z.string().optional(),
  
  // Notes
  notes: z.string().optional(),
  
  // NDIS Information (conditional)
  ndis_number: z.string().optional(),
  plan_manager: z.string().optional(),
  plan_manager_email: z.string().email('Invalid email').optional().or(z.literal('')),
  invoice_email: z.string().email('Invalid email').optional().or(z.literal('')),
  plan_manager_phone: z.string().optional(),
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
      funding_type: 'private'
    }
  })

  const fundingType = watch('funding_type')
  const isNDIS = fundingType === 'ndis'

  const onSubmit = async (data: PatientFormData) => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('patients')
        .insert({
          patient_name: data.patient_name,
          dob: data.dob || null,
          guardian_name: data.guardian_name || null,
          relation_to_patient: data.relation_to_patient || null,
          funding_type: data.funding_type,
          email: data.email || null,
          phone_number: data.phone_number || null,
          notes: data.notes || null,
          ndis_number: data.ndis_number || null,
          plan_manager: data.plan_manager || null,
          plan_manager_email: data.plan_manager_email || null,
          invoice_email: data.invoice_email || null,
          plan_manager_phone: data.plan_manager_phone || null,
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Add New Patient</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Patient and Contact Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Patient and Contact Information</h3>
          
          {/* Patient Name */}
          <Input
            label="Patient's name *"
            placeholder="Enter patient's full name"
            {...register('patient_name')}
            error={errors.patient_name?.message}
          />

          {/* Date of Birth */}
          <Input
            label="Date of Birth"
            type="date"
            {...register('dob')}
            error={errors.dob?.message}
          />

          {/* Guardian/Parent Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Parent/Guardian's name"
              placeholder="Enter guardian's name (if applicable)"
              {...register('guardian_name')}
              error={errors.guardian_name?.message}
            />
            <Input
              label="Relation to patient"
              placeholder="e.g., Mother, Father, Self"
              {...register('relation_to_patient')}
              error={errors.relation_to_patient?.message}
            />
          </div>

          {/* Funding Type */}
          <Select
            label="Funding type *"
            options={[
              { value: 'ndis', label: 'NDIS' },
              { value: 'private', label: 'Private' },
              { value: 'medicare', label: 'Medicare' },
              { value: 'other', label: 'Other' }
            ]}
            {...register('funding_type')}
            error={errors.funding_type?.message}
          />

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="patient@email.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Phone number"
              placeholder="0412 345 678"
              {...register('phone_number')}
              error={errors.phone_number?.message}
            />
          </div>

          {/* Notes */}
          <Textarea
            label="Notes on patient"
            placeholder="Enter any relevant notes about the patient..."
            {...register('notes')}
            error={errors.notes?.message}
          />
        </div>

        {/* NDIS and Plan Manager Details */}
        {isNDIS && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">NDIS and Plan Manager Details</h3>
            
            {/* NDIS Number */}
            <Input
              label="NDIS number"
              placeholder="Enter NDIS participant number"
              {...register('ndis_number')}
              error={errors.ndis_number?.message}
            />

            {/* Plan Manager Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Plan Manager"
                placeholder="Enter plan manager name"
                {...register('plan_manager')}
                error={errors.plan_manager?.message}
              />
              <Input
                label="Plan Manager Email"
                type="email"
                placeholder="planmanager@email.com"
                {...register('plan_manager_email')}
                error={errors.plan_manager_email?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Invoice Email"
                type="email"
                placeholder="invoice@email.com"
                {...register('invoice_email')}
                error={errors.invoice_email?.message}
              />
              <Input
                label="Plan Manager Phone number"
                placeholder="0412 345 678"
                {...register('plan_manager_phone')}
                error={errors.plan_manager_phone?.message}
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
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
