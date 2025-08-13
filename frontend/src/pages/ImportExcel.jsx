import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import { API_BASE_URL } from "../config/api";
 import { FiUpload,
  FiFile,
  FiTrash2,
  FiCheck,
  FiAlertCircle,
  FiDatabase,
  FiUsers,
  FiTruck,
} from "react-icons/fi";
import axios from "axios";

const detectType = (headers) => {
  const gosiHeaders = ["اسم المشترك", "الاجر الخاضع للاشتراك", "الأجر الأساسي"];
  const hrsdHeaders = ["رقم العامل", "اسم العامل", "الإقامة - البطاقة"];
  const fleetHeaders = ["Plate Number", "Vehicle Maker", "Model Year"];

  const headerSet = new Set(headers.map((h) => h?.toString().trim()));

  if (gosiHeaders.some((h) => headerSet.has(h))) return "GOSI Data";
  if (hrsdHeaders.some((h) => headerSet.has(h))) return "Worker Data";
  if (fleetHeaders.some((h) => headerSet.has(h))) return "Fleet Data";
  return "Unknown";
};

// 6,32,100 --->  5,74,084.35
const ImportExcel = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(null); // new loading state

  const extractHeaderAndPreview = (rows) => {
    let headerRowIndex = rows.findIndex(
      (row) => row.filter(Boolean).length >= 5
    );
    if (headerRowIndex === -1) headerRowIndex = 0;
    const headers = rows[headerRowIndex];
    const previewData = rows.slice(headerRowIndex + 1, headerRowIndex + 6);
    return { headers, previewData };
  };

  const onDrop = useCallback((acceptedFiles) => {
    const uploads = acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const { headers, previewData } = extractHeaderAndPreview(rows);
        const type = detectType(headers);

        setPreviews((prev) => [
          ...prev,
          { file, headers, preview: previewData, type },
        ]);
      };
      reader.readAsArrayBuffer(file);
      return file;
    });

    setFiles((prev) => [...prev, ...uploads]);
    toast.success("File(s) ready for preview!");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    multiple: true,
  });

  const handleUpload = async (fileObj, index) => {
    const formData = new FormData();
    formData.append("file", fileObj.file);

    let endpoint = "/api/upload-excel"; // default fallback
    if (fileObj.type === "Fleet Data") {
      endpoint = `${API_BASE_URL}/api/fleet/upload-and-import-vehicle`;
    } else if (fileObj.type === "GOSI Data") {
      endpoint = `${API_BASE_URL}/api/fleet/upload-and-import-gosi`;
    } else if (fileObj.type === "Worker Data") {
      endpoint = `${API_BASE_URL}/api/fleet/upload-and-import-worker`;
    }

    setLoadingIndex(index); // start spinner

    try {
      toast.info(`Uploading ${fileObj.file.name}...`);

      await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(`${fileObj.file.name} imported successfully!`);
      removeFile(index); // remove after success
    } catch (err) {
      toast.error(
        `❌ Failed: ${fileObj.file.name} — ${
          err.response?.data?.detail || "check backend logs"
        }`
      );
    } finally {
      setLoadingIndex(null); // reset spinner
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const getDataTypeIcon = (type) => {
    switch (type) {
      case "GOSI Data":
        return <FiDatabase className="w-5 h-5 text-blue-600" />;
      case "Worker Data":
        return <FiUsers className="w-5 h-5 text-green-600" />;
      case "Fleet Data":
        return <FiTruck className="w-5 h-5 text-purple-600" />;
      default:
        return <FiAlertCircle className="w-5 h-5 text-orange-600" />;
    }
  };

  const getDataTypeColor = (type) => {
    switch (type) {
      case "GOSI Data":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Worker Data":
        return "bg-green-100 text-green-700 border-green-200";
      case "Fleet Data":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-orange-100 text-orange-700 border-orange-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-heading-1 text-slate-800 flex items-center gap-3">
          <FiDatabase className="w-8 h-8 text-blue-600" />
          Data Import Center
        </h1>
        <p className="text-slate-600 mt-1">
          Upload and import Excel files for GOSI, Worker, and Fleet data
        </p>
      </div>

      {/* Upload Section */}
      <div className="card p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer ${
            isDragActive
              ? "border-blue-400 bg-blue-50"
              : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="w-16 h-16 text-slate-400 mx-auto mb-6" />
          {isDragActive ? (
            <div>
              <p className="text-blue-600 font-semibold text-lg mb-2">
                Drop your Excel files here
              </p>
              <p className="text-slate-600">Release to upload and process</p>
            </div>
          ) : (
            <div>
              <p className="text-slate-800 font-semibold text-lg mb-2">
                Drag & drop Excel files here, or click to browse
              </p>
              <p className="text-slate-600 mb-4">
                Supports .xlsx files for GOSI, Worker, and Fleet data
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <FiDatabase className="w-4 h-4" />
                  <span>GOSI Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiUsers className="w-4 h-4" />
                  <span>Worker Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiTruck className="w-4 h-4" />
                  <span>Fleet Data</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* File Previews */}
      {previews.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-heading-2 text-slate-800">
              Files Ready for Import ({previews.length})
            </h2>
          </div>

          {previews.map((item, index) => (
            <div key={index} className="card overflow-hidden">
              {/* File Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <FiFile className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">
                        {item.file.name}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getDataTypeColor(
                            item.type
                          )}`}
                        >
                          {getDataTypeIcon(item.type)}
                          {item.type}
                        </span>
                        <span className="text-sm text-slate-500">
                          {(item.file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200 text-slate-400 hover:text-red-600"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Data Preview */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="table-header">
                    <tr>
                      {item.headers.map((header, i) => (
                        <th
                          key={i}
                          className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {item.preview.map((row, rowIndex) => (
                      <tr key={rowIndex} className="table-row">
                        {item.headers.map((_, colIndex) => (
                          <td
                            key={colIndex}
                            className="px-6 py-4 text-sm text-slate-800 whitespace-nowrap"
                          >
                            {row[colIndex] ?? "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Preview showing first 5 rows • {item.headers.length} columns
                    detected
                  </div>
                  <button
                    onClick={() => handleUpload(item, index)}
                    disabled={loadingIndex === index}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      loadingIndex === index
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md"
                    }`}
                  >
                    {loadingIndex === index ? (
                      <>
                        <div className="loading-spinner"></div>
                        Importing...
                      </>
                    ) : (
                      <>
                        <FiCheck className="w-4 h-4" />
                        Import Data
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {previews.length === 0 && (
        <div className="card p-12 text-center">
          <FiDatabase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-800 mb-2">
            No files uploaded yet
          </h3>
          <p className="text-slate-600 mb-6">
            Upload your Excel files to see data previews and import options
          </p>
        </div>
      )}
    </div>
  );
};

export default ImportExcel;
