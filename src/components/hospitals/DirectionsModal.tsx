import { useState, useEffect, useRef } from 'react'
import { X, Loader, Phone } from 'lucide-react'
import { BRAND_COLORS } from '../../constants/colors'
import { Facility } from './types'

interface DirectionsModalProps {
  facility: Facility
  onClose: () => void
  brandColors: typeof BRAND_COLORS
}

export default function DirectionsModal({ facility, onClose, brandColors }: DirectionsModalProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [routeData, setRouteData] = useState<{ distance: string; duration: number; coordinates: any[] } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    const loadLeaflet = async () => {
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
        document.head.appendChild(link)
      }

      if (!(window as any).L) {
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
        script.onload = () => initializeMap()
        document.body.appendChild(script)
      } else {
        initializeMap()
      }
    }

    const initializeMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            createMapInstance(userLoc)
          },
          (error) => {
            console.error('Geolocation error:', error)
            setError('Unable to get your location. Using default coordinates.')
            const defaultLoc = { lat: 13.6192, lng: 123.1814 }
            createMapInstance(defaultLoc)
          }
        )
      } else {
         setError('Geolocation is not supported by your browser.')
         const defaultLoc = { lat: 13.6192, lng: 123.1814 }
         createMapInstance(defaultLoc)
      }
    }

    const createMapInstance = (startLoc: { lat: number; lng: number }) => {
      if (mapContainer.current && !mapRef.current) {
        const L = (window as any).L
        if (!L) return

        mapRef.current = L.map(mapContainer.current).setView([startLoc.lat, startLoc.lng], 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(mapRef.current)

        L.marker([startLoc.lat, startLoc.lng], {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).addTo(mapRef.current).bindPopup('Your Location')

        L.marker([facility.latitude, facility.longitude], {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).addTo(mapRef.current).bindPopup(facility.name)

        fetchDirections(startLoc, facility)
      }
    }

    const fetchDirections = async (startLoc: { lat: number; lng: number }, endLoc: Facility) => {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${startLoc.lng},${startLoc.lat}${endLoc.longitude},${endLoc.latitude}?overview=full&steps=true&geometries=geojson`
        )
        const data = await response.json()

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0]
          setRouteData({
            distance: (route.distance / 1000).toFixed(1),
            duration: Math.round(route.duration / 60),
            coordinates: route.geometry.coordinates,
          })

          if (mapRef.current) {
            const L = (window as any).L
            const coordinates = route.geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]])

            L.polyline(coordinates, {
              color: BRAND_COLORS.primary,
              weight: 5,
              opacity: 0.7,
            }).addTo(mapRef.current)

            const group = new L.FeatureGroup(coordinates.map((latLng: number[]) => L.marker(latLng)))
            mapRef.current.fitBounds(group.getBounds().pad(0.1))
          }
        }
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching directions:', err)
        setError('Could not load directions')
        setIsLoading(false)
      }
    }

    loadLeaflet()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [facility])

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div
          className="text-white p-6 flex items-center justify-between"
          style={{ backgroundColor: brandColors.secondary }}
        >
          <div>
            <h2 className="text-2xl font-bold">{facility.name}</h2>
            <p className="text-white/80 text-sm mt-1">📍 Real-time directions</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-1 overflow-hidden relative bg-gray-100">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
              <div className="text-center">
                <Loader className="w-8 h-8 animate-spin mx-auto mb-3" style={{ color: brandColors.secondary }} />
                <p style={{ color: brandColors.textSecondary }}>Loading map...</p>
              </div>
            </div>
          )}
          <div ref={mapContainer} style={{ width: '100%', height: '100%', minHeight: '400px' }} />
        </div>

        {/* Footer */}
        <div className="p-6 border-t" style={{ borderColor: brandColors.border }}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {routeData && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-xs font-semibold" style={{ color: brandColors.textSecondary }}>Distance</p>
                <p className="text-2xl font-bold" style={{ color: brandColors.secondary }}>{routeData.distance} km</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-xs font-semibold" style={{ color: brandColors.textSecondary }}>Duration</p>
                <p className="text-2xl font-bold" style={{ color: brandColors.success }}>{routeData.duration} min</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-xs font-semibold" style={{ color: brandColors.textSecondary }}>Status</p>
                <p className="text-2xl font-bold" style={{ color: facility.isOpen ? brandColors.success : '#EF4444' }}>
                  {facility.isOpen ? 'Open' : 'Closed'}
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <a
              href={`tel:${facility.phone}`}
              className="flex-1 rounded-lg px-4 py-3 font-medium transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm text-white"
              style={{ backgroundColor: brandColors.secondary }}
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
            <button
              onClick={onClose}
              className="flex-1 rounded-lg px-4 py-3 font-medium transition-all border-2"
              style={{ borderColor: brandColors.border, color: brandColors.textSecondary }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}