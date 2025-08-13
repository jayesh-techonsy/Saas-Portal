// import React from "react";
// import {
//   FaRegCalendarAlt,
//   FaRegCheckCircle,
//   FaRegTimesCircle,
//   FaMoneyBillWave,
//   FaRegIdBadge,
//   FaUsersCog,
//   FaTruckMoving,
//   FaSearchLocation,
// } from "react-icons/fa";

// const SubscriptionCard = ({ subscription }) => {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//         <FaRegIdBadge className="text-indigo-500" />
//         Subscription
//       </h2>

//       {subscription && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-4 text-sm text-gray-700">
//             <div className="flex items-center gap-2">
//               <FaRegIdBadge className="text-indigo-400" />
//               <p className="text-base">
//                 <strong>Plan:</strong> {subscription.plan_name}
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               <FaRegCalendarAlt className="text-blue-400" />
//               <p className="text-base">
//                 <strong>Start Date:</strong> {subscription.start_date}
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               <FaRegCalendarAlt className="text-rose-400" />
//               <p className="text-base">
//                 <strong>End Date:</strong> {subscription.end_date}
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               {subscription.status === "Active" ? (
//                 <FaRegCheckCircle className="text-green-500" />
//               ) : (
//                 <FaRegTimesCircle className="text-red-500" />
//               )}
//               <p className="text-base">
//                 <strong>Status:</strong>{" "}
//                 <span
//                   className={`font-semibold ${
//                     subscription.status === "Active"
//                       ? "text-green-600"
//                       : "text-red-600"
//                   }`}
//                 >
//                   {subscription.status}
//                 </span>
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               <FaMoneyBillWave className="text-yellow-500" />
//               <p className="text-base">
//                 <strong>Price:</strong> ₹ {subscription.price}
//               </p>
//             </div>
//           </div>

//           <div className="space-y-3">
//             <h3 className="text-lg font-semibold text-gray-700 mb-1">
//               Plan Features
//             </h3>
//             <div className="flex items-center gap-2 text-gray-600">
//               <FaUsersCog className="text-indigo-500" />
//               <span>HRMS</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-600">
//               <FaTruckMoving className="text-green-500" />
//               <span>Fleet Management</span>
//             </div>
//             <div className="flex items-center gap-2 text-gray-600">
//               <FaSearchLocation className="text-pink-500" />
//               <span>Wassal Scraping</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubscriptionCard;

import React, { useState } from "react";
import {
  FaRegCalendarAlt,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaMoneyBillWave,
  FaRegIdBadge,
  FaUsersCog,
  FaTruckMoving,
  FaSearchLocation,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const SubscriptionCard = ({ subscription, siteId, fetchSiteDetails }) => {
  const [showUpgradeOptions, setShowUpgradeOptions] = useState(false);
  const [upgradePlans, setUpgradePlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpgradeClick = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/wallets/plans`);
      const plans = res.data.plans || [];
      const upgrades = plans.filter((plan) => plan.price > subscription.price);
      setUpgradePlans(upgrades);
      setShowUpgradeOptions(!showUpgradeOptions);
    } catch (err) {
      toast.error("Failed to fetch upgrade plans");
    } finally {
      setLoading(false);
    }
  };

  const calculateUpgradeCost = (newPlan) => {
    const oldPrice = subscription.price;
    const start = new Date(subscription.start_date);
    const end = new Date(subscription.end_date);
    const today = new Date();
    const totalDays = (end - start) / (1000 * 60 * 60 * 24);
    const usedDays = (today - start) / (1000 * 60 * 60 * 24);
    const remainingValue = ((totalDays - usedDays) / totalDays) * oldPrice;
    return Math.max(0, Math.round(newPlan.price - remainingValue));
  };

  const handleUpgradeConfirm = async (planId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/wallets/${siteId}/subscribe`,
        { plan_name: planId }
      );
      toast.success("Plan upgraded successfully");
      setShowUpgradeOptions(false);
      await fetchSiteDetails();
    } catch (err) {
      toast.error("Upgrade failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaRegIdBadge className="text-indigo-500" />
        Subscription
      </h2>

      {subscription && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FaRegIdBadge className="text-indigo-400" />
              <p className="text-base">
                <strong>Plan:</strong> {subscription.plan_name}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <FaRegCalendarAlt className="text-blue-400" />
              <p className="text-base">
                <strong>Start Date:</strong> {subscription.start_date}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <FaRegCalendarAlt className="text-rose-400" />
              <p className="text-base">
                <strong>End Date:</strong> {subscription.end_date}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {subscription.status === "Active" ? (
                <FaRegCheckCircle className="text-green-500" />
              ) : (
                <FaRegTimesCircle className="text-red-500" />
              )}
              <p className="text-base">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    subscription.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {subscription.status}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-yellow-500" />
              <p className="text-base">
                <strong>Price:</strong> ₹ {subscription.price}
              </p>
            </div>

            {subscription.status === "Active" && (
              <button
                onClick={handleUpgradeClick}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {showUpgradeOptions ? "Hide Upgrade Options" : "Upgrade Plan"}
              </button>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              Plan Features
            </h3>
            <div className="flex items-center gap-2 text-gray-600">
              <FaUsersCog className="text-indigo-500" />
              <span>HRMS</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaTruckMoving className="text-green-500" />
              <span>Fleet Management</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaSearchLocation className="text-pink-500" />
              <span>Wassal Scraping</span>
            </div>
          </div>
        </div>
      )}

      {/* UPGRADE SECTION */}
      {showUpgradeOptions && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Available Upgrades
          </h3>

          {loading ? (
            <p className="text-sm text-gray-500">Loading plans...</p>
          ) : upgradePlans.length === 0 ? (
            <p className="text-sm text-gray-500">No higher plans available.</p>
          ) : (
            <div className="space-y-4">
              {upgradePlans.map((plan) => {
                const cost = calculateUpgradeCost(plan);
                return (
                  <div
                    key={plan.name}
                    className="border rounded-xl p-4 bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {plan.plan_name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Validity: {plan.duration_days} days
                      </p>
                      <p className="text-sm text-gray-600">
                        Upgrade Cost: ₹ {cost}
                      </p>
                    </div>
                    <button
                      onClick={() => handleUpgradeConfirm(plan.name)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Upgrade
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;
