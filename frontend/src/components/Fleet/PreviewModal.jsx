import React from "react";
import { FaTimes } from "react-icons/fa";

const PreviewModal = ({ showModal, setShowModal, headers, previewData }) => {
  if (!showModal) return null;

  return (
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
  );
};

export default PreviewModal;
