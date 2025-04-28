"use client";

import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import PageWithSubscription from "@/Components/Subscription/PageHeader";

// Helper functions for localStorage
const LOCAL_STORAGE_KEY = "automationDevices";

const saveDevicesToLocalStorage = (devices: Device[]) => {
    if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(devices));
};

const loadDevicesFromLocalStorage = (): Device[] => {
  if (typeof window !== "undefined") {
    const storedDevices = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedDevices ? JSON.parse(storedDevices) : initialDevices;
  }
  return initialDevices;
};

// Device Type
type Device = {
  id: number;
  name: string;
  status: boolean;
  lastUpdated: string;
};

// Initial devices (without timestamp)
const initialDevices: Device[] = [
  {
    id: 1,
    name: "Living Room Light",
    status: false,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Smart Thermostat",
    status: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Bedroom Fan",
    status: false,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Kitchen Light",
    status: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Smart Door Lock",
    status: true,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Garage Door",
    status: false,
    lastUpdated: new Date().toISOString(),
  },
];

const AutomationPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const loadedDevices = loadDevicesFromLocalStorage();
    setDevices(loadedDevices);
  }, []);

  const toggleDeviceStatus = (id: number) => {
    const updatedDevices = devices.map((device) =>
      device.id === id
        ? {
            ...device,
            status: !device.status,
            lastUpdated: new Date().toISOString(),
          }
        : device
    );
    setDevices(updatedDevices);
    saveDevicesToLocalStorage(updatedDevices);
  };

  return (
    <div className="container mx-auto px-6 py-10 min-h-screen bg-gradient-to-tr from-gray-50 to-white">
      <PageWithSubscription title="Automation Control" />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {devices.map((device) => (
          <div
            key={device.id}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {device.name}
            </h3>

            <p
              className={`text-base mb-6 font-medium ${
                device.status ? "text-green-500" : "text-red-500"
              }`}
            >
              {device.status ? "Active" : "Inactive"}
            </p>

            <div className="flex flex-col items-center gap-4">
              <Switch
                checked={device.status}
                onChange={() => toggleDeviceStatus(device.id)}
                className="scale-125"
              />
              <button
                onClick={() => toggleDeviceStatus(device.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-md ${
                  device.status
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {device.status ? "Turn Off" : "Turn On"}
              </button>
            </div>

            <div className="mt-6 text-xs text-gray-400">
              Last updated: {new Date(device.lastUpdated).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomationPage;
