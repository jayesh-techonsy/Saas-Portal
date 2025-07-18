// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// const WalletSection = ({
//   wallet,
//   siteId,
//   fetchSiteDetails,
//   plans,
//   setPlans,
// }) => {
//   const [topUpAmount, setTopUpAmount] = useState("");
//   const [showPlanDropdown, setShowPlanDropdown] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState("");
//   const [topUpLoading, setTopUpLoading] = useState(false);
//   const [subscribeLoading, setSubscribeLoading] = useState(false);
//   const [payLoading, setPayLoading] = useState(false);

//   const handleTopUp = async () => {
//     if (!topUpAmount || isNaN(topUpAmount) || Number(topUpAmount) <= 0) {
//       toast.error("Please enter a valid top-up amount");
//       return;
//     }

//     setTopUpLoading(true);
//     try {
//       await axios.post(`http://localhost:8000/api/wallets/${siteId}/topup`, {
//         amount: Number(topUpAmount),
//       });
//       toast.success("Wallet topped up successfully");
//       setTopUpAmount("");
//       await fetchSiteDetails();
//     } catch (err) {
//       toast.error("Failed to top-up wallet");
//     } finally {
//       setTopUpLoading(false);
//     }
//   };

//   const handleSubscribeClick = async () => {
//     setSubscribeLoading(true);
//     try {
//       const res = await axios.get("http://localhost:8000/api/wallets/plans");
//       setPlans(res.data.plans || []);
//       setShowPlanDropdown(true);
//     } catch (error) {
//       toast.error("Failed to fetch subscription plans");
//     } finally {
//       setSubscribeLoading(false);
//     }
//   };

//   const handlePayForPlan = async () => {
//     if (!selectedPlan) {
//       toast.error("Please select a plan before paying");
//       return;
//     }

//     setPayLoading(true);
//     try {
//       await axios.post(
//         `http://localhost:8000/api/wallets/${siteId}/subscribe`,
//         { plan_name: selectedPlan }
//       );

//       toast.success("Subscribed successfully");
//       setShowPlanDropdown(false);
//       setSelectedPlan("");
//       await fetchSiteDetails();
//     } catch (error) {
//       toast.error(error.response?.data?.detail || "Failed to subscribe");
//     } finally {
//       setPayLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow">
//       <h2 className="text-xl font-semibold text-gray-700 mb-3">Wallet</h2>
//       {wallet ? (
//         <div className="text-gray-600">
//           <p className="mb-4">
//             <span className="font-medium">Balance:</span> ₹ {wallet.balance}
//           </p>

//           <div className="mb-6 flex gap-2 items-center flex-wrap">
//             <input
//               type="number"
//               min="1"
//               placeholder="Enter amount"
//               value={topUpAmount}
//               onChange={(e) => setTopUpAmount(e.target.value)}
//               className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
//             />

//             <button
//               onClick={handleTopUp}
//               disabled={topUpLoading}
//               className="px-4 py-2 rounded-md bg-black text-white border border-transparent hover:cursor-pointer transition-all duration-300 ease-in-out text-sm shadow inline-flex items-center gap-2"
//             >
//               {topUpLoading ? (
//                 <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//               ) : (
//                 "Top-up"
//               )}
//             </button>

//             <button
//               onClick={handleSubscribeClick}
//               disabled={subscribeLoading}
//               className="px-4 py-2 cursor-pointer rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 ease-in-out text-sm shadow inline-flex items-center gap-2"
//             >
//               {subscribeLoading ? (
//                 <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//               ) : (
//                 "Subscribe"
//               )}
//             </button>
//           </div>

//           {showPlanDropdown && (
//             <div className="mt-4 space-y-3">
//               <label className="block font-medium text-sm text-gray-700">
//                 Select a Plan
//               </label>
//               <select
//                 value={selectedPlan}
//                 onChange={(e) => setSelectedPlan(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               >
//                 <option value="">-- Choose a plan --</option>
//                 {plans.map((plan) => (
//                   <option key={plan.name} value={plan.name}>
//                     {plan.plan_name} - ₹{plan.price}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 disabled={!selectedPlan || payLoading}
//                 onClick={handlePayForPlan}
//                 className="px-4 py-2 cursor-pointer rounded-md bg-green-600 text-white hover:bg-green-700 transition-all duration-300 ease-in-out text-sm shadow disabled:opacity-50 inline-flex items-center gap-2"
//               >
//                 {payLoading ? (
//                   <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                 ) : (
//                   "Pay"
//                 )}
//               </button>
//             </div>
//           )}

//           <div className="mt-8">
//             <h3 className="font-semibold mb-3 text-gray-700">
//               Wallet Transactions
//             </h3>
//             {wallet.wallet_transactions?.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full text-sm text-left text-gray-700 border">
//                   <thead className="bg-gray-100 text-gray-800">
//                     <tr>
//                       <th className="px-4 py-2 border">No.</th>
//                       <th className="px-4 py-2 border">Amount</th>
//                       <th className="px-4 py-2 border">Description</th>
//                       <th className="px-4 py-2 border">Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {wallet.wallet_transactions.map((tx, index) => (
//                       <tr key={index} className="bg-white even:bg-gray-50">
//                         <td className="px-4 py-2 border">{index + 1}</td>
//                         <td className="px-4 py-2 border">
//                           ₹ {Number(tx.amount).toFixed(2)}
//                         </td>
//                         <td className="px-4 py-2 border">{tx.description}</td>
//                         <td className="px-4 py-2 border">
//                           {new Date(tx.date).toLocaleString()}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p>No transactions found.</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-500">No wallet data</p>
//       )}
//     </div>
//   );
// };

// export default WalletSection;

import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const WalletSection = ({
  wallet,
  siteId,
  fetchSiteDetails,
  plans,
  setPlans,
  subscription,
}) => {
  const [topUpAmount, setTopUpAmount] = useState("");
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  const hasActiveSubscription =
    subscription && subscription.status === "Active";

  const handleTopUp = async () => {
    if (!topUpAmount || isNaN(topUpAmount) || Number(topUpAmount) <= 0) {
      toast.error("Please enter a valid top-up amount");
      return;
    }

    setTopUpLoading(true);
    try {
      await axios.post(`http://localhost:8000/api/wallets/${siteId}/topup`, {
        amount: Number(topUpAmount),
      });
      toast.success("Wallet topped up successfully");
      setTopUpAmount("");
      await fetchSiteDetails();
    } catch (err) {
      toast.error("Failed to top-up wallet");
    } finally {
      setTopUpLoading(false);
    }
  };

  const handlePlanClick = async () => {
    setSubscribeLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/wallets/plans");
      const all = res.data.plans || [];

      // If user has a subscription, only show upgrade plans
      const filtered = hasActiveSubscription
        ? all.filter((plan) => plan.price > subscription.price)
        : all;

      setPlans(filtered);
      setShowPlanDropdown(true);
    } catch (error) {
      toast.error("Failed to fetch subscription plans");
    } finally {
      setSubscribeLoading(false);
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

  const handlePayForPlan = async () => {
    if (!selectedPlan) {
      toast.error("Please select a plan before paying");
      return;
    }

    setPayLoading(true);
    try {
      await axios.post(
        `http://localhost:8000/api/wallets/${siteId}/subscribe`,
        { plan_name: selectedPlan }
      );

      toast.success(
        hasActiveSubscription
          ? "Plan upgraded successfully"
          : "Subscribed successfully"
      );
      setShowPlanDropdown(false);
      setSelectedPlan("");
      await fetchSiteDetails();
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to process plan");
    } finally {
      setPayLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Wallet</h2>
      {wallet ? (
        <div className="text-gray-600">
          <p className="mb-4">
            <span className="font-medium">Balance:</span> ₹ {wallet.balance}
          </p>

          <div className="mb-6 flex gap-2 items-center flex-wrap">
            <input
              type="number"
              min="1"
              placeholder="Enter amount"
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              onClick={handleTopUp}
              disabled={topUpLoading}
              className="px-4 py-2 rounded-md bg-black text-white text-sm shadow inline-flex items-center gap-2"
            >
              {topUpLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Top-up"
              )}
            </button>

            {!hasActiveSubscription && (
              <button
                onClick={handlePlanClick}
                disabled={subscribeLoading}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm shadow inline-flex items-center gap-2"
              >
                {subscribeLoading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Subscribe"
                )}
              </button>
            )}

            {hasActiveSubscription && (
              <button
                onClick={handlePlanClick}
                disabled={subscribeLoading}
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm shadow inline-flex items-center gap-2"
              >
                {subscribeLoading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Upgrade"
                )}
              </button>
            )}
          </div>

          {showPlanDropdown && (
            <div className="mt-4 space-y-3">
              <label className="block font-medium text-sm text-gray-700">
                Select a Plan
              </label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">-- Choose a plan --</option>
                {plans.map((plan) => (
                  <option key={plan.name} value={plan.name}>
                    {plan.plan_name} - ₹
                    {hasActiveSubscription
                      ? calculateUpgradeCost(plan)
                      : plan.price}
                  </option>
                ))}
              </select>

              <button
                disabled={!selectedPlan || payLoading}
                onClick={handlePayForPlan}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm shadow inline-flex items-center gap-2 disabled:opacity-50"
              >
                {payLoading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : hasActiveSubscription ? (
                  "Upgrade & Pay"
                ) : (
                  "Pay"
                )}
              </button>
            </div>
          )}

          <div className="mt-8">
            <h3 className="font-semibold mb-3 text-gray-700">
              Wallet Transactions
            </h3>
            {wallet.wallet_transactions?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700 border">
                  <thead className="bg-gray-100 text-gray-800">
                    <tr>
                      <th className="px-4 py-2 border">No.</th>
                      <th className="px-4 py-2 border">Amount</th>
                      <th className="px-4 py-2 border">Description</th>
                      <th className="px-4 py-2 border">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wallet.wallet_transactions.map((tx, index) => (
                      <tr key={index} className="bg-white even:bg-gray-50">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">
                          ₹ {Number(tx.amount).toFixed(2)}
                        </td>
                        <td className="px-4 py-2 border">{tx.description}</td>
                        <td className="px-4 py-2 border">
                          {new Date(tx.date).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No wallet data</p>
      )}
    </div>
  );
};

export default WalletSection;
