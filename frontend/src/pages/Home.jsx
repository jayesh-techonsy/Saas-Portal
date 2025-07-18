import React from "react";
import { FaTools, FaUserShield, FaGlobe, FaRocket } from "react-icons/fa";

const Home = () => {
  const role = localStorage.getItem("userRole");

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto">
      {/* Original Content */}
      <h2 className="text-2xl font-bold mb-4">
        Welcome to the {role === "admin" ? "Admin" : "SaaS"} Dashboard
      </h2>
      <p className="text-gray-700 mb-6">
        Here, you can manage sites, apps, and tenants.
      </p>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow mb-8">
        <h3 className="text-xl font-semibold mb-2">You're in control 🚀</h3>
        <p className="text-sm text-gray-100">
          Use the dashboard to monitor site activity, manage wallets, and
          explore available apps with ease.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <FaGlobe className="text-indigo-600 text-3xl mb-3" />
          <h4 className="text-lg font-semibold text-gray-700 mb-1">
            Multi-Tenant
          </h4>
          <p className="text-gray-500 text-sm">
            Isolated environments per tenant for security and scalability.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <FaUserShield className="text-purple-600 text-3xl mb-3" />
          <h4 className="text-lg font-semibold text-gray-700 mb-1">
            Role-Based Access
          </h4>
          <p className="text-gray-500 text-sm">
            Separate controls for Admins and Clients.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <FaTools className="text-green-600 text-3xl mb-3" />
          <h4 className="text-lg font-semibold text-gray-700 mb-1">
            Manage Apps
          </h4>
          <p className="text-gray-500 text-sm">
            View and control installed apps on any tenant site.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <FaRocket className="text-red-500 text-3xl mb-3" />
          <h4 className="text-lg font-semibold text-gray-700 mb-1">
            Fast & Modern
          </h4>
          <p className="text-gray-500 text-sm">
            React + FastAPI makes this dashboard super snappy.
          </p>
        </div>
      </div>
    </div>
  );
};

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
//       const res = await axios.get("http://localhost:8000/api/sites");
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
//       const res = await axios.get("http://localhost:8000/api/apps/apps");
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
//       const res = await axios.get("http://localhost:8000/api/app/remote-apps");
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
//       await axios.post("http://localhost:8000/api/sites/drop-site", {
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
//         "http://localhost:8000/api/sites/site-apps",
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
//       await axios.post("http://localhost:8000/api/sites/create-tenant", {
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
