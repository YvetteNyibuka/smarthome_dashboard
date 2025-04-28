import React from "react";
import { FaCog, FaSyncAlt } from "react-icons/fa";
import CurrentSubscriptionCard from "./PlanSelected";

// PageHeader Component
const PageHeader: React.FC<{
  title: string;
  onSettingsClick: () => void;
  onRefreshClick: () => void;
}> = ({ title, onSettingsClick, onRefreshClick }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 my-6 bg-white rounded-2xl shadow-sm">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

      {/* Right side: Subscription + Actions */}
      <div className="flex items-center gap-4">
        {/* Current Subscription */}
        <CurrentSubscriptionCard />

        {/* Action buttons */}
        {/* <div className="flex items-center gap-3">
          <button
            onClick={onRefreshClick}
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
            title="Refresh"
          >
            <FaSyncAlt className="w-5 h-5" />
          </button>

          <button
            onClick={onSettingsClick}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            title="Settings"
          >
            <FaCog className="w-5 h-5" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

// Main PageWithSubscription Component
const PageWithSubscription: React.FC<{ title: string }> = ({ title }) => {
  const handleSettingsClick = () => {
    alert("Settings clicked");
  };

  const handleRefreshClick = () => {
    alert("Refresh clicked");
  };

  return (
    <div className="w-full">
      <PageHeader
        title={title || "Smart Home Dashboard"}
        onSettingsClick={handleSettingsClick}
        onRefreshClick={handleRefreshClick}
      />
    </div>
  );
};

export default PageWithSubscription;
