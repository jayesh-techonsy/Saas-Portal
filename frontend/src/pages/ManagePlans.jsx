import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [allApps, setAllApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState({});
  const [selectedApps, setSelectedApps] = useState([]);

  useEffect(() => {
    const fetchPlansAndApps = async () => {
      try {
        const [plansRes, appsRes] = await Promise.all([
          axios.get("http://localhost:8000/api/wallets/plans"),
          axios.get("http://localhost:8000/api/subscription/apps"),
        ]);

        setPlans(plansRes.data.plans || []);
        setAllApps(appsRes.data.apps || []);
      } catch (err) {
        console.error("Error fetching plans or apps:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlansAndApps();
  }, []);

  const handleCheckboxChange = (planIndex, appName) => {
    const updatedPlans = [...plans];
    const currentApps =
      updatedPlans[planIndex].apps?.split(",").map((a) => a.trim()) || [];

    if (currentApps.includes(appName)) {
      updatedPlans[planIndex].apps = currentApps
        .filter((a) => a !== appName)
        .join(",");
    } else {
      currentApps.push(appName);
      updatedPlans[planIndex].apps = currentApps.join(",");
    }

    setPlans(updatedPlans);
  };

  const handleUpdatePlan = async (planId, selectedApps) => {
    setUpdateLoading((prev) => ({ ...prev, [planId]: true }));
    try {
      const res = await axios.put(
        `http://localhost:8000/api/subscription/plans/${planId}`,
        {
          apps: selectedApps.join(","),
        }
      );
      toast.success("Plan updated successfully!");
    } catch (error) {
      toast.error("Failed to update plan");
      console.error("Update error:", error);
    } finally {
      setUpdateLoading((prev) => ({ ...prev, [planId]: false }));
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Subscription Plans</h2>

      {plans.map((plan, index) => {
        const selectedApps = plan.apps?.split(",").map((a) => a.trim()) || [];

        return (
          <div key={plan.name} className="mb-6 border p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{plan.plan_name}</h3>
            <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
            <p className="text-sm text-gray-600 mb-4">
              Price: ₹{plan.price} | Duration: {plan.duration_days} days
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {allApps.map((app) => {
                const isDisabled = ["admin_app", "frappe", "erpnext"].includes(
                  app
                );
                return (
                  <label key={app} className="flex items-center space-x-2">
                    <input
                      className={`${
                        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                      type="checkbox"
                      checked={selectedApps.includes(app)}
                      onChange={() =>
                        !isDisabled && handleCheckboxChange(index, app)
                      }
                      disabled={isDisabled}
                    />
                    <span className={isDisabled ? "text-gray-400" : ""}>
                      {app}
                    </span>
                  </label>
                );
              })}
            </div>

            <button
              onClick={() => handleUpdatePlan(plan.name, selectedApps)}
              disabled={updateLoading[plan.name]}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer inline-flex items-center gap-2 text-sm transition-all duration-300 ease-in-out"
            >
              {updateLoading[plan.name] ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Update"
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ManagePlans;
