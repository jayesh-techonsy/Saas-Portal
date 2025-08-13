import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiServer,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <FiServer className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Wassal ERP</span>
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Multi-tenant ERPNext solutions for modern businesses. Scalable,
              secure, and reliable.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <FiMail className="w-3 h-3 text-blue-400 flex-shrink-0" />
                <span className="truncate">support@wassalerp.com</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <FiPhone className="w-3 h-3 text-blue-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Platform</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-400 transition-colors duration-200 block"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/sites"
                  className="hover:text-blue-400 transition-colors duration-200 block"
                >
                  Tenants
                </Link>
              </li>
              <li>
                <Link
                  to="/fleet"
                  className="hover:text-blue-400 transition-colors duration-200 block"
                >
                  Fleet
                </Link>
              </li>
              <li>
                <Link
                  to="/employees"
                  className="hover:text-blue-400 transition-colors duration-200 block"
                >
                  Employees
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Support</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-400 transition-colors duration-200 block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-400 transition-colors duration-200 block"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-200 block"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-blue-400 transition-colors duration-200 block"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Connect</h3>
            <div className="flex gap-2 mb-4">
              <a
                href="#"
                className="w-7 h-7 bg-slate-800 hover:bg-blue-600 rounded-md flex items-center justify-center transition-colors duration-200"
              >
                <FiLinkedin className="w-3 h-3" />
              </a>
              <a
                href="#"
                className="w-7 h-7 bg-slate-800 hover:bg-blue-600 rounded-md flex items-center justify-center transition-colors duration-200"
              >
                <FiTwitter className="w-3 h-3" />
              </a>
              <a
                href="#"
                className="w-7 h-7 bg-slate-800 hover:bg-blue-600 rounded-md flex items-center justify-center transition-colors duration-200"
              >
                <FiGithub className="w-3 h-3" />
              </a>
            </div>
            <div className="space-y-2 text-xs">
              <a
                href="#"
                className="hover:text-blue-400 transition-colors duration-200 block"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-blue-400 transition-colors duration-200 block"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-6 lg:mt-8 pt-4 lg:pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-xs text-slate-400">
              © {currentYear} Wassal ERP. All rights reserved.
            </div>
            <div className="text-xs text-slate-500">
              Powered by ERPNext • Multi-tenant SaaS Platform
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
