import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload, FaFileExcel, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { API_BASE_URL } from "../config/api";
const FleetDetails = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [vehicleData, setVehicleData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      toast.success("File uploaded successfully!");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: false,
  });

  const handlePreview = () => {
    if (!file) return toast.error("No file selected!");

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      let headerIndex = rows.findIndex(
        (row) => row.filter(Boolean).length >= 5
      );
      const headers = rows[headerIndex];
      const dataRows = rows.slice(headerIndex + 1).filter((row) => row.length);

      const preview = dataRows.map((row) =>
        headers.reduce((obj, key, index) => {
          obj[key] = row[index] ?? "";
          return obj;
        }, {})
      );

      setHeaders(headers);
      setPreviewData(preview);
      setShowModal(true);
    };
    reader.readAsArrayBuffer(file);
  };

  const fetchVehicleData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/fleet/vehicles`);
      setVehicleData(res.data.vehicles || []);
    } catch (error) {
      toast.error("Failed to fetch vehicle data.");
      console.error("Vehicle fetch error:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/fleet/employees`);
      setEmployees(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch employees.");
      console.error("Employee fetch error:", error);
    }
  };

  const handleEmployeeUpdate = async (licensePlate, newEmployee) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/fleet/update-vehicle-employee`,
        null,
        {
          params: {
            license_plate: licensePlate,
            employee: newEmployee,
          },
        }
      );
      toast.success("Employee updated!");
      fetchVehicleData();
    } catch (err) {
      toast.error("Update failed.");
    }
  };

  useEffect(() => {
    fetchVehicleData();
    fetchEmployees();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-heading-1 text-slate-800">Fleet Management</h1>
          <p className="text-slate-600 mt-1">
            Manage your vehicle fleet and employee assignments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePreview}
            disabled={!file}
            className={`btn-secondary ${
              !file ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaFileExcel className="w-4 h-4 mr-2" />
            Preview Data
          </button>
        </div>
      </div>

      {/* Upload Section
      <div className="card p-6">
        <h2 className="text-heading-3 text-slate-800 mb-4">
          Import Vehicle Data
        </h2>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
            isDragActive
              ? "border-blue-400 bg-blue-50"
              : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
          }`}
        >
          <input {...getInputProps()} />
          <FaUpload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-blue-600 font-medium">
              Drop the Excel file here...
            </p>
          ) : (
            <div>
              <p className="text-slate-700 font-medium mb-2">
                Drag & drop an Excel file here, or click to select
              </p>
              <p className="text-sm text-slate-500">
                Supports .xlsx files only
              </p>
            </div>
          )}
          {file && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg inline-block">
              <p className="text-green-700 text-sm font-medium">
                ✓ {file.name} selected
              </p>
            </div>
          )}
        </div>
      </div> */}

      {/* Fleet Table */}
      <div className="card">
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-heading-3 text-slate-800">Vehicle Fleet</h2>
              <p className="text-sm text-slate-600 mt-1">
                {vehicleData.length} vehicles total
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Arabic Plate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  English Plate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Assigned Employee
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  License Expiry
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicleData.slice(0, visibleCount).map((item, index) => (
                <tr key={index} className="table-row">
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800">
                    <div className="font-medium">{item.license_plate_ar}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-800">
                    <div className="font-medium">{item.license_plate_en}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <select
                      value={item.employee_id || ""}
                      onChange={(e) =>
                        handleEmployeeUpdate(
                          item.license_plate_ar,
                          e.target.value
                        )
                      }
                      className="input-field py-2 text-sm min-w-[200px]"
                    >
                      <option value="">Select Employee</option>
                      {employees.map((emp) => (
                        <option key={emp.name} value={emp.name}>
                          {emp.employee_name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {item.license_expiry_date ? (
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          new Date(item.license_expiry_date) < new Date()
                            ? "bg-red-100 text-red-700"
                            : new Date(item.license_expiry_date) <
                              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.license_expiry_date}
                      </span>
                    ) : (
                      <span className="text-slate-400">Not set</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {vehicleData.length > 10 && (
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {Math.min(visibleCount, vehicleData.length)} of{" "}
              {vehicleData.length} vehicles
            </div>
            <div className="flex gap-2">
              {visibleCount < vehicleData.length ? (
                <button
                  onClick={() => setVisibleCount(visibleCount + 20)}
                  className="btn-secondary"
                >
                  Load More
                </button>
              ) : (
                <button
                  onClick={() => setVisibleCount(10)}
                  className="btn-secondary"
                >
                  Show Less
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-6xl w-full max-h-[80vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-heading-3 text-slate-800">
                Preview Vehicle Data
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <FaTimes className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6 overflow-auto custom-scrollbar max-h-[60vh]">
              <div className="overflow-x-auto">
                <table className="w-full border border-slate-200 rounded-lg">
                  <thead className="bg-slate-50">
                    <tr>
                      {headers.map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-200"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {previewData.map((row, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-slate-50">
                        {headers.map((header, colIndex) => (
                          <td
                            key={colIndex}
                            className="px-4 py-3 text-sm text-slate-800 whitespace-nowrap"
                          >
                            {row[header]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetDetails;
