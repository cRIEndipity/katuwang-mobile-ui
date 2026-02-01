export interface Facility {
  id: string
  name: string
  type: 'hospital' | 'clinic' | 'health-center'
  address: string
  distance: string
  phone: string
  rating: number
  services: string[]
  latitude: number
  longitude: number
  isOpen: boolean
}

export type FacilityType = 'all' | 'hospital' | 'clinic' | 'health-center'

export const facilities: Facility[] = [
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
]