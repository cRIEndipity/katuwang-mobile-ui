import { useState, useRef, useEffect } from 'react'
import { Phone, Navigation, X, Loader } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'
import { Facility } from './types'

interface InteractiveMapViewProps {
  facilities: Facility[]
  onSelectFacility: (facility: Facility) => void
  brandColors: typeof BRAND_COLORS
}

export default function InteractiveMapView({ facilities, onSelectFacility, brandColors }: InteractiveMapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMarker, setSelectedMarker] = useState<Facility | null>(null)

  useEffect(() => {
    const loadAndInitializeMap = async () => {
      // Load Leaflet CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
        document.head.appendChild(link)
      }

      // Load Leaflet JS
      if (!(window as any).L) {
        return new Promise<void>((resolve) => {
          const script = document.createElement('script')
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
          script.onload = () => {
            setTimeout(() => {
                initializeMap()
                resolve()
            }, 100)
          }
          document.body.appendChild(script)
        })
      } else {
        initializeMap()
      }
    }

    const initializeMap = () => {
      if (!mapContainer.current || mapRef.current) return
      
      const L = (window as any).L
      
      if (!L) return
      let userLoc = { lat: 13.6192, lng: 123.1814 } // Default Naga City
      
      // Try to get user location (just for centering, no state needed)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            userLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }

            // Re-center map if it's already created
            if (mapRef.current) {
              mapRef.current.setView([userLoc.lat, userLoc.lng], 12)
            }
          },

          () => { /* Access denied, stick to default */ }
        )
      }

      // Initialize map
      mapRef.current = L.map(mapContainer.current).setView([userLoc.lat, userLoc.lng], 12)

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(mapRef.current)

      // Add user location marker (Blue)
      const userMarker = L.marker([userLoc.lat, userLoc.lng], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      }).addTo(mapRef.current)

      userMarker.bindPopup('<b>Your Location</b>', { closeButton: true })

      // Add facility markers
      facilities.forEach((facility) => {
        const iconColor = facility.type === 'hospital' ? 'red' : facility.type === 'clinic' ? 'blue' : 'green';
        const marker = L.marker([facility.latitude, facility.longitude], {
          icon: L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).addTo(mapRef.current)

        const typeLabel = facility.type === 'hospital' ? '🏥 Hospital' : facility.type === 'clinic' ? '⚕️ Clinic' : '💚 Health Center'
        
        marker.bindPopup(`<b>${facility.name}</b><br>${typeLabel}<br>⭐ ${facility.rating}`, { closeButton: true })
        marker.on('click', () => {
          setSelectedMarker(facility)
        })
      })

      // Fit bounds
      if (facilities.length > 0) {
        const bounds = L.latLngBounds(facilities.map(f => [f.latitude, f.longitude]))
        mapRef.current.fitBounds(bounds.pad(0.1))
      }
      setIsLoading(false)
    }

    loadAndInitializeMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [facilities])

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border" style={{ borderColor: brandColors.border }}>
      {/* Map Container */}
      <div className="relative" style={{ height: '500px' }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="text-center">
              <Loader className="w-8 h-8 animate-spin mx-auto mb-3" style={{ color: brandColors.secondary }} />
              <p style={{ color: brandColors.textSecondary }}>Loading map...</p>
            </div>
          </div>
        )}
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Selected Facility Info */}
      {selectedMarker && (
        <div className="p-4 border-t" style={{ borderColor: brandColors.border }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg" style={{ color: brandColors.textPrimary }}>
                {selectedMarker.name}
              </h3>
              <p className="text-sm" style={{ color: brandColors.textSecondary }}>
                {selectedMarker.type === 'hospital' ? '🏥 Hospital' : selectedMarker.type === 'clinic' ? '⚕️ Clinic' : '💚 Health Center'}
              </p>
            </div>
            <button
              onClick={() => setSelectedMarker(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" style={{ color: brandColors.textSecondary }} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 rounded" style={{ backgroundColor: `${brandColors.border}30` }}>
              <p className="text-xs" style={{ color: brandColors.textSecondary }}>Distance</p>
              <p className="font-bold" style={{ color: brandColors.textPrimary }}>{selectedMarker.distance}</p>
            </div>
            <div className="text-center p-2 rounded" style={{ backgroundColor: `${brandColors.border}30` }}>
              <p className="text-xs" style={{ color: brandColors.textSecondary }}>Rating</p>
              <p className="font-bold" style={{ color: brandColors.textPrimary }}>⭐ {selectedMarker.rating}</p>
            </div>
            <div className="text-center p-2 rounded" style={{ backgroundColor: `${brandColors.border}30` }}>
              <p className="text-xs" style={{ color: brandColors.textSecondary }}>Status</p>
              <p className="font-bold" style={{ color: selectedMarker.isOpen ? brandColors.success : '#EF4444' }}>
                {selectedMarker.isOpen ? 'Open' : 'Closed'}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={`tel:${selectedMarker.phone}`}
              className="flex-1 rounded-lg px-3 py-2 font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm text-white"
              style={{ backgroundColor: brandColors.secondary }}
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </a>
            <button
              onClick={() => onSelectFacility(selectedMarker)}
              className="flex-1 rounded-lg px-3 py-2 font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm text-white"
              style={{ backgroundColor: brandColors.success }}
            >
              <Navigation className="w-4 h-4" />
              <span>Directions</span>
            </button>
          </div>
        </div>
      )}

      {/* Map Legend */}
      {!selectedMarker && (
        <div
          className="p-4"
          style={{ backgroundColor: brandColors.surface }}
        >
          <h4 className="text-sm font-bold mb-3" style={{ color: brandColors.textPrimary }}>
            🗺️ FACILITIES ({facilities.length})
          </h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColors.primary }}></div>
              <span className="text-xs font-medium" style={{ color: brandColors.textSecondary }}>Hospital</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColors.secondary }}></div>
              <span className="text-xs font-medium" style={{ color: brandColors.textSecondary }}>Clinic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColors.success }}></div>
              <span className="text-xs font-medium" style={{ color: brandColors.textSecondary }}>Health Center</span>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: brandColors.textSecondary }}>
            💡 Click markers to view details and get directions
          </p>
        </div>
      )}
    </div>
  )
}