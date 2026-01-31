import { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Phone,
  MapPin,
  Users,
  Check,
  Clock,
  Shield,
  Ambulance,
  Heart,
  Radio,
  Satellite,
  UserCheck,
  Battery,
  Wifi,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

import { Screen } from "../types";

interface EmergencyActivationProps {
  onNavigate: (screen: Screen) => void;
}

// Brand Colors
import { BRAND_COLORS } from '../../constants/colors';

export default function EmergencyActivation({ onNavigate }: EmergencyActivationProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [emergencyActivated, setEmergencyActivated] = useState(false);
  const [showSafetyInstructions, setShowSafetyInstructions] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [emergencyType, setEmergencyType] = useState<'medical' | 'accident' | 'other' | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (emergencyActivated && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [emergencyActivated, countdown]);

  const handleActivateEmergency = () => {
    setShowConfirmModal(false);
    setEmergencyActivated(true);
  };

  const emergencyTypes = [
    { id: 'medical', label: 'Medical Emergency', icon: <Heart className="w-5 h-5" />, color: BRAND_COLORS.danger },
    { id: 'accident', label: 'Accident/Trauma', icon: <Ambulance className="w-5 h-5" />, color: BRAND_COLORS.primary },
    { id: 'other', label: 'Other Emergency', icon: <AlertTriangle className="w-5 h-5" />, color: '#9333EA' },
  ];

  if (emergencyActivated) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.dangerLight }}>
        {/* Status Bar */}
        <div className="status-bar">
          <div className="time">9:41</div>
          <div className="status-icons">
            <Wifi size={16} style={{ color: BRAND_COLORS.danger }} />
            <Battery size={16} style={{ color: BRAND_COLORS.danger }} />
          </div>
        </div>

        {/* Header Section */}
        <div
          className="text-white pt-6 px-6 pb-6"
          style={{ backgroundColor: BRAND_COLORS.danger }}
        >
          {/* Back Button */}
          <button
            onClick={() => {
              setEmergencyActivated(false);
              setCountdown(5);
            }}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Cancel</span>
          </button>

          {/* Title Section */}
          <div className="mb-2">
            <p className="text-white/80 text-sm font-medium mb-1">Emergency Response</p>
            <h1 className="text-4xl font-bold">ACTIVATED</h1>
            <p className="text-white/90 text-base mt-1">Help is on the way</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 py-8 pb-24">
          {/* Response Progress */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border-2" style={{ borderColor: BRAND_COLORS.danger }}>
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-20 h-20 relative mb-3">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke={`${BRAND_COLORS.danger}20`} strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="45"
                    fill="none"
                    stroke={BRAND_COLORS.danger}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * (5 - countdown) / 5)}
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold" style={{ color: BRAND_COLORS.danger }}>{countdown}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Connecting to emergency services...</p>
            </div>
          </div>

          {/* Response Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4 border" style={{ borderColor: `${BRAND_COLORS.danger}30` }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND_COLORS.danger}20` }}>
                  <Radio className="w-4 h-4" style={{ color: BRAND_COLORS.danger }} />
                </div>
                <span className="text-xs font-semibold text-gray-800">911 Dispatch</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-gray-500">Connected</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border" style={{ borderColor: `${BRAND_COLORS.primary}30` }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND_COLORS.danger}20` }}>
                  <Satellite className="w-4 h-4" style={{ color: BRAND_COLORS.primary }} />
                </div>
                <span className="text-xs font-semibold text-gray-800">Location</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] text-gray-500">Live tracking</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border" style={{ borderColor: `${BRAND_COLORS.success}30` }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND_COLORS.success}20` }}>
                  <UserCheck className="w-4 h-4" style={{ color: BRAND_COLORS.success }} />
                </div>
                <span className="text-xs font-semibold text-gray-800">Contacts</span>
              </div>
              <div className="text-xs text-gray-600">3 notified</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border" style={{ borderColor: `${BRAND_COLORS.danger}30` }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND_COLORS.danger}20` }}>
                  <Clock className="w-4 h-4" style={{ color: BRAND_COLORS.danger }} />
                </div>
                <span className="text-xs font-semibold text-gray-800">ETA</span>
              </div>
              <div className="text-sm font-bold text-gray-800">5-8 min</div>
            </div>
          </div>

          {/* Safety Instructions */}
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 border-2" style={{ borderColor: BRAND_COLORS.primary }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: BRAND_COLORS.primary }} />
                Safety Instructions
              </h3>
              <button
                onClick={() => setShowSafetyInstructions(!showSafetyInstructions)}
                className="text-xs" style={{ color: BRAND_COLORS.danger }}
              >
                {showSafetyInstructions ? 'Hide' : 'Show'}
              </button>
            </div>

            {showSafetyInstructions && (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${BRAND_COLORS.success}20` }}>
                    <Check className="w-3 h-3" style={{ color: BRAND_COLORS.success }} />
                  </div>
                  <p className="text-xs text-gray-600">Stay calm and remain where you are</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${BRAND_COLORS.success}20` }}>
                    <Check className="w-3 h-3" style={{ color: BRAND_COLORS.success }} />
                  </div>
                  <p className="text-xs text-gray-600">Keep your phone visible and accessible</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${BRAND_COLORS.success}20` }}>
                    <Check className="w-3 h-3" style={{ color: BRAND_COLORS.success }} />
                  </div>
                  <p className="text-xs text-gray-600">If safe, unlock doors for responders</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${BRAND_COLORS.success}20` }}>
                    <Check className="w-3 h-3" style={{ color: BRAND_COLORS.success }} />
                  </div>
                  <p className="text-xs text-gray-600">Answer all calls from unknown numbers</p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a
              href="tel:911"
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold transition-all active:scale-[0.98] shadow-sm"
              style={{ backgroundColor: BRAND_COLORS.danger, color: 'white' }}
            >
              <Phone className="w-5 h-5" />
              Call 911 Directly
            </a>

            <button
              onClick={() => {
                setEmergencyActivated(false);
                setCountdown(5);
              }}
              className="w-full border border-gray-300 text-gray-700 rounded-xl px-6 py-4 font-semibold hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              Cancel Emergency Alert
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full text-gray-600 rounded-xl px-6 py-4 font-semibold hover:bg-gray-50 transition-all active:scale-[0.98]"
              style={{ color: BRAND_COLORS.primary }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.surface }}>
      {/* Status Bar */}


      {/* Header Section */}
      <div
        className="text-white pt-6 px-6 pb-8"
        style={{ backgroundColor: BRAND_COLORS.primary }}
      >
        {/* Back Button */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium text-sm">Back to Dashboard</span>
        </button>

        {/* Title Section */}
        <div className="mb-2">
          <p className="text-white/80 text-sm font-medium mb-1">Emergency Activation</p>
          <h1 className="text-4xl font-bold">911</h1>
          <p className="text-white/90 text-base mt-1">Naga City Emergency Response</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-8 pb-32">
        {/* Warning Alert */}
        <div
          className="rounded-2xl p-5 border-2 mb-6"
          style={{
            backgroundColor: `${BRAND_COLORS.danger}10`,
            borderColor: BRAND_COLORS.danger
          }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: BRAND_COLORS.danger }} />
            <div>
              <h4 className="text-sm font-semibold text-gray-900">For Life-Threatening Emergencies Only</h4>
              <p className="text-xs text-gray-600 mt-1">Use this feature only when immediate professional assistance is required.</p>
            </div>
          </div>
        </div>

        {/* Emergency Types */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Select Emergency Type</h2>
          <div className="space-y-2">
            {emergencyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setEmergencyType(type.id as any)}
                className={`w-full bg-white rounded-xl shadow-sm border-2 overflow-hidden hover:shadow-md transition-all active:scale-[0.98] text-left group ${emergencyType === type.id ? 'border-2' : 'border-transparent'
                  }`}
                style={{
                  borderColor: emergencyType === type.id ? type.color : 'transparent',
                  backgroundColor: emergencyType === type.id ? `${type.color}10` : 'white'
                }}
              >
                <div className="p-4 flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: emergencyType === type.id ? type.color : `${type.color}20` }}
                  >
                    <div className="text-white">
                      {type.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">{type.label}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {type.id === 'medical' && 'Heart attack, stroke, severe injury'}
                      {type.id === 'accident' && 'Car crash, fall, major trauma'}
                      {type.id === 'other' && 'Fire, crime, other emergencies'}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* What Happens */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-8 border-2" style={{ borderColor: BRAND_COLORS.primary }}>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">What Happens When Activated</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BRAND_COLORS.danger}20` }}>
                <Radio className="w-4 h-4" style={{ color: BRAND_COLORS.danger }} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900">911 Dispatch Alerted</h4>
                <p className="text-xs text-gray-500">Nearest emergency unit dispatched immediately</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BRAND_COLORS.primary}20` }}>
                <Users className="w-4 h-4" style={{ color: BRAND_COLORS.primary }} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900">Contacts Notified</h4>
                <p className="text-xs text-gray-500">Emergency contacts receive SMS and call alerts</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BRAND_COLORS.success}20` }}>
                <MapPin className="w-4 h-4" style={{ color: BRAND_COLORS.success }} />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900">Location Shared</h4>
                <p className="text-xs text-gray-500">Real-time GPS coordinates sent to responders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Call Options */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Or Call Directly</h2>
          <div className="space-y-2">
            <a
              href="tel:911"
              className="flex items-center justify-between p-4 rounded-xl shadow-sm border-2 hover:shadow-md transition-all active:scale-[0.98] group"
              style={{
                backgroundColor: `${BRAND_COLORS.danger}10`,
                borderColor: BRAND_COLORS.danger
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: BRAND_COLORS.danger }}>
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">Naga City Emergency</div>
                  <div className="text-xs text-gray-500">24/7 Dispatch Center</div>
                </div>
              </div>
              <div className="text-lg font-bold text-gray-900">911</div>
            </a>

            <a
              href="tel:1555"
              className="flex items-center justify-between p-4 rounded-xl shadow-sm border-2 hover:shadow-md transition-all active:scale-[0.98] group"
              style={{
                backgroundColor: `${BRAND_COLORS.primary}10`,
                borderColor: BRAND_COLORS.primary
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: BRAND_COLORS.primary }}>
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">DOH Health Hotline</div>
                  <div className="text-xs text-gray-500">Medical advice & triage</div>
                </div>
              </div>
              <div className="text-lg font-bold text-gray-900">1555</div>
            </a>

            <a
              href="tel:143"
              className="flex items-center justify-between p-4 rounded-xl shadow-sm border-2 hover:shadow-md transition-all active:scale-[0.98] group"
              style={{
                backgroundColor: `${BRAND_COLORS.success}10`,
                borderColor: BRAND_COLORS.success
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: BRAND_COLORS.success }}>
                  <Ambulance className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-900">Red Cross Naga</div>
                  <div className="text-xs text-gray-500">Ambulance services</div>
                </div>
              </div>
              <div className="text-lg font-bold text-gray-900">143</div>
            </a>
          </div>
        </div>

        {/* Quick Info */}
        <div
          className="rounded-2xl p-5 border-2"
          style={{
            backgroundColor: `${BRAND_COLORS.primary}10`,
            borderColor: BRAND_COLORS.primary
          }}
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: BRAND_COLORS.primary }} />
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Your Safety is Our Priority</h4>
              <p className="text-xs text-gray-600 mt-1">Naga City Emergency Services • 24/7 Response • Team NAGANA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activation Button - Fixed Bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 p-6 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(0,0,0,0.05)'
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="relative group">
            <div
              className="absolute -inset-1 rounded-2xl opacity-25 group-hover:opacity-50 blur transition duration-200"
              style={{ backgroundColor: BRAND_COLORS.danger }}
            />
            <button
              onClick={() => setShowConfirmModal(true)}
              className="relative w-full rounded-xl py-5 font-bold flex items-center justify-center gap-3 text-lg transition-all active:scale-[0.98]"
              style={{
                background: `linear-gradient(to right, ${BRAND_COLORS.danger}, #DC2626)`,
                color: 'white',
                boxShadow: `0 4px 14px 0 rgba(220, 38, 38, 0.39)`
              }}
            >
              <div className="p-1 bg-white/20 rounded-full">
                <AlertTriangle className="w-4 h-4" fill="white" />
              </div>
              <span className="tracking-wide">ACTIVATE EMERGENCY ALERT</span>
            </button>
          </div>
          <p className="text-center text-xs font-medium text-gray-500 mt-3 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            Double-tap confirmation required
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full flex items-center justify-center animate-pulse" style={{ backgroundColor: `${BRAND_COLORS.danger}20` }}>
                <AlertTriangle className="w-10 h-10" style={{ color: BRAND_COLORS.danger }} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-3 text-gray-900">Confirm Emergency Alert</h2>
            <p className="text-center text-sm mb-8 text-gray-600">
              This will immediately notify emergency services (911), your emergency contacts, and share your location.
            </p>

            {/* Notification Summary */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${BRAND_COLORS.danger}10` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: BRAND_COLORS.danger }}>
                  <Radio className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-800">Naga Emergency (911)</div>
                  <div className="text-xs text-gray-500">Dispatching nearest unit</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${BRAND_COLORS.primary}10` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: BRAND_COLORS.primary }}>
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-800">3 Emergency Contacts</div>
                  <div className="text-xs text-gray-500">SMS & call alerts sent</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${BRAND_COLORS.success}10` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: BRAND_COLORS.success }}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-800">Location Shared</div>
                  <div className="text-xs text-gray-500">Real-time tracking active</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleActivateEmergency}
                className="w-full rounded-xl px-6 py-4 font-semibold transition-all active:scale-[0.98] shadow-sm"
                style={{ backgroundColor: BRAND_COLORS.danger, color: 'white' }}
              >
                YES - This is an Emergency
              </button>

              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full rounded-xl px-6 py-4 font-semibold border-2 transition-all active:scale-[0.98]"
                style={{ borderColor: '#CBD5E1', color: '#475569' }}
              >
                Cancel
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">
                Only activate for life-threatening emergencies
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}