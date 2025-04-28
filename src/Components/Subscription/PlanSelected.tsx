import { getFromLocalStorage } from "@/app/Config/auth";
import { iotSubscriptionPlans } from "@/app/dashboard/subscription-plan/page";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CurrentSubscriptionCard: React.FC = () => {
  const savedPlanId = getFromLocalStorage("selectedPlan");
  const currentPlan = iotSubscriptionPlans.find(
    (plan) => plan.id === savedPlanId
  );

  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentPlan) {
    return (
      <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200 text-center max-w-xs mx-auto">
        <h4 className="text-lg font-semibold text-gray-800">No Plan Found</h4>
        <p className="text-sm text-gray-500 mt-2">
          Please select a subscription plan.
        </p>
      </div>
    );
  }

  const isFree = currentPlan.price === 0;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const router = useRouter();
  return (
    <div className="mt- px-6 py-2 flex gap-4 flex-col bg-white rounded-xl shadow-lg  border-gray-200 max-w-lg mx-auto">
      {/* <h4 className="text-xl font-semibold text-gray-800">
        Your Subscription Plan
      </h4> */}

      {/* Plan Status Section */}
      <div className="mt-4 flex gap-4 items-center justify-between">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Current Plan:</span>{" "}
          <strong className="capitalize text-sky-600">
            {currentPlan.name}
          </strong>
        </p>
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            isFree
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {isFree ? "Free" : "Paid"}
        </span>
      </div>

      {/* Price Section */}
      <div className="mt-2 flex gap-4">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Price:</span>{" "}
          <strong
            className={`${isFree ? "text-green-600" : "text-yellow-600"}`}
          >
            {isFree ? "Free" : `${currentPlan.price.toLocaleString()} RWF`}
          </strong>
        </p>
        <div className=" text-center">
          <button
            className="text-sm bg-sky-600 hover:bg-sky-700 font-medium text-white px-2 py-1 rounded-lg cursor-pointer"
            onClick={() => {
              // toggleExpand();
              // if (!isExpanded) {
              router.push("/dashboard/subscription-plan");
              // }
            }}
          >
            {!isExpanded ? "More" : "Less"}
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      {isExpanded && (
        <>
          {/* Included Features Section */}
          <div className="mt-4">
            <h5 className="text-sm font-semibold text-gray-800 mb-2">
              Included Features:
            </h5>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
              {currentPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Free Plan Notice */}
          {isFree && (
            <p className="text-xs text-red-500 mt-4">
              Some features are locked on your current plan. Upgrade to unlock
              more.
            </p>
          )}

          {/* Upgrade Button */}
          {!isFree && (
            <div className="mt-4 flex justify-center">
              <button
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition duration-200"
                onClick={() => alert("Upgrade Now")}
              >
                Upgrade Plan
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurrentSubscriptionCard;
