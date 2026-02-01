import { Bot, Hospital, Users, FileText, AlertCircle, Zap, ChevronLeft } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'
import { Screen } from '../../types'

const SERVICES = [
  { id: 'health-assistant', title: 'Health Assistant', description: 'AI-powered guidance', icon: Bot, iconColor: BRAND_COLORS.secondary, status: 'Online', statusColor: BRAND_COLORS.secondary },
  { id: 'emergency', title: 'Emergency Alert', description: 'Immediate assistance', icon: AlertCircle, iconColor: BRAND_COLORS.danger, isEmergency: true },
  { id: 'contacts', title: 'Emergency Contacts', description: 'Manage trusted contacts', icon: Users, iconColor: BRAND_COLORS.primary },
  { id: 'hospitals', title: 'Find Hospitals', description: 'Locate nearby facilities', icon: Hospital, iconColor: BRAND_COLORS.accent },
  { id: 'hospital-directory', title: 'Hospital Directory', description: 'Naga City hospital contacts', icon: Users, iconColor: BRAND_COLORS.secondary },
  { id: 'health-records', title: 'Health Records', description: 'Access your medical history', icon: FileText, iconColor: BRAND_COLORS.secondary }
]

interface ServicesListProps {
  onNavigate: (screen: Screen) => void
  onOpenHospitalDirectory: () => void
}

export default function ServicesList({ onNavigate, onOpenHospitalDirectory }: ServicesListProps) {
  const handleClick = (id: string) => {
    if (id === 'hospital-directory') onOpenHospitalDirectory()
    else onNavigate(id as Screen)
  }

  return (
    <div className="space-y-3">
      {SERVICES.map((service) => (
        <button
          key={service.id}
          onClick={() => handleClick(service.id)}
          className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 border flex items-center gap-4 group hover:border-blue-100 active:scale-[0.98]"
          style={{ borderColor: BRAND_COLORS.surface }}
        >
          <div className="relative shrink-0">
             <div className="p-3 rounded-lg transition-transform duration-200 group-hover:scale-110" 
                  style={{ backgroundColor: `${service.iconColor}15` }}>
               <service.icon className="w-6 h-6" style={{ color: service.iconColor }} strokeWidth={2} />
             </div>
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base" style={{ color: BRAND_COLORS.textPrimary }}>{service.title}</h3>
              {service.status && (
                <span className="font-medium text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: `${service.statusColor}15`, color: service.statusColor }}>
                  {service.status}
                </span>
              )}
            </div>
            <p className="text-sm mt-1" style={{ color: BRAND_COLORS.textSecondary }}>{service.description}</p>
          </div>
          {service.isEmergency ? (
             <div className="flex items-center gap-1">
               <Zap className="w-4 h-4" style={{ color: BRAND_COLORS.danger }} fill={BRAND_COLORS.danger} />
               <span className="text-xs font-semibold" style={{ color: BRAND_COLORS.danger }}>24/7</span>
             </div>
          ) : (
             <div className="text-gray-400"><ChevronLeft className="w-5 h-5 transform rotate-180" /></div>
          )}
        </button>
      ))}
    </div>
  )
}