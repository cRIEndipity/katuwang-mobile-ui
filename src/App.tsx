/**
 * KATUWANG - Professional Health Module for MyNaga Super App
 * "Ang Kaagapay Mo sa Kalusugan"
 * Team: TEAM NAGANA
 */

import { useState } from "react"
import { Screen } from "./types"
import Dashboard from "./components/Dashboard"
import HealthAssistant from "./components/health-assistant/HealthAssistant"
import EmergencyActivation from "./components/emergency/EmergencyActivation"
import EmergencyContacts from "./components/contacts/EmergencyContacts"
import HealthRecords from "./components/health-records/HealthRecords"
import HospitalLocator from "./components/hospitals/HospitalLocator"

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");

  const navigateTo = (screen: Screen) => setCurrentScreen(screen)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md min-h-screen">
        {currentScreen === "dashboard" && (
          <Dashboard
            onNavigate={navigateTo}
            userType="patient"
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

          />
        )}
        {currentScreen === "health-records" && (
          <HealthRecords
            onNavigate={navigateTo}
          />
        )}
      </div>
    </div>
  );
}