/**
 * KATUWANG - Professional Health Module for MyNaga Super App
 * "Ang Kaagapay Mo sa Kalusugan"
 * Team: TEAM NAGANA
 *
 * Complete redesign with professional aesthetics and advanced features
 */

import { useState } from "react";
import { Screen } from "./types";
import UserTypeSelection from "./components/UserTypeSelection";
import Dashboard from "./components/Dashboard";
import HealthAssistant from "./components/HealthAssistant";
import EmergencyActivation from "./components/EmergencyActivation";
import HospitalLocator from "./components/HospitalLocator";
import EmergencyContacts from "./components/EmergencyContacts";
import HealthRecords from "./components/HealthRecords";




export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("user-type");

  const handleHealthSelect = () => {
    setCurrentScreen("dashboard");
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md min-h-screen">
        {currentScreen === "user-type" && (
          <UserTypeSelection
            onSelect={handleHealthSelect}
          />
        )}
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