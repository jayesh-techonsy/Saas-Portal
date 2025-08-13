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
import {
  FiLogOut,
  FiSettings,
  FiShield,
  FiGrid,
  FiMenu,
  FiX,
  FiUser,
} from "react-icons/fi";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setDropdownOpen(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">W</span>
            </div>
            <span className="text-base sm:text-lg font-bold text-slate-800 hidden xs:block">
              Wassal ERP
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/about"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200 text-sm"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200 text-sm"
            >
              Contact
            </Link>
            <a
              href="#"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200 text-sm"
            >
              Documentation
            </a>
          </div>

          {/* Right Side - Auth/Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-medium">
                      {getInitials(name)}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-slate-800 truncate max-w-24">
                      {name.split(" ")[0]}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">{role}</p>
                  </div>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-slate-200 z-50 scale-in">
                    <div className="p-3 sm:p-4 border-b border-slate-100">
                      <p className="font-semibold text-slate-800 text-sm truncate">
                        {name}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 truncate">
                        {email}
                      </p>
                      {role && (
                        <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full capitalize">
                          {role}
                        </span>
                      )}
                    </div>

                    <div className="p-1 sm:p-2">
                      <Link
                        to="/"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 p-2 sm:p-3 hover:bg-slate-50 rounded-lg transition-colors duration-150 text-sm"
                      >
                        <FiGrid className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-700">Dashboard</span>
                      </Link>

                      <button className="flex items-center gap-3 p-2 sm:p-3 hover:bg-slate-50 rounded-lg transition-colors duration-150 w-full text-left text-sm">
                        <FiSettings className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-700">Settings</span>
                      </button>

                      {role === "admin" && (
                        <button className="flex items-center gap-3 p-2 sm:p-3 hover:bg-slate-50 rounded-lg transition-colors duration-150 w-full text-left text-sm">
                          <FiShield className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-700">Admin Panel</span>
                        </button>
                      )}
                    </div>

                    <div className="border-t border-slate-100 p-1 sm:p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-2 sm:p-3 hover:bg-red-50 rounded-lg transition-colors duration-150 w-full text-left text-red-600 text-sm"
                      >
                        <FiLogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary text-sm px-3 py-1.5 sm:px-4 sm:py-2"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <FiX className="w-5 h-5 text-slate-600" />
              ) : (
                <FiMenu className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 fade-in">
            <div className="space-y-1">
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors duration-200 text-sm"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors duration-200 text-sm"
              >
                Contact
              </Link>
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors duration-200 text-sm"
              >
                Documentation
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
