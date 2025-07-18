import React from "react";
import { FaFileExcel, FaTimes } from "react-icons/fa";

const FileInfo = ({ file, onRemove }) => (
  <div className="bg-gray-100 border rounded-lg px-4 py-3 flex items-center justify-between text-sm">
    <div className="flex items-center gap-2">
      <FaFileExcel className="text-green-600" />
      <span className="text-gray-800 font-medium">{file.name}</span>
    </div>
    <button onClick={onRemove}>
      <FaTimes className="text-red-500 hover:text-red-700 transition" />
    </button>
  </div>
);

export default FileInfo;
