// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token); // true if token exists
//   }, [location.pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("tenantId");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold">Wassal System</h1>
//       <ul className="flex space-x-4">
//         <li>
//           <Link to="/" className="hover:underline">
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link to="/about" className="hover:underline">
//             About
//           </Link>
//         </li>
//         <li>
//           <Link to="/contact" className="hover:underline">
//             Contact
//           </Link>
//         </li>
//         <li>
//           {isLoggedIn ? (
//             <button onClick={handleLogout} className="hover:underline">
//               Sign Out
//             </button>
//           ) : (
//             <Link to="/login" className="hover:underline">
//               Login/Signup
//             </Link>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useEffect, useState, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   FiLogOut,
//   FiUser,
//   FiSettings,
//   FiShield,
//   FiGrid,
//   FiMoon,
// } from "react-icons/fi";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const name = localStorage.getItem("userName") || "Jayesh Patil";
//   const email =
//     localStorage.getItem("userEmail") || "jayesh.patil@techonsy.com";

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
//       <h1 className="text-xl font-bold">Wassal System</h1>

//       <div className="flex items-center space-x-4">
//         <Link to="/about" className="hover:underline">
//           About
//         </Link>
//         <Link to="/contact" className="hover:underline">
//           Contact
//         </Link>
//         <Link to="/pricing" className="hover:underline">
//           Pricing
//         </Link>

//         {isLoggedIn && (
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//               className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold focus:outline-none"
//             >
//               {name?.charAt(0).toUpperCase()}
//             </button>

//             {dropdownOpen && (
//               <div className="absolute right-0 mt-2 w-64 bg-zinc-900 text-white rounded-lg shadow-lg border border-zinc-700 z-50">
//                 <div className="p-4 border-b border-zinc-700">
//                   <p className="font-bold">{name}</p>
//                   <p className="text-sm text-zinc-400">{email}</p>
//                 </div>
//                 <div className="p-2 space-y-1">
//                   <div className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded cursor-pointer">
//                     <FiShield />
//                     <span>Admin</span>
//                   </div>
//                   <div className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded cursor-pointer">
//                     <FiGrid />
//                     <span>Dashboard</span>
//                   </div>
//                   <div className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded cursor-pointer">
//                     <FiSettings />
//                     <span>Settings</span>
//                   </div>
//                 </div>
//                 <div className="border-t border-zinc-700 p-2">
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-2 p-2 w-full text-left hover:bg-zinc-800 rounded text-red-400"
//                   >
//                     <FiLogOut />
//                     <span>Log out</span>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {!isLoggedIn && (
//           <Link to="/login" className="hover:underline">
//             Login/Signup
//           </Link>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// ________________________________________________________________________________________________

import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut, FiUser, FiSettings, FiShield, FiGrid } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const name = localStorage.getItem("userName") || "Jayesh Patil";
  const email =
    localStorage.getItem("userEmail") || "jayesh.patil@techonsy.com";
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white text-gray-800 px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-blue-600">Wassal Systems</h1>

      {/* Middle Nav Links */}
      <div className="space-x-6 text-lg font-medium hidden md:flex">
        <Link
          to="/pricing"
          className="hover:text-blue-600 transition-colors duration-200 hover:underline underline-offset-4"
        >
          Pricing
        </Link>
        <Link
          to="/about"
          className="hover:text-blue-600 transition-colors duration-200 hover:underline underline-offset-4"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="hover:text-blue-600 transition-colors duration-200 hover:underline underline-offset-4"
        >
          Contact Us
        </Link>
      </div>

      {/* Right Side Auth/Profile */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-5 text-blue-600 text-4xl"
            >
              <FaUserCircle />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="font-bold">{name}</p>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
                <div className="p-2 space-y-1">
                  {role === "admin" && (
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <FiShield />
                      <span>Admin</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <FiGrid />
                    <span>Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <FiSettings />
                    <span>Settings</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 p-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 w-full text-left hover:bg-red-50 rounded text-red-600"
                  >
                    <FiLogOut />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="hover:text-blue-600 transition-colors duration-200 font-medium"
          >
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
