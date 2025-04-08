"use client";

import React, { useState } from "react";

const iotSubscriptionPlans = [
  {
    id: "free",
    name: "Free Plan",
    price: 0,
    features: [
      "Basic Device Monitoring",
      "Mobile App Access",
      "Up to 3 Devices",
      "Community Support",
    ],
    isPopular: false,
  },
  {
    id: "starter",
    name: "Starter Plan",
    price: 9.99,
    features: [
      "Up to 10 Devices",
      "Energy Usage Insights",
      "Basic Automation Scenes",
      "Push Notifications",
    ],
    isPopular: false,
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: 19.99,
    features: [
      "Up to 25 Devices",
      "Advanced Automation Rules",
      "Camera & Security Integration",
      "Priority Support",
    ],
    isPopular: true,
  },
  {
    id: "family",
    name: "Family Plan",
    price: 29.99,
    features: [
      "Up to 50 Devices",
      "Family Profiles",
      "Energy Optimization",
      "Multiple Admin Roles",
    ],
    isPopular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    price: 99.99,
    features: [
      "Unlimited Devices",
      "Custom Automations",
      "Dedicated Account Manager",
      "24/7 Premium Support",
    ],
    isPopular: false,
  },
];

const SubscriptionPlansPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>("free");

  const handleSelectPlan = (id: string) => {
    setSelectedPlan(id);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Choose Your Subscription Plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {iotSubscriptionPlans.map((plan) => (
          <SubscriptionPlanCard
            key={plan.id}
            plan={plan}
            onSelect={handleSelectPlan}
            isSelected={selectedPlan === plan.id}
          />
        ))}
      </div>

      {selectedPlan && (
        <div className="mt-8 text-center">
          <h4 className="text-xl font-semibold">
            You have selected:{" "}
            <span className="text-blue-500">{selectedPlan}</span>
          </h4>
        </div>
      )}
    </div>
  );
};

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

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
      className={`p-6 border rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
        plan.isPopular ? "bg-yellow-100" : "bg-white"
      } ${isSelected ? "border-blue-500" : "border-gray-300"}`}
    >
      <h3 className="text-xl font-semibold">{plan.name}</h3>
      <p className="text-lg text-gray-700 mb-4">
        ${plan.price.toFixed(2)} / month
      </p>
      <ul className="space-y-2 mb-4">
        {plan.features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-600">
            {feature}
          </li>
        ))}
      </ul>
      {plan.isPopular && (
        <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Popular
        </span>
      )}
      <button
        className={`w-full mt-4 py-2 text-white font-semibold rounded-lg ${
          isSelected ? "bg-blue-500" : "bg-green-500"
        }`}
        onClick={() => onSelect(plan.id)}
      >
        {isSelected ? "Selected" : "Choose Plan"}
      </button>
    </div>
  );
};

export default SubscriptionPlansPage;
