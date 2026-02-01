import React from 'react'

export interface MedicalRecord {
  id: string
  type: 'consultation' | 'lab-test' | 'prescription' | 'vaccination' | 'diagnosis'
  title: string
  date: string
  doctor?: string
  facility: string
  details: string
  icon?: React.ReactNode
  status: 'active' | 'completed' | 'archived'
}

// Mock records for demo purposes
export const mockRecords: MedicalRecord[] = [
  {
    id: '1',
    type: 'consultation',
    title: 'General Checkup',
    date: 'January 20, 2026',
    doctor: 'Dr. Maria Santos',
    facility: 'Metro Naga Medical Center',
    details: 'Regular health checkup. All vitals normal. Continue healthy lifestyle.',
    status: 'completed',
  },
  {
    id: '2',
    type: 'lab-test',
    title: 'Blood Test Results',
    date: 'January 18, 2026',
    facility: 'Metro Naga Laboratory',
    details: 'Complete Blood Count (CBC) - All results within normal range',
    status: 'completed',
  },
  {
    id: '3',
    type: 'prescription',
    title: 'Hypertension Management',
    date: 'January 15, 2026',
    doctor: 'Dr. Rosa Cruz',
    facility: 'Bicol Medical Center',
    details: 'Lisinopril 10mg - Once daily. Take with meals.',
    status: 'active',
  },
  {
    id: '4',
    type: 'vaccination',
    title: 'COVID-19 Booster',
    date: 'January 10, 2026',
    facility: 'Naga City Health Center',
    details: 'Pfizer-BioNTech Booster Dose - Booster #2',
    status: 'completed',
  },
  {
    id: '5',
    type: 'diagnosis',
    title: 'Hypertension - Stage 1',
    date: 'December 28, 2025',
    doctor: 'Dr. Rosa Cruz',
    facility: 'Metro Naga Medical Center',
    details: 'BP: 140/90 mmHg. Lifestyle modifications recommended.',
    status: 'active',
  },
]