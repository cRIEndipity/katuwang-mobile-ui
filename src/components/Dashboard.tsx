import { useState } from 'react'
import { Stethoscope } from 'lucide-react'
import { BRAND_COLORS } from '../constants/colors'
import { Screen } from "../types"
import katuwangLogo from '../assets/logos/katuwang-logo.png'
import HealthTipSection from './dashboard/HealthTipSection'
import EmergencyHotlines from './dashboard/EmergencyHotlines'
import ServicesList from './dashboard/ServicesList'
import HospitalDirectory from './dashboard/HospitalDirectory'

interface DashboardProps {
  onNavigate: (screen: Screen) => void
  userType?: 'patient' | null
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [isHospitalModalOpen, setIsHospitalModalOpen] = useState(false)

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.background }}>
      {/* Header */}
      <header style={{ backgroundColor: BRAND_COLORS.primary }} className="text-white">
        <div className="container mx-auto px-4 py-5 flex items-center gap-4">
          <div className="bg-white rounded-full p-1 backdrop-blur-sm">
            <img src={katuwangLogo} alt="Katuwang Logo" className="w-14 h-14 object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">KATUWANG</h1>
            <p className="text-white/90 text-sm">Your Health Companion</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6 pb-8">
        <HealthTipSection />

        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Stethoscope className="w-5 h-5" style={{ color: BRAND_COLORS.textPrimary }} />
            <h2 className="font-semibold text-base" style={{ color: BRAND_COLORS.textPrimary }}>
              Health Services
            </h2>
          </div>

          <ServicesList 
            onNavigate={onNavigate} 
            onOpenHospitalDirectory={() => setIsHospitalModalOpen(true)} 
          />
        </section>
        
        <EmergencyHotlines />
      </main>

      <HospitalDirectory
        isOpen={isHospitalModalOpen}
        onClose={() => setIsHospitalModalOpen(false)}
      />
    </div>
  )
}