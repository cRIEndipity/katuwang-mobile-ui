import React from 'react'

export interface MedicalRecord {
  id: string
  user_id?: string
  type: 'consultation' | 'lab-test' | 'prescription' | 'vaccination' | 'diagnosis'
  title: string
  date: string
  doctor?: string
  facility: string
  details: string
  icon?: React.ReactNode
  status: 'active' | 'completed' | 'archived'
}