"use client";

import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  AlertOutlined,
  ThunderboltOutlined,
  HomeOutlined,
  LineChartOutlined,
  ClockCircleOutlined,
  WifiOutlined,
  HeartOutlined,
} from "@ant-design/icons";
// import { useUserContext } from "@/Config/Provider";

const MainDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>({
    totalDevices: 0,
    activeDevices: 0,
    totalAlerts: 0,
    energyConsumption: "-- kWh",
    automationStatus: "0%",
    deviceHealth: "Good",
    systemUptime: "24 days",
    networkStatus: "Stable",
  });

  //   const {
  //     devices,
  //     isLoading,
  //     error,
  //     alerts,
  //     energyUsage,
  //     isLoadingDevices,
  //     isLoadingAlerts,
  //   } = useUserContext();

  //   useEffect(() => {
  //     // Fetch smart home dashboard data
  //     const fetchDashboardData = () => {
  //       const data = {
  //         totalDevices: devices?.length ?? 0,
  //         activeDevices:
  //           devices?.filter((device: any) => device.isOnline).length ?? 0,
  //         totalAlerts: alerts?.length ?? 0,
  //         energyConsumption: energyUsage ?? "-- kWh",
  //         automationStatus: "75%", // Example automation efficiency
  //         deviceHealth: "Good", // Example health status
  //         systemUptime: "24 days", // Example uptime
  //         networkStatus: "Stable", // Example network status
  //       };

  //       setDashboardData(data);
  //     };

  //     fetchDashboardData();
  //   }, [
  //     devices,
  //     isLoading,
  //     error,
  //     alerts,
  //     energyUsage,
  //     isLoadingDevices,
  //     isLoadingAlerts,
  //   ]);

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-2xl max-w-7xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-">
        Smart Home IoT Dashboard
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* Total Devices */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center space-x-6 transition-all hover:shadow-2xl hover:scale-105">
          <div className="w-14 h-14 bg-sky-500 text-white rounded-full flex items-center justify-center">
            <HomeOutlined className="text-3xl" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-700">
              Total Devices
            </h4>
            <p className="text-4xl font-bold text-gray-900">
              {dashboardData.totalDevices || 5}
            </p>
          </div>
        </div>

        {/* Active Devices */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center space-x-6 transition-all hover:shadow-2xl hover:scale-105">
          <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center">
            <ThunderboltOutlined className="text-3xl" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-700">
              Active Devices
            </h4>
            <p className="text-4xl font-bold text-gray-900">
              {dashboardData.activeDevices || 6}
            </p>
          </div>
        </div>

        {/* Total Alerts */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center space-x-6 transition-all hover:shadow-2xl hover:scale-105">
          <div className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center">
            <AlertOutlined className="text-3xl" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-700">
              Total Alerts
            </h4>
            <p className="text-4xl font-bold text-gray-900">
              {dashboardData.totalAlerts || 9}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        {/* Energy Consumption */}
        <div className="bg-white p-8 rounded-2xl shadow-lg transition-all hover:shadow-2xl hover:scale-105">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            Energy Consumption
          </h4>
          <div className="flex items-center space-x-4">
            <LineChartOutlined className="text-3xl text-sky-500" />
            <p className="text-4xl font-bold text-gray-900">
              {dashboardData.energyConsumption || "120 kWh"}
            </p>
          </div>
        </div>

        {/* Automation Status */}
        <div className="bg-white p-8 rounded-2xl shadow-lg transition-all hover:shadow-2xl hover:scale-105">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            Automation Efficiency
          </h4>
          <div className="flex items-center space-x-4">
            <ThunderboltOutlined className="text-3xl text-yellow-500" />
            <p className="text-4xl font-bold text-gray-900">
              {dashboardData.automationStatus || "75%"}
            </p>
          </div>
        </div>
      </div>

      {/* New Components: Device Health, Uptime, and Network Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {/* Device Health */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center space-x-6 transition-all hover:shadow-2xl hover:scale-105">
          <div className="w-14 h-14 bg-teal-500 text-white rounded-full flex items-center justify-center">
            <HeartOutlined className="text-3xl" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-700">
              Device Health
            </h4>
            <p className="text-4xl font-bold text-gray-900">
              {dashboardData.deviceHealth || "Good"}
            </p>
          </div>
        </div>

        {/* System Uptime */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center space-x-6 transition-all hover:shadow-2xl hover:scale-105">
          <div className="w-14 h-14 bg-orange-500 text-white rounded-full flex items-center justify-center">
            <ClockCircleOutlined className="text-3xl" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-700">
              System Uptime
            </h4>
            <p className="text-4xl font-bold text-gray-900">
              {dashboardData.systemUptime || "4 days"}
            </p>
          </div>
        </div>

        {/* Network Status */}
        <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center space-x-6 transition-all hover:shadow-2xl hover:scale-105">
          <div className="w-14 h-14 bg-sky-500 text-white rounded-full flex items-center justify-center">
            <WifiOutlined className="text-3xl" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-700">
              Network Status
            </h4>
            <p className="text-4xl font-bold text-gray-900">
              {dashboardData.networkStatus || "Stable"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button className="bg-sky-600 text-white py-4 px-10 rounded-full text-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
          View Detailed Reports
        </button>
      </div>
    </div>
  );
};

export default MainDashboard;
