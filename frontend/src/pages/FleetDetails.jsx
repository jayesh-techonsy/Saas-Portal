import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload, FaFileExcel, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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

  const handleUpload = async () => {
    if (!file) return toast.error("📂 No file selected!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      toast.info("⏳ Uploading and importing vehicle data...");

      const response = await axios.post(
        "http://localhost:8000/api/fleet/upload-and-import-vehicle",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("✅ Vehicle data uploaded, imported & transferred!");
      console.log("Server Response:", response.data);
      fetchVehicleData(); // Refresh after upload
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(
        err.response?.data?.detail ||
          "❌ Upload or import failed. Check backend logs."
      );
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewData([]);
    setHeaders([]);
    setShowModal(false);
  };

  const fetchVehicleData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/fleet/vehicles");
      setVehicleData(res.data.vehicles || []);
    } catch (error) {
      toast.error("Failed to fetch vehicle data.");
      console.error("Vehicle fetch error:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/fleet/employees");
      setEmployees(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch employees.");
      console.error("Employee fetch error:", error);
    }
  };

  const handleEmployeeUpdate = async (licensePlate, newEmployee) => {
    try {
      await axios.post(
        "http://localhost:8000/api/fleet/update-vehicle-employee",
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
    <div className="min-h-[66vh] p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 shadow space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Fleet Management</h2>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2">
            <FaUpload className="text-3xl text-blue-600" />
            <p className="text-gray-600">
              {isDragActive
                ? "Drop the file here..."
                : "Drag and drop your Excel file here or click to upload"}
            </p>
          </div>
        </div>

        {/* File Info */}
        {file && (
          <div className="bg-gray-100 border rounded-lg px-4 py-3 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <FaFileExcel className="text-green-600" />
              <span className="text-gray-800 font-medium">{file.name}</span>
            </div>
            <button onClick={removeFile}>
              <FaTimes className="text-red-500 hover:text-red-700 transition" />
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handlePreview}
            disabled={!file}
            className="bg-yellow-100 text-yellow-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-200 transition"
          >
            Preview Data
          </button>
          <button
            onClick={handleUpload}
            disabled={!file}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
          >
            Import & Update
          </button>
        </div>

        {/* Table */}
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
              {vehicleData.slice(0, visibleCount).map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.license_plate_ar}</td>
                  <td className="px-4 py-2">{item.license_plate_en}</td>
                  <td className="px-4 py-2">
                    <select
                      value={item.employee_id || ""}
                      onChange={(e) =>
                        handleEmployeeUpdate(
                          item.license_plate_ar,
                          e.target.value
                        )
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

        {/* Load More */}
        {vehicleData.length > 20 && (
          <div className="flex justify-center pt-4">
            {visibleCount < vehicleData.length ? (
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute bg-opacity-100 top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white w-[90vw] max-w-6xl max-h-[70vh] overflow-auto rounded-xl shadow-lg relative border">
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                Preview Vehicle Data
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={18} />
              </button>
            </div>
            <div className="overflow-auto px-6 pb-6">
              <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
                <thead className="bg-gray-100 text-gray-900 sticky top-0 z-10">
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="px-3 py-2 border whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {headers.map((header, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-3 py-1 border whitespace-nowrap"
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
      )}
    </div>
  );
};

export default FleetDetails;
