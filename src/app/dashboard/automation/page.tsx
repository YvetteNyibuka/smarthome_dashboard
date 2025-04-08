"use client";

import React, { useState } from "react";
import { Switch } from "antd"; // We will use Ant Design's Switch component for toggles

// Example automation devices for illustration
const initialDevices = [
  { id: 1, name: "Living Room Light", status: false },
  { id: 2, name: "Smart Thermostat", status: true },
  { id: 3, name: "Bedroom Fan", status: false },
  { id: 4, name: "Kitchen Light", status: true },
  { id: 5, name: "Smart Door Lock", status: true },
  { id: 6, name: "Garage Door", status: false },
];

const AutomationPage = () => {
  const [devices, setDevices] = useState(initialDevices);

  // Toggle device status function
  const toggleDeviceStatus = (id: number) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id ? { ...device, status: !device.status } : device
      )
    );
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text- text-gray-800 mb-8">
        Automation Management
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              {device.name}
            </h3>

            <div className="mb-4">
              <span
                className={`text-lg ${
                  device.status ? "text-green-500" : "text-red-500"
                }`}
              >
                {device.status ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Switch
                checked={device.status}
                onChange={() => toggleDeviceStatus(device.id)}
                className={`${device.status ? "bg-green-400" : "bg-red-400"}`}
              />
              <span
                className={`${
                  device.status ? "text-green-500" : "text-red-500"
                }`}
              >
                {device.status ? "Turn Off" : "Turn On"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800">
          Subscription Information
        </h3>
        <p className="text-gray-600 mt-2">
          Your current subscription plan: <strong>Premium</strong>
        </p>
        <p className="text-gray-600 mt-2">
          Unlock all features and enjoy full control over your devices with the
          Premium subscription.
        </p>
      </div>
    </div>
  );
};

export default AutomationPage;
