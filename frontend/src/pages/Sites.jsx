// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import {
//   FiServer,
//   FiRefreshCw,
//   FiSearch,
//   FiGlobe,
//   FiArrowRight,
//   FiActivity,
//   FiUsers,
//   FiEdit2,
//   FiTrash2,
// } from "react-icons/fi";

// const Sites = () => {
//   const [siteList, setSiteList] = useState([]);
//   const [filteredSites, setFilteredSites] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const fetchSites = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/sites`);
//       setSiteList(res.data.sites);
//       setFilteredSites(res.data.sites);
//       toast.success("Sites loaded successfully");
//     } catch (err) {
//       toast.error("Failed to fetch site list");
//       console.error("Error fetching sites:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSites();
//   }, []);

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = siteList.filter((site) =>
//         site.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredSites(filtered);
//     } else {
//       setFilteredSites(siteList);
//     }
//   }, [searchTerm, siteList]);

//   const handleSiteClick = (site) => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     navigate(`/site/${site}`);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-heading-1 text-slate-800 flex items-center gap-3">
//             <FiServer className="w-8 h-8 text-blue-600" />
//             Tenant Sites
//           </h1>
//           <p className="text-slate-600 mt-1">
//             Manage and access all your tenant environments
//           </p>
//         </div>
//         <button
//           onClick={fetchSites}
//           disabled={loading}
//           className="btn-primary flex items-center gap-2"
//         >
//           <FiRefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
//           Refresh Sites
//         </button>
//       </div>

//       {/* Search and Stats */}
//       <div className="card p-6">
//         <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//           <div className="flex-1 max-w-md">
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search sites..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="input-field pl-10"
//               />
//             </div>
//           </div>
//           <div className="flex items-center gap-6 text-sm text-slate-600">
//             <div className="flex items-center gap-2">
//               <FiGlobe className="w-4 h-4 text-blue-500" />
//               <span>Total: {siteList.length}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FiActivity className="w-4 h-4 text-green-500" />
//               <span>Active: {filteredSites.length}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sites Table */}
//       {loading ? (
//         <div className="card">
//           <div className="flex items-center justify-center py-12">
//             <div className="flex items-center gap-3 text-slate-600">
//               <div className="loading-spinner"></div>
//               <span>Loading tenant sites...</span>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="card overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-slate-200">
//               <thead className="bg-slate-50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
//                   >
//                     Site Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
//                   >
//                     Status
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
//                   >
//                     Subscription
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider"
//                   >
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-slate-200">
//                 {filteredSites.map((site, idx) => (
//                   <tr
//                     key={idx}
//                     className="hover:bg-slate-50 cursor-pointer transition-colors duration-150"
//                     onClick={() => handleSiteClick(site)}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
//                           <FiGlobe className="w-5 h-5 text-white" />
//                         </div>
//                         <div className="ml-4">
//                           <div className="text-sm font-medium text-slate-900">
//                             {site}
//                           </div>
//                           <div className="text-sm text-slate-500">
//                             Tenant environment
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                         <div className="w-2 h-2 bg-green-500 rounded-full mr-2 inline-block animate-pulse"></div>
//                         Active
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
//                       <div className="flex items-center gap-1">
//                         {/* <FiUsers className="w-3 h-3" /> */}
//                         <span>-</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                       <div className="flex justify-end items-center gap-3">
//                         <button
//                           className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             // Add edit functionality here
//                           }}
//                         >
//                           <FiEdit2 className="w-4 h-4" />
//                         </button>
//                         <button
//                           className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             // Add delete functionality here
//                           }}
//                         >
//                           <FiTrash2 className="w-4 h-4" />
//                         </button>
//                         <button
//                           className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-50"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleSiteClick(site);
//                           }}
//                         >
//                           <span>Access</span>
//                           <FiArrowRight className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && filteredSites.length === 0 && (
//         <div className="card">
//           <div className="text-center py-12">
//             <FiServer className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-slate-800 mb-2">
//               {searchTerm ? "No sites found" : "No tenant sites available"}
//             </h3>
//             <p className="text-slate-600 mb-6">
//               {searchTerm
//                 ? "Try adjusting your search criteria."
//                 : "Create your first tenant site to get started."}
//             </p>
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="btn-secondary"
//               >
//                 Clear Search
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sites;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

import {
  FiServer,
  FiRefreshCw,
  FiSearch,
  FiGlobe,
  FiArrowRight,
  FiActivity,
  FiUsers,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const Sites = () => {
  const [siteList, setSiteList] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchSites = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/sites`);
      const sites = res.data.sites;
      setSiteList(sites);
      setFilteredSites(sites);

      // Fetch subscription data for all sites
      const subscriptionPromises = sites.map((site) =>
        axios
          .get(`http://localhost:8000/api/wallets/${site}/subscription`)
          .then((res) => ({ site, data: res.data.data }))
          .catch(() => ({ site, data: null }))
      );

      const subscriptions = await Promise.all(subscriptionPromises);
      const subscriptionMap = subscriptions.reduce((acc, { site, data }) => {
        acc[site] = data;
        return acc;
      }, {});

      setSubscriptionData(subscriptionMap);
    } catch (err) {
      toast.error("Failed to fetch site list");
      console.error("Error fetching sites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = siteList.filter((site) =>
        site.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSites(filtered);
    } else {
      setFilteredSites(siteList);
    }
  }, [searchTerm, siteList]);

  const handleSiteClick = (site) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/site/${site}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-heading-1 text-slate-800 flex items-center gap-3">
            <FiServer className="w-8 h-8 text-blue-600" />
            Tenant Sites
          </h1>
          <p className="text-slate-600 mt-1">
            Manage and access all your tenant environments
          </p>
        </div>
        <button
          onClick={fetchSites}
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          <FiRefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Sites
        </button>
      </div>

      {/* Search and Stats */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search sites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <FiGlobe className="w-4 h-4 text-blue-500" />
              <span>Total: {siteList.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiActivity className="w-4 h-4 text-green-500" />
              <span>Active: {filteredSites.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sites Table */}
      {loading ? (
        <div className="card">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="loading-spinner"></div>
              <span>Loading tenant sites...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Site Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Subscription
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredSites.map((site, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50 cursor-pointer transition-colors duration-150"
                    onClick={() => handleSiteClick(site)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <FiGlobe className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">
                            {site}
                          </div>
                          <div className="text-sm text-slate-500">
                            Tenant environment
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 inline-block animate-pulse"></div>
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        {subscriptionData[site]?.plan_name || "-"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-3">
                        <button
                          className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add edit functionality here
                          }}
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add delete functionality here
                          }}
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                        <button
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSiteClick(site);
                          }}
                        >
                          <span>Access</span>
                          <FiArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredSites.length === 0 && (
        <div className="card">
          <div className="text-center py-12">
            <FiServer className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">
              {searchTerm ? "No sites found" : "No tenant sites available"}
            </h3>
            <p className="text-slate-600 mb-6">
              {searchTerm
                ? "Try adjusting your search criteria."
                : "Create your first tenant site to get started."}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="btn-secondary"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sites;
