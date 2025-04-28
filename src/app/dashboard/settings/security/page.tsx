"use client";

import React, { useState } from "react";
import { Form, Input, Checkbox, Button, Row, Col } from "antd";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [smartHomeSettings, setSmartHomeSettings] = useState({
    autoLock: false,
    motionDetection: false,
    energySaving: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    securityAlerts: {
      newDeviceLogin: false,
      suspiciousActivity: false,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSmartHomeChange = (name: string, checked: boolean) => {
    setSmartHomeSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSecuritySettingsChange = (name: string, checked: boolean) => {
    if (name in securitySettings.securityAlerts) {
      setSecuritySettings((prev) => ({
        ...prev,
        securityAlerts: {
          ...prev.securityAlerts,
          [name]: checked,
        },
      }));
    } else {
      setSecuritySettings((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
        <span className="text-blue-600">Settings</span>
      </h1>

      <div className="space-y-16">
        {/* Profile Settings */}
        <section className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Full Name">
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    placeholder="Full Name"
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email Address">
                  <Input
                    name="email"
                    value={formData.email}
                    placeholder="Email Address"
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Phone Number">
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder="Phone Number"
                    onChange={handleInputChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="text-right">
              <Button type="primary">Save Changes</Button>
            </div>
          </Form>
        </section>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Smart Home Settings */}
        <section className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Smart Home Settings
          </h2>
          <Form layout="vertical">
            {[
              { label: "Auto-lock doors at night", name: "autoLock" },
              { label: "Motion detection alerts", name: "motionDetection" },
              { label: "Energy saving mode", name: "energySaving" },
            ].map(({ label, name }) => (
              <Form.Item key={label} label={label} valuePropName="checked">
                <Checkbox
                //   checked={smartHomeSettings[name]}
                  onChange={(e) =>
                    handleSmartHomeChange(name, e.target.checked)
                  }
                />
              </Form.Item>
            ))}
          </Form>
        </section>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Security Settings */}
        <section className="bg-white p-8 rounded-2xl shadow-lg space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Security Settings
          </h2>

          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Two-Factor Authentication (2FA)
              </h3>
              <p className="text-gray-600 text-sm">
                Enhance your account security with 2FA.
              </p>
            </div>
            <Button
              type="default"
              onClick={() =>
                setSecuritySettings((prev) => ({
                  ...prev,
                  twoFactorEnabled: !prev.twoFactorEnabled,
                }))
              }
            >
              {securitySettings.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
            </Button>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Change Password */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Change Password
            </h3>
            <Form layout="vertical">
              <Form.Item label="Current Password">
                <Input.Password
                  name="currentPassword"
                  value={securitySettings.currentPassword}
                //   onChange={(e) =>
                    // handleSecuritySettingsChange(
                    //   "currentPassword",
                    //   e.target.value
                    // )
                //   }
                  placeholder="Current Password"
                />
              </Form.Item>
              <Form.Item label="New Password">
                <Input.Password
                  name="newPassword"
                  value={securitySettings.newPassword}
                //   onChange={(e) =>
                    // handleSecuritySettingsChange("newPassword", e.target.value)
                //   }
                  placeholder="New Password"
                />
              </Form.Item>
              <Form.Item label="Confirm New Password">
                <Input.Password
                  name="confirmNewPassword"
                  value={securitySettings.confirmNewPassword}
                //   onChange={(e) =>
                    // handleSecuritySettingsChange(
                    //   "confirmNewPassword",
                    //   e.target.value
                    // )
                //   }
                  placeholder="Confirm New Password"
                />
              </Form.Item>
            </Form>
            <div className="text-right">
              <Button type="primary">Update Password</Button>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Security Alerts */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Security Alerts
            </h3>
            <Form layout="vertical">
              {[
                "Alert on new device login",
                "Alert on suspicious activity",
              ].map((label) => (
                <Form.Item key={label} label={label} valuePropName="checked">
                  <Checkbox
                    // checked={
                    //   securitySettings.securityAlerts[label.replace(/\s+/g, "")]
                    // }
                    onChange={(e) =>
                      handleSecuritySettingsChange(
                        label.replace(/\s+/g, ""),
                        e.target.checked
                      )
                    }
                  />
                </Form.Item>
              ))}
            </Form>
          </div>
        </section>
      </div>
    </div>
  );
}
