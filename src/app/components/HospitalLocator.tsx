import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Map, List, Phone, Navigation, MapPin, Star, Filter, Search, Building2, Stethoscope, Heart, X, Navigation2, Loader } from 'lucide-react';

type Screen = 'entry' | 'dashboard' | 'health-assistant' | 'emergency' | 'hospitals' | 'contacts';

interface HospitalLocatorProps {
  onNavigate: (screen: Screen) => void;
}

type FacilityType = 'all' | 'hospital' | 'clinic' | 'health-center';

const BRAND_COLORS = {
  primary: '#1D62AF',    // Naga Coral
  secondary: '#F7502F',  // Fun Blue
  success: '#00A651',    // Green
  accent: '#FAFBFC',     // Athens Gray
  slate700: '#334155',
  slate600: '#475569',
  slate300: '#CBD5E1',
};

interface Facility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'health-center';
  address: string;
  distance: string;
  phone: string;
  rating: number;
  services: string[];
  latitude: number;
  longitude: number;
  isOpen: boolean;
}

const facilities: Facility[] = [
  {
    id: '1',
    name: 'Bicol Medical Center',
    type: 'hospital',
    address: 'Naga-Panganiban Drive, Naga City',
    distance: '1.2 km',
    phone: '(054) 473-2104',
    rating: 4.5,
    services: ['Emergency Room', 'Surgery', 'Maternity', 'Pediatrics', 'Laboratory', 'Pharmacy', 'ICU'],
    latitude: 13.6192,
    longitude: 123.1814,
    isOpen: true
  },
  {
    id: '2',
    name: 'Naga City Hospital',
    type: 'hospital',
    address: 'Tabuko, Naga City',
    distance: '2.3 km',
    phone: '(054) 473-3453',
    rating: 4.2,
    services: ['Emergency Room', 'General Medicine', 'Outpatient', 'Laboratory', 'X-Ray'],
    latitude: 13.6234,
    longitude: 123.1920,
    isOpen: true
  },
  {
    id: '3',
    name: 'Metro Naga Medical Center',
    type: 'hospital',
    address: 'San Felipe, Naga City',
    distance: '0.8 km',
    phone: '(054) 472-5555',
    rating: 4.7,
    services: ['Emergency Room', 'Surgery', 'Cardiology', 'Orthopedics', 'Dialysis', 'ICU', 'Laboratory'],
    latitude: 13.6156,
    longitude: 123.1789,
    isOpen: true
  },
  {
    id: '4',
    name: 'Naga City Health Center',
    type: 'health-center',
    address: 'Panganiban Drive, Naga City',
    distance: '1.5 km',
    phone: '(054) 473-2345',
    rating: 4.0,
    services: ['Vaccination', 'Prenatal Care', 'Family Planning', 'Check-ups', 'Free Medicines'],
    latitude: 13.6201,
    longitude: 123.1823,
    isOpen: true
  },
  {
    id: '5',
    name: 'Family Care Clinic',
    type: 'clinic',
    address: 'Magsaysay Avenue, Naga City',
    distance: '0.5 km',
    phone: '(054) 472-8888',
    rating: 4.4,
    services: ['General Consultation', 'Laboratory', 'Minor Procedures', 'Pharmacy'],
    latitude: 13.6178,
    longitude: 123.1801,
    isOpen: false
  },
  {
    id: '6',
    name: 'Saint Paul Hospital',
    type: 'hospital',
    address: 'Elias Lopez Street, Naga City',
    distance: '1.8 km',
    phone: '(054) 473-5678',
    rating: 4.6,
    services: ['Emergency Room', 'Internal Medicine', 'Surgery', 'Pediatrics', 'Maternity', 'Laboratory', 'Radiology'],
    latitude: 13.6210,
    longitude: 123.1905,
    isOpen: true
  },
  {
    id: '7',
    name: 'Riverside Medical Clinic',
    type: 'clinic',
    address: 'Rizal Avenue, Naga City',
    distance: '1.1 km',
    phone: '(054) 472-9999',
    rating: 4.3,
    services: ['Dental Care', 'General Medicine', 'Ultrasound', 'Vaccination', 'Pharmacy'],
    latitude: 13.6145,
    longitude: 123.1750,
    isOpen: true
  },
  {
    id: '8',
    name: 'Naga Wellness Center',
    type: 'health-center',
    address: 'Caalo, Naga City',
    distance: '2.5 km',
    phone: '(054) 473-1234',
    rating: 4.1,
    services: ['Preventive Care', 'Nutrition Counseling', 'Health Screening', 'Immunization', 'Community Health Programs'],
    latitude: 13.6050,
    longitude: 123.1880,
    isOpen: true
  },
  {
    id: '9',
    name: 'CarePlus Diagnostic Center',
    type: 'clinic',
    address: 'De Fez Street, Naga City',
    distance: '0.9 km',
    phone: '(054) 472-7777',
    rating: 4.5,
    services: ['CT Scan', 'X-Ray', 'Ultrasound', 'Blood Tests', 'Consultation with Radiologist'],
    latitude: 13.6188,
    longitude: 123.1835,
    isOpen: true
  },
  {
    id: '10',
    name: 'Perpetual Health Hospital',
    type: 'hospital',
    address: 'National Highway, Naga City',
    distance: '3.2 km',
    phone: '(054) 473-4444',
    rating: 4.4,
    services: ['Emergency Services', 'Orthopedic Surgery', 'Neurology', 'Cardiology', 'Oncology', 'ICU', 'Pharmacy'],
    latitude: 13.6300,
    longitude: 123.1950,
    isOpen: true
  },
  {
    id: '11',
    name: 'Brgy. Naga Health Center',
    type: 'health-center',
    address: 'Naga Proper, Naga City',
    distance: '2.0 km',
    phone: '(054) 473-6789',
    rating: 4.0,
    services: ['Family Planning', 'Maternal Health', 'Child Immunization', 'Basic Laboratory', 'Health Education'],
    latitude: 13.6220,
    longitude: 123.1700,
    isOpen: true
  },
  {
    id: '12',
    name: 'Healthline Medical Clinic',
    type: 'clinic',
    address: 'Abucay Avenue, Naga City',
    distance: '1.6 km',
    phone: '(054) 472-6666',
    rating: 4.2,
    services: ['Pediatric Care', 'OB-Gyne Services', 'Minor Surgery', 'Allergy Treatment', 'Home Service Available'],
    latitude: 13.6155,
    longitude: 123.1825,
    isOpen: true
  },
  {
    id: '13',
    name: 'Integrated Naga Health Services',
    type: 'hospital',
    address: 'Tinago, Naga City',
    distance: '2.7 km',
    phone: '(054) 473-3333',
    rating: 4.3,
    services: ['24/7 Emergency', 'General Medicine', 'Obstetrics', 'Surgical Ward', 'Physical Therapy', 'Laboratory'],
    latitude: 13.6270,
    longitude: 123.1770,
    isOpen: true
  },
  {
    id: '14',
    name: 'MediCare Plus Clinic',
    type: 'clinic',
    address: 'Guerrero Street, Naga City',
    distance: '1.3 km',
    phone: '(054) 472-5555',
    rating: 4.1,
    services: ['General Practice', 'Wound Care', 'Blood Pressure Monitoring', 'Diabetes Management', 'Consultation'],
    latitude: 13.6165,
    longitude: 123.1915,
    isOpen: false
  },
  {
    id: '15',
    name: 'Naga City Central Health Office',
    type: 'health-center',
    address: 'Civic Center Road, Naga City',
    distance: '0.7 km',
    phone: '(054) 473-8888',
    rating: 4.2,
    services: ['Disease Prevention', 'Health Promotion', 'Community Programs', 'Disease Surveillance', 'Public Health Services'],
    latitude: 13.6195,
    longitude: 123.1880,
    isOpen: true
  }
];

export default function HospitalLocator({ onNavigate }: HospitalLocatorProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterType, setFilterType] = useState<FacilityType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [showDirections, setShowDirections] = useState(false);

  const filteredFacilities = facilities.filter(facility => {
    const matchesType = filterType === 'all' || facility.type === filterType;
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          facility.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeLabel = (type: string) => {
    const labels = {
      'hospital': 'Hospital',
      'clinic': 'Clinic',
      'health-center': 'Health Center'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'hospital':
        return <Building2 className="w-4 h-4" />;
      case 'clinic':
        return <Stethoscope className="w-4 h-4" />;
      case 'health-center':
        return <Heart className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.accent }}>
      {/* Professional Header */}
      <div 
        className="text-white p-6 shadow-md"
        style={{ backgroundColor: BRAND_COLORS.primary }}
      >
        <button 
          onClick={() => onNavigate('dashboard')}
          className="mb-4 flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
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
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'list' 
                ? 'bg-white text-blue-600' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="text-sm">List</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              viewMode === 'map' 
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
          style={{ borderColor: BRAND_COLORS.slate300 }}
        >
          <Search className="w-5 h-5" style={{ color: BRAND_COLORS.slate600 }} />
          <input
            type="text"
            placeholder="Search by name or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-2 outline-none text-sm"
            style={{ color: BRAND_COLORS.slate700 }}
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex-shrink-0 transition-all border ${
              filterType === 'all'
                ? 'text-white border-transparent'
                : `text-${BRAND_COLORS.slate700} border-${BRAND_COLORS.slate300} bg-white`
            }`}
            style={{
              backgroundColor: filterType === 'all' ? BRAND_COLORS.secondary : 'white',
              color: filterType === 'all' ? 'white' : BRAND_COLORS.slate700,
              borderColor: filterType === 'all' ? 'transparent' : BRAND_COLORS.slate300
            }}
          >
            All Facilities
          </button>
          <button
            onClick={() => setFilterType('hospital')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex-shrink-0 transition-all border flex items-center gap-2 ${
              filterType === 'hospital'
                ? 'text-white border-transparent'
                : `text-${BRAND_COLORS.slate700} border-${BRAND_COLORS.slate300} bg-white`
            }`}
            style={{
              backgroundColor: filterType === 'hospital' ? BRAND_COLORS.primary : 'white',
              color: filterType === 'hospital' ? 'white' : BRAND_COLORS.slate700,
              borderColor: filterType === 'hospital' ? 'transparent' : BRAND_COLORS.slate300
            }}
          >
            <Building2 className="w-4 h-4" />
            Hospitals
          </button>
          <button
            onClick={() => setFilterType('clinic')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex-shrink-0 transition-all border flex items-center gap-2 ${
              filterType === 'clinic'
                ? 'text-white border-transparent'
                : `text-${BRAND_COLORS.slate700} border-${BRAND_COLORS.slate300} bg-white`
            }`}
            style={{
              backgroundColor: filterType === 'clinic' ? BRAND_COLORS.secondary : 'white',
              color: filterType === 'clinic' ? 'white' : BRAND_COLORS.slate700,
              borderColor: filterType === 'clinic' ? 'transparent' : BRAND_COLORS.slate300
            }}
          >
            <Stethoscope className="w-4 h-4" />
            Clinics
          </button>
          <button
            onClick={() => setFilterType('health-center')}
            className={`px-4 py-2 rounded-lg font-medium text-sm flex-shrink-0 transition-all border flex items-center gap-2 ${
              filterType === 'health-center'
                ? 'text-white border-transparent'
                : `text-${BRAND_COLORS.slate700} border-${BRAND_COLORS.slate300} bg-white`
            }`}
            style={{
              backgroundColor: filterType === 'health-center' ? BRAND_COLORS.success : 'white',
              color: filterType === 'health-center' ? 'white' : BRAND_COLORS.slate700,
              borderColor: filterType === 'health-center' ? 'transparent' : BRAND_COLORS.slate300
            }}
          >
            <Heart className="w-4 h-4" />
            Health Centers
          </button>
        </div>

        {/* Results Count */}
        <p className="text-sm font-medium" style={{ color: BRAND_COLORS.slate600 }}>
          {filteredFacilities.length} {filteredFacilities.length === 1 ? 'facility' : 'facilities'} found
        </p>

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredFacilities.map((facility) => (
              <div key={facility.id} className="bg-white rounded-xl shadow-sm overflow-hidden border transition-all hover:shadow-md"
                style={{ borderColor: BRAND_COLORS.slate300 }}>
                {/* Top Color Bar */}
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

                {/* Content */}
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold" style={{ color: BRAND_COLORS.slate700 }}>
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
                      
                      {/* Type Badge */}
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
                        <span className="text-xs font-semibold" style={{ color: BRAND_COLORS.slate600 }}>
                          {getTypeLabel(facility.type)}
                        </span>
                      </div>

                      {/* Rating & Distance */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1" style={{ color: BRAND_COLORS.slate600 }}>
                          <Star className="w-4 h-4" style={{ color: '#FBBF24', fill: '#FBBF24' }} />
                          <span className="font-semibold">{facility.rating}</span>
                        </div>
                        <div className="flex items-center gap-1" style={{ color: BRAND_COLORS.slate600 }}>
                          <Navigation className="w-4 h-4" />
                          <span className="font-medium">{facility.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-2 mb-4">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: BRAND_COLORS.slate600 }} />
                    <p className="text-sm" style={{ color: BRAND_COLORS.slate600 }}>
                      {facility.address}
                    </p>
                  </div>

                  {/* Services */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold mb-2" style={{ color: BRAND_COLORS.slate600 }}>
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
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ color: BRAND_COLORS.slate600 }}>
                          +{facility.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
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
                        setSelectedFacility(facility);
                        setShowDirections(true);
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
              <div className="bg-white rounded-xl shadow-sm p-12 text-center border" style={{ borderColor: BRAND_COLORS.slate300 }}>
                <div className="inline-block p-4 rounded-full mb-4" style={{ backgroundColor: `${BRAND_COLORS.secondary}15` }}>
                  <Search className="w-8 h-8" style={{ color: BRAND_COLORS.secondary }} />
                </div>
                <p className="font-semibold text-lg mb-2" style={{ color: BRAND_COLORS.slate700 }}>
                  No Facilities Found
                </p>
                <p className="text-sm" style={{ color: BRAND_COLORS.slate600 }}>
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>
        ) : (
          <InteractiveMapView
            facilities={filteredFacilities}
            onSelectFacility={(facility) => {
              setSelectedFacility(facility);
              setShowDirections(true);
            }}
            brandColors={BRAND_COLORS}
          />
        )}

      {/* Real-Time Map Modal with Live Directions */}
      {showDirections && selectedFacility && (
        <DirectionsModal
          facility={selectedFacility}
          onClose={() => {
            setShowDirections(false);
            setSelectedFacility(null);
          }}
          brandColors={BRAND_COLORS}
        />
      )}
      </div>
    </div>
  );
}

// ===================================
// REAL-TIME DIRECTIONS MAP COMPONENT
// ===================================
interface DirectionsModalProps {
  facility: Facility;
  onClose: () => void;
  brandColors: typeof BRAND_COLORS;
}

function DirectionsModal({ facility, onClose, brandColors }: DirectionsModalProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [routeData, setRouteData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Load Leaflet CSS and JS dynamically
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
        document.head.appendChild(link);
      }

      // Add Leaflet JS
      if (!(window as any).L) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
        script.onload = () => {
          initializeMap();
        };
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(userLoc);
            
            // Initialize map
            if (mapContainer.current && !mapRef.current) {
              const L = (window as any).L;
              mapRef.current = L.map(mapContainer.current).setView([userLoc.lat, userLoc.lng], 13);

              // Add OpenStreetMap tiles
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19,
              }).addTo(mapRef.current);

              // Add user marker
              const userMarker = L.marker([userLoc.lat, userLoc.lng], {
                icon: L.icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                })
              }).addTo(mapRef.current);
              userMarker.bindPopup('Your Location');

              // Add facility marker
              const facilityMarker = L.marker([facility.latitude, facility.longitude], {
                icon: L.icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                })
              }).addTo(mapRef.current);
              facilityMarker.bindPopup(facility.name);

              // Fetch directions from OSRM
              fetchDirections(userLoc, facility);
            }
          },
          (error) => {
            console.error('Geolocation error:', error);
            setError('Unable to get your location. Using default coordinates.');
            // Use default Naga City coordinates if geolocation fails
            const defaultLoc = { lat: 13.6192, lng: 123.1814 };
            setUserLocation(defaultLoc);
            initializeDefaultMap(defaultLoc);
          }
        );
      }
    };

    const initializeDefaultMap = (defaultLoc: { lat: number; lng: number }) => {
      if (mapContainer.current && !mapRef.current) {
        const L = (window as any).L;
        mapRef.current = L.map(mapContainer.current).setView([defaultLoc.lat, defaultLoc.lng], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(mapRef.current);

        // Add facility marker
        const facilityMarker = L.marker([facility.latitude, facility.longitude], {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        }).addTo(mapRef.current);
        facilityMarker.bindPopup(facility.name);

        fetchDirections(defaultLoc, facility);
      }
    };

    loadLeaflet();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [facility]);

  const fetchDirections = async (
    startLoc: { lat: number; lng: number },
    destinationFacility: Facility
  ) => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${startLoc.lng},${startLoc.lat};${destinationFacility.longitude},${destinationFacility.latitude}?overview=full&steps=true&geometries=geojson`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        setRouteData({
          distance: (route.distance / 1000).toFixed(1),
          duration: Math.round(route.duration / 60),
          coordinates: route.geometry.coordinates,
        });

        // Draw route on map
        if (mapRef.current) {
          const L = (window as any).L;
          const coordinates = route.geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]);
          
          L.polyline(coordinates, {
            color: '#1D62AF',
            weight: 5,
            opacity: 0.7,
          }).addTo(mapRef.current);

          // Fit bounds
          const latLngs = coordinates;
          const group = new L.FeatureGroup(latLngs.map((latLng: number[]) => L.marker(latLng)));
          mapRef.current.fitBounds(group.getBounds().pad(0.1));
        }
      }

      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching directions:', err);
      setError('Could not load directions');
      setIsLoading(false);
    }
  };

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
                <p style={{ color: brandColors.slate600 }}>Loading map...</p>
              </div>
            </div>
          )}
          <div ref={mapContainer} style={{ width: '100%', height: '100%', minHeight: '400px' }} />
        </div>

        {/* Info & Directions Footer */}
        <div className="p-6 border-t" style={{ borderColor: brandColors.slate300 }}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {routeData && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-xs font-semibold" style={{ color: brandColors.slate600 }}>Distance</p>
                <p className="text-2xl font-bold" style={{ color: brandColors.secondary }}>{routeData.distance} km</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-xs font-semibold" style={{ color: brandColors.slate600 }}>Duration</p>
                <p className="text-2xl font-bold" style={{ color: brandColors.success }}>{routeData.duration} min</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-xs font-semibold" style={{ color: brandColors.slate600 }}>Status</p>
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
              style={{ borderColor: brandColors.slate300, color: brandColors.slate700 }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===================================
// INTERACTIVE MAP VIEW COMPONENT
// ===================================
interface InteractiveMapViewProps {
  facilities: Facility[];
  onSelectFacility: (facility: Facility) => void;
  brandColors: typeof BRAND_COLORS;
}

function InteractiveMapView({ facilities, onSelectFacility, brandColors }: InteractiveMapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<Facility | null>(null);

  useEffect(() => {
    const loadAndInitializeMap = async () => {
      // Load Leaflet CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
        document.head.appendChild(link);
      }

      // Load Leaflet JS
      if (!(window as any).L) {
        return new Promise<void>((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
          script.onload = () => {
            initializeMap();
            resolve();
          };
          document.body.appendChild(script);
        });
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!mapContainer.current || mapRef.current) return;

      const L = (window as any).L;
      let userLoc = { lat: 13.6192, lng: 123.1814 }; // Default Naga City

      // Try to get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            userLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(userLoc);
          },
          () => {
            setUserLocation(userLoc);
          }
        );
      }

      // Initialize map
      mapRef.current = L.map(mapContainer.current).setView([userLoc.lat, userLoc.lng], 12);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Add user location marker
      const userMarker = L.marker([userLoc.lat, userLoc.lng], {
        icon: L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      }).addTo(mapRef.current);
      userMarker.bindPopup('<b>Your Location</b>', { closeButton: true });

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
        }).addTo(mapRef.current);

        const typeLabel = facility.type === 'hospital' ? '🏥 Hospital' : facility.type === 'clinic' ? '⚕️ Clinic' : '💚 Health Center';
        marker.bindPopup(`<b>${facility.name}</b><br>${typeLabel}<br>⭐ ${facility.rating}`, { closeButton: true });

        // Click to select
        marker.on('click', () => {
          setSelectedMarker(facility);
        });
      });

      // Fit bounds to show all facilities
      if (facilities.length > 0) {
        const bounds = L.latLngBounds(facilities.map(f => [f.latitude, f.longitude]));
        mapRef.current.fitBounds(bounds.pad(0.1));
      }

      setIsLoading(false);
    };

    loadAndInitializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [facilities]);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border" style={{ borderColor: brandColors.slate300 }}>
      {/* Map Container */}
      <div className="relative" style={{ height: '500px' }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="text-center">
              <Loader className="w-8 h-8 animate-spin mx-auto mb-3" style={{ color: brandColors.secondary }} />
              <p style={{ color: brandColors.slate600 }}>Loading map...</p>
            </div>
          </div>
        )}
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Selected Facility Info */}
      {selectedMarker && (
        <div className="p-4 border-t" style={{ borderColor: brandColors.slate300 }}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-lg" style={{ color: brandColors.slate700 }}>
                {selectedMarker.name}
              </h3>
              <p className="text-sm" style={{ color: brandColors.slate600 }}>
                {selectedMarker.type === 'hospital' ? '🏥 Hospital' : selectedMarker.type === 'clinic' ? '⚕️ Clinic' : '💚 Health Center'}
              </p>
            </div>
            <button
              onClick={() => setSelectedMarker(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" style={{ color: brandColors.slate600 }} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 rounded" style={{ backgroundColor: `${brandColors.slate300}30` }}>
              <p className="text-xs" style={{ color: brandColors.slate600 }}>Distance</p>
              <p className="font-bold" style={{ color: brandColors.slate700 }}>{selectedMarker.distance}</p>
            </div>
            <div className="text-center p-2 rounded" style={{ backgroundColor: `${brandColors.slate300}30` }}>
              <p className="text-xs" style={{ color: brandColors.slate600 }}>Rating</p>
              <p className="font-bold" style={{ color: brandColors.slate700 }}>⭐ {selectedMarker.rating}</p>
            </div>
            <div className="text-center p-2 rounded" style={{ backgroundColor: `${brandColors.slate300}30` }}>
              <p className="text-xs" style={{ color: brandColors.slate600 }}>Status</p>
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
          style={{ backgroundColor: brandColors.accent }}
        >
          <h4 className="text-sm font-bold mb-3" style={{ color: brandColors.slate700 }}>
            🗺️ FACILITIES ({facilities.length})
          </h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColors.primary }}></div>
              <span className="text-xs font-medium" style={{ color: brandColors.slate600 }}>Hospital</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColors.secondary }}></div>
              <span className="text-xs font-medium" style={{ color: brandColors.slate600 }}>Clinic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: brandColors.success }}></div>
              <span className="text-xs font-medium" style={{ color: brandColors.slate600 }}>Health Center</span>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: brandColors.slate600 }}>
            💡 Click markers to view details and get directions
          </p>
        </div>
      )}
    </div>
  );
}
