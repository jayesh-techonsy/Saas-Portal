import React from "react";
import { FiExternalLink } from "react-icons/fi";

const SiteHeader = ({ siteId }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-800">{siteId}</h1>
      <a
        href={`https://${siteId}/app/home`}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 px-4 py-2 rounded-md bg-black text-white border border-transparent hover:bg-transparent hover:text-black hover:border-black hover:scale-105 transition-all duration-300 ease-in-out text-sm shadow inline-flex items-center gap-2"
      >
        <FiExternalLink className="text-base" />
        Visit Site
      </a>
    </div>
  );
};

export default SiteHeader;
