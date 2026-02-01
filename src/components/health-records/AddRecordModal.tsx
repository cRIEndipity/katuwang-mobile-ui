import React, { useState } from 'react'
import { X, Calendar, FileText, User, Building, Activity } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'
import { MedicalRecord } from './types'

interface AddRecordModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (record: Omit<MedicalRecord, 'id'>) => Promise<void>
}

export default function AddRecordModal({ isOpen, onClose, onAdd }: AddRecordModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: 'consultation' as MedicalRecord['type'],
    date: new Date().toISOString().split('T')[0],
    doctor: '',
    facility: '',
    details: '',
    status: 'active' as const
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onAdd(formData)
      onClose()
      // Reset form
      setFormData({
        title: '',
        type: 'consultation',
        date: new Date().toISOString().split('T')[0],
        doctor: '',
        facility: '',
        details: '',
        status: 'active'
      })
    } catch (error) {
      console.error(error)
      alert('Failed to add record')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add Medical Record</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Record Title</label>
            <div className="relative mt-1">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                required
                type="text"
                placeholder="e.g., General Checkup"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Type</label>
              <div className="relative mt-1">
                <Activity className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none appearance-none bg-white"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                >
                  <option value="consultation">Consultation</option>
                  <option value="lab-test">Lab Test</option>
                  <option value="prescription">Prescription</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="diagnosis">Diagnosis</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Date</label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  required
                  type="date"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Doctor</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Dr. Name"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                value={formData.doctor}
                onChange={e => setFormData({ ...formData, doctor: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Facility</label>
            <div className="relative mt-1">
              <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Hospital or Clinic Name"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                value={formData.facility}
                onChange={e => setFormData({ ...formData, facility: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Notes / Details</label>
            <textarea
              rows={3}
              className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
              placeholder="Enter any additional details..."
              value={formData.details}
              onChange={e => setFormData({ ...formData, details: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-bold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: BRAND_COLORS.primary }}
          >
            {loading ? 'Saving...' : 'Save Record'}
          </button>
        </form>
      </div>
    </div>
  )
}