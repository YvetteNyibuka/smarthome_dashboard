"use client";

import React, { useState, useEffect } from "react";
import {
  BulbOutlined,
  PoweroffOutlined,
  LockOutlined,
} from "@ant-design/icons";
import PageWithSubscription from "../Subscription/PageHeader";
import { getFromLocalStorage } from "@/app/Config/auth";

interface Device {
  id: number;
  name: string;
  status: "On" | "Off" | "Locked" | "Closed";
  control: boolean;
  lastTurnedOn?: string;
}

const STORAGE_KEY = "smart_devices_status";
const SUBSCRIPTION_KEY = "user_subscription";

const initialDevices: Device[] = [
  { id: 1, name: "Living Room Light", status: "On", control: true },
  { id: 2, name: "Smart Thermostat", status: "Off", control: false },
  { id: 3, name: "Bedroom Fan", status: "On", control: true },
  { id: 4, name: "Kitchen Light", status: "Off", control: true },
  { id: 5, name: "Smart Door Lock", status: "Locked", control: false },
  { id: 6, name: "Garage Door", status: "Closed", control: true },
];

const Devices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const savedPlan = getFromLocalStorage("selectedPlan");
  const [subscription, setSubscription] = useState<string>(savedPlan);

  console.log("Subscription Plan:", subscription);

  // Load devices and subscription from localStorage
  useEffect(() => {
    try {
    if (typeof window === "undefined") return;
      const storedDevices = localStorage.getItem(STORAGE_KEY);
      const storedSubscription = localStorage.getItem(SUBSCRIPTION_KEY);

      setDevices(storedDevices ? JSON.parse(storedDevices) : initialDevices);
      setSubscription(storedSubscription || "basic");
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      setDevices(initialDevices);
    }
  }, []);

  // Save devices to localStorage whenever they change
  useEffect(() => {
    if (devices.length > 0) {
    if (typeof window === "undefined") return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));
    }
  }, [devices]);

  const toggleDevice = (id: number) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id
          ? {
              ...device,
              status: device.status === "On" ? "Off" : "On",
              lastTurnedOn:
                device.status === "Off"
                  ? new Date().toISOString()
                  : device.lastTurnedOn,
            }
          : device
      )
    );
  };

  const getControlStatus = (deviceControl: boolean) => {
    return ["Free", "Starter"].includes(subscription) || deviceControl;
  };

  const formatDateTime = (isoString?: string) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gradient-to-tr from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <PageWithSubscription title="Monitor & Control Your Smart Devices" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {devices.map((device) => (
            <div
              key={device.id}
              className="p-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <BulbOutlined className="text-3xl text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    {device.name}
                  </h3>
                </div>

                <p
                  className={`text-lg font-medium ${
                    device.status === "On"
                      ? "text-green-600"
                      : device.status === "Off"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {device.status}
                </p>

                {device.lastTurnedOn && (
                  <p className="text-sm text-gray-500 mt-2">
                    Last active: {formatDateTime(device.lastTurnedOn)}
                  </p>
                )}
              </div>

              <div className="flex justify-end mt-6">
                {getControlStatus(device.control) ? (
                  <button
                    onClick={() => toggleDevice(device.id)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-white font-semibold ${
                      device.status === "On" ? "bg-green-500" : "bg-red-500"
                    } hover:scale-105 active:scale-95 transition-transform duration-300`}
                  >
                    <PoweroffOutlined className="text-lg" />
                    {device.status === "On" ? "Turn Off" : "Turn On"}
                  </button>
                ) : (
                  <div
                    className="flex items-center justify-center bg-gray-400/70 p-4 rounded-full cursor-not-allowed"
                    title="Upgrade to control"
                  >
                    <LockOutlined className="text-2xl text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Subscription Upgrade */}
        {["Starter", "Free"].includes(subscription) && (
          <div className="mt-16 p-8 bg-blue-100 border border-sky-300 rounded-3xl shadow-md text-center max-w-2xl mx-auto animate-fade-in-up">
            <h4 className="text-2xl font-bold text-sky-700 mb-3">
              Unlock Full Device Control!
            </h4>
            <p className="text-gray-700">
              Your <strong>Basic</strong> plan limits control over some smart
              devices. Upgrade to <strong>Premium</strong> to enjoy unlimited
              access and automation!
            </p>
            <button
              onClick={() => {
                setSubscription("premium");
                localStorage.setItem(SUBSCRIPTION_KEY, "premium");
              }}
              className="mt-6 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full transition-all duration-300"
            >
              Upgrade Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Devices;
