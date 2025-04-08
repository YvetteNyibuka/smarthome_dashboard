"use client";

import React, { useState } from "react";
import {
  BulbOutlined,
  PoweroffOutlined,
  LockOutlined,
} from "@ant-design/icons";

const initialDevices = [
  { id: 1, name: "Living Room Light", status: "On", control: true },
  { id: 2, name: "Smart Thermostat", status: "Off", control: false },
  { id: 3, name: "Bedroom Fan", status: "On", control: true },
  { id: 4, name: "Kitchen Light", status: "Off", control: true },
  { id: 5, name: "Smart Door Lock", status: "Locked", control: false },
  { id: 6, name: "Garage Door", status: "Closed", control: true },
];

const userSubscription = "basic"; // Example: "basic", "premium", etc.

const Devices = () => {
  const [devices, setDevices] = useState(initialDevices);

  // Toggle device status
  const toggleDevice = (id: number) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id
          ? { ...device, status: device.status === "On" ? "Off" : "On" }
          : device
      )
    );
  };

  const getControlStatus = (deviceControl: boolean) => {
    // If the user doesn't have a premium subscription, lock some controls
    if (userSubscription === "basic" && !deviceControl) {
      return false; // Lock control for non-premium users on specific devices
    }
    return true;
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-3xl max-w-7xl mx-auto">
      <h3 className="text-4xl font-semibold text-gray-800 flex items-center">
        <BulbOutlined className="mr-4 text-blue-600 text-3xl" /> Smart Devices
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {devices.map((device) => (
          <div
            key={device.id}
            className="p-6 bg-gradient-to-r from-gray-100 to-gray-300 shadow-lg rounded-xl flex justify-between items-center"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-xl text-gray-700">
                {device.name}
              </span>
              <span
                className={`text-md font-medium mt-2 ${
                  device.status === "On"
                    ? "text-green-600"
                    : device.status === "Off"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {device.status}
              </span>
            </div>

            <div className="flex items-center">
              {getControlStatus(device.control) ? (
                <button
                  onClick={() => toggleDevice(device.id)}
                  className={`px-4 py-2 rounded-full text-white text-lg ${
                    device.status === "On" ? "bg-green-500" : "bg-red-500"
                  } hover:opacity-80 transition ease-in-out duration-300`}
                >
                  <PoweroffOutlined className="text-xl" />
                </button>
              ) : (
                <div
                  className="flex items-center justify-center bg-gray-400 p-3 rounded-full cursor-not-allowed"
                  title="Locked"
                >
                  <LockOutlined className="text-xl text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h4 className="text-2xl font-medium text-gray-800">
          Subscription Details
        </h4>
        <p className="text-md text-gray-700 mt-2">
          Your current subscription: <strong>{userSubscription}</strong>
        </p>
        {userSubscription === "basic" && (
          <p className="text-md text-red-500 mt-2">
            Some features are locked for your current subscription. Upgrade to
            Premium to unlock full device control.
          </p>
        )}
      </div>
    </div>
  );
};

export default Devices;
