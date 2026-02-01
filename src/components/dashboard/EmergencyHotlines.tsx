import { Phone } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'

const HOTLINES = [
  { name: 'Naga City Emergency', number: '911' },
  { name: 'DOH Hotline', number: '1555' },
  { name: 'Red Cross Naga', number: '143' }
]

export default function EmergencyHotlines() {
  return (
    <section className="bg-white rounded-xl shadow-sm p-6 border" style={{ borderColor: '#E2E8F0' }}>
      <div className="flex items-center gap-3 mb-5">
        <Phone className="w-5 h-5" style={{ color: BRAND_COLORS.secondary }} />
        <h3 className="font-semibold text-base" style={{ color: BRAND_COLORS.textPrimary }}>Emergency Hotlines</h3>
      </div>
      <div className="space-y-4">
        {HOTLINES.map((hotline, index) => (
          <div key={hotline.number} className={`flex items-center justify-between ${index < HOTLINES.length - 1 ? 'pb-4 border-b' : ''}`} style={{ borderColor: '#E2E8F0' }}>
            <span className="font-medium text-sm" style={{ color: BRAND_COLORS.textSecondary }}>{hotline.name}</span>
            <a href={`tel:${hotline.number}`} className="font-semibold text-base hover:underline" style={{ color: BRAND_COLORS.danger }}>{hotline.number}</a>
          </div>
        ))}
      </div>
    </section>
  )
}