import { useState, useEffect } from 'react'
import { 
  ChevronLeft, 
  Activity, 
  Heart, 
  Pill, 
  AlertCircle,
  Plus
} from 'lucide-react'
import { Screen } from "../../types"
import { BRAND_COLORS } from '../../constants/colors'
import { MedicalRecord } from './types'
import { healthRecordService } from '../../services/healthRecords'
import { useAuth } from '../../context/AuthContext'
import HealthRecordList from './HealthRecordList'
import HealthRecordDetail from './HealthRecordDetail'
import AddRecordModal from './AddRecordModal'

interface HealthRecordsProps {
  onNavigate: (screen: Screen) => void
}

export default function HealthRecords({ onNavigate }: HealthRecordsProps) {
  const { user } = useAuth()
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadRecords()
    } else {
      setLoading(false)
    }
  }, [user])

  async function loadRecords() {
    try {
      setLoading(true)
      const data = await healthRecordService.getRecords()
      setRecords(data)
    } catch (error) {
      console.error('Failed to load records:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddRecord(newRecord: Omit<MedicalRecord, 'id'>) {
    await healthRecordService.addRecord(newRecord)
    loadRecords()
    setIsAddModalOpen(false)
  }

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: BRAND_COLORS.surface }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: BRAND_COLORS.primary }}></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.surface }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="flex p-4 items-center justify-between">
          <button
            onClick={() => {
              if (selectedRecord) setSelectedRecord(null)
              else onNavigate('dashboard')
            }}
            className="flex items-center gap-2"
            style={{ color: BRAND_COLORS.primary }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </button>
          
          {/* NEW ADD BUTTON */}
          {!selectedRecord && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-2 rounded-full bg-teal-50 text-teal-600 hover:bg-teal-100 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      <div className="p-6 pb-20">
        {!selectedRecord ? (
          <HealthRecordList 
            records={records}
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

      <AddRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddRecord}
      />
    </div>
  )
}