"use client";

import React, { useState, useEffect } from "react";
import {
  BulbOutlined,
  PoweroffOutlined,
  LockOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import PageWithSubscription from "../Subscription/PageHeader";
import { getFromLocalStorage } from "@/app/Config/auth";
import { Modal, Input, Button, message } from "antd";

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
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // Simulating admin access
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newDevice, setNewDevice] = useState<{
    name: string;
    control: boolean;
  }>({
    name: "",
    control: true,
  });

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

  const handleAddDevice = () => {
    if (!newDevice.name.trim()) {
      message.error("Device name is required!");
      return;
    }

    const newDeviceEntry: Device = {
      id: Date.now(),
      name: newDevice.name,
      status: "Off",
      control: newDevice.control,
    };

    setDevices((prev) => [...prev, newDeviceEntry]);
    setNewDevice({ name: "", control: true });
    setIsModalVisible(false);
    message.success("Device added successfully!");
  };

  const handleDeleteDevice = (id: number) => {
    setDevices((prev) => prev.filter((device) => device.id !== id));
    message.success("Device deleted successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen bg-gradient-to-tr from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <PageWithSubscription title="Monitor & Control Your Smart Devices" />

        {/* Admin Panel */}
        {isAdmin && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Manage Devices</h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              Add Device
            </Button>
          </div>
        )}

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

              <div className="flex justify-between mt-6">
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

                {isAdmin && (
                  <button
                    onClick={() => handleDeleteDevice(device.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:scale-105 active:scale-95 transition-transform duration-300"
                  >
                    <DeleteOutlined className="text-lg" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Device Modal */}
        <Modal
          title="Add New Device"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <div className="space-y-4">
            <Input
              placeholder="Device Name"
              value={newDevice.name}
              onChange={(e) =>
                setNewDevice({ ...newDevice, name: e.target.value })
              }
            />
            <div className="flex items-center gap-4">
              <label className="font-medium text-gray-700">Control:</label>
              <select
                value={newDevice.control ? "true" : "false"}
                onChange={(e) =>
                  setNewDevice({
                    ...newDevice,
                    control: e.target.value === "true",
                  })
                }
                className="border rounded-md px-3 py-2"
              >
                <option value="true">Enabled</option>
                <option value="false">Disabled</option>
              </select>
            </div>
            <div className="text-right">
              <Button onClick={() => setIsModalVisible(false)} className="mr-2">
                Cancel
              </Button>
              <Button type="primary" onClick={handleAddDevice}>
                Add Device
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Devices;
