import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Bot, 
  Hospital, 
  Users, 
  Clock, 
  Phone, 
  Heart, 
  Pill, 
  FileText, 
  Video, 
  Lightbulb,
  Stethoscope,
  Activity,
  AlertCircle,
  Calendar,
  Zap
} from 'lucide-react';

type Screen = 'entry' | 'dashboard' | 'health-assistant' | 'emergency' | 'hospitals' | 'contacts' | 'health-records';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
  userType?: 'patient' | null;
}

const BRAND_COLORS = {
  primary: '#F7502F',      // Naga Coral
  secondary: '#1D62AF',    // Fun Blue
  accent: '#00A651',       // Success Green
  background: '#FAFBFC',   // Athens Gray
  textDark: '#1A202C',
  textMid: '#4A5568',
  textLight: '#718096',
  border: '#E2E8F0',
};

const healthTips = [
  "Drink at least 8 glasses of water daily to stay hydrated.",
  "Regular hand washing prevents the spread of diseases.",
  "Get 7-8 hours of sleep every night for better health.",
  "Eat fruits and vegetables with every meal.",
  "Take a 10-minute walk after each meal to aid digestion."
];

const serviceCategories = {
  health: [
    {
      id: 'health-assistant',
      title: 'Health Assistant',
      description: 'AI-powered guidance',
      icon: Bot,
      iconColor: BRAND_COLORS.secondary,
      status: 'Online',
      statusColor: BRAND_COLORS.accent
    },
    {
      id: 'emergency',
      title: 'Emergency Alert',
      description: 'Immediate assistance',
      icon: AlertCircle,
      iconColor: BRAND_COLORS.primary,
      isEmergency: true
    },
    {
      id: 'hospitals',
      title: 'Find Hospitals',
      description: 'Locate nearby facilities',
      icon: Hospital,
      iconColor: BRAND_COLORS.accent
    },
    {
      id: 'contacts',
      title: 'Emergency Contacts',
      description: 'Manage your contacts',
      icon: Users,
      iconColor: BRAND_COLORS.primary
    },
    {
      id: 'health-records',
      title: 'Health Records',
      description: 'Access your medical history',
      icon: FileText,
      iconColor: BRAND_COLORS.accent
    }
  ]
};

const emergencyHotlines = [
  { name: 'Naga City Emergency', number: '911' },
  { name: 'DOH Hotline', number: '1555' },
  { name: 'Red Cross Naga', number: '143' }
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const tipTimer = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % healthTips.length);
    }, 8000);
    return () => clearInterval(tipTimer);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDay = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const renderHealthServiceCard = (service: any) => {
    if (service.isEmergency) {
      return (
        <button
          key={service.id}
          onClick={() => onNavigate(service.id as Screen)}
          className="w-full bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-5 flex flex-col items-center justify-center gap-3 group active:scale-[0.98] border border-red-600"
        >
          <div className="relative">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
              <AlertCircle className="w-7 h-7 text-white" fill="currentColor" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-base mb-1">Emergency Alert</h3>
            <p className="text-white/90 text-xs font-medium">Immediate assistance</p>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Zap className="w-3 h-3 animate-pulse" fill="white" />
            <span className="text-xs font-semibold">24/7 ACTIVE</span>
          </div>
        </button>
      );
    }

    return (
      <button
        key={service.id}
        onClick={() => onNavigate(service.id as Screen)}
        className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border flex flex-col items-center text-center gap-3 group hover:border-blue-100 active:scale-[0.98]"
        style={{ borderColor: BRAND_COLORS.border }}
      >
        <div 
          className="p-3 rounded-lg transition-transform duration-200 group-hover:scale-110"
          style={{ backgroundColor: `${service.iconColor}15` }}
        >
          <service.icon className="w-7 h-7" style={{ color: service.iconColor }} strokeWidth={2} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1" style={{ color: BRAND_COLORS.textDark }}>
            {service.title}
          </h3>
          <p className="text-xs" style={{ color: BRAND_COLORS.textLight }}>
            {service.description}
          </p>
        </div>
        {service.status && (
          <div 
            className="font-medium text-xs px-2.5 py-1 rounded-full"
            style={{ 
              backgroundColor: `${service.statusColor}15`, 
              color: service.statusColor 
            }}
          >
            {service.status}
          </div>
        )}
      </button>
    );
  };

  const renderMedicalServiceItem = (service: any) => (
    <button
      key={service.id}
      onClick={() => onNavigate(service.id as Screen)}
      className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border flex items-center gap-4 group hover:border-blue-100 active:scale-[0.98]"
      style={{ borderColor: BRAND_COLORS.border }}
    >
      <div 
        className="p-3 rounded-lg transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: `${service.iconColor}15` }}
      >
        <service.icon className="w-6 h-6" style={{ color: service.iconColor }} strokeWidth={2} />
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-base" style={{ color: BRAND_COLORS.textDark }}>
            {service.title}
          </h3>
          {service.badge && (
            <span 
              className="font-medium text-xs px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: `${BRAND_COLORS.primary}15`, 
                color: BRAND_COLORS.primary 
              }}
            >
              {service.badge}
            </span>
          )}
        </div>
        <p className="text-sm mt-1" style={{ color: BRAND_COLORS.textLight }}>
          {service.description}
        </p>
      </div>
      <div className="text-gray-400">
        <ChevronLeft className="w-5 h-5 transform rotate-180" />
      </div>
    </button>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.background }}>
      {/* Header */}
      <header style={{ backgroundColor: BRAND_COLORS.primary }} className="text-white">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate('user-type')}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors font-medium text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to MyNaga</span>
            </button>
            
            {/* Simple Time Display */}
            <div className="text-right">
              <div className="text-lg font-bold">
                {formatTime(currentTime)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-6">
            <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
              <Heart className="w-7 h-7 text-white" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">KATUWANG</h1>
              <p className="text-white/90 text-sm">Your Health Companion</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6 pb-8">
        {/* Health Tips */}
        <section className="bg-white rounded-xl shadow-sm p-6 border-l-4" style={{ borderLeftColor: BRAND_COLORS.secondary }}>
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5" style={{ color: BRAND_COLORS.secondary }} />
            <h2 className="font-semibold text-base" style={{ color: BRAND_COLORS.textDark }}>
              Health Tip
            </h2>
          </div>
          <p className="text-gray-700 mb-5 leading-relaxed">
            {healthTips[currentTipIndex]}
          </p>
          <div className="flex gap-1.5 justify-center">
            {healthTips.map((_, index) => (
              <div
                key={index}
                className="rounded-full transition-all duration-300"
                style={{
                  width: index === currentTipIndex ? '20px' : '6px',
                  height: '4px',
                  backgroundColor: index === currentTipIndex ? BRAND_COLORS.secondary : BRAND_COLORS.border,
                }}
              />
            ))}
          </div>
        </section>

        {/* Health Services List */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Stethoscope className="w-5 h-5" style={{ color: BRAND_COLORS.textDark }} />
            <h2 className="font-semibold text-base" style={{ color: BRAND_COLORS.textDark }}>
              Health Services
            </h2>
          </div>
          
          {/* List Layout */}
          <div className="space-y-3">
            {serviceCategories.health.map((service) => {
              if (service.isEmergency) {
                return (
                  <button
                    key={service.id}
                    onClick={() => onNavigate(service.id as Screen)}
                    className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border flex items-center gap-4 group hover:border-blue-100 active:scale-[0.98]"
                    style={{ borderColor: BRAND_COLORS.border }}
                  >
                    <div className="relative flex-shrink-0">
                      <div 
                        className="p-3 rounded-lg transition-transform duration-200 group-hover:scale-110"
                        style={{ backgroundColor: `${BRAND_COLORS.primary}15` }}
                      >
                        <AlertCircle className="w-6 h-6" style={{ color: BRAND_COLORS.primary }} fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-base mb-1" style={{ color: BRAND_COLORS.textDark }}>Emergency Alert</h3>
                      <p className="text-sm" style={{ color: BRAND_COLORS.textLight }}>Immediate assistance</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4" style={{ color: BRAND_COLORS.primary }} fill={BRAND_COLORS.primary} />
                      <span className="text-xs font-semibold" style={{ color: BRAND_COLORS.primary }}>24/7</span>
                    </div>
                  </button>
                );
              }

              return (
                <button
                  key={service.id}
                  onClick={() => onNavigate(service.id as Screen)}
                  className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border flex items-center gap-4 group hover:border-blue-100 active:scale-[0.98]"
                  style={{ borderColor: BRAND_COLORS.border }}
                >
                  <div 
                    className="p-3 rounded-lg transition-transform duration-200 group-hover:scale-110 flex-shrink-0"
                    style={{ backgroundColor: `${service.iconColor}15` }}
                  >
                    <service.icon className="w-6 h-6" style={{ color: service.iconColor }} strokeWidth={2} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-base" style={{ color: BRAND_COLORS.textDark }}>
                        {service.title}
                      </h3>
                      {service.status && (
                        <div 
                          className="font-medium text-xs px-2.5 py-1 rounded-full"
                          style={{ 
                            backgroundColor: `${service.statusColor}15`, 
                            color: service.statusColor 
                          }}
                        >
                          {service.status}
                        </div>
                      )}
                    </div>
                    <p className="text-sm mt-1" style={{ color: BRAND_COLORS.textLight }}>
                      {service.description}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <ChevronLeft className="w-5 h-5 transform rotate-180" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Emergency Hotlines */}
        <section className="bg-white rounded-xl shadow-sm p-6 border" style={{ borderColor: BRAND_COLORS.border }}>
          <div className="flex items-center gap-3 mb-5">
            <Phone className="w-5 h-5" style={{ color: BRAND_COLORS.secondary }} />
            <h3 className="font-semibold text-base" style={{ color: BRAND_COLORS.textDark }}>
              Emergency Hotlines
            </h3>
          </div>
          <div className="space-y-4">
            {emergencyHotlines.map((hotline, index) => (
              <div 
                key={hotline.number}
                className={`flex items-center justify-between ${index < emergencyHotlines.length - 1 ? 'pb-4 border-b' : ''}`}
                style={{ borderColor: BRAND_COLORS.border }}
              >
                <span className="font-medium text-sm" style={{ color: BRAND_COLORS.textMid }}>
                  {hotline.name}
                </span>
                <a 
                  href={`tel:${hotline.number}`}
                  className="font-semibold text-base hover:underline"
                  style={{ color: BRAND_COLORS.primary }}
                >
                  {hotline.number}
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}