import { useState } from 'react'
import { ArrowLeft, AlertTriangle, Shield, Radio } from 'lucide-react'
import { Screen } from '../../types'
import { BRAND_COLORS } from '../../constants/colors'
import EmergencyTypeSelector from './EmergencyTypeSelector'
import ActiveEmergencyView from './ActiveEmergencyView'

interface EmergencyActivationProps {
  onNavigate: (screen: Screen) => void
}

export default function EmergencyActivation({ onNavigate }: EmergencyActivationProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [emergencyActivated, setEmergencyActivated] = useState(false)
  const [emergencyType, setEmergencyType] = useState<'medical' | 'accident' | 'other' | null>(null)

  const handleActivateEmergency = () => {
    setShowConfirmModal(false)
    setEmergencyActivated(true)
  }

  if (emergencyActivated) {
    return (
      <ActiveEmergencyView
        onCancel={() => setEmergencyActivated(false)}
        onNavigate={onNavigate}
      />
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.surface }}>
      {/* Header Section */}
      <div
        className="text-white pt-6 px-6 pb-8"
        style={{ backgroundColor: BRAND_COLORS.primary }}
      >
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium text-sm">Back to Dashboard</span>
        </button>

        <div className="mb-2">
          <p className="text-white/80 text-sm font-medium mb-1">Emergency Activation</p>
          <h1 className="text-4xl font-bold">911</h1>
          <p className="text-white/90 text-base mt-1">Naga City Emergency Response</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-8 pb-32">
        {/* Warning Alert */}
        <div
          className="rounded-2xl p-5 border-2 mb-6"
          style={{
            backgroundColor: `${BRAND_COLORS.danger}10`,
            borderColor: BRAND_COLORS.danger
          }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: BRAND_COLORS.danger }} />
            <div>
              <h4 className="text-sm font-semibold text-gray-900">For Life-Threatening Emergencies Only</h4>
              <p className="text-xs text-gray-600 mt-1">Use this feature only when immediate professional assistance is required.</p>
            </div>
          </div>
        </div>

        {/* Emergency Type Selector Component */}
        <EmergencyTypeSelector 
          selectedType={emergencyType}
          onSelect={setEmergencyType}
        />

        {/* Activation Button - Fixed Bottom */}
        <div
          className="fixed bottom-0 left-0 right-0 p-6 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(0,0,0,0.05)'
          }}
        >
          <div className="max-w-md mx-auto">
            <div className="relative group">
              <div
                className="absolute -inset-1 rounded-2xl opacity-25 group-hover:opacity-50 blur transition duration-200"
                style={{ backgroundColor: BRAND_COLORS.danger }}
              />
              <button
                onClick={() => setShowConfirmModal(true)}
                className="relative w-full rounded-xl py-5 font-bold flex items-center justify-center gap-3 text-lg transition-all active:scale-[0.98]"
                style={{
                  background: `linear-gradient(to right, ${BRAND_COLORS.danger}, #DC2626)`,
                  color: 'white',
                  boxShadow: `0 4px 14px 0 rgba(220, 38, 38, 0.39)`
                }}
              >
                <div className="p-1 bg-white/20 rounded-full">
                  <AlertTriangle className="w-4 h-4" fill="white" />
                </div>
                <span className="tracking-wide">ACTIVATE EMERGENCY ALERT</span>
              </button>
            </div>
            <p className="text-center text-xs font-medium text-gray-500 mt-3 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              Double-tap confirmation required
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: `${BRAND_COLORS.danger}20` }}>
                <AlertTriangle className="w-10 h-10" style={{ color: BRAND_COLORS.danger }} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-3 text-gray-900">Confirm Emergency Alert</h2>
            <p className="text-center text-sm mb-8 text-gray-600">
              This will immediately notify emergency services (911), your emergency contacts, and share your location.
            </p>

            {/* Notification Summary */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${BRAND_COLORS.danger}10` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0" style={{ backgroundColor: BRAND_COLORS.danger }}>
                  <Radio className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-800">Naga Emergency (911)</div>
                  <div className="text-xs text-gray-500">Dispatching nearest unit</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleActivateEmergency}
                className="w-full rounded-xl px-6 py-4 font-semibold transition-all active:scale-[0.98] shadow-sm"
                style={{ backgroundColor: BRAND_COLORS.danger, color: 'white' }}
              >
                YES - This is an Emergency
              </button>

              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full rounded-xl px-6 py-4 font-semibold border-2 transition-all active:scale-[0.98]"
                style={{ borderColor: '#CBD5E1', color: '#475569' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}