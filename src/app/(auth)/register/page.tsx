// app/register/page.tsx
"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import AuthLayout from "../layout";
import { saveToLocalStorage } from "@/app/Config/auth";
import { Notify } from "notiflix";

const { Text } = Typography;

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const checkEmailExists = (email: string) => {
    // Check if the email already exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.some((user: { email: string }) => user.email === email);
  };

  const saveUserToLocalStorage = (user: {
    email: string;
    password: string;
  }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    // Add the new user to the array
    users.push(user);
    // Save the updated array back to localStorage
    if (typeof window === "undefined") return;
    localStorage.setItem("users", JSON.stringify(users));
  };
  const onSubmit = (values: any) => {
    setIsLoading(true);

    try {
      const emailExists = checkEmailExists(values.email);
      if (emailExists) {
        Notify.failure("Email already exists. Please use a different email.");
        setIsLoading(false);
        return;
      }
      saveUserToLocalStorage(values);
      Notify.success("Registration successful!");
      router.push("/login");
      setIsLoading(false);
    } catch (error) {
      Notify.failure("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="py-8">
        <h1>
          <span className="text-xl  font-bold  text-sky-500">
            Create Your Account and Manage Your Smart Home Effortlessly
          </span>
        </h1>
      </div>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <Field name="fullName">
                {({ field }: { field: any }) => (
                  <Input
                    {...field}
                    prefix={<UserOutlined className="text-gray-500" />}
                    placeholder="Full Name"
                    className={`h-10 ${
                      errors.fullName && touched.fullName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                )}
              </Field>
              {errors.fullName && touched.fullName && (
                <Text type="danger" className="text-sm">
                  {errors.fullName}
                </Text>
              )}
            </div>
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
            <div>
              <Field name="confirmPassword">
                {({ field }: { field: any }) => (
                  <Input.Password
                    {...field}
                    prefix={<LockOutlined className="text-gray-500" />}
                    placeholder="Confirm Password"
                    className={`h-10 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                )}
              </Field>
              {errors.confirmPassword && touched.confirmPassword && (
                <Text type="danger" className="text-sm">
                  {errors.confirmPassword}
                </Text>
              )}
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-10 !bg-sky-500 !rounded-none  hover:!bg-sky-700"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <div className="mt-4 text-center">
        <Text className="text-gray-600">Already have an account? </Text>
        <a href="/login" className="text-sky-500 font-semibold">
          Login
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
