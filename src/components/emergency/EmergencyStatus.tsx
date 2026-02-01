import { useState, useEffect } from 'react'
import { Radio, Satellite, UserCheck, Clock } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'

interface EmergencyStatusProps {
  initialCountdown?: number
}

export default function EmergencyStatus({ initialCountdown = 5 }: EmergencyStatusProps) {
  const [countdown, setCountdown] = useState(initialCountdown)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [countdown])

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border-2" style={{ borderColor: BRAND_COLORS.danger }}>
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-20 h-20 relative mb-3">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke={`${BRAND_COLORS.danger}20`} strokeWidth="8" />
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke={BRAND_COLORS.danger}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * (5 - countdown) / 5)}
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: BRAND_COLORS.danger }}>{countdown}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Connecting to emergency services...</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border" style={{ borderColor: `${BRAND_COLORS.danger}30` }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND_COLORS.danger}20` }}>
              <Radio className="w-4 h-4" style={{ color: BRAND_COLORS.danger }} />
            </div>
            <span className="text-xs font-semibold text-gray-800">911 Dispatch</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-gray-500">Connected</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border" style={{ borderColor: `${BRAND_COLORS.primary}30` }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND_COLORS.danger}20` }}>
              <Satellite className="w-4 h-4" style={{ color: BRAND_COLORS.primary }} />
            </div>
            <span className="text-xs font-semibold text-gray-800">Location</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-gray-500">Live tracking</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border" style={{ borderColor: `${BRAND_COLORS.success}30` }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND_COLORS.success}20` }}>
              <UserCheck className="w-4 h-4" style={{ color: BRAND_COLORS.success }} />
            </div>
            <span className="text-xs font-semibold text-gray-800">Contacts</span>
          </div>
          <div className="text-xs text-gray-600">3 notified</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border" style={{ borderColor: `${BRAND_COLORS.danger}30` }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND_COLORS.danger}20` }}>
              <Clock className="w-4 h-4" style={{ color: BRAND_COLORS.danger }} />
            </div>
            <span className="text-xs font-semibold text-gray-800">ETA</span>
          </div>
          <div className="text-sm font-bold text-gray-800">5-8 min</div>
        </div>
      </div>
    </>
  )
}