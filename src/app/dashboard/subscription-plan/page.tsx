"use client";

import { getFromLocalStorage, saveToLocalStorage } from "@/app/Config/auth";
import { iotSubscriptionPlans } from "@/app/Config/data";
import React, { useState, useEffect } from "react";

// Subscription plans

const SubscriptionPlansPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const savedPlan = getFromLocalStorage("selectedPlan");
    if (savedPlan) {
      setSelectedPlan(savedPlan);
    } else {
      setSelectedPlan("free");
    }
  }, []);

  const handleSelectPlan = (id: string) => {
    setSelectedPlan(id);
    saveToLocalStorage("selectedPlan", id);
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
