import { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  FileText, 
  LogOut, 
  Bell, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Stethoscope, 
  TrendingUp, 
  Phone,
  ChevronRight,
  Activity,
  BarChart3,
  Shield,
  Star
} from 'lucide-react';

type Screen = 'professional-dashboard' | 'patient-management' | 'start-consultation' | 'telemedicine' | 'entry' | 'user-type' | 'health-assistant' | 'emergency' | 'hospitals' | 'contacts';

interface ProfessionalDashboardProps {
  onNavigate: (screen: Screen) => void;
}

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: 'consultation' | 'follow-up' | 'emergency';
  status: 'pending' | 'completed' | 'cancelled';
}

interface PatientSummary {
  totalPatients: number;
  activeConsultations: number;
  appointmentsToday: number;
  pendingRecords: number;
}

interface ActivityItem {
  id: string;
  type: 'consultation' | 'record' | 'appointment';
  description: string;
  patientName: string;
  timeAgo: string;
  status: 'completed' | 'pending' | 'updated';
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
  accent: '#8B5CF6',       // Purple for accent
};

const STATIC_DATA = {
  appointmentsToday: [
    {
      id: '1',
      patientName: 'John Santos',
      time: '10:00 AM',
      type: 'consultation',
      status: 'pending',
    },
    {
      id: '2',
      patientName: 'Maria Garcia',
      time: '11:30 AM',
      type: 'follow-up',
      status: 'pending',
    },
    {
      id: '3',
      patientName: 'Pedro Reyes',
      time: '2:00 PM',
      type: 'consultation',
      status: 'pending',
    },
  ] as Appointment[],
  
  patientSummary: {
    totalPatients: 48,
    activeConsultations: 5,
    appointmentsToday: 3,
    pendingRecords: 7,
  } as PatientSummary,
  
  recentActivities: [
    {
      id: '1',
      type: 'consultation',
      description: 'Consultation completed',
      patientName: 'Maria Garcia',
      timeAgo: '2 hours ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'appointment',
      description: '3 new appointment requests',
      patientName: '',
      timeAgo: '30 minutes ago',
      status: 'pending'
    },
    {
      id: '3',
      type: 'record',
      description: 'Patient records updated',
      patientName: 'John Santos',
      timeAgo: '1 hour ago',
      status: 'updated'
    }
  ] as ActivityItem[],
  
  doctorProfile: {
    name: 'Dr. Carlos Reyes',
    specialty: 'General Medicine Specialist',
    license: 'MD-2024-15234',
    hospital: 'Naga City General Hospital',
    rating: 4.9,
    reviewCount: 248,
    status: 'online' as 'online' | 'offline',
    verified: true
  }
};

const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color,
  status,
  statusColor 
}: { 
  title: string; 
  value: number; 
  icon: React.ElementType;
  color: string;
  status?: string;
  statusColor?: string;
}) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 border transition-all hover:shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="rounded-xl p-3" style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-6 h-6" style={{ color }} strokeWidth={2.5} />
      </div>
      {status && (
        <span 
          className="text-xs font-semibold px-2 py-1 rounded-full"
          style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
        >
          {status}
        </span>
      )}
    </div>
    <div className="text-3xl font-bold mb-1" style={{ color: BRAND_COLORS.textDark }}>
      {value}
    </div>
    <p className="text-sm font-medium" style={{ color: BRAND_COLORS.textMid }}>
      {title}
    </p>
  </div>
);

const ActivityItem = ({ activity }: { activity: ActivityItem }) => {
  const getIcon = () => {
    switch (activity.type) {
      case 'consultation':
        return { icon: MessageSquare, color: BRAND_COLORS.success };
      case 'record':
        return { icon: FileText, color: BRAND_COLORS.secondary };
      case 'appointment':
        return { icon: Calendar, color: BRAND_COLORS.primary };
      default:
        return { icon: Activity, color: BRAND_COLORS.textMid };
    }
  };

  const { icon: Icon, color } = getIcon();

  return (
    <div className="flex items-start gap-4 pb-4 border-b last:border-b-0 last:pb-0">
      <div className="rounded-full p-2 flex-shrink-0 mt-1" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-4 h-4" style={{ color }} strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-sm" style={{ color: BRAND_COLORS.textDark }}>
          {activity.description}
        </p>
        <p className="text-xs mt-1" style={{ color: BRAND_COLORS.textLight }}>
          {activity.patientName && `with ${activity.patientName}`} • {activity.timeAgo}
        </p>
      </div>
    </div>
  );
};

export default function ProfessionalDashboard({ onNavigate }: ProfessionalDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [appointmentStatus, setAppointmentStatus] = useState<Record<string, 'pending' | 'in-progress' | 'completed'>>({
    '1': 'pending',
    '2': 'pending',
    '3': 'pending',
  });
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleNotificationClick = () => {
    setUnreadNotifications(0);
  };

  const handleStartAppointment = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    setAppointmentStatus(prev => ({
      ...prev,
      [appointmentId]: 'in-progress'
    }));
    
    // Navigate to start consultation
    onNavigate('start-consultation');
  };

  const handleCompleteAppointment = (appointmentId: string) => {
    setAppointmentStatus(prev => ({
      ...prev,
      [appointmentId]: 'completed'
    }));
    setTimeout(() => {
      setSelectedAppointment(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.background }}>
      {/* Header */}
      <header className="sticky top-0 z-10 shadow-sm" style={{ backgroundColor: BRAND_COLORS.secondary }}>
        <div className="text-white px-6 pt-6 pb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">KATUWANG</h1>
                <p className="text-white/80 text-xs font-medium">Professional Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleNotificationClick}
                className="relative p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label={`${unreadNotifications} unread notifications`}
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              <button
                onClick={() => onNavigate('user-type')}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Log out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Current Time Display */}
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-bold tracking-tight">{formatTime(currentTime)}</div>
              <div className="text-white/80 text-sm font-medium">{formatDate(currentTime)}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 pb-20 space-y-6">
        {/* Doctor Profile Card */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                <Stethoscope className="w-10 h-10" style={{ color: BRAND_COLORS.secondary }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-1" style={{ color: BRAND_COLORS.textDark }}>
                  {STATIC_DATA.doctorProfile.name}
                </h2>
                <p className="text-base font-medium mb-2" style={{ color: BRAND_COLORS.textMid }}>
                  {STATIC_DATA.doctorProfile.specialty}
                </p>
                <div className="space-y-1">
                  <p className="text-sm" style={{ color: BRAND_COLORS.textLight }}>
                    License: {STATIC_DATA.doctorProfile.license}
                  </p>
                  <p className="text-sm" style={{ color: BRAND_COLORS.textLight }}>
                    {STATIC_DATA.doctorProfile.hospital}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {STATIC_DATA.doctorProfile.verified && (
              <div className="px-3 py-1.5 rounded-full font-semibold text-xs flex items-center gap-1.5"
                style={{ backgroundColor: `${BRAND_COLORS.success}20`, color: BRAND_COLORS.success }}
              >
                <Shield className="w-3 h-3" />
                Verified Doctor
              </div>
            )}
            <div className="px-3 py-1.5 rounded-full font-semibold text-xs flex items-center gap-1.5"
              style={{ 
                backgroundColor: STATIC_DATA.doctorProfile.status === 'online' 
                  ? `${BRAND_COLORS.success}20` 
                  : `${BRAND_COLORS.textLight}20`,
                color: STATIC_DATA.doctorProfile.status === 'online' 
                  ? BRAND_COLORS.success 
                  : BRAND_COLORS.textLight
              }}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${STATIC_DATA.doctorProfile.status === 'online' ? 'animate-pulse' : ''}`}
                style={{ backgroundColor: STATIC_DATA.doctorProfile.status === 'online' ? BRAND_COLORS.success : BRAND_COLORS.textLight }}
              />
              {STATIC_DATA.doctorProfile.status === 'online' ? 'Online Now' : 'Offline'}
            </div>
            <div className="px-3 py-1.5 rounded-full font-semibold text-xs flex items-center gap-1.5"
              style={{ backgroundColor: `${BRAND_COLORS.warning}20`, color: BRAND_COLORS.warning }}
            >
              <Star className="w-3 h-3 fill-current" />
              {STATIC_DATA.doctorProfile.rating}★ ({STATIC_DATA.doctorProfile.reviewCount} reviews)
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: BRAND_COLORS.textDark }}>
              <BarChart3 className="w-4 h-4" />
              Today's Metrics
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              title="Total Patients"
              value={STATIC_DATA.patientSummary.totalPatients}
              icon={Users}
              color={BRAND_COLORS.secondary}
              status="Active"
              statusColor={BRAND_COLORS.secondary}
            />
            <MetricCard
              title="Active Consultations"
              value={STATIC_DATA.patientSummary.activeConsultations}
              icon={MessageSquare}
              color={BRAND_COLORS.primary}
              status="In Progress"
              statusColor={BRAND_COLORS.primary}
            />
            <MetricCard
              title="Appointments"
              value={STATIC_DATA.patientSummary.appointmentsToday}
              icon={Calendar}
              color={BRAND_COLORS.success}
              status="Today"
              statusColor={BRAND_COLORS.success}
            />
            <MetricCard
              title="Pending Records"
              value={STATIC_DATA.patientSummary.pendingRecords}
              icon={FileText}
              color={BRAND_COLORS.secondary}
              status="Review"
              statusColor={BRAND_COLORS.secondary}
            />
          </div>
        </section>

        {/* Today's Appointments */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: BRAND_COLORS.textDark }}>
              <Calendar className="w-4 h-4" />
              Today's Appointments
            </h3>
            <button 
              className="text-sm font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: BRAND_COLORS.secondary }}
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {STATIC_DATA.appointmentsToday.map((appointment) => {
              const status = appointmentStatus[appointment.id];
              const isSelected = selectedAppointment === appointment.id;

              return (
                <div key={appointment.id} className="bg-white rounded-xl p-4 border-l-4 transition-all" style={{ borderColor: BRAND_COLORS.secondary }}>
                  {status === 'completed' ? (
                    <div className="flex items-center justify-center gap-2 py-2">
                      <CheckCircle className="w-5 h-5" style={{ color: BRAND_COLORS.success }} />
                      <span className="font-semibold text-sm" style={{ color: BRAND_COLORS.success }}>
                        Appointment Completed
                      </span>
                    </div>
                  ) : status === 'in-progress' ? (
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="font-bold text-base mb-1" style={{ color: BRAND_COLORS.textDark }}>
                          {appointment.patientName}
                        </p>
                        <p className="text-xs font-medium capitalize" style={{ color: BRAND_COLORS.textLight }}>
                          {appointment.type.replace('-', ' ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end gap-1.5 mb-1.5">
                          <Clock className="w-3.5 h-3.5" style={{ color: BRAND_COLORS.secondary }} />
                          <p className="font-semibold text-sm" style={{ color: BRAND_COLORS.textDark }}>
                            {appointment.time}
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full animate-pulse" 
                          style={{ 
                            backgroundColor: `${BRAND_COLORS.primary}20`,
                            color: BRAND_COLORS.primary
                          }}
                        >
                          In Progress...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStartAppointment(appointment.id)}
                      className="w-full text-left hover:shadow-sm transition-all active:scale-[0.98]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-bold text-base mb-1" style={{ color: BRAND_COLORS.textDark }}>
                            {appointment.patientName}
                          </p>
                          <p className="text-xs font-medium capitalize" style={{ color: BRAND_COLORS.textLight }}>
                            {appointment.type.replace('-', ' ')}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1.5 mb-1.5">
                            <Clock className="w-3.5 h-3.5" style={{ color: BRAND_COLORS.secondary }} />
                            <p className="font-semibold text-sm" style={{ color: BRAND_COLORS.textDark }}>
                              {appointment.time}
                            </p>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" 
                            style={{ 
                              backgroundColor: `${BRAND_COLORS.success}20`,
                              color: BRAND_COLORS.success
                            }}
                          >
                            Ready to Start
                          </span>
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: BRAND_COLORS.textDark }}>
            <Activity className="w-4 h-4" />
            Patient Management
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => onNavigate('patient-management')}
              className="w-full bg-white rounded-xl shadow-sm p-5 hover:shadow-md active:shadow-sm transition-all border flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              style={{ borderColor: BRAND_COLORS.border }}
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl p-3" style={{ backgroundColor: `${BRAND_COLORS.secondary}15` }}>
                  <Users className="w-6 h-6" style={{ color: BRAND_COLORS.secondary }} strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-base mb-1" style={{ color: BRAND_COLORS.textDark }}>
                    Manage Patients
                  </p>
                  <p className="text-xs" style={{ color: BRAND_COLORS.textLight }}>
                    View patient roster and details
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5" style={{ color: BRAND_COLORS.textLight }} />
            </button>

            <button
              onClick={() => onNavigate('start-consultation')}
              className="w-full bg-white rounded-xl shadow-sm p-5 hover:shadow-md active:shadow-sm transition-all border flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              style={{ borderColor: BRAND_COLORS.border }}
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl p-3" style={{ backgroundColor: `${BRAND_COLORS.primary}15` }}>
                  <MessageSquare className="w-6 h-6" style={{ color: BRAND_COLORS.primary }} strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-base mb-1" style={{ color: BRAND_COLORS.textDark }}>
                    Start Consultation
                  </p>
                  <p className="text-xs" style={{ color: BRAND_COLORS.textLight }}>
                    Video or chat with patients
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5" style={{ color: BRAND_COLORS.textLight }} />
            </button>

            <button
              onClick={() => onNavigate('patient-management')}
              className="w-full bg-white rounded-xl shadow-sm p-5 hover:shadow-md active:shadow-sm transition-all border flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              style={{ borderColor: BRAND_COLORS.border }}
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl p-3" style={{ backgroundColor: `${BRAND_COLORS.success}15` }}>
                  <FileText className="w-6 h-6" style={{ color: BRAND_COLORS.success }} strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-base mb-1" style={{ color: BRAND_COLORS.textDark }}>
                    Patient Records
                  </p>
                  <p className="text-xs" style={{ color: BRAND_COLORS.textLight }}>
                    Access medical histories
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5" style={{ color: BRAND_COLORS.textLight }} />
            </button>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: BRAND_COLORS.textDark }}>
            <Bell className="w-4 h-4" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {STATIC_DATA.recentActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}