import { useState, useRef } from 'react';
import { ChevronLeft, FileText, Download, Share2, Calendar, Activity, Heart, Pill, AlertCircle, Check, Copy, Mail } from 'lucide-react';

type Screen = 'health-records' | 'dashboard' | 'entry' | 'telemedicine' | 'pharmacy' | 'health-assistant' | 'emergency' | 'hospitals' | 'contacts';

interface HealthRecordsProps {
  onNavigate: (screen: Screen) => void;
}

interface MedicalRecord {
  id: string;
  type: 'consultation' | 'lab-test' | 'prescription' | 'vaccination' | 'diagnosis';
  title: string;
  date: string;
  doctor?: string;
  facility: string;
  details: string;
  icon: React.ReactNode;
  status: 'active' | 'completed' | 'archived';
}

const BRAND_COLORS = {
  primary: '#F7502F',      // Naga Coral
  secondary: '#1D62AF',    // Fun Blue
  success: '#00A651',      // Success Green
  background: '#FAFBFC',   // Athens Gray
  textDark: '#1A202C',
  textMid: '#4A5568',
  textLight: '#718096',
  border: '#E2E8F0',
};

const mockRecords: MedicalRecord[] = [
  {
    id: '1',
    type: 'consultation',
    title: 'General Checkup',
    date: 'January 20, 2026',
    doctor: 'Dr. Maria Santos',
    facility: 'Metro Naga Medical Center',
    details: 'Regular health checkup. All vitals normal. Continue healthy lifestyle.',
    icon: <Activity className="w-5 h-5" />,
    status: 'completed',
  },
  {
    id: '2',
    type: 'lab-test',
    title: 'Blood Test Results',
    date: 'January 18, 2026',
    facility: 'Metro Naga Laboratory',
    details: 'Complete Blood Count (CBC) - All results within normal range',
    icon: <Heart className="w-5 h-5" />,
    status: 'completed',
  },
  {
    id: '3',
    type: 'prescription',
    title: 'Hypertension Management',
    date: 'January 15, 2026',
    doctor: 'Dr. Rosa Cruz',
    facility: 'Bicol Medical Center',
    details: 'Lisinopril 10mg - Once daily. Take with meals.',
    icon: <Pill className="w-5 h-5" />,
    status: 'active',
  },
  {
    id: '4',
    type: 'vaccination',
    title: 'COVID-19 Booster',
    date: 'January 10, 2026',
    facility: 'Naga City Health Center',
    details: 'Pfizer-BioNTech Booster Dose - Booster #2',
    icon: <AlertCircle className="w-5 h-5" />,
    status: 'completed',
  },
  {
    id: '5',
    type: 'diagnosis',
    title: 'Hypertension - Stage 1',
    date: 'December 28, 2025',
    doctor: 'Dr. Rosa Cruz',
    facility: 'Metro Naga Medical Center',
    details: 'BP: 140/90 mmHg. Lifestyle modifications recommended.',
    icon: <AlertCircle className="w-5 h-5" />,
    status: 'active',
  },
];

export default function HealthRecords({ onNavigate }: HealthRecordsProps) {
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [shareMethod, setShareMethod] = useState<'email' | 'link' | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredRecords = mockRecords.filter(record =>
    filterStatus === 'all' || record.status === filterStatus
  );

  const handleDownloadPDF = () => {
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadSuccess(true);
          setTimeout(() => setDownloadSuccess(false), 3000);
          return 100;
        }
        return prev + Math.random() * 40;
      });
    }, 200);
  };

  const handleShareRecord = (method: 'email' | 'link') => {
    setShareMethod(method);
    setTimeout(() => {
      setShareSuccess(true);
      setShareMethod(null);
      setTimeout(() => setShareSuccess(false), 3000);
    }, 800);
  };

  const handleUploadDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
          return 100;
        }
        return prev + Math.random() * 35;
      });
    }, 250);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation':
        return { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'text-blue-600' };
      case 'lab-test':
        return { bg: 'bg-purple-100', text: 'text-purple-700', icon: 'text-purple-600' };
      case 'prescription':
        return { bg: 'bg-red-100', text: 'text-red-700', icon: 'text-red-600' };
      case 'vaccination':
        return { bg: 'bg-green-100', text: 'text-green-700', icon: 'text-green-600' };
      case 'diagnosis':
        return { bg: 'bg-orange-100', text: 'text-orange-700', icon: 'text-orange-600' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', icon: 'text-gray-600' };
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.background }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="p-6">
          <button
            onClick={() => {
              if (selectedRecord) setSelectedRecord(null);
              else onNavigate('dashboard');
            }}
            className="flex items-center gap-2 mb-4"
            style={{ color: BRAND_COLORS.secondary }}
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
          <>
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['all', 'active', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                    filterStatus === status
                      ? 'text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={filterStatus === status ? { backgroundColor: BRAND_COLORS.secondary } : {}}
                >
                  {status === 'all'
                    ? 'All Records'
                    : status === 'active'
                    ? 'Active'
                    : 'Completed'}
                </button>
              ))}
            </div>

            {/* Records List */}
            <div className="space-y-4">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => {
                  const colors = getTypeColor(record.type);
                  return (
                    <button
                      key={record.id}
                      onClick={() => setSelectedRecord(record)}
                      className="w-full bg-white rounded-2xl shadow-md p-5 text-left hover:shadow-lg transition-all"
                    >
                      <div className="flex gap-4">
                        <div className={`${colors.bg} rounded-xl p-3 flex-shrink-0`}>
                          <div className={colors.icon}>{record.icon}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-gray-900">{record.title}</h3>
                              <p className={`text-xs ${colors.text} font-semibold mt-1`}>
                                {record.type
                                  .split('-')
                                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                                  .join(' ')}
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
                  );
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
        ) : (
          /* Record Detail View */
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className={`${getTypeColor(selectedRecord.type).bg} rounded-xl p-3`}>
                <div className={getTypeColor(selectedRecord.type).icon}>{selectedRecord.icon}</div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{selectedRecord.title}</h2>
                {selectedRecord.status === 'active' && (
                  <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold mt-2">
                    Active
                  </span>
                )}
              </div>
            </div>

            {/* Record Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 pb-4 border-b">
                <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">{selectedRecord.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b">
                <FileText className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-semibold text-gray-900">
                    {selectedRecord.type
                      .split('-')
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ')}
                  </p>
                </div>
              </div>

              {selectedRecord.doctor && (
                <div className="flex items-start gap-3 pb-4 border-b">
                  <Activity className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Doctor</p>
                    <p className="font-semibold text-gray-900">{selectedRecord.doctor}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Facility</p>
                  <p className="font-semibold text-gray-900">{selectedRecord.facility}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
              <p className="text-gray-700">{selectedRecord.details}</p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {downloadSuccess ? (
                <div className="w-full py-3 rounded-lg text-center text-white font-semibold transition-all flex items-center justify-center gap-2 animate-pulse" style={{ backgroundColor: BRAND_COLORS.success }}>
                  <Check className="w-5 h-5" />
                  PDF Downloaded Successfully!
                </div>
              ) : downloadProgress > 0 && downloadProgress < 100 ? (
                <div>
                  <div className="w-full py-3 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 mb-3" style={{ backgroundColor: BRAND_COLORS.secondary }}>
                    <Download className="w-5 h-5" />
                    Downloading: {Math.floor(downloadProgress)}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-200" 
                      style={{ width: `${downloadProgress}%`, backgroundColor: BRAND_COLORS.secondary }}
                    />
                  </div>
                </div>
              ) : (
                <button 
                  onClick={handleDownloadPDF}
                  className="w-full py-3 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 hover:opacity-90" 
                  style={{ backgroundColor: BRAND_COLORS.secondary }}
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              )}
              
              {shareSuccess ? (
                <div className="w-full py-3 rounded-lg text-center font-semibold transition-all flex items-center justify-center gap-2 animate-pulse" style={{ backgroundColor: '#E8F4F8', color: BRAND_COLORS.secondary }}>
                  <Check className="w-5 h-5" />
                  Record Shared Successfully!
                </div>
              ) : shareMethod ? (
                <div className="space-y-2">
                  <div className="w-full py-3 rounded-lg text-center text-white font-semibold" style={{ backgroundColor: BRAND_COLORS.secondary }}>
                    {shareMethod === 'email' ? 'Sending via Email...' : 'Generating Share Link...'}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300 animate-pulse" 
                      style={{ width: '100%', backgroundColor: BRAND_COLORS.secondary }}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <button 
                    onClick={() => handleShareRecord('email')}
                    className="w-full py-3 rounded-lg border-2 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2" 
                    style={{ borderColor: BRAND_COLORS.secondary, color: BRAND_COLORS.secondary }}
                  >
                    <Mail className="w-5 h-5" />
                    Share via Email
                  </button>
                  <button 
                    onClick={() => handleShareRecord('link')}
                    className="w-full py-3 rounded-lg border-2 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2" 
                    style={{ borderColor: BRAND_COLORS.secondary, color: BRAND_COLORS.secondary }}
                  >
                    <Copy className="w-5 h-5" />
                    Copy Share Link
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
