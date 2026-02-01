import { useState, useRef } from 'react'
import { FileText, Calendar, Check } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'
import { MedicalRecord, mockRecords } from './types'

interface HealthRecordListProps {
  onSelectRecord: (record: MedicalRecord) => void
  getIcon: (type: string) => React.ReactNode
  getTypeColor: (type: string) => { bg: string; text: string; icon: string }
}

export default function HealthRecordList({ onSelectRecord, getIcon, getTypeColor }: HealthRecordListProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredRecords = mockRecords.filter(record =>
    filterStatus === 'all' || record.status === filterStatus
  )

  const handleUploadDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadSuccess(true)
          setTimeout(() => setUploadSuccess(false), 3000)
          return 100
        }
        return prev + Math.random() * 35
      })
    }, 250)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['all', 'active', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status as any)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${filterStatus === status
              ? 'text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            style={filterStatus === status ? { backgroundColor: BRAND_COLORS.primary } : {}}
          >
            {status === 'all' ? 'All Records' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => {
            const colors = getTypeColor(record.type)
            return (
              <button
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className="w-full bg-white rounded-2xl shadow-md p-5 text-left hover:shadow-lg transition-all"
              >
                <div className="flex gap-4">
                  <div className={`${colors.bg} rounded-xl p-3 shrink-0`}>
                    <div className={colors.icon}>{getIcon(record.type)}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{record.title}</h3>
                        <p className={`text-xs ${colors.text} font-semibold mt-1`}>
                          {record.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </p>
                      </div>
                      {record.status === 'active' && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      {record.date}
                    </div>
                    {record.doctor && (
                      <p className="text-xs text-gray-600">👨‍⚕️ {record.doctor}</p>
                    )}
                    <p className="text-xs text-gray-600 mt-1">{record.facility}</p>
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No records found</p>
          </div>
        )}
      </div>

      {/* Import Records Section */}
      <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
        <h3 className="font-bold text-gray-900 mb-4">Add New Records</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload your medical records from other facilities
        </p>

        {uploadSuccess ? (
          <div className="w-full py-3 px-4 rounded-lg bg-green-100 text-green-700 font-semibold transition-all flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            Document uploaded successfully!
          </div>
        ) : uploadProgress > 0 && uploadProgress < 100 ? (
          <div>
            <div className="w-full py-3 rounded-lg bg-blue-50 text-blue-700 font-semibold text-center mb-3">
              Uploading: {Math.floor(uploadProgress)}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <label className="w-full cursor-pointer">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.png"
              onChange={handleUploadDocument}
              className="hidden"
            />
            <div className="w-full py-3 rounded-lg border-2 border-dashed border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <FileText className="w-5 h-5" />
              Choose File to Upload
            </div>
          </label>
        )}
      </div>
    </>
  )
}