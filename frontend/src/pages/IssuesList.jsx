import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import {
  FiAlertTriangle,
  FiRefreshCw,
  FiSearch,
  FiFilter,
  FiEye,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

const IssuesList = () => {
  const [issuesData, setIssuesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/support/get-issues`
      );
      setIssuesData(response.data.data || []);
      setFilteredData(response.data.data || []);
      //   toast.success("Issues refreshed successfully");
    } catch (error) {
      console.error("Error fetching issues:", error);
      toast.error("Failed to fetch issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  useEffect(() => {
    let filtered = issuesData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (issue) =>
          issue.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          issue.raised_by?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((issue) => {
        if (statusFilter === "open") {
          return issue.status === "Open";
        } else if (statusFilter === "closed") {
          return issue.status === "Closed";
        }
        return true;
      });
    }

    setFilteredData(filtered);
  }, [searchTerm, statusFilter, issuesData]);

  const handleRowClick = (issueId) => {
    if (issueId) {
      navigate(`/support/issue/${issueId}`);
    } else {
      toast.warning("Issue ID not available");
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      Open: { color: "orange", icon: <FiClock className="w-3 h-3 mr-1" /> },
      Closed: {
        color: "green",
        icon: <FiCheckCircle className="w-3 h-3 mr-1" />,
      },
      High: {
        color: "red",
        icon: <FiAlertTriangle className="w-3 h-3 mr-1" />,
      },
      Medium: { color: "yellow", icon: null },
      Low: { color: "blue", icon: null },
    };

    const statusInfo = statusMap[status] || { color: "gray", icon: null };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          statusInfo.color === "orange"
            ? "bg-orange-100 text-orange-700 border border-orange-200"
            : statusInfo.color === "green"
            ? "bg-green-100 text-green-700 border border-green-200"
            : statusInfo.color === "red"
            ? "bg-red-100 text-red-700 border border-red-200"
            : statusInfo.color === "yellow"
            ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
            : "bg-gray-100 text-gray-700 border border-gray-200"
        }`}
      >
        {statusInfo.icon}
        {status || "Unknown"}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-heading-1 text-slate-800 flex items-center gap-3">
            <FiAlertTriangle className="w-8 h-8 text-blue-600" />
            Support Issues
          </h1>
          <p className="text-slate-600 mt-1">
            View and manage all support tickets
          </p>
        </div>
        <button
          onClick={fetchIssues}
          disabled={loading}
          className="btn-primary flex items-center gap-2"
        >
          <FiRefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Issues
        </button>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              {/* <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" /> */}
              <input
                type="text"
                placeholder="Search by subject, ID, or raised by..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <div className="relative">
              {/* <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" /> */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field pl-10 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="open">Open Only</option>
                <option value="closed">Closed Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
          <span>Total: {issuesData.length}</span>
          <span>•</span>
          <span>Filtered: {filteredData.length}</span>
        </div>
      </div>

      {/* Issues Table */}
      <div className="card">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="loading-spinner"></div>
              <span>Loading issues data...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="table-header">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Raised By
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Created On
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.map((issue, index) => (
                    <tr
                      key={index}
                      className="table-row cursor-pointer hover:bg-slate-50"
                      onClick={() => handleRowClick(issue.name)}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        <span className="font-mono bg-slate-100 px-2 py-1 rounded text-xs">
                          {issue.name || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800">
                          {issue.subject || "—"}
                        </div>
                        <div className="text-sm text-slate-500 truncate max-w-xs">
                          {issue.issue_type || "No type specified"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-800">
                        {issue.custom_employee_name || "—"}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(issue.status)}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(issue.priority)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDate(issue.opening_date)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(issue.name);
                          }}
                          className="btn-ghost p-2"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && !loading && (
              <div className="text-center py-12">
                <FiAlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  No issues found
                </h3>
                <p className="text-slate-600">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "No issues have been reported yet."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IssuesList;
