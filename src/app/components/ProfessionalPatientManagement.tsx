import { useState } from 'react';
import { ChevronLeft, Search, Phone, Mail, Calendar, FileText, MessageSquare, Heart, AlertCircle, ChevronRight, Check, X } from 'lucide-react';
import PatientRecords from './PatientRecords';

type Screen = 'patient-management' | 'professional-dashboard' | 'entry' | 'user-type' | 'telemedicine' | 'health-assistant' | 'emergency' | 'hospitals' | 'contacts';

interface ProfessionalPatientManagementProps {
  onNavigate: (screen: Screen) => void;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  lastVisit: string;
  conditions: string[];
  phone: string;
  email: string;
  avatar: string;
  status: 'stable' | 'monitoring' | 'urgent';
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

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Santos',
    age: 45,
    gender: 'M',
    lastVisit: 'January 20, 2026',
    conditions: ['Hypertension', 'Diabetes Type 2'],
    phone: '09171234567',
    email: 'john.santos@email.com',
    avatar: '👨',
    status: 'monitoring',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    age: 32,
    gender: 'F',
    lastVisit: 'January 22, 2026',
    conditions: ['Asthma'],
    phone: '09159876543',
    email: 'maria.garcia@email.com',
    avatar: '👩',
    status: 'stable',
  },
  {
    id: '3',
    name: 'Pedro Reyes',
    age: 58,
    gender: 'M',
    lastVisit: 'January 15, 2026',
    conditions: ['Hypertension', 'High Cholesterol', 'Cardiology Follow-up'],
    phone: '09188765432',
    email: 'pedro.reyes@email.com',
    avatar: '👴',
    status: 'monitoring',
  },
  {
    id: '4',
    name: 'Ana Lopez',
    age: 29,
    gender: 'F',
    lastVisit: 'January 18, 2026',
    conditions: ['Pregnancy - 6 months'],
    phone: '09152223333',
    email: 'ana.lopez@email.com',
    avatar: '👩',
    status: 'monitoring',
  },
  {
    id: '5',
    name: 'Carlos Mendoza',
    age: 67,
    gender: 'M',
    lastVisit: 'January 10, 2026',
    conditions: ['Post-Surgery Recovery'],
    phone: '09174445555',
    email: 'carlos.mendoza@email.com',
    avatar: '👨',
    status: 'urgent',
  },
];

export default function ProfessionalPatientManagement({ onNavigate }: ProfessionalPatientManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [viewingRecords, setViewingRecords] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'lastVisit' | 'status'>('name');
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [noteSuccess, setNoteSuccess] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [medicalNote, setMedicalNote] = useState('');
  const [callSuccess, setCallSuccess] = useState(false);
  const [phoneDialing, setPhoneDialing] = useState(false);

  const filteredPatients = mockPatients
    .filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'lastVisit':
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        case 'status':
          const statusOrder = { urgent: 0, monitoring: 1, stable: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        default:
          return 0;
      }
    });

  const handleStartConsultation = () => {
    setConsultationSuccess(true);
    setTimeout(() => setConsultationSuccess(false), 2500);
  };

  const handleViewRecords = () => {
    setViewingRecords(true);
  };

  const handleAddNote = () => {
    if (medicalNote.trim()) {
      setNoteSuccess(true);
      setShowNoteModal(false);
      setMedicalNote('');
      setTimeout(() => setNoteSuccess(false), 2500);
    }
  };

  const handlePhoneCall = () => {
    setPhoneDialing(true);
    setTimeout(() => {
      setPhoneDialing(false);
      setCallSuccess(true);
      setTimeout(() => setCallSuccess(false), 2500);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return { bg: 'bg-green-100', text: 'text-green-700', icon: '✓' };
      case 'monitoring':
        return { bg: 'bg-orange-100', text: 'text-orange-700', icon: '!' };
      case 'urgent':
        return { bg: 'bg-red-100', text: 'text-red-700', icon: '!' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', icon: '-' };
    }
  };

  if (viewingRecords && selectedPatient) {
    return (
      <PatientRecords
        patientId={selectedPatient.id}
        patientName={selectedPatient.name}
        onNavigate={(screen: Screen) => {
          if (screen === 'patient-management') {
            setViewingRecords(false);
          } else {
            onNavigate(screen);
          }
        }}
      />
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
          <h1 className="text-2xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-sm text-gray-600 mt-2">Manage {mockPatients.length} patients</p>
        </div>
      </div>

      <div className="p-6 pb-20">
        {!selectedPatient ? (
          <>
            {/* Search and Filter */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patient by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {['name', 'lastVisit', 'status'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option as any)}
                    className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                      sortBy === option
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={sortBy === option ? { backgroundColor: BRAND_COLORS.secondary } : {}}
                  >
                    {option === 'name'
                      ? 'Name'
                      : option === 'lastVisit'
                      ? 'Last Visit'
                      : 'Status'}
                  </button>
                ))}
              </div>
            </div>

            {/* Patients List */}
            <div className="space-y-3">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => {
                  const statusColor = getStatusColor(patient.status);
                  return (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className="w-full bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{patient.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-gray-900">{patient.name}</h3>
                              <p className="text-sm text-gray-600">{patient.age} years • {patient.gender === 'M' ? 'Male' : 'Female'}</p>
                            </div>
                            <span className={`${statusColor.bg} ${statusColor.text} text-xs px-2 py-1 rounded-full font-semibold`}>
                              {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                            </span>
                          </div>

                          <div className="space-y-1 mb-3">
                            {patient.conditions.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {patient.conditions.slice(0, 2).map((condition, idx) => (
                                  <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                    {condition}
                                  </span>
                                ))}
                                {patient.conditions.length > 2 && (
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                    +{patient.conditions.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Calendar className="w-4 h-4" />
                            Last visit: {patient.lastVisit}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No patients found</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Patient Detail View */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-6xl">{selectedPatient.avatar}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                  <p className="text-gray-600 mt-1">
                    {selectedPatient.age} years old • {selectedPatient.gender === 'M' ? 'Male' : 'Female'}
                  </p>
                  <div className="mt-3">
                    <span className={`${getStatusColor(selectedPatient.status).bg} ${getStatusColor(selectedPatient.status).text} text-xs px-3 py-1 rounded-full font-semibold`}>
                      Status: {selectedPatient.status.charAt(0).toUpperCase() + selectedPatient.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 pb-3 border-b">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <a href={`tel:${selectedPatient.phone}`} className="font-semibold text-gray-900 hover:underline">
                      {selectedPatient.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-3 border-b">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a href={`mailto:${selectedPatient.email}`} className="font-semibold text-gray-900 hover:underline">
                      {selectedPatient.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Last Visit</p>
                    <p className="font-semibold text-gray-900">{selectedPatient.lastVisit}</p>
                  </div>
                </div>
              </div>

              {/* Medical Conditions */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Medical Conditions</h3>
                <div className="space-y-2">
                  {selectedPatient.conditions.length > 0 ? (
                    selectedPatient.conditions.map((condition, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-gray-700">{condition}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No known conditions</p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {callSuccess ? (
                  <div className="w-full py-3 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 animate-pulse" style={{ backgroundColor: BRAND_COLORS.success }}>
                    <Check className="w-5 h-5" />
                    Call Initiated Successfully!
                  </div>
                ) : phoneDialing ? (
                  <div className="w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2" style={{ backgroundColor: BRAND_COLORS.secondary }}>
                    <Phone className="w-5 h-5 animate-pulse" />
                    Calling {selectedPatient.name}...
                  </div>
                ) : (
                  <button 
                    onClick={handlePhoneCall}
                    className="w-full py-3 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 hover:opacity-90" 
                    style={{ backgroundColor: BRAND_COLORS.secondary }}
                  >
                    <Phone className="w-5 h-5" />
                    Call Patient
                  </button>
                )}

                {consultationSuccess ? (
                  <div className="w-full py-3 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 animate-pulse" style={{ backgroundColor: BRAND_COLORS.success }}>
                    <Check className="w-5 h-5" />
                    Consultation Starting!
                  </div>
                ) : (
                  <button 
                    onClick={handleStartConsultation}
                    className="w-full py-3 rounded-lg text-white font-semibold transition-all flex items-center justify-center gap-2 hover:opacity-90" 
                    style={{ backgroundColor: BRAND_COLORS.primary }}
                  >
                    <MessageSquare className="w-5 h-5" />
                    Start Video Consultation
                  </button>
                )}

                <button 
                  onClick={handleViewRecords}
                  className="w-full py-3 rounded-lg border-2 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2" 
                  style={{ borderColor: BRAND_COLORS.secondary, color: BRAND_COLORS.secondary }}
                >
                  <FileText className="w-5 h-5" />
                  View Medical Records
                </button>

                {noteSuccess ? (
                  <div className="w-full py-3 rounded-lg border-2 text-white font-semibold transition-all flex items-center justify-center gap-2 animate-pulse" style={{ backgroundColor: BRAND_COLORS.success, borderColor: BRAND_COLORS.success }}>
                    <Check className="w-5 h-5" />
                    Note Added Successfully!
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowNoteModal(true)}
                    className="w-full py-3 rounded-lg border-2 text-gray-700 font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2" 
                    style={{ borderColor: BRAND_COLORS.secondary, color: BRAND_COLORS.secondary }}
                  >
                    <Heart className="w-5 h-5" />
                    Add Medical Note
                  </button>
                )}
              </div>
            </div>

            {/* Consultation History */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Consultations</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 pb-3 border-b">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Video Consultation</p>
                    <p className="text-sm text-gray-600">January 20, 2026 • 2:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b">
                  <div className="bg-purple-100 rounded-lg p-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Lab Results Review</p>
                    <p className="text-sm text-gray-600">January 15, 2026 • 10:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-lg p-2">
                    <Heart className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Follow-up Appointment</p>
                    <p className="text-sm text-gray-600">January 10, 2026 • 11:15 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Medical Note Modal */}
      {showNoteModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Add Medical Note</h3>
              <button 
                onClick={() => setShowNoteModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">For: {selectedPatient.name}</p>

            <textarea
              value={medicalNote}
              onChange={(e) => setMedicalNote(e.target.value)}
              placeholder="Add clinical notes, observations, recommendations..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowNoteModal(false)}
                className="flex-1 py-3 rounded-lg border-2 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                style={{ borderColor: BRAND_COLORS.border }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                disabled={!medicalNote.trim()}
                className="flex-1 py-3 rounded-lg text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                style={{ backgroundColor: BRAND_COLORS.secondary }}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
