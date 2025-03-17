"use client";

import React from "react";
import { ThunderboltOutlined } from "@ant-design/icons";

const energyData = {
  todayUsage: "15 kWh",
  monthlyUsage: "350 kWh",
  cost: "$45",
};

const Energy = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-3xl font-semibold mb-6 flex items-center">
        <ThunderboltOutlined className="mr-2" /> Energy Monitoring
      </h3>
      <p>Today's Usage: {energyData.todayUsage}</p>
      <p>Monthly Usage: {energyData.monthlyUsage}</p>
      <p>Estimated Cost: {energyData.cost}</p>
    </div>
  );
};

export default Energy;
