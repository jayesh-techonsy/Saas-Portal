// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   FaUser,
//   FaVenusMars,
//   FaGlobe,
//   FaIdCard,
//   FaRegIdBadge,
//   FaBuilding,
//   FaMapMarkerAlt,
//   FaUsers,
//   FaCalendarAlt,
//   FaMoneyBillWave,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaDatabase,
// } from "react-icons/fa";

// const DetailItem = ({ icon: Icon, label, value, color = "text-gray-700" }) => (
//   <div className="flex items-start gap-2 text-sm text-gray-700">
//     <Icon className={`mt-1 ${color}`} />
//     <p>
//       <strong>{label}:</strong> {value || "N/A"}
//     </p>
//   </div>
// );

// const EmployeeDetails = () => {
//   const { iqama_number } = useParams();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8000/api/employee/pool/${iqama_number}`
//         );
//         if (res.data.status === "success") {
//           setData(res.data.data);
//         }
//       } catch (err) {
//         console.error("Failed to fetch employee details", err);
//       }
//     };

//     fetchEmployee();
//   }, [iqama_number]);

//   if (!data) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-8 max-w-5xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//         <FaRegIdBadge className="text-indigo-500" />
//         Employee Details
//       </h2>

//       {/* Identification Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-3">
//           <DetailItem icon={FaUser} label="Full Name" value={data.full_name} />
//           <DetailItem icon={FaVenusMars} label="Gender" value={data.gender} />
//           <DetailItem
//             icon={FaGlobe}
//             label="Nationality"
//             value={data.nationality}
//           />
//           <DetailItem
//             icon={FaIdCard}
//             label="Identity Number"
//             value={data.identity_number}
//           />
//           <DetailItem
//             icon={FaRegIdBadge}
//             label="Iqama Number"
//             value={data.iqama_number}
//           />
//           <DetailItem icon={FaUsers} label="Worker ID" value={data.worker_id} />
//         </div>

//         {/* Company Info */}
//         <div className="space-y-3">
//           <DetailItem
//             icon={FaBuilding}
//             label="Company ID"
//             value={data.company_id}
//           />
//           <DetailItem
//             icon={FaBuilding}
//             label="Company Name"
//             value={data.company_name}
//           />
//           <DetailItem
//             icon={FaMapMarkerAlt}
//             label="Branch Name"
//             value={data.branch_name}
//           />
//           <DetailItem
//             icon={FaUsers}
//             label="Worker Type"
//             value={data.worker_type}
//           />
//         </div>
//       </div>

//       {/* Date Info */}
//       <div>
//         <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
//           <FaCalendarAlt className="text-blue-500" />
//           Dates
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <DetailItem
//             icon={FaCalendarAlt}
//             label="Date of Birth"
//             value={data.date_of_birth}
//           />
//           <DetailItem
//             icon={FaCalendarAlt}
//             label="Joining Date"
//             value={data.joining_date}
//           />
//           <DetailItem
//             icon={FaCalendarAlt}
//             label="Entry Date"
//             value={data.entry_date}
//           />
//           <DetailItem
//             icon={FaCalendarAlt}
//             label="Expiry Date"
//             value={data.expiry_date}
//           />
//         </div>
//       </div>

//       {/* Salary Info */}
//       <div>
//         <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
//           <FaMoneyBillWave className="text-green-500" />
//           Salary Info
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <DetailItem
//             icon={FaMoneyBillWave}
//             label="Basic Salary"
//             value={data.basic_salary}
//           />
//           <DetailItem
//             icon={FaMoneyBillWave}
//             label="Commissions"
//             value={data.commissions}
//           />
//           <DetailItem
//             icon={FaMoneyBillWave}
//             label="Other Allowances"
//             value={data.other_allowances}
//           />
//           <DetailItem
//             icon={FaMoneyBillWave}
//             label="Other Deductions"
//             value={data.other_deductions}
//           />
//           <DetailItem
//             icon={FaMoneyBillWave}
//             label="Total Salary"
//             value={data.total_salary}
//           />
//           <DetailItem
//             icon={FaMoneyBillWave}
//             label="Consolidated Salary"
//             value={data.consolidated_salary}
//           />
//         </div>
//       </div>

//       {/* Source Info */}
//       <div>
//         <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
//           <FaDatabase className="text-purple-500" />
//           Source Info
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <DetailItem
//             icon={FaCheckCircle}
//             label="Is GOSI Data"
//             value={data.is_gosi_data ? "Yes" : "No"}
//             color={data.is_gosi_data ? "text-green-600" : "text-red-500"}
//           />
//           <DetailItem
//             icon={FaDatabase}
//             label="GOSI Worker Data"
//             value={data.gosi_worker_data}
//           />
//           <DetailItem
//             icon={FaCheckCircle}
//             label="Is Worker Data"
//             value={data.is_worker_data ? "Yes" : "No"}
//             color={data.is_worker_data ? "text-green-600" : "text-red-500"}
//           />
//           <DetailItem
//             icon={FaDatabase}
//             label="HRSD Worker Data"
//             value={data.worker_data}
//           />
//           <DetailItem
//             icon={FaDatabase}
//             label="Registered Employee"
//             value={data.registered_employee}
//           />
//           <DetailItem
//             icon={FaCheckCircle}
//             label="Ready to Register"
//             value={data.ready_to_register ? "Yes" : "No"}
//             color={data.ready_to_register ? "text-green-600" : "text-red-500"}
//           />
//           <DetailItem
//             icon={FaDatabase}
//             label="HRSD Status"
//             value={data.hrsd_status}
//           />
//           <DetailItem
//             icon={FaDatabase}
//             label="GOSI Status"
//             value={data.gosi_status}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUser,
  FaVenusMars,
  FaGlobe,
  FaIdCard,
  FaRegIdBadge,
  FaBuilding,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaDatabase,
  FaUserPlus,
} from "react-icons/fa";

const DetailItem = ({ icon: Icon, label, value, color = "text-gray-700" }) => (
  <div className="flex items-start gap-2 text-sm text-gray-700">
    <Icon className={`mt-1 ${color}`} />
    <p>
      <strong>{label}:</strong> {value || "N/A"}
    </p>
  </div>
);

const EmployeeDetails = () => {
  const { iqama_number } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/employee/pool/${iqama_number}`
        );
        if (res.data.status === "success") {
          setData(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch employee details", err);
      }
    };

    fetchEmployee();
  }, [iqama_number]);

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/employee/register/${data.name}`
      );
      console.log("Register success:", res.data);
      toast.success("✅ Employee registered successfully!");
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("❌ Registration failed.");
    }
  };

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaRegIdBadge className="text-indigo-500" />
          Employee Details
        </h2>
        <button
          onClick={handleRegister}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaUserPlus />
          Register
        </button>
      </div>

      {/* Identification Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <DetailItem icon={FaUser} label="Full Name" value={data.full_name} />
          <DetailItem icon={FaVenusMars} label="Gender" value={data.gender} />
          <DetailItem
            icon={FaGlobe}
            label="Nationality"
            value={data.nationality}
          />
          <DetailItem
            icon={FaIdCard}
            label="Identity Number"
            value={data.identity_number}
          />
          <DetailItem
            icon={FaRegIdBadge}
            label="Iqama Number"
            value={data.iqama_number}
          />
          <DetailItem icon={FaUsers} label="Worker ID" value={data.worker_id} />
        </div>

        {/* Company Info */}
        <div className="space-y-3">
          <DetailItem
            icon={FaBuilding}
            label="Company ID"
            value={data.company_id}
          />
          <DetailItem
            icon={FaBuilding}
            label="Company Name"
            value={data.company_name}
          />
          <DetailItem
            icon={FaMapMarkerAlt}
            label="Branch Name"
            value={data.branch_name}
          />
          <DetailItem
            icon={FaUsers}
            label="Worker Type"
            value={data.worker_type}
          />
        </div>
      </div>

      {/* Date Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" />
          Dates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem
            icon={FaCalendarAlt}
            label="Date of Birth"
            value={data.date_of_birth}
          />
          <DetailItem
            icon={FaCalendarAlt}
            label="Joining Date"
            value={data.joining_date}
          />
          <DetailItem
            icon={FaCalendarAlt}
            label="Entry Date"
            value={data.entry_date}
          />
          <DetailItem
            icon={FaCalendarAlt}
            label="Expiry Date"
            value={data.expiry_date}
          />
        </div>
      </div>

      {/* Salary Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <FaMoneyBillWave className="text-green-500" />
          Salary Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem
            icon={FaMoneyBillWave}
            label="Basic Salary"
            value={data.basic_salary}
          />
          <DetailItem
            icon={FaMoneyBillWave}
            label="Commissions"
            value={data.commissions}
          />
          <DetailItem
            icon={FaMoneyBillWave}
            label="Other Allowances"
            value={data.other_allowances}
          />
          <DetailItem
            icon={FaMoneyBillWave}
            label="Other Deductions"
            value={data.other_deductions}
          />
          <DetailItem
            icon={FaMoneyBillWave}
            label="Total Salary"
            value={data.total_salary}
          />
          <DetailItem
            icon={FaMoneyBillWave}
            label="Consolidated Salary"
            value={data.consolidated_salary}
          />
        </div>
      </div>

      {/* Source Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <FaDatabase className="text-purple-500" />
          Source Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem
            icon={FaCheckCircle}
            label="Is GOSI Data"
            value={data.is_gosi_data ? "Yes" : "No"}
            color={data.is_gosi_data ? "text-green-600" : "text-red-500"}
          />
          <DetailItem
            icon={FaDatabase}
            label="GOSI Worker Data"
            value={data.gosi_worker_data}
          />
          <DetailItem
            icon={FaCheckCircle}
            label="Is Worker Data"
            value={data.is_worker_data ? "Yes" : "No"}
            color={data.is_worker_data ? "text-green-600" : "text-red-500"}
          />
          <DetailItem
            icon={FaDatabase}
            label="HRSD Worker Data"
            value={data.worker_data}
          />
          <DetailItem
            icon={FaDatabase}
            label="Registered Employee"
            value={data.registered_employee}
          />
          <DetailItem
            icon={FaCheckCircle}
            label="Ready to Register"
            value={data.ready_to_register ? "Yes" : "No"}
            color={data.ready_to_register ? "text-green-600" : "text-red-500"}
          />
          <DetailItem
            icon={FaDatabase}
            label="HRSD Status"
            value={data.hrsd_status}
          />
          <DetailItem
            icon={FaDatabase}
            label="GOSI Status"
            value={data.gosi_status}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
