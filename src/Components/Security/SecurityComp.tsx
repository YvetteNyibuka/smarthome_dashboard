"use client";

import React from "react";
import { VideoCameraOutlined } from "@ant-design/icons";

const Security = () => {
  const cameras = [
    { id: 1, location: "Front Door", status: "Online" },
    { id: 2, location: "Living Room", status: "Offline" },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-3xl font-semibold mb-6 flex items-center">
        <VideoCameraOutlined className="mr-2" /> Security & Cameras
      </h3>
      <ul>
        {cameras.map((cam) => (
          <li key={cam.id}>
            {cam.location} - <span className="font-bold">{cam.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Security;
