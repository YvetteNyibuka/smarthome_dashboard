// components/AuthLayout.tsx
"use client";

import React from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children }) => {
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
