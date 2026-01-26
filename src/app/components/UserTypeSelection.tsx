import { User, Stethoscope, ArrowLeft, Shield, Briefcase } from 'lucide-react';

type UserType = 'patient' | 'professional' | null;

interface UserTypeSelectionProps {
  onSelect: (type: UserType) => void;
  onBack: () => void;
}

const BRAND_COLORS = {
  primary: '#F7502F',
  secondary: '#1D62AF',
  success: '#00A651',
  accent: '#FAFBFC',
  slate700: '#334155',
  slate600: '#475569',
  slate300: '#CBD5E1',
};

export default function UserTypeSelection({ onSelect, onBack }: UserTypeSelectionProps) {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: BRAND_COLORS.accent }}
    >
      {/* Header with Back Button */}
      <div className="px-6 pt-6 pb-8 border-b" style={{ borderColor: BRAND_COLORS.slate300 }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg hover:opacity-80 transition-opacity"
          style={{ color: BRAND_COLORS.secondary }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold text-sm">Back to Dashboard</span>
        </button>
        
        <div>
          <h1 className="text-2xl font-bold" style={{ color: BRAND_COLORS.slate700 }}>
            Select Your Role
          </h1>
          <p className="text-sm mt-2" style={{ color: BRAND_COLORS.slate600 }}>
            Choose your role to access personalized health services
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-4">
          
          {/* Patient/User Role Card */}
          <button
            onClick={() => onSelect('patient')}
            className="w-full rounded-xl overflow-hidden shadow-md hover:shadow-lg active:shadow-sm transition-all border-2 bg-white group cursor-pointer"
            style={{ borderColor: `${BRAND_COLORS.secondary}20` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = BRAND_COLORS.secondary;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.secondary}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${BRAND_COLORS.secondary}20`;
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
            }}
          >
            {/* Top Accent Bar */}
            <div 
              className="h-1 w-full"
              style={{ backgroundColor: BRAND_COLORS.secondary }}
            />
            
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-lg group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${BRAND_COLORS.secondary}15` }}
                >
                  <User className="w-6 h-6" style={{ color: BRAND_COLORS.secondary }} strokeWidth={2} />
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold" style={{ color: BRAND_COLORS.slate700 }}>
                    Patient / User
                  </h3>
                  <p className="text-sm mt-1" style={{ color: BRAND_COLORS.slate600 }}>
                    Access health information, emergency services, and healthcare facilities
                  </p>
                  
                  {/* Features List */}
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs" style={{ color: BRAND_COLORS.slate600 }}>
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: BRAND_COLORS.secondary }} />
                      <span>Health records & monitoring</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: BRAND_COLORS.slate600 }}>
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: BRAND_COLORS.secondary }} />
                      <span>Find nearby facilities</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: BRAND_COLORS.slate600 }}>
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: BRAND_COLORS.secondary }} />
                      <span>Emergency support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* Health Professional Role Card */}
          <button
            onClick={() => onSelect('professional')}
            className="w-full rounded-xl overflow-hidden shadow-md hover:shadow-lg active:shadow-sm transition-all border-2 bg-white group cursor-pointer"
            style={{ borderColor: `${BRAND_COLORS.success}20` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = BRAND_COLORS.success;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${BRAND_COLORS.success}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${BRAND_COLORS.success}20`;
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)';
            }}
          >
            {/* Top Accent Bar */}
            <div 
              className="h-1 w-full"
              style={{ backgroundColor: BRAND_COLORS.success }}
            />
            
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div 
                  className="p-3 rounded-lg group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${BRAND_COLORS.success}15` }}
                >
                  <Stethoscope className="w-6 h-6" style={{ color: BRAND_COLORS.success }} strokeWidth={2} />
                </div>
                
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold" style={{ color: BRAND_COLORS.slate700 }}>
                    Health Professional
                  </h3>
                  <p className="text-sm mt-1" style={{ color: BRAND_COLORS.slate600 }}>
                    Access professional tools and provide verified health guidance
                  </p>
                  
                  {/* Features List */}
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs" style={{ color: BRAND_COLORS.slate600 }}>
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: BRAND_COLORS.success }} />
                      <span>Patient management tools</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: BRAND_COLORS.slate600 }}>
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: BRAND_COLORS.success }} />
                      <span>Verified credentials</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: BRAND_COLORS.slate600 }}>
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: BRAND_COLORS.success }} />
                      <span>Professional consultation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>

        </div>
      </div>

      {/* Footer */}
      <div 
        className="px-6 py-6 border-t text-center"
        style={{ borderColor: BRAND_COLORS.slate300 }}
      >
        <p className="text-xs font-semibold" style={{ color: BRAND_COLORS.slate700 }}>
          KATUWANG Health Services
        </p>
        <p className="text-xs mt-1" style={{ color: BRAND_COLORS.slate600 }}>
          Naga City LGU • MyNaga Super App
        </p>
      </div>
    </div>
  );
}
