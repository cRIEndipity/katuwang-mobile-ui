import { useState } from 'react'
import { 
  ChevronLeft, 
  Map, 
  List, 
  Phone, 
  Navigation, 
  MapPin, 
  Star, 
  Search, 
  Building2, 
  Stethoscope, 
  Heart,
} from 'lucide-react'

import { Screen } from "../../types"
import { BRAND_COLORS } from '../../constants/colors'
import { facilities, Facility, FacilityType } from './types'
import InteractiveMapView from './InteractiveMapView'
import DirectionsModal from './DirectionsModal'

interface HospitalLocatorProps {
  onNavigate: (screen: Screen) => void
}

export default function HospitalLocator({ onNavigate }: HospitalLocatorProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [filterType, setFilterType] = useState<FacilityType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null)
  const [showDirections, setShowDirections] = useState(false)

  const filteredFacilities = facilities.filter(facility => {
    const matchesType = filterType === 'all' || facility.type === filterType
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.address.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'hospital': 'Hospital',
      'clinic': 'Clinic',
      'health-center': 'Health Center'
    }
    return labels[type] || type
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hospital': return <Building2 className="w-4 h-4" />
      case 'clinic': return <Stethoscope className="w-4 h-4" />
      case 'health-center': return <Heart className="w-4 h-4" />
      default: return <MapPin className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.surface }}>
      {/* Header */}
      <div
        className="text-white p-6 shadow-md"
        style={{ backgroundColor: BRAND_COLORS.primary }}
      >
        <button
          onClick={() => onNavigate('dashboard')}
          className="mb-4 flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium text-sm">Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Healthcare Facilities</h1>
            <p className="text-white/80 text-sm">Find nearby hospitals, clinics & health centers</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${viewMode === 'list'
              ? 'bg-white text-blue-600'
              : 'bg-white/20 text-white hover:bg-white/30'
              }`}
          >
            <List className="w-4 h-4" />
            <span className="text-sm">List</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${viewMode === 'map'
              ? 'bg-white text-blue-600'
              : 'bg-white/20 text-white hover:bg-white/30'
              }`}
          >
            <Map className="w-4 h-4" />
            <span className="text-sm">Map</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div
          className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3 border"
          style={{ borderColor: BRAND_COLORS.border }}
        >
          <Search className="w-5 h-5" style={{ color: BRAND_COLORS.textSecondary }} />
          <input
            type="text"
            placeholder="Search by name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-2 outline-none text-sm"
            style={{ color: BRAND_COLORS.textPrimary }}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'hospital', 'clinic', 'health-center'].map((type) => (
             <button
                key={type}
                onClick={() => setFilterType(type as FacilityType)}
                className={`px-4 py-2 rounded-lg font-medium text-sm shrink-0 transition-all border flex items-center gap-2 ${filterType === type
                  ? 'text-white border-transparent'
                  : `text-${BRAND_COLORS.textPrimary} border-${BRAND_COLORS.border} bg-white`
                  }`}
                style={{
                  backgroundColor: filterType === type 
                     ? (type === 'health-center' ? BRAND_COLORS.success : type === 'clinic' ? BRAND_COLORS.secondary : BRAND_COLORS.primary)
                     : 'white',
                  color: filterType === type ? 'white' : BRAND_COLORS.textPrimary,
                  borderColor: filterType === type ? 'transparent' : BRAND_COLORS.border
                }}
             >
               {type === 'hospital' && <Building2 className="w-4 h-4" />}
               {type === 'clinic' && <Stethoscope className="w-4 h-4" />}
               {type === 'health-center' && <Heart className="w-4 h-4" />}
               {type === 'all' ? 'All Facilities' : type.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
             </button>
          ))}
        </div>

        <p className="text-sm font-medium" style={{ color: BRAND_COLORS.textSecondary }}>
          {filteredFacilities.length} {filteredFacilities.length === 1 ? 'facility' : 'facilities'} found
        </p>

        {viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredFacilities.map((facility) => (
              <div key={facility.id} className="bg-white rounded-xl shadow-sm overflow-hidden border transition-all hover:shadow-md"
                style={{ borderColor: BRAND_COLORS.border }}>
                <div
                  className="h-1 w-full"
                  style={{
                    backgroundColor: facility.type === 'hospital'
                      ? BRAND_COLORS.primary
                      : facility.type === 'clinic'
                        ? BRAND_COLORS.secondary
                        : BRAND_COLORS.success
                  }}
                />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold" style={{ color: BRAND_COLORS.textPrimary }}>
                          {facility.name}
                        </h3>
                        {facility.isOpen ? (
                          <span className="px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: BRAND_COLORS.success }}>
                            Open Now
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs font-medium text-white bg-gray-500">
                            Closed
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{
                            backgroundColor: facility.type === 'hospital'
                              ? `${BRAND_COLORS.primary}15`
                              : facility.type === 'clinic'
                                ? `${BRAND_COLORS.secondary}15`
                                : `${BRAND_COLORS.success}15`
                          }}
                        >
                          {getTypeIcon(facility.type)}
                        </div>
                        <span className="text-xs font-semibold" style={{ color: BRAND_COLORS.textSecondary }}>
                          {getTypeLabel(facility.type)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1" style={{ color: BRAND_COLORS.textSecondary }}>
                          <Star className="w-4 h-4" style={{ color: '#FBBF24', fill: '#FBBF24' }} />
                          <span className="font-semibold">{facility.rating}</span>
                        </div>
                        <div className="flex items-center gap-1" style={{ color: BRAND_COLORS.textSecondary }}>
                          <Navigation className="w-4 h-4" />
                          <span className="font-medium">{facility.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: BRAND_COLORS.textSecondary }} />
                    <p className="text-sm" style={{ color: BRAND_COLORS.textSecondary }}>
                      {facility.address}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold mb-2" style={{ color: BRAND_COLORS.textSecondary }}>
                      SERVICES
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {facility.services.slice(0, 3).map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${BRAND_COLORS.secondary}15`,
                            color: BRAND_COLORS.secondary
                          }}
                        >
                          {service}
                        </span>
                      ))}
                      {facility.services.length > 3 && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ color: BRAND_COLORS.textSecondary }}>
                          +{facility.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`tel:${facility.phone}`}
                      className="flex-1 rounded-lg px-4 py-3 font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm text-white"
                      style={{ backgroundColor: BRAND_COLORS.secondary }}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </a>
                    <button
                      onClick={() => {
                        setSelectedFacility(facility)
                        setShowDirections(true)
                      }}
                      className="flex-1 rounded-lg px-4 py-3 font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm text-white"
                      style={{ backgroundColor: BRAND_COLORS.success }}
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Directions</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredFacilities.length === 0 && (
              <div className="text-center py-12">
                 <p className="text-gray-500">No facilities found.</p>
              </div>
            )}
          </div>
        ) : (
          <InteractiveMapView
            facilities={filteredFacilities}
            onSelectFacility={(facility) => {
              setSelectedFacility(facility)
              setShowDirections(true)
            }}
            brandColors={BRAND_COLORS}
          />
        )}

        {showDirections && selectedFacility && (
          <DirectionsModal
            facility={selectedFacility}
            onClose={() => {
              setShowDirections(false)
              setSelectedFacility(null)
            }}
            brandColors={BRAND_COLORS}
          />
        )}
      </div>
    </div>
  )
}