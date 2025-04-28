// app/login/page.tsx
"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import AuthLayout from "../layout";
import { Notify } from "notiflix";

const { Text } = Typography;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const checkUserCredentials = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );
  };

  const onSubmit = (values: any) => {
    const user = checkUserCredentials(values.email, values.password);
    if (!user) {
      Notify.failure("Invalid email or password.");
      setIsLoading(false);
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    Notify.success("Login successful!");
    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-extrabold text-center text-gray-900 mb-6">
        <span className="text-sky-500">
          Welcome Back — Manage Your Smart Home
        </span>
      </h1>

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
              size="large"
              className="w-full h-10 !bg-sky-500 !rounded-none  hover:!bg-sky-700"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <div className="mt-4 text-center">
        <Text className="text-gray-600">Don't have an account? </Text>
        <a href="/register" className="text-sky-500 font-semibold">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
