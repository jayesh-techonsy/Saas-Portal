import React from "react";

const ActionButtons = ({ onPreview, onUpload, disabled }) => (
  <div className="flex flex-wrap gap-3">
    <button
      onClick={onPreview}
      disabled={disabled}
      className="bg-yellow-100 text-yellow-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-200 transition"
    >
      Preview Data
    </button>
    <button
      onClick={onUpload}
      disabled={disabled}
      className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
    >
      Import & Update
    </button>
  </div>
);

export default ActionButtons;
