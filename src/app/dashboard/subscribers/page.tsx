"use client";

import React, { useState, useEffect } from "react";
import { Table, Button, message, Tag } from "antd";
import { CloseOutlined, ReloadOutlined } from "@ant-design/icons";

interface Subscriber {
  id: number;
  name: string;
  email: string;
  subscriptionPlan: string;
  paymentStatus: "Paid" | "Due" | "Cancelled";
  subscriptionDate: string; // ISO string
}

const initialSubscribers: Subscriber[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    subscriptionPlan: "Premium",
    paymentStatus: "Paid",
    subscriptionDate: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    subscriptionPlan: "Basic",
    paymentStatus: "Due",
    subscriptionDate: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    subscriptionPlan: "Premium",
    paymentStatus: "Due",
    subscriptionDate: new Date(
      new Date().setDate(new Date().getDate() - 40)
    ).toISOString(), // Last month
  },
];

const SubscribersManagement = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  // Fetch subscribers for the current month
  useEffect(() => {
    const currentMonthSubscribers = initialSubscribers.filter((subscriber) => {
      const subscriptionDate = new Date(subscriber.subscriptionDate);
      const now = new Date();
      return (
        subscriptionDate.getMonth() === now.getMonth() &&
        subscriptionDate.getFullYear() === now.getFullYear()
      );
    });
    setSubscribers(currentMonthSubscribers);
  }, []);

  const handleCancelSubscription = (id: number) => {
    setSubscribers((prev) =>
      prev.map((subscriber) =>
        subscriber.id === id
          ? { ...subscriber, paymentStatus: "Cancelled" }
          : subscriber
      )
    );
    message.success("Subscription marked as cancelled!");
  };

  const handleRenewSubscription = (id: number) => {
    setSubscribers((prev) =>
      prev.map((subscriber) =>
        subscriber.id === id
          ? { ...subscriber, paymentStatus: "Due" }
          : subscriber
      )
    );
    message.success("Subscription renewed successfully!");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subscription Plan",
      dataIndex: "subscriptionPlan",
      key: "subscriptionPlan",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: "Paid" | "Due" | "Cancelled") => {
        let color = "green";
        if (status === "Due") color = "red";
        if (status === "Cancelled") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Subscriber) => (
        <>
          {record.paymentStatus !== "Cancelled" ? (
            <Button
              type="primary"
              danger
              icon={<CloseOutlined />}
              onClick={() => handleCancelSubscription(record.id)}
              disabled={record.paymentStatus === "Paid"}
            >
              Cancel Subscription
            </Button>
          ) : (
            <Button
              type="default"
              icon={<ReloadOutlined />}
              onClick={() => handleRenewSubscription(record.id)}
            >
              Renew Subscription
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Subscribers Management
        </h1>
      </div>
      <Table
        dataSource={subscribers}
        columns={columns}
        rowKey="id"
        className="bg-white shadow-md rounded-lg"
      />
    </div>
  );
};

export default SubscribersManagement;
