import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const EmployeePool = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchEmployeePool = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/employee/pool"
      );
      setEmployeeData(response.data.employees);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("❌ Failed to fetch employee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeePool();
  }, []);

  const handleRowClick = (iqamaNumber) => {
    if (iqamaNumber) {
      navigate(`/employee/${iqamaNumber}`);
    } else {
      toast.warning("Iqama number not available");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🧑‍💼 Employee Pool</h1>
        <button
          onClick={fetchEmployeePool}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen relative">
          <div className="transform -translate-y-36 -translate-x-40">
            <HashLoader size={75} color="#4B5563" />
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">#</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Employee Name
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Employee Id
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Iqama Number
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  GOSI Status
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  HRSD Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {employeeData.map((emp, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                  onClick={() => handleRowClick(emp.iqama_number)}
                >
                  <td className="px-4 py-2 text-gray-500">{index + 1}</td>
                  <td className="px-4 py-2">{emp.full_name || "—"}</td>
                  <td className="px-4 py-2">
                    {emp.registered_employee || "-"}
                  </td>
                  <td className="px-4 py-2">{emp.iqama_number || "—"}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        emp.gosi_status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.gosi_status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        emp.hrsd_status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.hrsd_status}
                    </span>
                  </td>
                </tr>
              ))}
              {employeeData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No employee data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeePool;
