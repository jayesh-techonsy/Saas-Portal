// import React from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaHome,
//   FaCube,
//   FaTruckMoving,
//   FaPlusCircle,
//   FaList,
// } from "react-icons/fa";

// const Sidebar = () => {
//   const role = localStorage.getItem("userRole");
//   const site = localStorage.getItem("tenantSiteName");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSitesClick = () => {
//     if (role === "client" && site) {
//       navigate(`/site/${site}`);
//     } else {
//       navigate("/sites");
//     }
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="h-screen w-64 bg-white shadow-lg flex flex-col">
//       {/* Header */}
//       <div className="p-6 border-b border-gray-200">
//         <h2 className="text-2xl font-bold text-gray-800">
//           {role === "admin" ? "Admin" : "Client"} Dashboard
//         </h2>
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex-1 p-4 space-y-1">
//         <Link
//           to="/"
//           className={`flex items-center gap-3 p-2 rounded-lg transition
//             ${
//               isActive("/")
//                 ? "bg-blue-100 text-blue-600"
//                 : "text-gray-700 hover:bg-blue-50"
//             }`}
//         >
//           <FaHome className="text-lg" />
//           <span>Home</span>
//         </Link>

//         <button
//           onClick={handleSitesClick}
//           className={`w-full text-left flex items-center gap-3 p-2 rounded-lg transition
//             ${
//               location.pathname.includes("/site") || isActive("/sites")
//                 ? "bg-blue-100 text-blue-600"
//                 : "text-gray-700 hover:bg-blue-50"
//             }`}
//         >
//           <FaList className="text-lg" />
//           <span>{role === "admin" ? "All Tenants" : "My Tenant"}</span>
//         </button>

//         {role === "admin" && (
//           <Link
//             to="/manage-plans"
//             className={`flex items-center gap-3 p-2 rounded-lg transition
//       ${
//         isActive("/manage-plans")
//           ? "bg-blue-100 text-blue-600"
//           : "text-gray-700 hover:bg-blue-50"
//       }`}
//           >
//             <FaCube className="text-lg" />
//             <span>Manage Plans</span>
//           </Link>
//         )}

//         <Link
//           to="/fleet"
//           className={`flex items-center gap-3 p-2 rounded-lg transition
//             ${
//               isActive("/fleet")
//                 ? "bg-blue-100 text-blue-600"
//                 : "text-gray-700 hover:bg-blue-50"
//             }`}
//         >
//           <FaTruckMoving className="text-lg" />
//           <span>Manage Fleet</span>
//         </Link>

//         <Link
//           to="/import-excel"
//           className={`flex items-center gap-3 p-2 rounded-lg transition
//             ${
//               isActive("/import-excel")
//                 ? "bg-blue-100 text-blue-600"
//                 : "text-gray-700 hover:bg-blue-50"
//             }`}
//         >
//           <FaPlusCircle className="text-lg" />
//           <span>Import Excel</span>
//         </Link>
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-gray-100 text-xs text-gray-400">
//         © 2025 SaaS Inc.
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCube,
  FaTruckMoving,
  FaPlusCircle,
  FaList,
  FaUsers, // NEW: Icon for Employees
} from "react-icons/fa";

const Sidebar = () => {
  const role = localStorage.getItem("userRole");
  const site = localStorage.getItem("tenantSiteName");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSitesClick = () => {
    if (role === "client" && site) {
      navigate(`/site/${site}`);
    } else {
      navigate("/sites");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-64 bg-white shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          {role === "admin" ? "Admin" : "Client"} Dashboard
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`flex items-center gap-3 p-2 rounded-lg transition 
            ${
              isActive("/")
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-blue-50"
            }`}
        >
          <FaHome className="text-lg" />
          <span>Home</span>
        </Link>

        <button
          onClick={handleSitesClick}
          className={`w-full text-left flex items-center gap-3 p-2 rounded-lg transition 
            ${
              location.pathname.includes("/site") || isActive("/sites")
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-blue-50"
            }`}
        >
          <FaList className="text-lg" />
          <span>{role === "admin" ? "All Tenants" : "My Tenant"}</span>
        </button>

        {role === "admin" && (
          <Link
            to="/manage-plans"
            className={`flex items-center gap-3 p-2 rounded-lg transition 
              ${
                isActive("/manage-plans")
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
          >
            <FaCube className="text-lg" />
            <span>Manage Plans</span>
          </Link>
        )}

        <Link
          to="/fleet"
          className={`flex items-center gap-3 p-2 rounded-lg transition 
            ${
              isActive("/fleet")
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-blue-50"
            }`}
        >
          <FaTruckMoving className="text-lg" />
          <span>Manage Fleet</span>
        </Link>

        <Link
          to="/import-excel"
          className={`flex items-center gap-3 p-2 rounded-lg transition 
            ${
              isActive("/import-excel")
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-blue-50"
            }`}
        >
          <FaPlusCircle className="text-lg" />
          <span>Import Excel</span>
        </Link>

        {/* 🔹 New Employees Link */}
        <Link
          to="/employees"
          className={`flex items-center gap-3 p-2 rounded-lg transition 
            ${
              isActive("/employees")
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-blue-50"
            }`}
        >
          <FaUsers className="text-lg" />
          <span>Employees</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
