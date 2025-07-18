// import React, { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { toast } from "react-toastify";
// import * as XLSX from "xlsx";
// import { FaUpload, FaFileExcel, FaTrashAlt } from "react-icons/fa";
// import axios from "axios";

// const detectType = (headers) => {
//   const gosiHeaders = ["اسم المشترك", "الاجر الخاضع للاشتراك", "الأجر الأساسي"];
//   const hrsdHeaders = ["رقم العامل", "اسم العامل", "الإقامة - البطاقة"];
//   const fleetHeaders = ["Plate Number", "Vehicle Maker", "Model Year"];

//   const headerSet = new Set(headers.map((h) => h?.toString().trim()));

//   if (gosiHeaders.some((h) => headerSet.has(h))) return "GOSI Data";
//   if (hrsdHeaders.some((h) => headerSet.has(h))) return "Worker Data";
//   if (fleetHeaders.some((h) => headerSet.has(h))) return "Fleet Data";
//   return "Unknown";
// };

// const ImportExcel = () => {
//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   const extractHeaderAndPreview = (rows) => {
//     let headerRowIndex = rows.findIndex(
//       (row) => row.filter(Boolean).length >= 5
//     );
//     if (headerRowIndex === -1) headerRowIndex = 0;
//     const headers = rows[headerRowIndex];
//     const previewData = rows.slice(headerRowIndex + 1, headerRowIndex + 6);
//     return { headers, previewData };
//   };

//   const onDrop = useCallback((acceptedFiles) => {
//     const uploads = acceptedFiles.map((file) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: "array" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//         const { headers, previewData } = extractHeaderAndPreview(rows);
//         const type = detectType(headers);

//         setPreviews((prev) => [
//           ...prev,
//           { file, headers, preview: previewData, type },
//         ]);
//       };
//       reader.readAsArrayBuffer(file);
//       return file;
//     });

//     setFiles((prev) => [...prev, ...uploads]);
//     toast.success("File(s) ready for preview!");
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
//         ".xlsx",
//       ],
//     },
//     multiple: true,
//   });

//   const handleUpload = async (fileObj) => {
//     const formData = new FormData();
//     formData.append("file", fileObj.file);

//     try {
//       toast.info(`Uploading ${fileObj.file.name}...`);
//       await axios.post("/api/upload-excel", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success(`${fileObj.file.name} imported successfully!`);
//     } catch (err) {
//       toast.error(
//         `❌ Failed: ${fileObj.file.name} — ${
//           err.response?.data?.detail || "check backend logs"
//         }`
//       );
//     }
//   };

//   const removeFile = (index) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index));
//     setPreviews((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="min-h-[70vh] bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl p-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">
//           📥 Upload & Import Excel Files
//         </h2>

//         {/* Upload Box */}
//         <div
//           {...getRootProps()}
//           className={`border-2 border-dashed rounded-lg p-10 text-center transition-all cursor-pointer ${
//             isDragActive
//               ? "border-blue-500 bg-blue-50"
//               : "border-gray-300 bg-gray-50"
//           }`}
//         >
//           <input {...getInputProps()} />
//           <FaUpload className="text-4xl mx-auto mb-3 text-blue-500" />
//           <p className="text-gray-600 text-sm">
//             {isDragActive
//               ? "Drop the file here..."
//               : "Drag and drop Excel file(s) or click to select"}
//           </p>
//         </div>

//         {/* File Previews */}
//         {previews.length > 0 && (
//           <div className="space-y-8 mt-8">
//             {previews.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4"
//               >
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                     <FaFileExcel className="text-green-600" />
//                     <span>{item.file.name}</span>
//                     <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold">
//                       {item.type}
//                     </span>
//                   </div>
//                   <button
//                     onClick={() => removeFile(index)}
//                     className="text-red-500 hover:text-red-700 cursor-pointer"
//                   >
//                     <FaTrashAlt />
//                   </button>
//                 </div>

//                 <div className="overflow-x-auto border border-gray-200 rounded-lg">
//                   <table className="min-w-full text-sm text-left text-gray-800">
//                     <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
//                       <tr>
//                         {item.headers.map((header, i) => (
//                           <th
//                             key={i}
//                             className="px-4 py-2 font-semibold whitespace-nowrap"
//                           >
//                             {header}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {item.preview.map((row, rowIndex) => (
//                         <tr
//                           key={rowIndex}
//                           className={
//                             rowIndex % 2 === 0
//                               ? "bg-white hover:bg-blue-50"
//                               : "bg-gray-50 hover:bg-blue-50"
//                           }
//                         >
//                           {item.headers.map((_, colIndex) => (
//                             <td
//                               key={colIndex}
//                               className="px-4 py-2 whitespace-nowrap"
//                             >
//                               {row[colIndex] ?? ""}
//                             </td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="text-right">
//                   <button
//                     onClick={() => handleUpload(item)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold cursor-pointer"
//                   >
//                     🚀 Import This File
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImportExcel;

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { FaUpload, FaFileExcel, FaTrashAlt } from "react-icons/fa";
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

const ImportExcel = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

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

  const handleUpload = async (fileObj) => {
    const formData = new FormData();
    formData.append("file", fileObj.file);

    let endpoint = "/api/upload-excel";
    if (fileObj.type === "Fleet Data") {
      endpoint = "http://localhost:8000/api/fleet/upload-and-import-vehicle";
    }

    try {
      toast.info(`Uploading ${fileObj.file.name}...`);
      await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(`${fileObj.file.name} imported successfully!`);
    } catch (err) {
      toast.error(
        `❌ Failed: ${fileObj.file.name} — ${
          err.response?.data?.detail || "check backend logs"
        }`
      );
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-[70vh] bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          📥 Upload & Import Excel Files
        </h2>

        {/* Upload Box */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-10 text-center transition-all cursor-pointer ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <FaUpload className="text-4xl mx-auto mb-3 text-blue-500" />
          <p className="text-gray-600 text-sm">
            {isDragActive
              ? "Drop the file here..."
              : "Drag and drop Excel file(s) or click to select"}
          </p>
        </div>

        {/* File Previews */}
        {previews.length > 0 && (
          <div className="space-y-8 mt-8">
            {previews.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FaFileExcel className="text-green-600" />
                    <span>{item.file.name}</span>
                    <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                      {item.type}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <FaTrashAlt />
                  </button>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="min-w-full text-sm text-left text-gray-800">
                    <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
                      <tr>
                        {item.headers.map((header, i) => (
                          <th
                            key={i}
                            className="px-4 py-2 font-semibold whitespace-nowrap"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item.preview.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={
                            rowIndex % 2 === 0
                              ? "bg-white hover:bg-blue-50"
                              : "bg-gray-50 hover:bg-blue-50"
                          }
                        >
                          {item.headers.map((_, colIndex) => (
                            <td
                              key={colIndex}
                              className="px-4 py-2 whitespace-nowrap"
                            >
                              {row[colIndex] ?? ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-right">
                  <button
                    onClick={() => handleUpload(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold cursor-pointer"
                  >
                    🚀 Import This File
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportExcel;
