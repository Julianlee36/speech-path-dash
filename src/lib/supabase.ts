import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Patient {
  id: string
  name: string
  dob: string
  phone?: string
  email?: string
  patient_type: 'ndis' | 'private'
  ndis_participant_number?: string
  status: 'active' | 'inactive'
  created_at: string
}

export interface Session {
  id: string
  patient_id: string
  session_date: string
  start_time: string
  end_time: string
  duration_minutes: number
  service_type: 'assessment' | 'therapy' | 'consultation' | 'review'
  location: 'clinic' | 'home_visit' | 'telehealth'
  billing_code?: string
  created_at: string
}

export interface SessionWithPatient extends Session {
  patient: Patient
}
