import React from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";

const DropzoneUploader = ({
  onDrop,
  isDragActive,
  getInputProps,
  getRootProps,
}) => (
  <div
    {...getRootProps()}
    className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${
      isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
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
);

export default DropzoneUploader;
