import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RemoteApps = () => {
  const [remoteApps, setRemoteApps] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRemoteApps = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/app/remote-apps");
      setRemoteApps(res.data.apps);
    } catch (err) {
      toast.error("Failed to fetch remote apps list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Remote Apps</h2>
      <button
        onClick={fetchRemoteApps}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Get Remote Apps
      </button>
      {loading ? <p>Loading...</p> : null}
      {remoteApps.length > 0 && (
        <ul>
          {remoteApps.map((app, idx) => (
            <li key={idx} className="mb-2">
              <span>{app}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RemoteApps;
