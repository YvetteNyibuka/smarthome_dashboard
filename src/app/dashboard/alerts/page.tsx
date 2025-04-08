"use client";
import Devices from "@/Components/Alerts/AlertComp";
import React, { useState } from "react";

// Sample alert data with more realistic alerts
const initialAlerts = [
  {
    id: 1,
    message: "Living Room Light is turned on. Energy usage increased.",
    timestamp: "2025-04-08 10:30 AM",
    read: false,
    type: "Energy",
    severity: "Medium",
  },
  {
    id: 2,
    message:
      "Smart Thermostat is set to 75°F. Optimal temperature for comfort.",
    timestamp: "2025-04-08 11:15 AM",
    read: false,
    type: "Temperature",
    severity: "Low",
  },
  {
    id: 3,
    message: "Garage Door is open. Security concern.",
    timestamp: "2025-04-08 12:00 PM",
    read: true,
    type: "Security",
    severity: "High",
  },
  {
    id: 4,
    message: "Smart Door Lock has been unlocked.",
    timestamp: "2025-04-08 1:30 PM",
    read: false,
    type: "Security",
    severity: "High",
  },
  {
    id: 5,
    message: "Air purifier is turned off. Ensure air quality is optimal.",
    timestamp: "2025-04-08 2:10 PM",
    read: true,
    type: "Air Quality",
    severity: "Low",
  },
  {
    id: 6,
    message: "Living Room Fan is running at maximum speed. Check settings.",
    timestamp: "2025-04-08 3:15 PM",
    read: false,
    type: "Energy",
    severity: "Medium",
  },
];

const AlertsNotificationPagePage = () => {
  const [alerts, setAlerts] = useState(initialAlerts);

  // Mark alert as read
  const handleMarkAsRead = (id: number) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  // Dismiss alert
  const handleDismissAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-r bg-white rounded-xl shadow-xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center">
        <span className="mr-2 text-blue-600">🔔</span> Alerts & Notifications
      </h2>

      {/* Alerts Section */}
      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white p-4 rounded-lg shadow-md flex justify-between items-center ${
                alert.read ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-lg text-gray-800">
                  {alert.message}
                </p>
                <p className="text-sm text-gray-500">{alert.timestamp}</p>
                <p className="text-xs text-gray-400">{`Type: ${alert.type}`}</p>
                <p
                  className={`text-xs ${
                    alert.severity === "High"
                      ? "text-red-600"
                      : alert.severity === "Medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  Severity: {alert.severity}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                {!alert.read && (
                  <button
                    onClick={() => handleMarkAsRead(alert.id)}
                    className="px-4 py-2 text-white bg-blue-600 rounded-md text-sm"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDismissAlert(alert.id)}
                  className="px-4 py-2 text-white bg-red-600 rounded-md text-sm"
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600">
            No new alerts.
          </div>
        )}
      </div>

      {/* Devices Component (from @/Components/Alerts/AlertComp) */}
      <div className="mt-8">{/* <Devices /> */}</div>
    </div>
  );
};

export default AlertsNotificationPagePage;
