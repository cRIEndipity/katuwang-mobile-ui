import { Heart, Ambulance, AlertTriangle, ChevronRight } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'

interface EmergencyTypeSelectorProps {
  selectedType: string | null
  onSelect: (type: 'medical' | 'accident' | 'other') => void
}

const emergencyTypes = [
  { id: 'medical', label: 'Medical Emergency', icon: <Heart className="w-5 h-5" />, color: BRAND_COLORS.danger },
  { id: 'accident', label: 'Accident/Trauma', icon: <Ambulance className="w-5 h-5" />, color: BRAND_COLORS.primary },
  { id: 'other', label: 'Other Emergency', icon: <AlertTriangle className="w-5 h-5" />, color: '#9333EA' },
]

export default function EmergencyTypeSelector({ selectedType, onSelect }: EmergencyTypeSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Select Emergency Type</h2>
      <div className="space-y-2">
        {emergencyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id as any)}
            className={`w-full bg-white rounded-xl shadow-sm border-2 overflow-hidden hover:shadow-md transition-all active:scale-[0.98] text-left group ${selectedType === type.id ? 'border-2' : 'border-transparent'
              }`}
            style={{
              borderColor: selectedType === type.id ? type.color : 'transparent',
              backgroundColor: selectedType === type.id ? `${type.color}10` : 'white'
            }}
          >
            <div className="p-4 flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: selectedType === type.id ? type.color : `${type.color}20` }}
              >
                <div className="text-white">
                  {type.icon}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">{type.label}</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {type.id === 'medical' && 'Heart attack, stroke, severe injury'}
                  {type.id === 'accident' && 'Car crash, fall, major trauma'}
                  {type.id === 'other' && 'Fire, crime, other emergencies'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}