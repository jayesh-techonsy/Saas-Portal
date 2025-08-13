import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../config/api";
const GetApps = () => {
  const [installedApps, setInstalledApps] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchApps = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Check if the token exists, if not show toast and redirect to login
      if (!token) {
        toast.error("Login required to access installed apps.");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page
        }, 2000); // Delay the redirect so the user can see the toast message
        return;
      }

      // Proceed to fetch data with token if it exists
      const res = await axios.get(`${API_BASE_URL}/api/apps/apps`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInstalledApps(res.data.apps);
    } catch (err) {
      toast.error("Failed to fetch apps list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Installed Apps</h2>
      <button
        onClick={fetchApps}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Get Installed Apps
      </button>
      {loading ? <p>Loading...</p> : null}
      {installedApps.length > 0 && (
        <ul>
          {installedApps.map((app, idx) => (
            <li key={idx} className="mb-2">
              <span>{app}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetApps;
