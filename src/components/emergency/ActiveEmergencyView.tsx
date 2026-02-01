import { ArrowLeft, Phone } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'
import { Screen } from '../../types'
import EmergencyStatus from './EmergencyStatus'
import SafetyChecklist from './SafetyChecklist'

interface ActiveEmergencyViewProps {
  onCancel: () => void
  onNavigate: (screen: Screen) => void
}

export default function ActiveEmergencyView({ onCancel, onNavigate }: ActiveEmergencyViewProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.dangerLight }}>
      {/* Header Section */}
      <div
        className="text-white pt-6 px-6 pb-6"
        style={{ backgroundColor: BRAND_COLORS.danger }}
      >
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium text-sm">Cancel</span>
        </button>

        <div className="mb-2">
          <p className="text-white/80 text-sm font-medium mb-1">Emergency Response</p>
          <h1 className="text-4xl font-bold">ACTIVATED</h1>
          <p className="text-white/90 text-base mt-1">Help is on the way</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-8 pb-24">
        <EmergencyStatus />
        <SafetyChecklist />

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href="tel:911"
            className="flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold transition-all active:scale-[0.98] shadow-sm"
            style={{ backgroundColor: BRAND_COLORS.danger, color: 'white' }}
          >
            <Phone className="w-5 h-5" />
            Call 911 Directly
          </a>

          <button
            onClick={onCancel}
            className="w-full border border-gray-300 text-gray-700 rounded-xl px-6 py-4 font-semibold hover:bg-gray-50 transition-all active:scale-[0.98]"
          >
            Cancel Emergency Alert
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full text-gray-600 rounded-xl px-6 py-4 font-semibold hover:bg-gray-50 transition-all active:scale-[0.98]"
            style={{ color: BRAND_COLORS.primary }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}