import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Search, Phone, Mail, Video, MessageSquare, Clock, CheckCircle, AlertCircle, Plus, X } from 'lucide-react';

type Screen = 'start-consultation' | 'professional-dashboard' | 'entry' | 'patient-management' | 'health-assistant' | 'emergency' | 'hospitals' | 'contacts';

interface StartConsultationProps {
  onNavigate: (screen: Screen) => void;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  conditions: string[];
  phone: string;
  avatar: string;
  status: 'stable' | 'monitoring' | 'urgent';
}

interface ConsultationSession {
  id: string;
  patientId: string;
  patientName: string;
  startTime: string;
  type: 'video' | 'phone' | 'message';
  status: 'active' | 'completed' | 'scheduled';
  notes: string;
}

const BRAND_COLORS = {
  primary: '#F7502F',      // Naga Coral
  secondary: '#1D62AF',    // Fun Blue
  success: '#00A651',      // Success Green
  warning: '#F59E0B',      // Amber
  background: '#FAFBFC',   // Athens Gray
  textDark: '#1A202C',
  textMid: '#4A5568',
  textLight: '#718096',
  border: '#E2E8F0',
};

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Santos',
    age: 45,
    lastVisit: 'January 20, 2026',
    conditions: ['Hypertension', 'Diabetes Type 2'],
    phone: '09171234567',
    avatar: '👨',
    status: 'monitoring',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    age: 32,
    lastVisit: 'January 22, 2026',
    conditions: ['Asthma'],
    phone: '09159876543',
    avatar: '👩',
    status: 'stable',
  },
  {
    id: '3',
    name: 'Pedro Reyes',
    age: 58,
    lastVisit: 'January 15, 2026',
    conditions: ['Hypertension', 'High Cholesterol'],
    phone: '09188765432',
    avatar: '👴',
    status: 'monitoring',
  },
  {
    id: '4',
    name: 'Ana Lopez',
    age: 29,
    lastVisit: 'January 18, 2026',
    conditions: ['Pregnancy - 6 months'],
    phone: '09152223333',
    avatar: '👩',
    status: 'stable',
  },
  {
    id: '5',
    name: 'Carlos Mendoza',
    age: 55,
    lastVisit: 'January 21, 2026',
    conditions: ['Arthritis', 'Pain Management'],
    phone: '09167777777',
    avatar: '👨',
    status: 'stable',
  },
];

export default function StartConsultation({ onNavigate }: StartConsultationProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [consultationType, setConsultationType] = useState<'video' | 'phone' | 'message' | null>(null);
  const [notes, setNotes] = useState('');
  const [activeSessions, setActiveSessions] = useState<ConsultationSession[]>([]);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentSession, setCurrentSession] = useState<ConsultationSession | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect - runs when session is active
  useEffect(() => {
    if (sessionStarted && currentSession) {
      timerRef.current = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [sessionStarted, currentSession]);

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartConsultation = () => {
    if (!selectedPatient || !consultationType) return;

    const newSession: ConsultationSession = {
      id: Date.now().toString(),
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      startTime: new Date().toLocaleTimeString(),
      type: consultationType,
      status: 'active',
      notes: notes,
    };

    setActiveSessions([...activeSessions, newSession]);
    setCurrentSession(newSession);
    setSessionStarted(true);
    setSessionDuration(0);
  };

  const handleEndConsultation = () => {
    if (currentSession) {
      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      setActiveSessions(activeSessions.map(s =>
        s.id === currentSession.id ? { ...s, status: 'completed' } : s
      ));
      setSessionStarted(false);
      setCurrentSession(null);
      setSelectedPatient(null);
      setConsultationType(null);
      setNotes('');
      setSessionDuration(0);
    }
  };

  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return { bg: 'bg-red-100', text: 'text-red-700', badge: 'bg-red-500' };
      case 'monitoring':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', badge: 'bg-yellow-500' };
      case 'stable':
        return { bg: 'bg-green-100', text: 'text-green-700', badge: 'bg-green-500' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', badge: 'bg-gray-500' };
    }
  };

  if (sessionStarted && currentSession) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.background }}>
        {/* Active Session */}
        <div className="sticky top-0 z-20 bg-white border-b shadow-md">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Active Consultation</h1>
                <p className="text-sm text-gray-600 mt-1">Duration: {formatDuration(sessionDuration)}</p>
              </div>
              <div className="text-3xl font-bold text-red-500 animate-pulse">● Recording</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Patient Info */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">{mockPatients.find(p => p.id === currentSession.patientId)?.avatar}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{currentSession.patientName}</h2>
                <p className="text-sm text-gray-600">Started: {currentSession.startTime}</p>
              </div>
            </div>
          </div>

          {/* Consultation Type */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              {currentSession.type === 'video' && (
                <>
                  <Video className="w-6 h-6" style={{ color: BRAND_COLORS.secondary }} />
                  <div>
                    <p className="text-sm text-gray-600">Video Consultation</p>
                    <p className="font-semibold text-gray-900">Camera and Audio Active</p>
                  </div>
                </>
              )}
              {currentSession.type === 'phone' && (
                <>
                  <Phone className="w-6 h-6" style={{ color: BRAND_COLORS.secondary }} />
                  <div>
                    <p className="text-sm text-gray-600">Phone Consultation</p>
                    <p className="font-semibold text-gray-900">Audio Call Active</p>
                  </div>
                </>
              )}
              {currentSession.type === 'message' && (
                <>
                  <MessageSquare className="w-6 h-6" style={{ color: BRAND_COLORS.secondary }} />
                  <div>
                    <p className="text-sm text-gray-600">Message Consultation</p>
                    <p className="font-semibold text-gray-900">Text Chat Active</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Consultation Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about the consultation..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            />
            <button
              onClick={handleAttachFile}
              className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
              style={{ borderColor: BRAND_COLORS.secondary, color: BRAND_COLORS.secondary }}
            >
              <Plus className="w-4 h-4" />
              Attach File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>

          {/* End Session Button */}
          <button
            onClick={handleEndConsultation}
            className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: BRAND_COLORS.primary }}
          >
            End Consultation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.background }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="p-6">
          <button
            onClick={() => {
              if (selectedPatient) setSelectedPatient(null);
              else onNavigate('professional-dashboard');
            }}
            className="flex items-center gap-2 mb-4"
            style={{ color: BRAND_COLORS.secondary }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Start Consultation</h1>
          <p className="text-sm text-gray-600 mt-2">Select a patient to begin consultation</p>
        </div>
      </div>

      <div className="p-6 pb-20">
        {!selectedPatient ? (
          <>
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                style={{ borderColor: searchTerm ? BRAND_COLORS.secondary : undefined }}
              />
            </div>

            {/* Active Sessions */}
            {activeSessions.filter(s => s.status === 'active').length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  {activeSessions.filter(s => s.status === 'active').map(session => (
                    <div key={session.id} className="bg-white rounded-2xl shadow-md p-4 border-l-4" style={{ borderColor: BRAND_COLORS.success }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{session.patientName}</p>
                          <p className="text-sm text-gray-600">Started: {session.startTime}</p>
                        </div>
                        <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: BRAND_COLORS.success }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Patients List */}
            <div className="space-y-4">
              {filteredPatients.length > 0 ? (
                filteredPatients.map(patient => {
                  const statusColor = getStatusColor(patient.status);
                  return (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className="w-full bg-white rounded-2xl shadow-md p-5 text-left hover:shadow-lg transition-all"
                    >
                      <div className="flex gap-4">
                        <div className="text-4xl">{patient.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-gray-900">{patient.name}</h3>
                              <p className="text-sm text-gray-600">{patient.age} years old</p>
                            </div>
                            <div className={`inline-block w-3 h-3 rounded-full ${statusColor.badge}`}></div>
                          </div>
                          <div className="mb-2">
                            {patient.conditions.slice(0, 2).map((condition, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full mr-2">
                                {condition}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <Phone className="w-4 h-4" />
                            {patient.phone}
                          </div>
                        </div>
                        <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No patients found</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Consultation Setup */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{selectedPatient.avatar}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                  <p className="text-sm text-gray-600">{selectedPatient.age} years old • Last visit: {selectedPatient.lastVisit}</p>
                </div>
                <button onClick={() => setSelectedPatient(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 font-semibold mb-2">Medical Conditions:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.conditions.map((condition, idx) => (
                    <span key={idx} className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">📞 {selectedPatient.phone}</p>
              </div>
            </div>

            {/* Consultation Type Selection */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Select Consultation Type</h3>
              <div className="space-y-3">
                {[
                  { type: 'video' as const, label: 'Video Call', icon: Video, desc: 'Face-to-face video consultation' },
                  { type: 'phone' as const, label: 'Phone Call', icon: Phone, desc: 'Audio call consultation' },
                  { type: 'message' as const, label: 'Message', icon: MessageSquare, desc: 'Text-based consultation' },
                ].map(({ type, label, icon: Icon, desc }) => (
                  <button
                    key={type}
                    onClick={() => setConsultationType(type)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      consultationType === type ? 'border-0' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={consultationType === type ? { backgroundColor: BRAND_COLORS.secondary, color: 'white' } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">{label}</p>
                        <p className="text-xs opacity-75">{desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Initial Notes */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Initial Notes (Optional)</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any initial notes before starting consultation..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              />
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartConsultation}
              disabled={!consultationType}
              className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{ backgroundColor: BRAND_COLORS.secondary }}
            >
              <Video className="w-5 h-5 inline mr-2" />
              Start Consultation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
