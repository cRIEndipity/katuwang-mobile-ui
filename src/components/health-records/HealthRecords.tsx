import { useState } from 'react'
import { 
  ChevronLeft, 
  Activity, 
  Heart, 
  Pill, 
  AlertCircle 
} from 'lucide-react'
import { Screen } from "../../types"
import { BRAND_COLORS } from '../../constants/colors'
import { MedicalRecord } from './types'
import HealthRecordList from './HealthRecordList'
import HealthRecordDetail from './HealthRecordDetail'

interface HealthRecordsProps {
  onNavigate: (screen: Screen) => void
}

export default function HealthRecords({ onNavigate }: HealthRecordsProps) {
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)

  // Helper functions used by both children
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'text-blue-600' }
      case 'lab-test': return { bg: 'bg-purple-100', text: 'text-purple-700', icon: 'text-purple-600' }
      case 'prescription': return { bg: 'bg-red-100', text: 'text-red-700', icon: 'text-red-600' }
      case 'vaccination': return { bg: 'bg-green-100', text: 'text-green-700', icon: 'text-green-600' }
      case 'diagnosis': return { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'text-orange-600' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'text-gray-600' }
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
        case 'consultation': return <Activity className="w-5 h-5" />
        case 'lab-test': return <Heart className="w-5 h-5" />
        case 'prescription': return <Pill className="w-5 h-5" />
        default: return <AlertCircle className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.surface }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="p-6">
          <button
            onClick={() => {
              if (selectedRecord) setSelectedRecord(null)
              else onNavigate('dashboard')
            }}
            className="flex items-center gap-2 mb-4"
            style={{ color: BRAND_COLORS.primary }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Health Records</h1>
          <p className="text-sm text-gray-600 mt-2">Your complete medical history</p>
        </div>
      </div>

      <div className="p-6 pb-20">
        {!selectedRecord ? (
          <HealthRecordList 
            onSelectRecord={setSelectedRecord}
            getIcon={getIcon}
            getTypeColor={getTypeColor}
          />
        ) : (
          <HealthRecordDetail 
            record={selectedRecord}
            getIcon={getIcon}
            getTypeColor={getTypeColor}
          />
        )}
      </div>
    </div>
  )
}