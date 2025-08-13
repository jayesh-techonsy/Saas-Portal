import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiTruck,
  FiUpload,
  FiUsers,
  FiGrid,
  FiChevronLeft,
  FiChevronRight,
  FiSettings,
  FiTrendingUp,
  FiMenu,
  FiX,
  FiActivity,
  FiHelpCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const role = localStorage.getItem("userRole");
  const site = localStorage.getItem("tenantSiteName");
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Handle mobile sidebar toggle
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSitesClick = () => {
    if (role === "client" && site) {
      navigate(`/site/${site}`);
    } else {
      navigate("/sites");
    }
  };

  const toggleSubmenu = () => {
    setOpenSubmenu(!openSubmenu);
  };

  const isActive = (path) => location.pathname === path;
  const isPathActive = (paths) =>
    paths.some((path) => location.pathname.includes(path));

  const menuItems = [
    {
      icon: FiHome,
      label: "Dashboard",
      mobileLabel: "Home",
      path: "/",
      active: isActive("/"),
    },
    {
      icon: FiGrid,
      label: role === "admin" ? "All Tenants" : "My Tenant",
      mobileLabel: "Tenants",
      onClick: handleSitesClick,
      active: isPathActive(["/site", "/sites"]),
    },
    ...(role === "admin"
      ? [
          {
            icon: FiTrendingUp,
            label: "Manage Plans",
            mobileLabel: "Plans",
            path: "/manage-plans",
            active: isActive("/manage-plans"),
          },
        ]
      : []),
    {
      icon: FiTruck,
      label: "Fleet Management",
      mobileLabel: "Fleet",
      path: "/fleet",
      active: isActive("/fleet"),
    },
    {
      icon: FiUsers,
      label: "Employees",
      mobileLabel: "Staff",
      submenu: true,
      active: isPathActive([
        "/employees",
        "/frappe-employees",
        "/employee-pool",
        "/gosi-employees",
        "/hrsd-employees",
      ]),
      items: [
        {
          label: "Frappe Employee",
          path: "/frappe-employees",
          active: isActive("/frappe-employees"),
        },
        {
          label: "Employee Pool",
          path: "/employees",
          active: isActive("/employees"),
        },
        {
          label: "GOSI Employee",
          path: "/gosi-employees",
          active: isActive("/gosi-employees"),
        },
        {
          label: "HRSD Employee",
          path: "/hrsd-employees",
          active: isActive("/hrsd-employees"),
        },
      ],
    },
    {
      icon: FiActivity,
      label: "Performance",
      mobileLabel: "Performance",
      path: "/performance",
      active: isActive("/performance"),
    },
    {
      icon: FiHelpCircle,
      label: "Support",
      mobileLabel: "Support",
      path: "/support",
      active: isActive("/support"),
    },
    {
      icon: FiUpload,
      label: "Import Data",
      mobileLabel: "Import",
      path: "/import-excel",
      active: isActive("/import-excel"),
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex ${
          collapsed ? "w-16" : "w-64"
        } bg-white border-r border-slate-200 flex-col transition-all duration-300 ease-in-out h-[calc(100vh-4rem)] sticky top-16 flex-shrink-0`}
      >
        {/* Header */}
        <div className="p-3 border-b border-slate-100 flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-slate-800 text-sm">
                {role === "admin" ? "Admin Panel" : "Client Portal"}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {role === "admin" ? "System Management" : "Your Dashboard"}
              </p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors duration-200 text-slate-500 hover:text-slate-700"
          >
            {collapsed ? (
              <FiChevronRight className="w-4 h-4" />
            ) : (
              <FiChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 custom-scrollbar overflow-y-auto">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;

            if (item.onClick) {
              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    item.active
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                  title={collapsed ? item.label : ""}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      item.active
                        ? "text-blue-600"
                        : "text-slate-500 group-hover:text-slate-700"
                    } flex-shrink-0`}
                  />
                  {!collapsed && (
                    <span className="font-medium text-sm truncate">
                      {item.label}
                    </span>
                  )}
                  {item.active && !collapsed && !item.submenu && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto flex-shrink-0"></div>
                  )}
                  {!collapsed && item.submenu && (
                    <div className="ml-auto">
                      {openSubmenu ? (
                        <FiChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <FiChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  )}
                </button>
              );
            }

            if (item.submenu) {
              return (
                <div key={index}>
                  <button
                    onClick={toggleSubmenu}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                      item.active
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                    title={collapsed ? item.label : ""}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${
                        item.active
                          ? "text-blue-600"
                          : "text-slate-500 group-hover:text-slate-700"
                      } flex-shrink-0`}
                    />
                    {!collapsed && (
                      <span className="font-medium text-sm truncate">
                        {item.label}
                      </span>
                    )}
                    {item.active && !collapsed && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto flex-shrink-0"></div>
                    )}
                    {!collapsed && (
                      <div className="ml-auto">
                        {openSubmenu ? (
                          <FiChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <FiChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    )}
                  </button>

                  {!collapsed && openSubmenu && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                            subItem.active
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                          }`}
                        >
                          <span className="font-medium text-sm">
                            {subItem.label}
                          </span>
                          {subItem.active && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto flex-shrink-0"></div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  item.active
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
                title={collapsed ? item.label : ""}
              >
                <IconComponent
                  className={`w-5 h-5 ${
                    item.active
                      ? "text-blue-600"
                      : "text-slate-500 group-hover:text-slate-700"
                  } flex-shrink-0`}
                />
                {!collapsed && (
                  <span className="font-medium text-sm truncate">
                    {item.label}
                  </span>
                )}
                {item.active && !collapsed && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto flex-shrink-0"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-3 border-t border-slate-100">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-medium">W</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-800 truncate">
                  Wassal ERP
                </p>
                <p className="text-xs text-slate-500">v2.1.0</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-lg font-bold text-slate-800">Wassal ERP</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          >
            <FiX className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {role === "admin" ? "Admin Panel" : "Client Portal"}
            </p>
          </div>

          {menuItems.map((item, index) => {
            const IconComponent = item.icon;

            if (item.onClick) {
              return (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    item.active
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      item.active ? "text-blue-600" : "text-slate-500"
                    } flex-shrink-0`}
                  />
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.active && !item.submenu && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto flex-shrink-0"></div>
                  )}
                  {item.submenu && (
                    <div className="ml-auto">
                      {openSubmenu ? (
                        <FiChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <FiChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  )}
                </button>
              );
            }

            if (item.submenu) {
              return (
                <div key={index}>
                  <button
                    onClick={toggleSubmenu}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      item.active
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${
                        item.active ? "text-blue-600" : "text-slate-500"
                      } flex-shrink-0`}
                    />
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.active && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto flex-shrink-0"></div>
                    )}
                    <div className="ml-auto">
                      {openSubmenu ? (
                        <FiChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <FiChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {openSubmenu && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                            subItem.active
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                          }`}
                        >
                          <span className="font-medium text-sm">
                            {subItem.label}
                          </span>
                          {subItem.active && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto flex-shrink-0"></div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  item.active
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <IconComponent
                  className={`w-5 h-5 ${
                    item.active ? "text-blue-600" : "text-slate-500"
                  } flex-shrink-0`}
                />
                <span className="font-medium text-sm">{item.label}</span>
                {item.active && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full ml-auto flex-shrink-0"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Footer */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-medium">W</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-800 truncate">
                Wassal ERP
              </p>
              <p className="text-xs text-slate-500">v2.1.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Simplified */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30">
        <div className="grid grid-cols-4 gap-1 p-2">
          {/* Home */}
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
              isActive("/")
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FiHome
              className={`w-5 h-5 ${
                isActive("/") ? "text-blue-600" : "text-slate-500"
              }`}
            />
            <span className="text-xs font-medium">Home</span>
          </Link>

          {/* Tenants */}
          <button
            onClick={handleSitesClick}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
              isPathActive(["/site", "/sites"])
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FiGrid
              className={`w-5 h-5 ${
                isPathActive(["/site", "/sites"])
                  ? "text-blue-600"
                  : "text-slate-500"
              }`}
            />
            <span className="text-xs font-medium">Tenants</span>
          </button>

          {/* Fleet */}
          <Link
            to="/fleet"
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 ${
              isActive("/fleet")
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FiTruck
              className={`w-5 h-5 ${
                isActive("/fleet") ? "text-blue-600" : "text-slate-500"
              }`}
            />
            <span className="text-xs font-medium">Fleet</span>
          </Link>

          {/* Menu */}
          <button
            onClick={() => setMobileOpen(true)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 text-slate-600 hover:bg-slate-50"
          >
            <FiMenu className="w-5 h-5 text-slate-500" />
            <span className="text-xs font-medium">Menu</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
