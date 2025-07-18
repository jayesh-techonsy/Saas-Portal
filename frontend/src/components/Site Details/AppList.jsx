import React, { useState } from "react";
import { FaDownload, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const AppList = ({ apps, userRole, siteId, fetchSiteDetails }) => {
  const [visibleAppsCount, setVisibleAppsCount] = useState(5);
  const [loadingAppName, setLoadingAppName] = useState(null);

  const handleAppAction = async (app) => {
    const action = app.installed ? "uninstall" : "install";
    const url = `http://localhost:8000/api/app/${siteId}/${action}`;
    setLoadingAppName(app.name);
    try {
      await axios.post(url, null, {
        params: {
          app_name: app.name,
        },
      });
      toast.success(`App ${action}ed successfully`);
      await fetchSiteDetails();
    } catch (error) {
      toast.error(`Failed to ${action} app`);
    } finally {
      setLoadingAppName(null);
    }
  };

  const handleViewMore = () => {
    setVisibleAppsCount(apps.length);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Apps</h2>
      <ul className="text-gray-600 space-y-1">
        {apps.length > 0 ? (
          <>
            {apps.slice(0, visibleAppsCount).map((app, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm hover:bg-gray-100 transition-all"
              >
                <span className="font-medium text-gray-800">{app.name}</span>
                {userRole !== "client" && (
                  <button
                    onClick={() => handleAppAction(app)}
                    disabled={loadingAppName === app.name}
                    className={`px-4 py-1 text-sm rounded-lg hover:cursor-pointer hover:bg-transparent font-semibold flex items-center justify-center gap-2 ${
                      app.installed
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-green-100 text-green-600 hover:bg-green-200"
                    } ${
                      loadingAppName === app.name
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    } transition-colors duration-200`}
                  >
                    {loadingAppName === app.name ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : app.installed ? (
                      <>
                        <FaTrashAlt className="text-sm" />
                        Uninstall
                      </>
                    ) : (
                      <>
                        <FaDownload className="text-sm" />
                        Install
                      </>
                    )}
                  </button>
                )}
              </li>
            ))}

            {apps.length > 5 && visibleAppsCount < apps.length && (
              <div className="text-center mt-4">
                <button
                  onClick={handleViewMore}
                  className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:cursor-pointer hover:bg-gray-300 transition"
                >
                  View More
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">No apps found</p>
        )}
      </ul>
    </div>
  );
};

export default AppList;
