import React, { useState, useEffect } from "react";

import { API_BASE_URL } from "../config/api";
 import { FiServer,
  FiShield,
  FiGlobe,
  FiZap,
  FiUsers,
  FiTruck,
  FiDatabase,
  FiArrowRight,
  FiActivity,
  FiClock,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  const role = localStorage.getItem("userRole");
  const userName = localStorage.getItem("userName") || "User";
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    {
      title: "Manage Tenants",
      description: "View and manage all tenant sites",
      icon: FiGlobe,
      path: "/sites",
      color: "blue",
      available: true,
    },
    {
      title: "Fleet Management",
      description: "Track and manage your vehicle fleet",
      icon: FiTruck,
      path: "/fleet",
      color: "green",
      available: true,
    },
    {
      title: "Employee Pool",
      description: "Manage employee information and assignments",
      icon: FiUsers,
      path: "/employees",
      color: "purple",
      available: true,
    },
    {
      title: "Import Data",
      description: "Upload and import Excel data",
      icon: FiDatabase,
      path: "/import-excel",
      color: "orange",
      available: true,
    },
  ];

  const features = [
    {
      icon: FiServer,
      title: "Multi-Tenant Architecture",
      description:
        "Isolated environments for each client with dedicated resources and security.",
      color: "blue",
    },
    {
      icon: FiShield,
      title: "Enterprise Security",
      description:
        "Role-based access control with advanced authentication and authorization.",
      color: "green",
    },
    {
      icon: FiZap,
      title: "High Performance",
      description:
        "Built with modern technologies for lightning-fast response times.",
      color: "yellow",
    },
    {
      icon: FiActivity,
      title: "Real-time Monitoring",
      description:
        "Live dashboard with real-time updates and comprehensive analytics.",
      color: "red",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      orange: "bg-orange-50 text-orange-600 border-orange-200",
      yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
      red: "bg-red-50 text-red-600 border-red-200",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Welcome Header */}
      <div className="card p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 mb-4 lg:mb-0">
              {role === "admin"
                ? "Manage your ERPNext infrastructure and monitor all tenant activities."
                : "Access your ERPNext dashboard and manage your business operations."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <FiClock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-800 mb-4 sm:mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={index}
                to={action.path}
                className="card-hover p-4 sm:p-6 group"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${getColorClasses(
                    action.color
                  )} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base">
                  {action.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 line-clamp-2">
                  {action.description}
                </p>
                <div className="flex items-center text-blue-600 text-xs sm:text-sm font-medium group-hover:gap-2 transition-all duration-200">
                  <span>Get started</span>
                  <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* System Features */}
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-800 mb-4 sm:mb-6">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="card p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${getColorClasses(
                      feature.color
                    )} flex items-center justify-center flex-shrink-0`}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Status */}
      <div className="card p-4 sm:p-6">
        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-800 mb-4">
          System Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiActivity className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">
              All Systems Operational
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              99.9% uptime this month
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiServer className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">
              Server Performance
            </h3>
            <p className="text-sm text-slate-600">Optimal response times</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiShield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">
              Security Status
            </h3>
            <p className="text-sm text-slate-600">All systems secure</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// Exporing Expo and then, APIs 

export default Home;

// import React from "react";

// const Home = () => {
//   const role = localStorage.getItem("userRole");
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">
//         Welcome to the {role === "admin" ? "Admin" : "SaaS"} Dashboard
//       </h2>
//       <p className="text-gray-700">
//         Here, you can manage sites, apps, and tenants.
//       </p>
//     </div>
//   );
// };

// export default Home;

// import React, { useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import { ToastContainer, toast } from "react-toastify";

// const Home = () => {
//   const [siteList, setSiteList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedSite, setSelectedSite] = useState(null);
//   const [dropping, setDropping] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [activeSection, setActiveSection] = useState("home");

//   const [appList, setAppList] = useState([]);
//   const [remoteAppList, setRemoteAppList] = useState([]);
//   const [loadingApps, setLoadingApps] = useState(false);

//   const [viewAppsModal, setViewAppsModal] = useState(false);
//   const [siteApps, setSiteApps] = useState([]);
//   const [appsLoading, setAppsLoading] = useState(false);

//   // Create Tenant States
//   const [tenantSubdomain, setTenantSubdomain] = useState("");
//   const [creatingTenant, setCreatingTenant] = useState(false);

//   const [assignedTenantUrl, setAssignedTenantUrl] = useState(null);
//   const [showTenantModal, setShowTenantModal] = useState(false);

//   const fetchSites = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/sites`);
//       setSiteList(res.data.sites);
//     } catch (err) {
//       toast.error("Failed to fetch site list");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchApps = async () => {
//     setLoadingApps(true);
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/apps/apps`);
//       setAppList(res.data.apps);
//     } catch (err) {
//       toast.error("Failed to fetch app list");
//     } finally {
//       setLoadingApps(false);
//     }
//   };

//   const fetchRemoteApps = async () => {
//     setLoadingApps(true);
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/app/remote-apps`);
//       setRemoteAppList(res.data.apps);
//     } catch (err) {
//       toast.error("Failed to fetch app list");
//     } finally {
//       setLoadingApps(false);
//     }
//   };

//   const handleDropSite = async () => {
//     setDropping(true);
//     try {
//       await axios.post(`${API_BASE_URL}/api/sites/drop-site`, {
//         site: selectedSite,
//       });
//       toast.success(`${selectedSite} dropped successfully`);
//       setShowModal(false);
//       setSelectedSite(null);
//       fetchSites();
//     } catch (err) {
//       toast.error("Error dropping site");
//     } finally {
//       setDropping(false);
//     }
//   };

//   const handleViewApps = async (site) => {
//     setAppsLoading(true);
//     setViewAppsModal(true);
//     try {
//       const res = await axios.post(
//         `${API_BASE_URL}/api/sites/site-apps`,
//         { site }
//       );
//       setSiteApps(res.data.apps || []);
//     } catch (err) {
//       toast.error("Failed to fetch site apps");
//       setSiteApps([]);
//     } finally {
//       setAppsLoading(false);
//     }
//   };

//   const handleCreateTenant = async (e) => {
//     e.preventDefault();
//     if (!tenantSubdomain.trim()) {
//       toast.error("Please enter a subdomain");
//       return;
//     }
//     setCreatingTenant(true);
//     try {
//       const fullDomain = `${tenantSubdomain.trim()}.mdm-wassal.shop`;
//       await axios.post(`${API_BASE_URL}/api/sites/create-tenant`, {
//         site: fullDomain,
//       });
//       toast.success(`Tenant ${fullDomain} created successfully!`);
//       setTenantSubdomain("");
//       fetchSites(); // refresh site list
//     } catch (err) {
//       toast.error("Failed to create tenant");
//     } finally {
//       setCreatingTenant(false);
//     }
//   };

//   const renderHero = () => (
//     <div className="text-center mt-24">
//       <h1 className="text-4xl font-bold mb-4">Welcome to the SaaS Portal</h1>
//       <p className="text-lg text-gray-600 italic">
//         "Manage all your ERPNext tenants from one place"
//       </p>
//     </div>
//   );

//   const renderSitesSection = () => (
//     <>
//       <button
//         onClick={fetchSites}
//         className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//       >
//         Get All Sites
//       </button>
//       {loading ? <p className="mt-4 text-gray-600">Loading...</p> : null}
//       {siteList.length > 0 && (
//         <ul className="mt-4 space-y-2">
//           {siteList.map((site, idx) => (
//             <li
//               key={idx}
//               className="flex justify-between items-center bg-gray-100 p-2 rounded shadow"
//             >
//               <span>{site}</span>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleViewApps(site)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded"
//                 >
//                   View Apps
//                 </button>
//                 <button
//                   onClick={() => {
//                     setSelectedSite(site);
//                     setShowModal(true);
//                   }}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Drop
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );

//   const renderAppsSection = () => (
//     <>
//       <button
//         onClick={fetchApps}
//         className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//       >
//         Get All Installed Apps
//       </button>
//       {loadingApps ? <p className="mt-4 text-gray-600">Loading...</p> : null}
//       {appList.length > 0 && (
//         <ul className="mt-4 space-y-2">
//           {appList.map((app, idx) => (
//             <li
//               key={idx}
//               className="bg-gray-100 p-2 rounded shadow text-gray-800"
//             >
//               <div>
//                 <strong>Name:</strong> {app.name}
//               </div>
//               <div>
//                 <strong>Version:</strong> {app.version}
//               </div>
//               <div>
//                 <strong>Branch:</strong> {app.branch}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );

//   const renderRemoteAppsSection = () => (
//     <>
//       <button
//         onClick={fetchRemoteApps}
//         className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//       >
//         Get All Remote Apps
//       </button>

//       {loadingApps && <p className="mt-4 text-gray-600">Loading...</p>}

//       {remoteAppList.length > 0 && (
//         <ul className="mt-4 space-y-2">
//           {remoteAppList.map((app, idx) =>
//             app ? (
//               <li
//                 key={idx}
//                 className="bg-gray-100 p-2 rounded shadow text-gray-800"
//               >
//                 <div>
//                   <strong>Name: </strong> {app}
//                 </div>
//               </li>
//             ) : null
//           )}
//         </ul>
//       )}
//     </>
//   );

//   const renderCreateTenantSection = () => (
//     <form
//       onSubmit={handleCreateTenant}
//       className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto mt-10"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
//         Create New Tenant
//       </h2>
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">
//           Subdomain (only)
//         </label>
//         <input
//           type="text"
//           placeholder="Enter subdomain (e.g., tenant3)"
//           value={tenantSubdomain}
//           onChange={(e) => setTenantSubdomain(e.target.value)}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           required
//         />
//       </div>
//       <p className="text-sm text-gray-500 mb-6">
//         Full domain will be:{" "}
//         <strong>{tenantSubdomain || "your-subdomain"}.mdm-wassal.shop</strong>
//       </p>
//       <div className="flex items-center justify-center">
//         <button
//           type="submit"
//           disabled={creatingTenant}
//           className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
//         >
//           {creatingTenant ? "Creating..." : "Create Tenant"}
//         </button>
//       </div>
//     </form>
//   );

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar onSelect={(section) => setActiveSection(section)} />
//       <div className="flex-1 p-6">
//         {activeSection === "home" && renderHero()}
//         {activeSection === "sites" && renderSitesSection()}
//         {activeSection === "apps" && renderAppsSection()}
//         {activeSection === "remote" && renderRemoteAppsSection()}
//         {activeSection === "create" && renderCreateTenantSection()}

//         {/* Drop Site Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
//               <h2 className="text-lg font-semibold mb-4 text-gray-800">
//                 Are you sure you want to drop this site?
//               </h2>
//               <p className="mb-6 text-gray-600">{selectedSite}</p>
//               {dropping ? (
//                 <p className="text-gray-600">Dropping site...</p>
//               ) : (
//                 <div className="flex justify-around">
//                   <button
//                     onClick={handleDropSite}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   >
//                     Yes, Drop
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowModal(false);
//                       setSelectedSite(null);
//                     }}
//                     className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* View Apps Modal */}
//         {viewAppsModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-lg">
//               <h2 className="text-xl font-semibold mb-4 text-gray-800">
//                 Installed Apps for Selected Site
//               </h2>
//               {appsLoading ? (
//                 <p className="text-gray-600">Loading apps...</p>
//               ) : (
//                 <ul className="space-y-2 max-h-80 overflow-y-auto">
//                   {siteApps.map((app, idx) => (
//                     <li
//                       key={idx}
//                       className="bg-gray-100 p-2 rounded shadow text-gray-800"
//                     >
//                       {app}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               <button
//                 onClick={() => {
//                   setViewAppsModal(false);
//                   setSiteApps([]);
//                 }}
//                 className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Home;
