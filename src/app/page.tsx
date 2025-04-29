"use client";

import React from "react";
import Link from "next/link";
import {
  ThunderboltOutlined,
  LockOutlined,
  WifiOutlined,
} from "@ant-design/icons";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 to-white px-6 py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Hero content */}
        <div className="flex-1">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Monitor & Control Your{" "}
            <span className="text-sky-600">Smart Home</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Real-time monitoring of your smart devices, energy usage, and
            automation from one intuitive dashboard.
          </p>
          <div className="flex gap-4">
            <Link href="/login">
              <button className="bg-sky-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-sky-700 transition-all shadow-md">
                Log In
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-white border border-sky-600 text-sky-600 px-6 py-3 rounded-full font-semibold hover:bg-sky-50 transition-all">
                Register
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Hero Image / Mockup */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://blog.switch-bot.com/wp-content/uploads/2022/08/smart-home.jpg"
            alt="Smart Home Dashboard"
            className="w-full max-w-md rounded-3xl shadow-xl"
          />
        </div>
      </div>

      {/* Features */}
      <section className="mt-24 max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all">
          <WifiOutlined className="!text-sky-500 text-4xl mb-4" />
          <h3 className="text-xl text-sky-600 font-semibold mb-2">
            Connected Devices
          </h3>
          <p className="text-gray-600">
            Instantly monitor the status of all connected devices in your home.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all">
          <ThunderboltOutlined className="!text-yellow-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold text-sky-600  mb-2">
            Energy Usage
          </h3>
          <p className="text-gray-600">
            Analyze and optimize energy consumption to reduce costs.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all">
          <LockOutlined className="!text-red-500 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-sky-600 ">
            Security Alerts
          </h3>
          <p className="text-gray-600">
            Get notified of potential issues or intrusions in real-time.
          </p>
        </div>
      </section>

      {/* CTA */}
    </main>
  );
};

export default HomePage;
