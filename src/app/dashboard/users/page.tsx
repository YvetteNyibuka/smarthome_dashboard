"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Space, Select, message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const STORAGE_KEY = "users-management";

const UsersManagement = () => {
  const [users, setUsers] = useState<
    { id: number; name: string; email: string; role: string }[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<{
    id: number;
    name: string;
    email: string;
    role: string;
  } | null>(null);

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setUsers(storedUsers);
  }, []);

  // Save users to localStorage
  const saveUsersToLocalStorage = (updatedUsers: typeof users) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  // Handle form submission
  const handleFormSubmit = (values: {
    name: string;
    email: string;
    role: string;
  }) => {
    if (editingUser) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, ...values } : user
      );
      saveUsersToLocalStorage(updatedUsers);
      message.success("User updated successfully!");
    } else {
      const newUser = { id: Date.now(), ...values };
      saveUsersToLocalStorage([...users, newUser]);
      message.success("User added successfully!");
    }
    setIsModalVisible(false);
    setEditingUser(null);
  };

  // Handle delete user
  const handleDelete = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    saveUsersToLocalStorage(updatedUsers);
    message.success("User deleted successfully!");
  };

  // Columns for the Ant Design table
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (
        _: any,
        record: { id: number; name: string; email: string; role: string }
      ) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingUser(record);
              setIsModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Validation schema for the form
  const UserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Role is required"),
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingUser(null);
            setIsModalVisible(true);
          }}
        >
          Add User
        </Button>
      </div>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        className="bg-white shadow-md rounded-lg"
      />
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Formik
          initialValues={{
            name: editingUser?.name || "",
            email: editingUser?.email || "",
            role: editingUser?.role || "User",
          }}
          validationSchema={UserSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <Field name="name">
                  {({ field }: { field: any }) => (
                    <Input
                      {...field}
                      placeholder="Name"
                      className={`h-10 ${
                        errors.name && touched.name ? "border-red-500" : ""
                      }`}
                    />
                  )}
                </Field>
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>
              <div>
                <Field name="email">
                  {({ field }: { field: any }) => (
                    <Input
                      {...field}
                      placeholder="Email"
                      className={`h-10 ${
                        errors.email && touched.email ? "border-red-500" : ""
                      }`}
                    />
                  )}
                </Field>
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>
              <div>
                <label className="block text-gray-700">Role</label>
                <Select
                  defaultValue={editingUser?.role || "User"}
                  onChange={(value) => setFieldValue("role", value)}
                  className={`w-full ${
                    errors.role && touched.role ? "border-red-500" : ""
                  }`}
                >
                  <Option value="Admin">Admin</Option>
                  <Option value="Editor">Editor</Option>
                  <Option value="User">User</Option>
                </Select>
                {errors.role && touched.role && (
                  <div className="text-red-500 text-sm">{errors.role}</div>
                )}
              </div>
              <div className="text-right">
                <Button
                  type="default"
                  onClick={() => setIsModalVisible(false)}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingUser ? "Update" : "Add"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default UsersManagement;
