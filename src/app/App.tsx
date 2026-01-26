/**
 * KATUWANG - Professional Health Module for MyNaga Super App
 * "Ang Kaagapay Mo sa Kalusugan"
 * Team: TEAM NAGANA
 *
 * Complete redesign with professional aesthetics and advanced features
 */

import { useState } from "react";
import UserTypeSelection from "./components/UserTypeSelection";
import ModuleEntry from "./components/ModuleEntry";
import Dashboard from "./components/Dashboard";
import HealthAssistant from "./components/HealthAssistant";
import EmergencyActivation from "./components/EmergencyActivation";
import HospitalLocator from "./components/HospitalLocator";
import EmergencyContacts from "./components/EmergencyContacts";
import Telemedicine from "./components/Telemedicine";
import PharmacyDelivery from "./components/PharmacyDelivery";
import HealthRecords from "./components/HealthRecords";
import ProfessionalDashboard from "./components/ProfessionalDashboard";
import ProfessionalPatientManagement from "./components/ProfessionalPatientManagement";
import StartConsultation from "./components/StartConsultation";
import PatientRecords from "./components/PatientRecords";

type Screen =
  | "user-type"
  | "entry"
  | "dashboard"
  | "professional-dashboard"
  | "start-consultation"
  | "health-assistant"
  | "emergency"
  | "hospitals"
  | "contacts"
  | "telemedicine"
  | "pharmacy"
  | "health-records"
  | "patient-management";
type UserType = "patient" | "professional" | null;

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("user-type");
  const [userType, setUserType] = useState<UserType>(null);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setCurrentScreen("entry");
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen("user-type");
    setUserType(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md min-h-screen">
        {currentScreen === "user-type" && (
          <UserTypeSelection 
            onSelect={handleUserTypeSelect}
            onBack={() => {}} 
          />
        )}
        {currentScreen === "entry" && (
          <ModuleEntry
            onNavigate={navigateTo}
            userType={userType}
            onBack={handleBack}
          />
        )}
        {currentScreen === "dashboard" && (
          <Dashboard
            onNavigate={navigateTo}
            userType={userType}
          />
        )}
        {currentScreen === "professional-dashboard" && (
          <ProfessionalDashboard
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === "start-consultation" && (
          <StartConsultation
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === "health-assistant" && (
          <HealthAssistant
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === "emergency" && (
          <EmergencyActivation
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === "hospitals" && (
          <HospitalLocator
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === "contacts" && (
          <EmergencyContacts
            onNavigate={navigateTo}
            userType={userType}
          />
        )}
        {currentScreen === "telemedicine" && (
          <Telemedicine
            onNavigate={navigateTo}
            userType={userType}
          />
        )}
        {currentScreen === "pharmacy" && (
          <PharmacyDelivery
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === "health-records" && (
          <HealthRecords
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === "patient-management" && (
          <ProfessionalPatientManagement
            onNavigate={navigateTo}
          />
        )}
      </div>
    </div>
  );
}