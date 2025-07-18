// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Sites = () => {
//   const [siteList, setSiteList] = useState([]);
//   const [loading, setLoading] = useState(false);

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

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Sites</h2>
//       <button
//         onClick={fetchSites}
//         className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
//       >
//         Get All Sites
//       </button>
//       {loading ? <p>Loading...</p> : null}
//       {siteList.length > 0 && (
//         <ul>
//           {siteList.map((site, idx) => (
//             <li key={idx} className="mb-2">
//               <span>{site}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Sites;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const Sites = () => {
  const [siteList, setSiteList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSites = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/sites");
      setSiteList(res.data.sites);
    } catch (err) {
      toast.error("Failed to fetch site list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen relative">
        <div className="transform -translate-y-36 -translate-x-40">
          <HashLoader size={75} color="#4B5563" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Sites</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
        {siteList.map((site, idx) => (
          <div
            key={idx}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate(`/site/${site}`);
            }}
            className="cursor-pointer bg-white border border-gray-200 p-6 rounded-2xl shadow hover:shadow-lg hover:bg-blue-50 transition duration-200"
          >
            <h3 className="text-lg font-semibold text-blue-700">{site}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sites;
