import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ChevronRight, 
  Bell, 
  User, 
  Search, 
  Home, 
  FileText, 
  MessageCircle, 
  Newspaper, 
  Settings,
  Bot,
  Hospital,
  Users,
  ArrowLeft,
  CreditCard,
  Building2,
  ClipboardList,
  AlertCircle,
  Calendar,
  Ambulance,
  Scroll,
  Megaphone,
  Wifi,
  Battery,
  Stethoscope,
  Pill,
  TrendingUp,
  CheckCircle,
  MapPin,
  Shield,
  Clock
} from 'lucide-react';

// Brand Colors
const BRAND_COLORS = {
  primary: '#F7502F',    // Naga Coral
  secondary: '#1D62AF',  // Fun Blue
  accent: '#FAFBFC',     // Athens Gray
  success: '#00A651',    // Green
  background: '#F8FAFC',
  textDark: '#1A202C',
  textMid: '#4A5568',
  textLight: '#718096',
  border: '#E2E8F0',
};

type Screen = 'entry' | 'dashboard' | 'professional-dashboard' | 'health-assistant' | 'emergency' | 'hospitals' | 'contacts' | 'user-type' | 'telemedicine' | 'pharmacy' | 'health-records';

interface ModuleEntryProps {
  onNavigate: (screen: Screen) => void;
  userType?: 'patient' | 'professional' | null;
  onBack: () => void;
}

// ===================================
// HEALTH MODULE COMPONENT
// ===================================
function HealthModule({ onNavigate, onBack }: { onNavigate: (screen: Screen) => void; onBack: () => void }) {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const healthServices = [
    {
      id: 'health-assistant',
      title: 'Health Assistant',
      description: 'AI-powered guidance',
      icon: Bot,
      color: BRAND_COLORS.secondary
    },
    {
      id: 'emergency',
      title: 'Emergency Alert',
      description: 'Immediate assistance',
      icon: AlertCircle,
      color: BRAND_COLORS.primary
    },
    {
      id: 'hospitals',
      title: 'Find Hospitals',
      description: 'Locate nearby facilities',
      icon: Hospital,
      color: BRAND_COLORS.success
    },
    {
      id: 'contacts',
      title: 'Emergency Contacts',
      description: 'Manage your contacts',
      icon: Users,
      color: '#7C3AED'
    }
  ];

  const medicalServices = [
    {
      id: 'telemedicine',
      title: 'Telemedicine Consultation',
      description: 'Connect with licensed doctors',
      icon: Stethoscope,
      color: BRAND_COLORS.secondary
    },
    {
      id: 'pharmacy',
      title: 'Pharmacy Delivery',
      description: 'Order medicines with delivery',
      icon: Pill,
      color: BRAND_COLORS.success
    },
    {
      id: 'health-records',
      title: 'Health Records',
      description: 'View your medical history',
      icon: ClipboardList,
      color: BRAND_COLORS.primary
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.background }}>
      {/* Status Bar */}
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <div className="text-sm font-medium" style={{ color: BRAND_COLORS.textDark }}>
          {currentTime || '--:--'}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Wifi className="w-4 h-4" style={{ color: BRAND_COLORS.textMid }} />
            <span className="text-xs" style={{ color: BRAND_COLORS.textMid }}>Full</span>
          </div>
          <div className="flex items-center gap-1">
            <Battery className="w-4 h-4" style={{ color: BRAND_COLORS.textMid }} />
            <span className="text-xs" style={{ color: BRAND_COLORS.textMid }}>92%</span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div 
        className="text-white px-6 pt-4 pb-8 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.primary} 100%)`
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4 blur-3xl"></div>
        <div className="relative z-10">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium text-sm">Back to MyNaga</span>
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>

          {/* Title Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                <Heart className="w-5 h-5 text-white" fill="currentColor" />
              </div>
              <span className="text-white/90 text-sm font-medium">Health Module</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">KATUWANG</h1>
            <p className="text-white/90 text-base">Your Health Companion</p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm font-medium">System Active</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-white/80" />
              <span className="text-sm font-medium">24/7 Monitoring</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-6 -mt-4 relative z-20">
        {/* Health Status Card */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border" style={{ borderColor: BRAND_COLORS.border }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-base" style={{ color: BRAND_COLORS.textDark }}>
              Your Health Status
            </h3>
            <div 
              className="flex items-center gap-2 px-3 py-1 rounded-full"
              style={{ backgroundColor: `${BRAND_COLORS.success}15` }}
            >
              <CheckCircle className="w-3 h-3" style={{ color: BRAND_COLORS.success }} />
              <span className="text-xs font-medium" style={{ color: BRAND_COLORS.success }}>Protected</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${BRAND_COLORS.secondary}10` }}>
              <Clock className="w-4 h-4" style={{ color: BRAND_COLORS.secondary }} />
            </div>
            <p className="text-sm" style={{ color: BRAND_COLORS.textMid }}>
              24/7 health monitoring and emergency support available
            </p>
          </div>
        </div>

        {/* Health Services Grid */}
        <div className="mb-8">
          <h2 className="font-semibold text-base mb-4" style={{ color: BRAND_COLORS.textDark }}>
            Health Services
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {healthServices.map((service) => (
              <button 
                key={service.id}
                onClick={() => onNavigate(service.id as Screen)}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border flex flex-col items-center gap-3 group active:scale-[0.98]"
                style={{ borderColor: BRAND_COLORS.border }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} strokeWidth={2} />
                </div>
                <div className="text-center">
                  <h4 className="text-sm font-semibold mb-1" style={{ color: BRAND_COLORS.textDark }}>
                    {service.title}
                  </h4>
                  <p className="text-xs" style={{ color: BRAND_COLORS.textLight }}>
                    {service.description}
                  </p>
                </div>
                {service.id === 'emergency' && (
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-semibold" style={{ color: BRAND_COLORS.primary }}>
                      ACTIVE
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Medical Services List */}
        <div className="mb-8">
          <h2 className="font-semibold text-base mb-4" style={{ color: BRAND_COLORS.textDark }}>
            Medical Services
          </h2>
          <div className="space-y-3">
            {medicalServices.map((service) => (
              <button 
                key={service.id}
                onClick={() => onNavigate(service.id as Screen)}
                className="w-full bg-white rounded-xl shadow-sm p-4 border flex items-center gap-4 group hover:shadow-md transition-all active:scale-[0.98]"
                style={{ borderColor: BRAND_COLORS.border }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} strokeWidth={2} />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-sm mb-1" style={{ color: BRAND_COLORS.textDark }}>
                    {service.title}
                  </h4>
                  <p className="text-xs" style={{ color: BRAND_COLORS.textLight }}>
                    {service.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 flex-shrink-0" style={{ color: BRAND_COLORS.textLight }} />
              </button>
            ))}
          </div>
        </div>

        {/* Quick Info Banner */}
        <div 
          className="rounded-xl p-5 border"
          style={{ 
            backgroundColor: `${BRAND_COLORS.secondary}10`,
            borderColor: BRAND_COLORS.secondary
          }}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white/50">
              <Shield className="w-5 h-5" style={{ color: BRAND_COLORS.secondary }} />
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-2" style={{ color: BRAND_COLORS.textDark }}>
                Always Available
              </h4>
              <p className="text-xs" style={{ color: BRAND_COLORS.textMid }}>
                24/7 emergency support • Licensed professionals • Naga City Health Department
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================
// MAIN MY NAGA APP
// ===================================
export default function ModuleEntry({ onNavigate, userType, onBack }: ModuleEntryProps) {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'health'>('home');
  const [activeNav, setActiveNav] = useState<'home' | 'services' | 'support' | 'news' | 'settings'>('home');

  useEffect(() => {
    if (userType) {
      onNavigate(userType === 'patient' ? 'dashboard' : 'professional-dashboard');
    }
  }, [userType, onNavigate]);

  const handleHealthClick = () => {
    setCurrentScreen('health');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleNavigateToDashboard = () => {
    onNavigate('dashboard');
  };

  // Render Health Module
  if (currentScreen === 'health') {
    return <HealthModule onNavigate={onNavigate} onBack={handleBackToHome} />;
  }

  // Show loading state if user type is set (redirecting to dashboard)
  if (userType) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: BRAND_COLORS.background }}>
        <div className="text-center px-6">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" 
              style={{ backgroundColor: `${BRAND_COLORS.primary}15` }}>
              <Heart className="w-10 h-10" style={{ color: BRAND_COLORS.primary }} fill="currentColor" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: BRAND_COLORS.success }}></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: BRAND_COLORS.textDark }}>KATUWANG</h1>
          <p className="mb-6 text-sm" style={{ color: BRAND_COLORS.textMid }}>Initializing health dashboard</p>
          
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg" 
            style={{ backgroundColor: `${BRAND_COLORS.secondary}10` }}>
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: BRAND_COLORS.primary }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0.1s', backgroundColor: BRAND_COLORS.secondary }}></div>
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0.2s', backgroundColor: BRAND_COLORS.success }}></div>
            </div>
            <span className="text-sm font-medium" style={{ color: BRAND_COLORS.textMid }}>Loading your profile...</span>
          </div>
        </div>
      </div>
    );
  }

  // Main Home Screen
  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.background }}>
      {/* Status Bar */}
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <div className="text-sm font-medium" style={{ color: BRAND_COLORS.textDark }}>
          09:41
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" style={{ color: BRAND_COLORS.textMid }} />
          <Battery className="w-4 h-4" style={{ color: BRAND_COLORS.textMid }} />
        </div>
      </div>

      {/* App Header */}
      <div className="px-6 pt-4 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg"
              style={{ backgroundColor: BRAND_COLORS.primary }}>
              N
            </div>
            <div>
              <h1 className="font-bold text-lg" style={{ color: BRAND_COLORS.textDark }}>My Naga</h1>
              <p className="text-xs" style={{ color: BRAND_COLORS.textMid }}>Naga City Government</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" style={{ color: BRAND_COLORS.textMid }} />
              <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS.primary }}></div>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <User className="w-5 h-5" style={{ color: BRAND_COLORS.textMid }} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-1" style={{ color: BRAND_COLORS.textDark }}>Good Evening!</h2>
          <p className="text-sm" style={{ color: BRAND_COLORS.textMid }}>Welcome back, how can we help you today?</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: BRAND_COLORS.textLight }} />
            <input 
              type="text" 
              placeholder="Search services, documents..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border text-sm"
              style={{ 
                backgroundColor: 'white',
                borderColor: BRAND_COLORS.border,
                color: BRAND_COLORS.textDark
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-24">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-base" style={{ color: BRAND_COLORS.textDark }}>Quick Actions</h3>
            <button className="text-sm font-medium" style={{ color: BRAND_COLORS.secondary }}>
              See all →
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: FileText, label: 'Documents', color: BRAND_COLORS.primary },
              { icon: CreditCard, label: 'Pay Bills', color: BRAND_COLORS.secondary },
              { icon: Building2, label: 'Permits', color: BRAND_COLORS.primary },
              { icon: ClipboardList, label: 'Records', color: BRAND_COLORS.secondary },
              { icon: AlertCircle, label: 'Report', color: BRAND_COLORS.primary },
              { icon: Calendar, label: 'Schedule', color: BRAND_COLORS.secondary },
              { icon: Ambulance, label: 'Emergency', color: BRAND_COLORS.primary },
              { 
                icon: Heart, 
                label: 'Health', 
                color: BRAND_COLORS.secondary,
                action: handleHealthClick
              }
            ].map((item, index) => (
              <button 
                key={index}
                onClick={item.action}
                className="flex flex-col items-center gap-2"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} strokeWidth={2} />
                </div>
                <span className="text-xs font-medium" style={{ color: BRAND_COLORS.textDark }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Services */}
        <div className="mb-8">
          <h3 className="font-semibold text-base mb-4" style={{ color: BRAND_COLORS.textDark }}>Featured Services</h3>
          
          <div className="space-y-3">
            {[
              {
                title: 'Business Permit Renewal',
                description: 'Renew your business permit online in minutes',
                icon: Building2,
                color: BRAND_COLORS.primary,
                badge: 'Quick Process',
                badgeColor: BRAND_COLORS.primary
              },
              {
                title: 'Community Tax Certificate',
                description: 'Get your Cedula online and skip the queue',
                icon: Scroll,
                color: BRAND_COLORS.secondary,
                badge: 'Available Now',
                badgeColor: BRAND_COLORS.success
              },
              {
                title: 'KATUWANG Health Services',
                description: '24/7 health assistance and emergency support',
                icon: Heart,
                color: BRAND_COLORS.success,
                badge: 'Team NAGANA',
                badgeColor: BRAND_COLORS.success,
                action: handleHealthClick
              }
            ].map((service, index) => (
              <button 
                key={index}
                onClick={service.action}
                className="w-full bg-white rounded-xl shadow-sm p-4 border text-left group hover:shadow-md transition-all"
                style={{ borderColor: BRAND_COLORS.border }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <service.icon className="w-6 h-6" style={{ color: service.color }} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1" style={{ color: BRAND_COLORS.textDark }}>
                      {service.title}
                    </h4>
                    <p className="text-xs mb-2" style={{ color: BRAND_COLORS.textLight }}>
                      {service.description}
                    </p>
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${service.badgeColor}15`,
                        color: service.badgeColor
                      }}
                    >
                      <TrendingUp className="w-3 h-3" />
                      {service.badge}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: BRAND_COLORS.textLight }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div>
          <h3 className="font-semibold text-base mb-4" style={{ color: BRAND_COLORS.textDark }}>Latest Updates</h3>
          
          <div className="bg-white rounded-xl shadow-sm p-5 border" style={{ borderColor: BRAND_COLORS.border }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${BRAND_COLORS.secondary}15` }}>
                <Megaphone className="w-4 h-4" style={{ color: BRAND_COLORS.secondary }} />
              </div>
              <span className="text-xs font-semibold" style={{ color: BRAND_COLORS.secondary }}>
                City Announcement
              </span>
            </div>
            <h4 className="font-semibold text-sm mb-2" style={{ color: BRAND_COLORS.textDark }}>
              City-Wide Health Program
            </h4>
            <p className="text-sm mb-4" style={{ color: BRAND_COLORS.textMid }}>
              Free medical check-ups available at all barangay health centers this month. Register now!
            </p>
            <button className="text-sm font-medium" style={{ color: BRAND_COLORS.primary }}>
              Learn More →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white py-3" style={{ borderColor: BRAND_COLORS.border }}>
        <div className="flex items-center justify-around px-6">
          {[
            { icon: Home, label: 'Home', id: 'home' as const },
            { icon: FileText, label: 'Services', id: 'services' as const },
            { icon: MessageCircle, label: 'Support', id: 'support' as const },
            { icon: Newspaper, label: 'News', id: 'news' as const },
            { icon: Settings, label: 'Settings', id: 'settings' as const }
          ].map((navItem) => (
            <button 
              key={navItem.id}
              onClick={() => setActiveNav(navItem.id)}
              className="flex flex-col items-center gap-1"
            >
              <navItem.icon 
                className="w-5 h-5" 
                style={{ color: activeNav === navItem.id ? BRAND_COLORS.primary : BRAND_COLORS.textMid }} 
              />
              <span 
                className="text-xs" 
                style={{ color: activeNav === navItem.id ? BRAND_COLORS.primary : BRAND_COLORS.textMid }}
              >
                {navItem.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}