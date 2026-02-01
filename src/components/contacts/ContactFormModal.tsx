import { useState, useEffect } from 'react'
import { X, UserPlus, Edit2, Check } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'
import { Contact, RELATIONSHIP_OPTIONS } from './types'

interface ContactFormModalProps {
  isOpen: boolean
  initialData?: Contact | null
  onClose: () => void
  onSubmit: (data: Omit<Contact, 'id' | 'isPrimary'>) => void
}

export default function ContactFormModal({ isOpen, initialData, onClose, onSubmit }: ContactFormModalProps) {
  const [formName, setFormName] = useState('')
  const [formRelationship, setFormRelationship] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Reset or Populate form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormName(initialData.name)
        setFormRelationship(initialData.relationship)
        setFormPhone(initialData.phone)
        setFormEmail(initialData.email || '')
      } else {
        setFormName('')
        setFormRelationship('')
        setFormPhone('')
        setFormEmail('')
      }
      setFormErrors({})
    }
  }, [isOpen, initialData])

  if (!isOpen) return null

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formName.trim()) errors.name = 'Full name is required'
    if (!formRelationship) errors.relationship = 'Please select relationship'
    if (!formPhone.trim()) errors.phone = 'Phone number is required'
    else if (!/^09\d{9}$/.test(formPhone.replace(/\s/g, ''))) errors.phone = 'Please use format: 09171234567'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return
    onSubmit({
      name: formName.trim(),
      relationship: formRelationship,
      phone: formPhone,
      email: formEmail.trim() || undefined
    })
  }

  const isEditing = !!initialData

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
        {/* Modal Header */}
        <div
          className="px-6 py-5 text-white"
          style={{ backgroundColor: BRAND_COLORS.primary }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                {isEditing ? <Edit2 className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-xl font-bold">{isEditing ? 'Edit Contact' : 'Add Emergency Contact'}</h2>
                <p className="text-white/80 text-sm">{isEditing ? 'Update contact information' : 'Add a trusted contact'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Form */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: BRAND_COLORS.textPrimary }}>
              Full Name *
            </label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${formErrors.name
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                }`}
              placeholder="Enter full name"
              style={{ backgroundColor: BRAND_COLORS.surface }}
            />
            {formErrors.name && (
              <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: BRAND_COLORS.textPrimary }}>
              Relationship *
            </label>
            <div className="grid grid-cols-4 gap-2">
              {RELATIONSHIP_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormRelationship(option.value)}
                  className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${formRelationship === option.value
                    ? 'border-blue-500 text-blue-600'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  style={{
                    backgroundColor: formRelationship === option.value
                      ? `${BRAND_COLORS.primary}10`
                      : 'white'
                  }}
                >
                  <div className="text-lg mb-1">{option.icon}</div>
                  <div>{option.value}</div>
                </button>
              ))}
            </div>
            {formErrors.relationship && (
              <p className="text-red-600 text-xs mt-1">{formErrors.relationship}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: BRAND_COLORS.textPrimary }}>
              Mobile Number *
            </label>
            <input
              type="tel"
              value={formPhone}
              onChange={(e) => setFormPhone(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${formErrors.phone
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100'
                }`}
              placeholder="09171234567"
              style={{ backgroundColor: BRAND_COLORS.surface }}
            />
            {formErrors.phone && (
              <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: BRAND_COLORS.textPrimary }}>
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:ring-offset-1"
              placeholder="email@example.com"
              style={{ backgroundColor: BRAND_COLORS.surface }}
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-medium text-white transition-all active:scale-95"
              style={{ backgroundColor: BRAND_COLORS.primary }}
            >
              <Check className="w-5 h-5" />
              {isEditing ? 'Save Changes' : 'Add Emergency Contact'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}