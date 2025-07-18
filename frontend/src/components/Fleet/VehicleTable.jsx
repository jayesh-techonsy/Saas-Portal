import React from "react";

const VehicleTable = ({
  vehicles,
  employees,
  visibleCount,
  setVisibleCount,
  onEmployeeChange,
}) => (
  <>
    <div className="overflow-auto rounded-2xl shadow-sm border border-gray-200">
      <table className="min-w-full text-sm text-left text-gray-800">
        <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wide">
          <tr>
            <th className="px-4 py-3">Sr. No.</th>
            <th className="px-4 py-3">Arabic Plate</th>
            <th className="px-4 py-3">English Plate</th>
            <th className="px-4 py-3">Employee</th>
            <th className="px-4 py-3">License Expiry</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {vehicles.slice(0, visibleCount).map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.license_plate_ar}</td>
              <td className="px-4 py-2">{item.license_plate_en}</td>
              <td className="px-4 py-2">
                <select
                  value={item.employee_id || ""}
                  onChange={(e) =>
                    onEmployeeChange(item.license_plate_ar, e.target.value)
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="">Unassigned</option>
                  {employees.map((emp) => (
                    <option key={emp.name} value={emp.name}>
                      {emp.employee_name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-2">{item.license_expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {vehicles.length > 20 && (
      <div className="flex justify-center pt-4">
        {visibleCount < vehicles.length ? (
          <button
            onClick={() => setVisibleCount(visibleCount + 20)}
            className="bg-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
          >
            Load More
          </button>
        ) : (
          <button
            onClick={() => setVisibleCount(10)}
            className="bg-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
          >
            View Less
          </button>
        )}
      </div>
    )}
  </>
);

export default VehicleTable;
