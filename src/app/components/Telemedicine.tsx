import { useState } from 'react';
import { ChevronLeft, Video, Calendar, Clock, Star, Search, MapPin, DollarSign, MessageCircle, Phone, Check, AlertCircle } from 'lucide-react';

type Screen = 'telemedicine' | 'dashboard' | 'entry' | 'health-assistant' | 'emergency' | 'hospitals' | 'contacts' | 'pharmacy' | 'health-records' | 'patient-management';

interface TelemedicineProps {
  onNavigate: (screen: Screen) => void;
  userType?: 'patient' | 'professional' | null;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  consultationFee: number;
  availability: string;
  responseTime: string;
  image: string;
  qualifications: string[];
  about: string;
  isOnline: boolean;
}

const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Maria Santos, MD',
    specialization: 'General Medicine',
    rating: 4.8,
    reviews: 245,
    consultationFee: 300,
    availability: 'Available Now',
    responseTime: '< 2 mins',
    image: '👩‍⚕️',
    qualifications: ['MD from UP College of Medicine', '10+ years experience'],
    about: 'Experienced in primary healthcare and preventive medicine.',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Dr. Juan Reyes, MD',
    specialization: 'Pediatrics',
    rating: 4.9,
    reviews: 189,
    consultationFee: 350,
    availability: 'Available in 30 mins',
    responseTime: '< 5 mins',
    image: '👨‍⚕️',
    qualifications: ['MD from Ateneo University', 'Pediatrics Fellow'],
    about: 'Specialized in child healthcare and development.',
    isOnline: false,
  },
  {
    id: '3',
    name: 'Dr. Rosa Cruz, MD',
    specialization: 'Cardiology',
    rating: 4.7,
    reviews: 312,
    consultationFee: 500,
    availability: 'Available Now',
    responseTime: '< 3 mins',
    image: '👩‍⚕️',
    qualifications: ['MD from De La Salle University', 'Cardiology Specialist'],
    about: 'Expert in heart and cardiovascular health management.',
    isOnline: true,
  },
];

const BRAND_COLORS = {
  primary: '#F7502F',      // Naga Coral
  secondary: '#1D62AF',    // Fun Blue
  success: '#00A651',      // Success Green
  background: '#FAFBFC',   // Athens Gray
  textDark: '#1A202C',
  textMid: '#4A5568',
  textLight: '#718096',
  border: '#E2E8F0',
};

export default function Telemedicine({ onNavigate, userType }: TelemedicineProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedDoctor) {
      setBookingConfirmed(true);
      setTimeout(() => {
        setBookingConfirmed(false);
        setShowBooking(false);
        setSelectedDate('');
        setSelectedTime('');
        setSelectedDoctor(null);
        setSearchTerm('');
      }, 2500);
    }
  };

  const handleBackToDoctors = () => {
    setShowBooking(false);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleBackToDashboard = () => {
    setShowBooking(false);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setSearchTerm('');
    onNavigate('dashboard');
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: BRAND_COLORS.background }}>
        <div className="text-center px-6">
          <div className="bg-white rounded-3xl p-8 shadow-2xl mx-auto w-full max-w-sm border-2" style={{ borderColor: BRAND_COLORS.border }}>
            <div className="flex justify-center mb-6">
              <div className="rounded-full p-4 animate-bounce" style={{ backgroundColor: `${BRAND_COLORS.success}20` }}>
                <Check className="w-16 h-16" style={{ color: BRAND_COLORS.success }} strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: BRAND_COLORS.textDark }}>Booking Confirmed!</h2>
            <div className="bg-blue-50 rounded-xl p-4 mb-6 border-l-4" style={{ borderColor: BRAND_COLORS.secondary }}>
              <p className="text-gray-700 font-semibold mb-2">Appointment Details</p>
              <p className="text-sm mb-1" style={{ color: BRAND_COLORS.textMid }}>{selectedDoctor?.name}</p>
              <p className="text-sm mb-2" style={{ color: BRAND_COLORS.textMid }}>{selectedDoctor?.specialization}</p>
              <p className="font-bold" style={{ color: BRAND_COLORS.secondary }}>
                {selectedDate} at {selectedTime}
              </p>
            </div>
            <p className="text-gray-600 mb-3">A confirmation link has been sent to your email.</p>
            <p className="text-sm text-gray-500 mb-6">
              You will receive a link to join the video call 10 minutes before your appointment.
            </p>
            <button
              onClick={handleBackToDashboard}
              className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:shadow-lg"
              style={{ backgroundColor: BRAND_COLORS.secondary }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND_COLORS.background }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm" style={{ borderColor: BRAND_COLORS.border }}>
        <div className="p-6">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 mb-4 font-semibold hover:opacity-80 transition-opacity"
            style={{ color: BRAND_COLORS.secondary }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold" style={{ color: BRAND_COLORS.textDark }}>Telemedicine Consultation</h1>
          <p className="text-sm mt-2" style={{ color: BRAND_COLORS.textMid }}>Connect with qualified doctors online</p>
        </div>
      </div>

      <div className="p-6 space-y-6 pb-20">
        {!showBooking ? (
          <>
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-4 w-5 h-5" style={{ color: BRAND_COLORS.textLight }} />
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all"
                style={{ borderColor: BRAND_COLORS.border, '--tw-ring-color': BRAND_COLORS.secondary } as any}
              />
            </div>

            {/* Available Doctors */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold px-2" style={{ color: BRAND_COLORS.textDark }}>Available Doctors</h2>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white rounded-2xl shadow-md p-6 border-2 overflow-hidden hover:shadow-lg transition-all" style={{ borderColor: BRAND_COLORS.border }}>
                    <div className="flex gap-4 mb-4">
                      <div className="text-5xl flex-shrink-0">{doctor.image}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg" style={{ color: BRAND_COLORS.textDark }}>{doctor.name}</h3>
                        <p className="text-sm mb-2" style={{ color: BRAND_COLORS.textMid }}>{doctor.specialization}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400" style={{ color: '#FBBF24' }} strokeWidth={0} />
                            ))}
                          </div>
                          <span className="text-sm" style={{ color: BRAND_COLORS.textMid }}>{doctor.rating} ({doctor.reviews} reviews)</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                          <div className="flex items-center gap-2" style={{ color: BRAND_COLORS.textMid }}>
                            <Clock className="w-4 h-4" />
                            <span>{doctor.responseTime}</span>
                          </div>
                          <div className="flex items-center gap-2" style={{ color: BRAND_COLORS.primary }}>
                            <DollarSign className="w-4 h-4" />
                            <span>₱{doctor.consultationFee}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: doctor.isOnline ? `${BRAND_COLORS.success}20` : `${BRAND_COLORS.textLight}20`, color: doctor.isOnline ? BRAND_COLORS.success : BRAND_COLORS.textMid }}>
                            {doctor.isOnline ? '● Online' : '● Offline'}
                          </span>
                          <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: `${BRAND_COLORS.secondary}20`, color: BRAND_COLORS.secondary }}>
                            {doctor.availability}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex gap-2" style={{ borderColor: BRAND_COLORS.border }}>
                      <button
                        onClick={() => handleSelectDoctor(doctor)}
                        className="flex-1 py-3 rounded-xl text-white font-bold transition-all hover:shadow-lg active:scale-[0.98]"
                        style={{ backgroundColor: BRAND_COLORS.secondary }}
                      >
                        <Video className="w-4 h-4 inline mr-2" />
                        Book Now
                      </button>
                      <button
                        className="flex-1 py-3 rounded-xl border-2 font-bold transition-all hover:opacity-80 active:scale-[0.98]"
                        style={{ borderColor: BRAND_COLORS.border, color: BRAND_COLORS.secondary }}
                      >
                        <MessageCircle className="w-4 h-4 inline mr-2" />
                        Message
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4" style={{ color: BRAND_COLORS.textLight }} />
                  <p className="text-lg font-semibold" style={{ color: BRAND_COLORS.textMid }}>No doctors found</p>
                  <p className="text-sm mt-2" style={{ color: BRAND_COLORS.textLight }}>Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Booking Form */
          <div className="space-y-6">
            <button
              onClick={handleBackToDoctors}
              className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity"
              style={{ color: BRAND_COLORS.secondary }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Doctors</span>
            </button>

            {selectedDoctor && (
              <>
                {/* Doctor Info Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 border-2" style={{ borderColor: BRAND_COLORS.secondary, borderLeftWidth: '8px' }}>
                  <div className="flex gap-4 mb-4">
                    <div className="text-6xl">{selectedDoctor.image}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold" style={{ color: BRAND_COLORS.textDark }}>{selectedDoctor.name}</h3>
                      <p className="font-semibold" style={{ color: BRAND_COLORS.textMid }}>{selectedDoctor.specialization}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400" style={{ color: '#FBBF24' }} strokeWidth={0} />
                        ))}
                        <span className="text-sm" style={{ color: BRAND_COLORS.textMid }}>({selectedDoctor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t" style={{ borderColor: BRAND_COLORS.border }}>
                    <p className="text-sm mb-2" style={{ color: BRAND_COLORS.textMid }}>{selectedDoctor.about}</p>
                    <p className="text-xs font-semibold mb-3" style={{ color: BRAND_COLORS.textLight }}>Qualifications:</p>
                    <ul className="text-sm space-y-1">
                      {selectedDoctor.qualifications.map((qual, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span style={{ color: BRAND_COLORS.success }}>✓</span>
                          <span style={{ color: BRAND_COLORS.textMid }}>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="bg-white rounded-2xl shadow-md p-6 border-2 space-y-5" style={{ borderColor: BRAND_COLORS.border }}>
                  <h3 className="text-xl font-bold" style={{ color: BRAND_COLORS.textDark }}>Schedule Your Consultation</h3>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-bold mb-3" style={{ color: BRAND_COLORS.textDark }}>
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Select Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all font-semibold"
                      style={{ borderColor: BRAND_COLORS.border, color: selectedDate ? BRAND_COLORS.textDark : BRAND_COLORS.textLight }}
                    >
                      <option value="">📅 Choose a date...</option>
                      <option value="Tomorrow, Jan 26">Tomorrow, Jan 26</option>
                      <option value="Jan 27, 2026">Jan 27, 2026</option>
                      <option value="Jan 28, 2026">Jan 28, 2026</option>
                      <option value="Jan 29, 2026">Jan 29, 2026</option>
                      <option value="Jan 30, 2026">Jan 30, 2026</option>
                    </select>
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-bold mb-3" style={{ color: BRAND_COLORS.textDark }}>
                      <Clock className="w-4 h-4 inline mr-2" />
                      Select Time
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all font-semibold"
                      style={{ borderColor: BRAND_COLORS.border, color: selectedTime ? BRAND_COLORS.textDark : BRAND_COLORS.textLight }}
                    >
                      <option value="">🕐 Choose a time...</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>

                  {/* Summary */}
                  <div className="rounded-xl p-5 space-y-3" style={{ backgroundColor: `${BRAND_COLORS.secondary}10`, borderLeft: `4px solid ${BRAND_COLORS.secondary}` }}>
                    <h4 className="font-bold" style={{ color: BRAND_COLORS.textDark }}>Consultation Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span style={{ color: BRAND_COLORS.textMid }}>Doctor</span>
                        <span className="font-semibold" style={{ color: BRAND_COLORS.textDark }}>{selectedDoctor.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: BRAND_COLORS.textMid }}>Type</span>
                        <span className="font-semibold" style={{ color: BRAND_COLORS.textDark }}>Video Consultation</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t" style={{ borderColor: BRAND_COLORS.border }}>
                        <span style={{ color: BRAND_COLORS.textMid }}>Consultation Fee</span>
                        <span className="font-bold" style={{ color: BRAND_COLORS.primary }}>₱{selectedDoctor.consultationFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: BRAND_COLORS.textMid }}>Duration</span>
                        <span className="font-semibold" style={{ color: BRAND_COLORS.textDark }}>30 minutes</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t text-base" style={{ borderColor: BRAND_COLORS.border }}>
                        <span className="font-bold" style={{ color: BRAND_COLORS.textDark }}>Total Amount</span>
                        <span className="font-bold text-lg" style={{ color: BRAND_COLORS.success }}>₱{selectedDoctor.consultationFee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: selectedDate && selectedTime ? BRAND_COLORS.secondary : BRAND_COLORS.textLight }}
                  >
                    {selectedDate && selectedTime ? '✓ Confirm Booking' : 'Select Date & Time'}
                  </button>

                  <p className="text-xs text-center" style={{ color: BRAND_COLORS.textLight }}>
                    You can cancel up to 2 hours before the appointment
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
