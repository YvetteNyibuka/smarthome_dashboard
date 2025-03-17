"use client";

import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  AlertOutlined,
  ThunderboltOutlined,
  HomeOutlined,
} from "@ant-design/icons";
// import { useUserContext } from "@/Config/Provider";

const MainDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>({});

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
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-3xl font-semibold mb-6">Smart Home IoT Dashboard</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Devices */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              <HomeOutlined className="text-xl" />
            </div>
            <h4 className="ml-4 text-xl font-semibold">Total Devices</h4>
          </div>
          <p className="text-2xl font-bold">
            {dashboardData.totalDevices || 25}
          </p>
        </div>

        {/* Active Devices */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
              <ThunderboltOutlined className="text-xl" />
            </div>
            <h4 className="ml-4 text-xl font-semibold">Active Devices</h4>
          </div>
          <p className="text-2xl font-bold">
            {dashboardData.activeDevices || 88}
          </p>
        </div>

        {/* Total Alerts */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center">
              <AlertOutlined className="text-xl" />
            </div>
            <h4 className="ml-4 text-xl font-semibold">Total Alerts</h4>
          </div>
          <p className="text-2xl font-bold">
            {dashboardData.totalAlerts || 19}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {/* Energy Consumption */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h4 className="text-xl font-semibold mb-4">Energy Consumption</h4>
          <p className="text-2xl font-bold">
            {dashboardData.energyConsumption || 120}%
          </p>
        </div>

        {/* Automation Status */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h4 className="text-xl font-semibold mb-4">Automation Efficiency</h4>
          <p className="text-2xl font-bold">
            {dashboardData.automationStatus || 5}
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          View Detailed Reports
        </button>
      </div>
    </div>
  );
};

export default MainDashboard;
