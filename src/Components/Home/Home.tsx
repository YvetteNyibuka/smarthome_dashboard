"use client";

import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const energyData = [
  { day: "Mon", usage: 12 },
  { day: "Tue", usage: 18 },
  { day: "Wed", usage: 24 },
  { day: "Thu", usage: 20 },
  { day: "Fri", usage: 27 },
  { day: "Sat", usage: 30 },
  { day: "Sun", usage: 25 },
];

const Home = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-3xl font-semibold flex items-center">
        <HomeOutlined className="mr-2 text-blue-600" /> Dashboard Overview
      </h3>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 shadow-md rounded-md">
          <h4 className="text-lg font-semibold">Total Devices</h4>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </div>
        <div className="p-4 bg-green-50 border-l-4 border-green-500 shadow-md rounded-md">
          <h4 className="text-lg font-semibold">Active Automations</h4>
          <p className="text-2xl font-bold text-green-600">5</p>
        </div>
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 shadow-md rounded-md">
          <h4 className="text-lg font-semibold">Energy Usage</h4>
          <p className="text-2xl font-bold text-yellow-600">350 kWh</p>
        </div>
      </div>

      <h4 className="text-xl font-semibold mt-8">
        Energy Consumption (Last Week)
      </h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={energyData}>
          <XAxis dataKey="day" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="usage" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Home;
