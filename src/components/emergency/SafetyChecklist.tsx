import { useState } from 'react'
import { Shield, Check } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'

export default function SafetyChecklist() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 border-2" style={{ borderColor: BRAND_COLORS.primary }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Shield className="w-4 h-4" style={{ color: BRAND_COLORS.primary }} />
          Safety Instructions
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs" style={{ color: BRAND_COLORS.danger }}
        >
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-3">
          {[
            'Stay calm and remain where you are',
            'Keep your phone visible and accessible',
            'If safe, unlock doors for responders',
            'Answer all calls from unknown numbers'
          ].map((instruction, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${BRAND_COLORS.success}20` }}>
                <Check className="w-3 h-3" style={{ color: BRAND_COLORS.success }} />
              </div>
              <p className="text-xs text-gray-600">{instruction}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}