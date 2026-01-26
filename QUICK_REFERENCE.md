# KATUWANG Module - Quick Reference Guide

## 📁 Project Structure

```
src/app/
├── components/
│   ├── Dashboard.tsx                    # Patient Main Dashboard
│   ├── ProfessionalDashboard.tsx       # Professional Main Dashboard
│   ├── Telemedicine.tsx                # Doctor Consultation Platform
│   ├── PharmacyDelivery.tsx            # Pharmacy & Medicine Service
│   ├── HealthRecords.tsx               # Medical History Management
│   ├── UserTypeSelection.tsx           # Role Selection Screen
│   ├── ModuleEntry.tsx                 # Navigation Router
│   ├── ProfessionalPatientManagement.tsx # Patient Management System
│   ├── HealthAssistant.tsx             # AI Health Bot (Existing)
│   ├── EmergencyActivation.tsx         # Emergency Alert (Existing)
│   ├── EmergencyContacts.tsx           # Contact Management (Existing)
│   ├── HospitalLocator.tsx             # Hospital Finder (Existing)
│   └── ui/                             # UI Components Library
├── App.tsx                              # Main Application Router
└── main.tsx                             # Entry Point
```

## 🔄 Screen Navigation Map

```
User Opens App
    ↓
UserTypeSelection
    ↓
    ├── "Patient/User"  → ModuleEntry → Dashboard
    │                                     ├── Health Services
    │                                     │   ├── Health Assistant
    │                                     │   ├── Emergency
    │                                     │   └── Find Hospitals
    │                                     └── Medical Services
    │                                         ├── Telemedicine
    │                                         ├── Pharmacy Delivery
    │                                         └── Health Records
    │
    └── "Professional"  → ModuleEntry → ProfessionalDashboard
                                        ├── View Appointments
                                        ├── Patient Management
                                        │   └── View Patient Details
                                        └── Start Consultation
```

## 🎯 Component Use Cases

### For Patients

| Screen | Purpose | Key Features |
|--------|---------|--------------|
| Dashboard | Main hub | Quick access to all services |
| Telemedicine | Book doctors | Search, filter, book appointments |
| Pharmacy | Order medicines | Search, cart, checkout, delivery |
| Health Records | Medical history | View, download, share records |
| Emergency | Alert system | Quick emergency activation |

### For Professionals

| Screen | Purpose | Key Features |
|--------|---------|--------------|
| Professional Dashboard | Overview | Metrics, appointments, actions |
| Patient Management | Patient care | Search, view details, history |
| Telemedicine | Consultations | Video calls with patients |

## 🎨 Color Guide

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary (Naga Coral) | #F7502F | Actions, alerts, warnings |
| Secondary (Fun Blue) | #1D62AF | Main theme, buttons, links |
| Success (Green) | #00A651 | Confirmations, online status |
| Accent (Athens Gray) | #FAFBFC | Backgrounds, surfaces |

## 📦 Component Props Reference

### Dashboard
```typescript
interface DashboardProps {
  onNavigate: (screen: Screen) => void;
  userType?: 'patient' | 'professional' | null;
}
```

### Telemedicine
```typescript
interface TelemedicineProps {
  onNavigate: (screen: Screen) => void;
  userType?: 'patient' | 'professional' | null;
}
```

### PharmacyDelivery
```typescript
interface PharmacyDeliveryProps {
  onNavigate: (screen: Screen) => void;
}
```

### HealthRecords
```typescript
interface HealthRecordsProps {
  onNavigate: (screen: Screen) => void;
}
```

### ProfessionalDashboard
```typescript
interface ProfessionalDashboardProps {
  onNavigate: (screen: Screen) => void;
}
```

### ProfessionalPatientManagement
```typescript
interface ProfessionalPatientManagementProps {
  onNavigate: (screen: Screen) => void;
}
```

## 🔐 Data Types

### Doctor
```typescript
{
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
```

### Medicine
```typescript
{
  id: string;
  name: string;
  strength: string;
  manufacturer: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
  requiresPrescription: boolean;
  description: string;
}
```

### Patient (Professional View)
```typescript
{
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  lastVisit: string;
  conditions: string[];
  phone: string;
  email: string;
  avatar: string;
  status: 'stable' | 'monitoring' | 'urgent';
}
```

## 🚀 Screen Definitions

```typescript
type Screen = 
  | "user-type"
  | "entry"
  | "dashboard"
  | "professional-dashboard"
  | "health-assistant"
  | "emergency"
  | "hospitals"
  | "contacts"
  | "telemedicine"
  | "pharmacy"
  | "health-records"
  | "patient-management";
```

## 💻 Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔗 Important Files to Check

1. **App.tsx** - Main router and screen management
2. **Dashboard.tsx** - Patient interface entry point
3. **ProfessionalDashboard.tsx** - Professional interface entry point
4. **UserTypeSelection.tsx** - Role selection logic

## 📝 Common Customizations

### Add New Service to Dashboard
1. Add button in Dashboard.tsx
2. Create new component with same interface
3. Add screen type to Screen union
4. Add case in App.tsx

### Add New Doctor
Edit the `doctors` array in Telemedicine.tsx

### Add New Medicine
Edit the `medicines` array in PharmacyDelivery.tsx

### Add New Patient (Professional)
Edit the `mockPatients` array in ProfessionalPatientManagement.tsx

## 🐛 Debugging Tips

1. **Navigation not working?**
   - Check onNavigate prop is passed
   - Verify Screen type matches

2. **Styling issues?**
   - Check BRAND_COLORS constants
   - Verify Tailwind classes

3. **Data not displaying?**
   - Check mock data arrays
   - Verify mapping logic

## 📞 Support Features

- 24/7 Health Assistant
- Emergency Hotlines
- Hospital Locator
- Emergency Contacts Management

## ✅ Quality Checklist

- [x] All components created
- [x] Professional styling
- [x] Proper TypeScript types
- [x] Navigation working
- [x] Mock data included
- [x] Error states handled
- [x] Loading states included
- [x] Responsive design
- [x] Brand colors applied
- [x] Both user types supported

---

**Last Updated:** January 25, 2026
**Status:** Production Ready
**Module Version:** 1.0
