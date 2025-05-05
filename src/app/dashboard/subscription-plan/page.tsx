"use client";

import { getFromLocalStorage, saveToLocalStorage } from "@/app/Config/auth";
import { iotSubscriptionPlans } from "@/app/Config/data";
import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  CreditCardOutlined,
  AppleOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

const SubscriptionPlansPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<string | null>(null);

  useEffect(() => {
    const savedPlan = getFromLocalStorage("selectedPlan");
    if (savedPlan) {
      setSelectedPlan(savedPlan);
    } else {
      setSelectedPlan("free");
    }
  }, []);

  const handleSelectPlan = (id: string) => {
    const selectedPlanDetails = iotSubscriptionPlans.find(
      (plan) => plan.id === id
    );
    if ((selectedPlanDetails?.price ?? 0) > 0) {
      // Show payment modal for paid plans
      setPendingPlan(id);
      setIsPaymentModalVisible(true);
    } else {
      // Directly save free plan
      setSelectedPlan(id);
      saveToLocalStorage("selectedPlan", id);
      message.success("You have successfully subscribed to the free plan!");
    }
  };

  const handlePaymentSubmit = (values: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  }) => {
    saveToLocalStorage("selectedPlan", pendingPlan);
    setSelectedPlan(pendingPlan);
    setPendingPlan(null);
    setIsPaymentModalVisible(false);
    message.success(
      "Payment successful! You have subscribed to the selected plan."
    );
  };

  const selectedPlanName = iotSubscriptionPlans.find(
    (plan) => plan.id === selectedPlan
  )?.name;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 bg-white p-4">
      <div className="mb-12 flex w-full justify-between items-center">
        <h2 className="text-2xl font-bold p-5 text-center text-gray-800">
          Choose Your Subscription Plan
        </h2>

        {selectedPlan && (
          <div className="mt-8 flex justify-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4">
              <h4 className="text-xl font-medium text-gray-700">
                You have subscribed to the{" "}
                <span className="ml-2 font-semibold text-sky-600">
                  {selectedPlanName}
                </span>
              </h4>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {iotSubscriptionPlans.map((plan) => (
          <SubscriptionPlanCard
            key={plan.id}
            plan={plan}
            onSelect={handleSelectPlan}
            isSelected={selectedPlan === plan.id}
          />
        ))}
      </div>

      {/* Payment Modal */}
      <Modal
        title="Payment Information"
        visible={isPaymentModalVisible}
        footer={null}
        onCancel={() => {
          setPendingPlan(null);
          setIsPaymentModalVisible(false);
        }}
      >
        <div className="mb-4 flex justify-center space-x-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="Visa"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
            alt="MasterCard"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Stripe_Logo%2C_revised_2016.svg"
            alt="Stripe"
            className="h-8"
          />
        </div>
        <Formik
          initialValues={{
            cardNumber: "",
            expiryDate: "",
            cvv: "",
          }}
          validationSchema={Yup.object().shape({
            cardNumber: Yup.string()
              .required("Card number is required")
              .matches(/^\d{16}$/, "Card number must be 16 digits"),
            expiryDate: Yup.string()
              .required("Expiry date is required")
              .matches(
                /^(0[1-9]|1[0-2])\/\d{2}$/,
                "Expiry date must be in MM/YY format"
              ),
            cvv: Yup.string()
              .required("CVV is required")
              .matches(/^\d{3}$/, "CVV must be 3 digits"),
          })}
          onSubmit={handlePaymentSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <Field name="cardNumber">
                  {({ field }: { field: any }) => (
                    <Input
                      {...field}
                      placeholder="Card Number"
                      prefix={<CreditCardOutlined />}
                      className={`h-10 ${
                        errors.cardNumber && touched.cardNumber
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  )}
                </Field>
                {errors.cardNumber && touched.cardNumber && (
                  <div className="text-red-500 text-sm">
                    {errors.cardNumber}
                  </div>
                )}
              </div>
              <div>
                <Field name="expiryDate">
                  {({ field }: { field: any }) => (
                    <Input
                      {...field}
                      placeholder="Expiry Date (MM/YY)"
                      className={`h-10 ${
                        errors.expiryDate && touched.expiryDate
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  )}
                </Field>
                {errors.expiryDate && touched.expiryDate && (
                  <div className="text-red-500 text-sm">
                    {errors.expiryDate}
                  </div>
                )}
              </div>
              <div>
                <Field name="cvv">
                  {({ field }: { field: any }) => (
                    <Input
                      {...field}
                      placeholder="CVV"
                      className={`h-10 ${
                        errors.cvv && touched.cvv ? "border-red-500" : ""
                      }`}
                    />
                  )}
                </Field>
                {errors.cvv && touched.cvv && (
                  <div className="text-red-500 text-sm">{errors.cvv}</div>
                )}
              </div>
              <div className="text-right">
                <Button
                  type="default"
                  onClick={() => {
                    setPendingPlan(null);
                    setIsPaymentModalVisible(false);
                  }}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Pay & Subscribe
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

// Plan Type
interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

// Card Component
interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({
  plan,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={`p-6 justify-between flex flex-col border rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
        plan.isPopular ? "bg-yellow-100" : "bg-white"
      } ${isSelected ? "border-sky-500" : "border-gray-300"}`}
    >
      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
      <p className="text-lg text-gray-700 mb-4">
        {plan.price.toFixed(2)} RWF / month
      </p>

      <ul className="space-y-2 mb-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-600">
            • {feature}
          </li>
        ))}
      </ul>

      {plan.isPopular && (
        <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full mb-4">
          Most Popular
        </span>
      )}

      <button
        onClick={() => onSelect(plan.id)}
        className={`w-full mt-4 py-2 font-semibold rounded-lg transition-colors ${
          isSelected
            ? "bg-sky-600 text-white"
            : "bg-green-600 text-white hover:bg-green-600"
        }`}
      >
        {isSelected ? "Current Subscribed" : "Upgrade to"}
      </button>
    </div>
  );
};

export default SubscriptionPlansPage;
