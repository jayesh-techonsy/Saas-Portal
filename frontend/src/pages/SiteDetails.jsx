import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import SiteHeader from "../components/Site Details/SiteHeader";
import AppList from "../components/Site Details/AppList";
import WalletSection from "../components/Site Details/WalletSection";
import SubscriptionCard from "../components/Site Details/SubscriptionCard";

const SiteDetails = () => {
  const { siteId } = useParams();
  const [apps, setApps] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "";
    setUserRole(role);
  }, []);

  const fetchSiteDetails = async () => {
    setLoading(true);
    try {
      const [appsRes, walletRes, subscriptionResRaw] = await Promise.all([
        axios.get(`http://localhost:8000/api/app/${siteId}/apps`),
        axios.get(`http://localhost:8000/api/wallets/${siteId}`),
        axios
          .get(`http://localhost:8000/api/wallets/${siteId}/subscription`)
          .catch(() => null),
      ]);

      const subscriptionRes = subscriptionResRaw;

      let cleanedApps = appsRes.data.apps || [];

      if (userRole === "client") {
        cleanedApps = cleanedApps.filter((app) => app.installed);
      }

      const sortedApps = cleanedApps.sort((a, b) => b.installed - a.installed);

      setApps(sortedApps);
      setWallet(walletRes?.data?.data || null);
      setSubscription(subscriptionRes?.data?.data || null);
    } catch (error) {
      toast.error("Failed to fetch site details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole) {
      fetchSiteDetails();
    }
  }, [siteId, userRole]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen relative">
        <div className="transform -translate-y-36 -translate-x-40">
          <HashLoader size={75} color="#4B5563" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <SiteHeader siteId={siteId} />

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <AppList
          apps={apps}
          userRole={userRole}
          siteId={siteId}
          fetchSiteDetails={fetchSiteDetails}
        />

        <WalletSection
          wallet={wallet}
          siteId={siteId}
          fetchSiteDetails={fetchSiteDetails}
          plans={plans}
          setPlans={setPlans}
          subscription={subscription}
        />

        <SubscriptionCard
          subscription={subscription}
          siteId={siteId}
          fetchSiteDetails={fetchSiteDetails}
        />
      </div>
    </div>
  );
};

export default SiteDetails;
