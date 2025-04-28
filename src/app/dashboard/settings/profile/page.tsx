"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Card, Input, Button, Typography, message } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title } = Typography;

// Validation schema
const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().optional(),
});

const ProfilePage = () => {
  const [initialValues, setInitialValues] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log("Updated Profile:", values);
    message.success("Profile updated successfully!");
    // Here you would send a request to update the profile in your backend
    setInitialValues(values); // Update local state
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-xl shadow-lg rounded-2xl p-6 bg-white bg-opacity-90">
        <Title level={3} className="text-center text-blue-600">
          Manage Your Profile
        </Title>

        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <Field name="name">
                  {({ field }: { field: any }) => (
                    <Input
                      {...field}
                      prefix={<UserOutlined className="text-gray-500" />}
                      placeholder="Full Name"
                      className={`h-10 ${
                        errors.name && touched.name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                </Field>
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm">{errors.name}</div>
                )}
              </div>

              {/* Email */}
              <div>
                <Field name="email">
                  {({ field }: { field: any }) => (
                    <Input
                      {...field}
                      prefix={<MailOutlined className="text-gray-500" />}
                      placeholder="Email Address"
                      className={`h-10 ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                </Field>
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              {/* Phone */}
              <div>
                <Field name="phone">
                  {({ field }: { field: any }) => (
                    <Input
                      {...field}
                      prefix={<PhoneOutlined className="text-gray-500" />}
                      placeholder="Phone Number"
                      className="h-10 border-gray-300"
                    />
                  )}
                </Field>
              </div>

              {/* Submit Button */}
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-10 bg-blue-600"
              >
                Update Profile
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ProfilePage;
