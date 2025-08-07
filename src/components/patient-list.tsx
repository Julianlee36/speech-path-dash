'use client'

import React, { useState, useEffect } from 'react'
import { Search, Phone, Mail, Calendar } from 'lucide-react'
import { supabase, type Patient } from '@/lib/supabase'
import { Input } from '@/components/ui/input'

export function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPatients()
  }, [])

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPatients(patients)
    } else {
      const filtered = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone?.includes(searchTerm)
      )
      setFilteredPatients(filtered)
    }
  }, [searchTerm, patients])

  const loadPatients = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('name')
      
      if (error) throw error
      setPatients(data || [])
      setFilteredPatients(data || [])
    } catch (error) {
      console.error('Error loading patients:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU')
  }

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800'
  }

  const getTypeColor = (type: string) => {
    return type === 'ndis' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-purple-100 text-purple-800'
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
        <p className="text-gray-600 mt-1">Manage your patient database</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search patients by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Patient List */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">
          Loading patients...
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {/* <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" /> */}
          <p className="text-lg font-medium">
            {searchTerm ? 'No patients found' : 'No patients yet'}
          </p>
          <p className="text-sm">
            {searchTerm ? 'Try adjusting your search terms' : 'Add your first patient to get started'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Added
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {patient.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(patient.dob)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {patient.phone && (
                          <div className="text-sm text-gray-900 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {patient.phone}
                          </div>
                        )}
                        {patient.email && (
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {patient.email}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(patient.patient_type)}`}>
                        {patient.patient_type.toUpperCase()}
                      </span>
                      {patient.ndis_participant_number && (
                        <div className="text-xs text-gray-500 mt-1">
                          {patient.ndis_participant_number}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(patient.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary */}
      {filteredPatients.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredPatients.length} of {patients.length} patients
        </div>
      )}
    </div>
  )
}
