import { useState } from 'react';
import { 
  ChevronLeft, 
  FileText, 
  Calendar, 
  Pill, 
  Stethoscope, 
  Droplet, 
  Activity, 
  Download, 
  Eye,
  User,
  Clock,
  Thermometer,
  Heart,
  Wind,
  ActivitySquare,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Printer,
  Share2,
  FilePlus
} from 'lucide-react';

type Screen = 'patient-management' | 'professional-dashboard' | 'entry' | 'user-type' | 'telemedicine' | 'health-assistant' | 'emergency' | 'hospitals' | 'contacts';

interface PatientRecordsProps {
  patientId: string;
  patientName: string;
  onNavigate: (screen: Screen) => void;
}

interface MedicalRecord {
  id: string;
  date: string;
  type: 'diagnosis' | 'medication' | 'lab' | 'vital' | 'procedure' | 'note';
  title: string;
  description: string;
  doctor: string;
  specialty?: string;
  details?: string;
  attachments?: number;
}

interface LabResult {
  id: string;
  date: string;
  test: string;
  value: string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  trend?: 'improving' | 'stable' | 'declining';
}

interface VitalRecord {
  id: string;
  date: string;
  time: string;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
  recordedBy: string;
  notes?: string;
}

interface PatientInfo {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  primaryCondition: string;
  lastVisit: string;
  nextAppointment?: string;
}

const BRAND_COLORS = {
  primary: '#F7502F',
  secondary: '#1D62AF',
  success: '#00A651',
  warning: '#F59E0B',
  danger: '#DC2626',
  info: '#3B82F6',
  background: '#FAFBFC',
  textDark: '#1A202C',
  textMid: '#4A5568',
  textLight: '#718096',
  border: '#E2E8F0',
  accent: '#8B5CF6',
};

const MOCK_PATIENT_INFO: PatientInfo = {
  id: 'PAT-2024-001',
  name: 'Maria Garcia',
  age: 58,
  gender: 'Female',
  bloodType: 'O+',
  primaryCondition: 'Type 2 Diabetes & Hypertension',
  lastVisit: 'January 22, 2026',
  nextAppointment: 'February 15, 2026',
};

const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: 'REC-001',
    date: 'January 22, 2026',
    type: 'diagnosis',
    title: 'Hypertension Control Review',
    description: 'Patient shows good response to current medication regimen',
    doctor: 'Dr. Maria Santos',
    specialty: 'Cardiology',
    details: 'Blood pressure levels have stabilized within target range (128/82 mmHg). Continue current treatment plan with Lisinopril 10mg daily. Patient reports no side effects. Advised to continue low-sodium diet and regular exercise.',
    attachments: 2,
  },
  {
    id: 'REC-002',
    date: 'January 15, 2026',
    type: 'medication',
    title: 'Medication Adjustment',
    description: 'Adjusted dosage for diabetes management',
    doctor: 'Dr. Carlos Rodriguez',
    specialty: 'Endocrinology',
    details: 'Increased Metformin dosage to 500mg twice daily. Added Sitagliptin 50mg daily for better glycemic control. Patient instructed to monitor blood glucose levels twice daily and report any hypoglycemic symptoms.',
    attachments: 1,
  },
  {
    id: 'REC-003',
    date: 'January 10, 2026',
    type: 'lab',
    title: 'Blood Work Results Review',
    description: 'Complete blood count and metabolic panel analysis',
    doctor: 'Dr. Elena Torres',
    specialty: 'Internal Medicine',
    details: 'All values within normal ranges except slightly elevated cholesterol. HbA1c at 6.8% - showing improvement from previous 7.2%. Recommended dietary adjustments to address cholesterol levels.',
    attachments: 3,
  },
  {
    id: 'REC-004',
    date: 'January 5, 2026',
    type: 'vital',
    title: 'Routine Vital Signs Monitoring',
    description: 'Quarterly vital signs assessment',
    doctor: 'Dr. Elena Torres',
    specialty: 'Internal Medicine',
    details: 'All vitals stable and within normal parameters. Patient reports improved energy levels and sleep quality. Weight management program showing positive results with 3kg reduction since last visit.',
    attachments: 0,
  },
];

const MOCK_LAB_RESULTS: LabResult[] = [
  {
    id: 'LAB-001',
    date: 'January 22, 2026',
    test: 'HbA1c (Glycated Hemoglobin)',
    value: '6.8',
    unit: '%',
    normalRange: '< 5.7%',
    status: 'high',
    trend: 'improving',
  },
  {
    id: 'LAB-002',
    date: 'January 22, 2026',
    test: 'Fasting Blood Glucose',
    value: '118',
    unit: 'mg/dL',
    normalRange: '70-100 mg/dL',
    status: 'high',
    trend: 'stable',
  },
  {
    id: 'LAB-003',
    date: 'January 22, 2026',
    test: 'Total Cholesterol',
    value: '210',
    unit: 'mg/dL',
    normalRange: '< 200 mg/dL',
    status: 'high',
    trend: 'stable',
  },
  {
    id: 'LAB-004',
    date: 'January 22, 2026',
    test: 'Hemoglobin',
    value: '14.2',
    unit: 'g/dL',
    normalRange: '13.5-17.5 g/dL',
    status: 'normal',
    trend: 'stable',
  },
  {
    id: 'LAB-005',
    date: 'January 22, 2026',
    test: 'Creatinine',
    value: '0.9',
    unit: 'mg/dL',
    normalRange: '0.6-1.2 mg/dL',
    status: 'normal',
    trend: 'stable',
  },
];

const MOCK_VITAL_RECORDS: VitalRecord[] = [
  {
    id: 'VIT-001',
    date: 'January 22, 2026',
    time: '10:30 AM',
    bloodPressure: '128/82',
    heartRate: 72,
    temperature: 98.6,
    respiratoryRate: 16,
    oxygenSaturation: 98,
    recordedBy: 'Nurse Rodriguez',
    notes: 'Patient resting comfortably, no complaints',
  },
  {
    id: 'VIT-002',
    date: 'January 19, 2026',
    time: '2:15 PM',
    bloodPressure: '130/85',
    heartRate: 75,
    temperature: 98.5,
    respiratoryRate: 16,
    oxygenSaturation: 97,
    recordedBy: 'Nurse Santos',
    notes: 'Post-prandial reading, patient reported mild dizziness',
  },
  {
    id: 'VIT-003',
    date: 'January 16, 2026',
    time: '9:45 AM',
    bloodPressure: '132/86',
    heartRate: 78,
    temperature: 98.7,
    respiratoryRate: 17,
    oxygenSaturation: 98,
    recordedBy: 'Dr. Torres',
    notes: 'Routine check-up, all vitals within acceptable range',
  },
];

const RecordTypeIcon = ({ type }: { type: string }) => {
  const iconConfig = {
    diagnosis: { icon: Stethoscope, color: BRAND_COLORS.info },
    medication: { icon: Pill, color: BRAND_COLORS.warning },
    lab: { icon: Droplet, color: BRAND_COLORS.primary },
    vital: { icon: Activity, color: BRAND_COLORS.success },
    procedure: { icon: ActivitySquare, color: BRAND_COLORS.accent },
    note: { icon: FileText, color: BRAND_COLORS.secondary },
  };

  const { icon: Icon, color } = iconConfig[type as keyof typeof iconConfig] || { icon: FileText, color: BRAND_COLORS.textMid };

  return <Icon size={18} color={color} />;
};

const StatusIndicator = ({ status }: { status: string }) => {
  const statusConfig = {
    normal: { color: BRAND_COLORS.success, icon: CheckCircle },
    high: { color: BRAND_COLORS.danger, icon: AlertCircle },
    low: { color: BRAND_COLORS.warning, icon: AlertCircle },
    critical: { color: BRAND_COLORS.danger, icon: AlertCircle },
  };

  const { color, icon: Icon } = statusConfig[status as keyof typeof statusConfig] || { color: BRAND_COLORS.textMid, icon: AlertCircle };

  return (
    <div className="flex items-center gap-1">
      <Icon size={14} color={color} />
      <span style={{ color, fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize' }}>
        {status}
      </span>
    </div>
  );
};

const TrendIndicator = ({ trend }: { trend?: string }) => {
  if (!trend) return null;

  const trendConfig = {
    improving: { icon: TrendingDown, color: BRAND_COLORS.success, label: 'Improving' },
    stable: { icon: CheckCircle, color: BRAND_COLORS.info, label: 'Stable' },
    declining: { icon: TrendingUp, color: BRAND_COLORS.danger, label: 'Declining' },
  };

  const { icon: Icon, color, label } = trendConfig[trend as keyof typeof trendConfig] || {};

  return (
    <div className="flex items-center gap-1">
      <Icon size={14} color={color} />
      <span style={{ color, fontSize: '0.75rem' }}>{label}</span>
    </div>
  );
};

const VitalMetricCard = ({ 
  label, 
  value, 
  unit, 
  icon: Icon,
  status = 'normal'
}: { 
  label: string; 
  value: string | number; 
  unit: string; 
  icon: React.ElementType;
  status?: 'normal' | 'high' | 'low';
}) => {
  const statusColor = {
    normal: BRAND_COLORS.success,
    high: BRAND_COLORS.danger,
    low: BRAND_COLORS.warning,
  }[status];

  return (
    <div className="p-3 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-gray-50">
            <Icon size={14} color={BRAND_COLORS.textMid} />
          </div>
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {label}
          </span>
        </div>
        <span 
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
        >
          {status}
        </span>
      </div>
      <div className="text-lg font-bold text-gray-900">
        {value} <span className="text-sm font-normal text-gray-600">{unit}</span>
      </div>
    </div>
  );
};

export default function PatientRecords({ patientId, patientName, onNavigate }: PatientRecordsProps) {
  const [activeTab, setActiveTab] = useState<'records' | 'labs' | 'vitals'>('records');
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
  const [expandedVital, setExpandedVital] = useState<string | null>(null);

  const handleExportRecords = () => {
    // In a real app, this would trigger a PDF export
    console.log('Exporting records...');
  };

  const handlePrintRecords = () => {
    // In a real app, this would trigger print dialog
    console.log('Printing records...');
  };

  const handleAddRecord = () => {
    // In a real app, this would navigate to record creation
    console.log('Adding new record...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('patient-management')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Back to patient management"
              >
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Medical Records</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={12} />
                  <span>{MOCK_PATIENT_INFO.name}</span>
                  <span className="text-gray-400">•</span>
                  <span>ID: {MOCK_PATIENT_INFO.id}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintRecords}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Print records"
              >
                <Printer size={18} color={BRAND_COLORS.textMid} />
              </button>
              <button
                onClick={handleExportRecords}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Export records"
              >
                <Download size={18} color={BRAND_COLORS.textMid} />
              </button>
              <button
                onClick={handleAddRecord}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FilePlus size={16} />
                <span className="text-sm font-medium">Add Record</span>
              </button>
            </div>
          </div>
        </div>

        {/* Patient Summary Bar */}
        <div className="px-6 py-3 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm">
              <div>
                <span className="text-gray-600">Age:</span>
                <span className="ml-2 font-medium text-gray-900">{MOCK_PATIENT_INFO.age} years</span>
              </div>
              <div>
                <span className="text-gray-600">Blood Type:</span>
                <span className="ml-2 font-medium text-gray-900">{MOCK_PATIENT_INFO.bloodType}</span>
              </div>
              <div>
                <span className="text-gray-600">Primary Condition:</span>
                <span className="ml-2 font-medium text-gray-900">{MOCK_PATIENT_INFO.primaryCondition}</span>
              </div>
              <div>
                <span className="text-gray-600">Last Visit:</span>
                <span className="ml-2 font-medium text-gray-900">{MOCK_PATIENT_INFO.lastVisit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <div className="flex gap-8 border-b border-gray-200">
            {(['records', 'labs', 'vitals'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-1 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="capitalize">{tab}</span>
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-6 py-6">
        {/* Medical Records Tab */}
        {activeTab === 'records' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Clinical Notes & Documentation</h2>
              <span className="text-sm text-gray-500">
                {MOCK_MEDICAL_RECORDS.length} records found
              </span>
            </div>
            
            <div className="space-y-3">
              {MOCK_MEDICAL_RECORDS.map((record) => (
                <div
                  key={record.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 rounded-lg bg-gray-50">
                          <RecordTypeIcon type={record.type} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                              {record.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {record.description}
                            </p>
                          </div>
                          {expandedRecord === record.id ? (
                            <ChevronUp size={16} className="text-gray-400" />
                          ) : (
                            <ChevronDown size={16} className="text-gray-400" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{record.date}</span>
                          </div>
                          <div>
                            <span className="font-medium">{record.doctor}</span>
                            {record.specialty && (
                              <span className="text-gray-400"> • {record.specialty}</span>
                            )}
                          </div>
                          {record.attachments && record.attachments > 0 && (
                            <div className="flex items-center gap-1">
                              <FileText size={12} />
                              <span>{record.attachments} attachment{record.attachments !== 1 ? 's' : ''}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {expandedRecord === record.id && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Clinical Details</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {record.details}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Download size={14} />
                          Download PDF
                        </button>
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                          <Share2 size={14} />
                          Share
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lab Results Tab */}
        {activeTab === 'labs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Laboratory Results</h2>
              <span className="text-sm text-gray-500">
                Latest results from {MOCK_LAB_RESULTS[0].date}
              </span>
            </div>
            
            <div className="grid gap-3">
              {MOCK_LAB_RESULTS.map((lab) => (
                <div
                  key={lab.id}
                  className="bg-white rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-50">
                        <Droplet size={16} color={BRAND_COLORS.primary} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          {lab.test}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar size={10} />
                          <span>{lab.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {lab.trend && <TrendIndicator trend={lab.trend} />}
                      <StatusIndicator status={lab.status} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pl-11">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Result</p>
                      <p className="text-lg font-bold text-gray-900">
                        {lab.value} <span className="text-sm font-normal">{lab.unit}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Normal Range</p>
                      <p className="text-sm font-medium text-gray-900">{lab.normalRange}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Interpretation</p>
                      <p className="text-sm text-gray-600">
                        {lab.status === 'normal' ? 'Within normal limits' : 'Requires attention'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vital Records Tab */}
        {activeTab === 'vitals' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Vital Signs History</h2>
              <span className="text-sm text-gray-500">
                {MOCK_VITAL_RECORDS.length} readings available
              </span>
            </div>
            
            <div className="space-y-3">
              {MOCK_VITAL_RECORDS.map((vital) => (
                <div
                  key={vital.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedVital(expandedVital === vital.id ? null : vital.id)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-50">
                          <Activity size={16} color={BRAND_COLORS.success} />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 mb-1">
                            Vital Signs Measurement
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar size={10} />
                            <span>{vital.date}</span>
                            <Clock size={10} />
                            <span>{vital.time}</span>
                            <span className="text-gray-400">•</span>
                            <span>Recorded by {vital.recordedBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {expandedVital === vital.id ? (
                          <ChevronUp size={16} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>

                  {expandedVital === vital.id && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Measurements</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <VitalMetricCard
                            label="Blood Pressure"
                            value={vital.bloodPressure}
                            unit="mmHg"
                            icon={Activity}
                          />
                          <VitalMetricCard
                            label="Heart Rate"
                            value={vital.heartRate}
                            unit="bpm"
                            icon={Heart}
                          />
                          <VitalMetricCard
                            label="Temperature"
                            value={vital.temperature}
                            unit="°F"
                            icon={Thermometer}
                          />
                          <VitalMetricCard
                            label="O2 Saturation"
                            value={vital.oxygenSaturation}
                            unit="%"
                            icon={Wind}
                          />
                        </div>
                      </div>
                      {vital.notes && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Notes</h4>
                          <p className="text-sm text-gray-600">{vital.notes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}