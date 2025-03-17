"use client";

import React from "react";
import { BulbOutlined, PoweroffOutlined } from "@ant-design/icons";

const devices = [
  { id: 1, name: "Living Room Light", status: "On" },
  { id: 2, name: "Smart Thermostat", status: "Off" },
  { id: 3, name: "Bedroom Fan", status: "On" },
];

const Devices = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-3xl font-semibold flex items-center">
        <BulbOutlined className="mr-2 text-blue-600" /> Smart Devices
      </h3>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className="p-4 bg-gray-50 shadow-md rounded-md flex justify-between"
          >
            <span>{device.name}</span>
            <button
              className={`px-3 py-1 rounded-md text-white ${
                device.status === "On" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <PoweroffOutlined />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Devices;
