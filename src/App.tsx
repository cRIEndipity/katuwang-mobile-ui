/**
 * KATUWANG - Professional Health Module for MyNaga Super App
 * "Ang Kaagapay Mo sa Kalusugan"
 * Team: TEAM NAGANA
 */

import { useState } from "react"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { Screen } from "./types"
import LoginScreen from "./components/LoginScreen"
import Dashboard from "./components/Dashboard"
import HealthAssistant from "./components/health-assistant/HealthAssistant"
import EmergencyActivation from "./components/emergency/EmergencyActivation"
import EmergencyContacts from "./components/contacts/EmergencyContacts"
import HealthRecords from "./components/health-records/HealthRecords"
import HospitalLocator from "./components/hospitals/HospitalLocator"

function MainApp() {
  const { session, loading } = useAuth()
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard")

  const navigateTo = (screen: Screen) => setCurrentScreen(screen)

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  if (!session) {
    return <LoginScreen onLoginSuccess={() => {}} />
  }

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
  )
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}