"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();

  const onSubmit = (values: any) => {
    console.log(values);
    router.push("/dashboard");
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-100 p-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.ytimg.com/vi/Gz7ShWaojGc/maxresdefault.jpg')",
      }}
    >
      <Card className="w-full max-w-md shadow-lg rounded-2xl p-6 bg-white bg-opacity-90">
        <Title level={3} className="text-center text-blue-600">
          Smart home dashboard
        </Title>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <Field name="email">
                  {({ field }: { field: any }) => (
                    <Input
                      {...field}
                      prefix={<UserOutlined className="text-gray-500" />}
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
                  <Text type="danger" className="text-sm">
                    {errors.email}
                  </Text>
                )}
              </div>
              <div>
                <Field name="password">
                  {({ field }: { field: any }) => (
                    <Input.Password
                      {...field}
                      prefix={<LockOutlined className="text-gray-500" />}
                      placeholder="Password"
                      className={`h-10 ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                </Field>
                {errors.password && touched.password && (
                  <Text type="danger" className="text-sm">
                    {errors.password}
                  </Text>
                )}
              </div>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-10 bg-blue-600"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <Text className="text-gray-600">Don't have an account? </Text>
          <a href="/register" className="text-blue-600 font-semibold">
            Sign up
          </a>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
