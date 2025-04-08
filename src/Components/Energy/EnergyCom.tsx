"use client";

import React from "react";
import { ThunderboltOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { Progress } from "antd"; // Using Ant Design's Progress bar for visual usage

const energyData = {
  todayUsage: 15, // kWh
  monthlyUsage: 350, // kWh
  cost: 20000, // $
  totalCapacity: 500, // kWh (example for progress bar calculation)
};

const Energy = () => {
  const usagePercentage =
    (energyData.todayUsage / energyData.totalCapacity) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r bg-white rounded-xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-semibold text-gray-800 flex items-center">
          <ThunderboltOutlined className="mr-2 text-yellow-500" />
          Energy Monitoring
        </h3>
        <div className="text-sm text-gray-500">
          <p>
            Current Plan: <strong>Premium</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today's Usage */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Today's Usage
          </h4>
          <p className="text-2xl font-bold text-gray-800">
            {energyData.todayUsage} kWh
          </p>
          <Progress
            percent={usagePercentage}
            strokeColor="yellow"
            showInfo={false}
            className="mt-4"
          />
        </div>

        {/* Monthly Usage */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Monthly Usage
          </h4>
          <p className="text-2xl font-bold text-gray-800">
            {energyData.monthlyUsage} kWh
          </p>
          <Progress
            percent={(energyData.monthlyUsage / energyData.totalCapacity) * 100}
            strokeColor="blue"
            showInfo={false}
            className="mt-4"
          />
        </div>

        {/* Estimated Cost */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            Estimated Cost
          </h4>
          <p className="text-2xl font-bold text-gray-800">
            {energyData.cost} RWF
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          Energy Insights
        </h4>
        <p className="text-gray-600">
          Keep track of your energy consumption to make smarter decisions about
          your usage. Your current consumption is within the normal range, but
          consider optimizing for better savings.
        </p>
      </div>
    </div>
  );
};

export default Energy;
