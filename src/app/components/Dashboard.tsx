import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  Bot,
  Hospital,
  Users,
  Phone,
  FileText,
  Lightbulb,
  Stethoscope,
  AlertCircle,
  Zap
} from 'lucide-react';

import { Screen } from "../types";
import HospitalDirectory from './HospitalDirectory';
import katuwangLogo from '../../assets/logos/katuwang-logo.png';

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
  userType?: 'patient' | null;
}

import { BRAND_COLORS } from '../../constants/colors';

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
      statusColor: BRAND_COLORS.secondary
    },
    {
      id: 'emergency',
      title: 'Emergency Alert',
      description: 'Immediate assistance',
      icon: AlertCircle,
      iconColor: BRAND_COLORS.danger,
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
      id: 'hospital-directory',
      title: 'Hospital Directory',
      description: 'Naga City hospital contacts',
      icon: Users,
      iconColor: BRAND_COLORS.secondary
    },
    {
      id: 'health-records',
      title: 'Health Records',
      description: 'Access your medical history',
      icon: FileText,
      iconColor: BRAND_COLORS.secondary
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
  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false);

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

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === 'hospital-directory') {
      setIsHospitalModalOpen(true);
    } else {
      onNavigate(serviceId as Screen);
    }
  };


  const renderMedicalServiceItem = (service: any) => (
    <button
      key={service.id}
      onClick={() => handleServiceClick(service.id)}
      className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border flex items-center gap-4 group hover:border-blue-100 active:scale-[0.98]"
      style={{ borderColor: BRAND_COLORS.surface }}
    >
      <div
        className="p-3 rounded-lg transition-transform duration-200 group-hover:scale-110 flex-shrink-0"
        style={{ backgroundColor: `${service.iconColor}15` }}
      >
        <service.icon className="w-6 h-6" style={{ color: service.iconColor }} strokeWidth={2} />
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-base" style={{ color: BRAND_COLORS.textPrimary }}>
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
        <p className="text-sm mt-1" style={{ color: BRAND_COLORS.textSecondary }}>
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
              <div className="text-xs text-white/80 font-medium">
                {formatDay(currentTime)}, {formatDate(currentTime)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="bg-white rounded-full p-1 backdrop-blur-sm">
              <img src={katuwangLogo} alt="Katuwang Logo" className="w-14 h-14 object-contain" />
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
            <h2 className="font-semibold text-base" style={{ color: BRAND_COLORS.textPrimary }}>
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
                  backgroundColor: index === currentTipIndex ? BRAND_COLORS.secondary : '#E2E8F0',
                }}
              />
            ))}
          </div>
        </section>

        {/* Health Services List */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Stethoscope className="w-5 h-5" style={{ color: BRAND_COLORS.textPrimary }} />
            <h2 className="font-semibold text-base" style={{ color: BRAND_COLORS.textPrimary }}>
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
                    onClick={() => handleServiceClick(service.id)}
                    className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border flex items-center gap-4 group hover:border-blue-100 active:scale-[0.98]"
                    style={{ borderColor: BRAND_COLORS.surface }}
                  >
                    <div className="relative flex-shrink-0">
                      <div
                        className="p-3 rounded-lg transition-transform duration-200 group-hover:scale-110"
                        style={{ backgroundColor: `${BRAND_COLORS.danger}15` }}
                      >
                        <AlertCircle className="w-6 h-6" style={{ color: BRAND_COLORS.danger }} fill="currentColor" />
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-base mb-1" style={{ color: BRAND_COLORS.textPrimary }}>Emergency Alert</h3>
                      <p className="text-sm" style={{ color: BRAND_COLORS.textSecondary }}>Immediate assistance</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-4 h-4" style={{ color: BRAND_COLORS.danger }} fill={BRAND_COLORS.danger} />
                      <span className="text-xs font-semibold" style={{ color: BRAND_COLORS.danger }}>24/7</span>
                    </div>
                  </button>
                );
              }

              return renderMedicalServiceItem(service);
            })}
          </div>
        </section>

        {/* Emergency Hotlines */}
        <section className="bg-white rounded-xl shadow-sm p-6 border" style={{ borderColor: '#E2E8F0' }}>
          <div className="flex items-center gap-3 mb-5">
            <Phone className="w-5 h-5" style={{ color: BRAND_COLORS.secondary }} />
            <h3 className="font-semibold text-base" style={{ color: BRAND_COLORS.textPrimary }}>
              Emergency Hotlines
            </h3>
          </div>
          <div className="space-y-4">
            {emergencyHotlines.map((hotline, index) => (
              <div
                key={hotline.number}
                className={`flex items-center justify-between ${index < emergencyHotlines.length - 1 ? 'pb-4 border-b' : ''}`}
                style={{ borderColor: '#E2E8F0' }}
              >
                <span className="font-medium text-sm" style={{ color: BRAND_COLORS.textSecondary }}>
                  {hotline.name}
                </span>
                <a
                  href={`tel:${hotline.number}`}
                  className="font-semibold text-base hover:underline"
                  style={{ color: BRAND_COLORS.danger }}
                >
                  {hotline.number}
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Hospital Directory Modal */}
      <HospitalDirectory
        isOpen={isHospitalModalOpen}
        onClose={() => setIsHospitalModalOpen(false)}
      />
    </div>
  );
}