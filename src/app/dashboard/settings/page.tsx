import React from "react";

export default function SmartHomeSettings() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
        <span className="text-blue-600">Smart Home Settings</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Management */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Device Management
          </h2>
          <p className="text-gray-600 mb-6">
            Add, remove, or configure your smart devices.
          </p>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Manage Devices
          </button>
        </div>

        {/* Security Settings */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Security Settings
          </h2>
          <p className="text-gray-600 mb-6">
            Manage alarms, access control, and security notifications.
          </p>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Configure Security
          </button>
        </div>

        {/* Energy Management */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Energy Management
          </h2>
          <p className="text-gray-600 mb-6">
            Optimize your home's energy consumption and cost.
          </p>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            View Reports
          </button>
        </div>

        {/* Notification Preferences */}
        <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Notification Preferences
          </h2>
          <p className="text-gray-600 mb-6">
            Set how and when you get notified about activities.
          </p>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Edit Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
