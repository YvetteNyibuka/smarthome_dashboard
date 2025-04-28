"use client";

import React from "react";
import {
  ThunderboltOutlined,
  DollarCircleOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Progress, Tooltip } from "antd"; // Using Ant Design's Progress and Tooltip

const energyData = {
  todayUsage: 15, // kWh
  monthlyUsage: 350, // kWh
  cost: 20000, // RWF
  totalCapacity: 500, // kWh (for progress bar calculation)
};

const Energy = () => {
  const todayUsagePercent =
    (energyData.todayUsage / energyData.totalCapacity) * 100;
  const monthlyUsagePercent =
    (energyData.monthlyUsage / energyData.totalCapacity) * 100;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 bg-gradient-to-tr from-white via-blue-50 to-white rounded-3xl shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2">
          <ThunderboltOutlined className="text-yellow-500" />
          Energy Monitoring
        </h3>
        <div className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
          <span>Current Plan: </span>
          <strong className="text-blue-600">Premium</strong>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today's Usage */}
        <div className="bg-white hover:shadow-lg transition rounded-xl p-6 text-center flex flex-col items-center">
          <Tooltip title="Energy consumed today">
            <ThunderboltOutlined className="text-yellow-500 text-4xl mb-2" />
          </Tooltip>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Today's Usage
          </h4>
          <p className="text-3xl font-bold text-gray-900">
            {energyData.todayUsage} kWh
          </p>
          <Progress
            percent={parseFloat(todayUsagePercent.toFixed(1))}
            strokeColor={{
              from: "#facc15",
              to: "#fbbf24",
            }}
            status="active"
            className="mt-4 w-full"
            showInfo={false}
          />
        </div>

        {/* Monthly Usage */}
        <div className="bg-white hover:shadow-lg transition rounded-xl p-6 text-center flex flex-col items-center">
          <Tooltip title="Energy consumed this month">
            <LineChartOutlined className="text-blue-500 text-4xl mb-2" />
          </Tooltip>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Monthly Usage
          </h4>
          <p className="text-3xl font-bold text-gray-900">
            {energyData.monthlyUsage} kWh
          </p>
          <Progress
            percent={parseFloat(monthlyUsagePercent.toFixed(1))}
            strokeColor={{
              from: "#3b82f6",
              to: "#60a5fa",
            }}
            status="active"
            className="mt-4 w-full"
            showInfo={false}
          />
        </div>

        {/* Estimated Cost */}
        <div className="bg-white hover:shadow-lg transition rounded-xl p-6 text-center flex flex-col items-center">
          <Tooltip title="Estimated total cost this month">
            <DollarCircleOutlined className="text-green-500 text-4xl mb-2" />
          </Tooltip>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Estimated Cost
          </h4>
          <p className="text-3xl font-bold text-gray-900">
            {energyData.cost.toLocaleString()} RWF
          </p>
          <span className="text-sm text-gray-400 mt-2">as of today</span>
        </div>
      </div>

      {/* Insights Section */}
      <div className="mt-10">
        <h4 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          Insights & Tips
        </h4>
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-600 leading-relaxed">
            Keep track of your energy consumption to make smarter decisions and
            save costs. Your current usage is within the normal range. Consider
            optimizing by using energy-efficient appliances and scheduling heavy
            usage during off-peak hours.
          </p>
          <p className="text-sm text-gray-400 mt-4 italic">
            Tip: Upgrading to smart meters can help track and reduce your energy
            expenses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Energy;
