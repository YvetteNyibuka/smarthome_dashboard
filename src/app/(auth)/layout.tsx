// components/AuthLayout.tsx
"use client";

import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

const AuthLayout: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.ytimg.com/vi/Gz7ShWaojGc/maxresdefault.jpg')",
      }}
    >
      <div className="w-full max-w-md shadow-lg bg-white  rounded  ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
