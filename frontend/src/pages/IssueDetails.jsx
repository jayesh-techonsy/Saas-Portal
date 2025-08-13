// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { useNavigate, useParams } from "react-router-dom";
// // import {
// //   FiAlertTriangle,
// //   FiArrowLeft,
// //   FiClock,
// //   FiCheckCircle,
// //   FiUser,
// //   FiCalendar,
// //   FiAlertCircle,
// //   FiMessageSquare,
// // } from "react-icons/fi";

// // const IssueDetails = () => {
// //   const { issueId } = useParams();
// //   const [issue, setIssue] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   const fetchIssueDetails = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get(
// //         `http://localhost:8000/api/support/get-issue/${issueId}`
// //       );
// //       setIssue(response.data.data);
// //     } catch (error) {
// //       console.error("Error fetching issue details:", error);
// //       toast.error("Failed to fetch issue details");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (issueId) {
// //       fetchIssueDetails();
// //     }
// //   }, [issueId]);

// //   const getStatusBadge = (status) => {
// //     const statusMap = {
// //       Open: { color: "orange", icon: <FiClock className="w-3 h-3 mr-1" /> },
// //       Closed: {
// //         color: "green",
// //         icon: <FiCheckCircle className="w-3 h-3 mr-1" />,
// //       },
// //       High: {
// //         color: "red",
// //         icon: <FiAlertTriangle className="w-3 h-3 mr-1" />,
// //       },
// //       Medium: { color: "yellow", icon: null },
// //       Low: { color: "blue", icon: null },
// //     };

// //     const statusInfo = statusMap[status] || { color: "gray", icon: null };

// //     return (
// //       <span
// //         className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
// //           statusInfo.color === "orange"
// //             ? "bg-orange-100 text-orange-700 border border-orange-200"
// //             : statusInfo.color === "green"
// //             ? "bg-green-100 text-green-700 border border-green-200"
// //             : statusInfo.color === "red"
// //             ? "bg-red-100 text-red-700 border border-red-200"
// //             : statusInfo.color === "yellow"
// //             ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
// //             : "bg-gray-100 text-gray-700 border border-gray-200"
// //         }`}
// //       >
// //         {statusInfo.icon}
// //         {status || "Unknown"}
// //       </span>
// //     );
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return "—";
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString("en-US", {
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //     });
// //   };

// //   const formatTime = (timeString) => {
// //     if (!timeString) return "—";
// //     return timeString.split(".")[0]; // Remove milliseconds
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-64">
// //         <div className="flex items-center gap-3 text-slate-600">
// //           <div className="loading-spinner"></div>
// //           <span>Loading issue details...</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!issue) {
// //     return (
// //       <div className="text-center py-12">
// //         <FiAlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
// //         <h3 className="text-lg font-medium text-slate-800 mb-2">
// //           Issue not found
// //         </h3>
// //         <p className="text-slate-600 mb-6">
// //           The requested issue could not be found or may have been deleted.
// //         </p>
// //         <button
// //           onClick={() => navigate("/support")}
// //           className="btn-primary flex items-center gap-2 mx-auto"
// //         >
// //           <FiArrowLeft className="w-4 h-4" />
// //           Back to Issues
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //         <div className="flex items-center gap-4">
// //           <button
// //             onClick={() => navigate("/support")}
// //             className="btn-ghost p-2 rounded-lg"
// //             title="Back to Issues"
// //           >
// //             <FiArrowLeft className="w-5 h-5" />
// //           </button>
// //           <div>
// //             <h1 className="text-heading-1 text-slate-800 flex items-center gap-3">
// //               <FiAlertTriangle className="w-8 h-8 text-blue-600" />
// //               {issue.subject || "Issue Details"}
// //             </h1>
// //             <p className="text-slate-600 mt-1">
// //               ID: {issue.name} • Created on {formatDate(issue.opening_date)}
// //             </p>
// //           </div>
// //         </div>
// //         <div className="flex gap-2">
// //           {getStatusBadge(issue.status)}
// //           {getStatusBadge(issue.priority)}
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         {/* Left Column - Issue Details */}
// //         <div className="lg:col-span-2 space-y-6">
// //           {/* Description Card */}
// //           <div className="card">
// //             <div className="flex items-center justify-between border-b border-slate-100 p-6">
// //               <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
// //                 <FiMessageSquare className="w-5 h-5 text-blue-600" />
// //                 Description
// //               </h2>
// //             </div>
// //             <div className="p-6">
// //               <div
// //                 className="prose max-w-none"
// //                 dangerouslySetInnerHTML={{ __html: issue.description }}
// //               />
// //             </div>
// //           </div>

// //           {/* Activity Card */}
// //           <div className="card">
// //             <div className="flex items-center justify-between border-b border-slate-100 p-6">
// //               <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
// //                 <FiClock className="w-5 h-5 text-blue-600" />
// //                 Activity Timeline
// //               </h2>
// //             </div>
// //             <div className="p-6">
// //               <div className="space-y-4">
// //                 <div className="flex items-start gap-4">
// //                   <div className="flex-shrink-0 mt-1">
// //                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
// //                       <FiUser className="w-4 h-4 text-blue-600" />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <div className="font-medium text-slate-800">
// //                       Issue Created
// //                     </div>
// //                     <div className="text-sm text-slate-500">
// //                       {formatDate(issue.creation)} at{" "}
// //                       {formatTime(issue.opening_time)}
// //                     </div>
// //                     <div className="mt-1 text-sm text-slate-600">
// //                       Created by {issue.raised_by}
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-start gap-4">
// //                   <div className="flex-shrink-0 mt-1">
// //                     <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
// //                       <FiAlertCircle className="w-4 h-4 text-orange-600" />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <div className="font-medium text-slate-800">
// //                       First Response Due
// //                     </div>
// //                     <div className="text-sm text-slate-500">
// //                       {issue.agreement_status}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Column - Meta Information */}
// //         <div className="space-y-6">
// //           {/* Details Card */}
// //           <div className="card">
// //             <div className="flex items-center justify-between border-b border-slate-100 p-6">
// //               <h2 className="text-lg font-semibold text-slate-800">
// //                 Issue Details
// //               </h2>
// //             </div>
// //             <div className="p-6 space-y-4">
// //               <div>
// //                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
// //                   Issue Type
// //                 </div>
// //                 <div className="font-medium text-slate-800">
// //                   {issue.issue_type || "—"}
// //                 </div>
// //               </div>
// //               <div>
// //                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
// //                   Raised By
// //                 </div>
// //                 <div className="font-medium text-slate-800">
// //                   {issue.raised_by || "—"}
// //                 </div>
// //               </div>
// //               <div>
// //                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
// //                   Opening Date
// //                 </div>
// //                 <div className="font-medium text-slate-800 flex items-center gap-2">
// //                   <FiCalendar className="w-4 h-4 text-slate-400" />
// //                   {formatDate(issue.opening_date)} at{" "}
// //                   {formatTime(issue.opening_time)}
// //                 </div>
// //               </div>
// //               <div>
// //                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
// //                   Last Modified
// //                 </div>
// //                 <div className="font-medium text-slate-800 flex items-center gap-2">
// //                   <FiCalendar className="w-4 h-4 text-slate-400" />
// //                   {formatDate(issue.modified)} at{" "}
// //                   {formatTime(issue.modified.split(" ")[1])}
// //                 </div>
// //               </div>
// //               <div>
// //                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
// //                   Company
// //                 </div>
// //                 <div className="font-medium text-slate-800">
// //                   {issue.company || "—"}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Actions Card */}
// //           <div className="card">
// //             <div className="flex items-center justify-between border-b border-slate-100 p-6">
// //               <h2 className="text-lg font-semibold text-slate-800">Actions</h2>
// //             </div>
// //             <div className="p-6 space-y-3">
// //               <button className="btn-primary w-full">Add Comment</button>
// //               <button className="btn-secondary w-full">Change Status</button>
// //               <button className="btn-ghost w-full text-red-600 hover:text-red-800 hover:bg-red-50">
// //                 Close Issue
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default IssueDetails;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   FiAlertTriangle,
//   FiArrowLeft,
//   FiClock,
//   FiCheckCircle,
//   FiUser,
//   FiCalendar,
//   FiAlertCircle,
//   FiMessageSquare,
//   FiEdit,
//   FiPlus,
//   FiX,
// } from "react-icons/fi";

// const IssueDetails = () => {
//   const { issueId } = useParams();
//   const [issue, setIssue] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [resolutionDetails, setResolutionDetails] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const navigate = useNavigate();

//   const fetchIssueDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/support/get-issue/${issueId}`
//       );
//       setIssue(response.data.data);
//       setSelectedStatus(response.data.data.status);
//     } catch (error) {
//       console.error("Error fetching issue details:", error);
//       toast.error("Failed to fetch issue details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8000/api/support/update-issue/${issueId}`,
//         {
//           status: selectedStatus,
//           resolution_details: resolutionDetails,
//         }
//       );

//       toast.success(response.data.message);
//       setEditing(false);
//       fetchIssueDetails(); // Refresh the issue data
//     } catch (error) {
//       console.error("Error updating issue:", error);
//       toast.error("Failed to update issue");
//     }
//   };

//   useEffect(() => {
//     if (issueId) {
//       fetchIssueDetails();
//     }
//   }, [issueId]);

//   const getStatusBadge = (status) => {
//     const statusMap = {
//       Open: { color: "orange", icon: <FiClock className="w-3 h-3 mr-1" /> },
//       Closed: {
//         color: "green",
//         icon: <FiCheckCircle className="w-3 h-3 mr-1" />,
//       },
//       High: {
//         color: "red",
//         icon: <FiAlertTriangle className="w-3 h-3 mr-1" />,
//       },
//       Medium: { color: "yellow", icon: null },
//       Low: { color: "blue", icon: null },
//     };

//     const statusInfo = statusMap[status] || { color: "gray", icon: null };

//     return (
//       <span
//         className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//           statusInfo.color === "orange"
//             ? "bg-orange-100 text-orange-700 border border-orange-200"
//             : statusInfo.color === "green"
//             ? "bg-green-100 text-green-700 border border-green-200"
//             : statusInfo.color === "red"
//             ? "bg-red-100 text-red-700 border border-red-200"
//             : statusInfo.color === "yellow"
//             ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
//             : "bg-gray-100 text-gray-700 border border-gray-200"
//         }`}
//       >
//         {statusInfo.icon}
//         {status || "Unknown"}
//       </span>
//     );
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "—";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return "—";
//     return timeString.split(".")[0];
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[50vh]">
//         <div className="flex items-center gap-3 text-slate-600">
//           <div className="loading-spinner"></div>
//           <span>Loading issue details...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!issue) {
//     return (
//       <div className="text-center py-12">
//         <FiAlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//         <h3 className="text-lg font-medium text-slate-800 mb-2">
//           Issue not found
//         </h3>
//         <p className="text-slate-600 mb-6">
//           The requested issue could not be found or may have been deleted.
//         </p>
//         <button
//           onClick={() => navigate("/support")}
//           className="btn-primary flex items-center gap-2 mx-auto"
//         >
//           <FiArrowLeft className="w-4 h-4" />
//           Back to Issues
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 px-4 sm:px-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => navigate("/support")}
//             className="btn-ghost p-2 rounded-lg hover:bg-slate-100 transition-colors"
//             title="Back to Issues"
//           >
//             <FiArrowLeft className="w-5 h-5 text-slate-600" />
//           </button>
//           <div className="min-w-0">
//             <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 flex items-center gap-3 truncate">
//               <FiAlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
//               <span className="truncate">
//                 {issue.subject || "Issue Details"}
//               </span>
//             </h1>
//             <p className="text-slate-600 mt-1 text-sm sm:text-base truncate">
//               ID: {issue.name} • Created on {formatDate(issue.opening_date)}
//             </p>
//           </div>
//         </div>
//         <div className="flex gap-2 flex-shrink-0">
//           {getStatusBadge(issue.status)}
//           {getStatusBadge(issue.priority)}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
//         {/* Left Column - Issue Details */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Description Card */}
//           <div className="card rounded-lg shadow-sm">
//             <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
//               <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
//                 <FiMessageSquare className="w-5 h-5 text-blue-600" />
//                 Description
//               </h2>
//             </div>
//             <div className="p-4 sm:p-6">
//               <div
//                 className="prose max-w-none"
//                 dangerouslySetInnerHTML={{ __html: issue.description }}
//               />
//             </div>
//           </div>

//           {/* Activity Card */}
//           <div className="card rounded-lg shadow-sm">
//             <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
//               <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
//                 <FiClock className="w-5 h-5 text-blue-600" />
//                 Activity Timeline
//               </h2>
//             </div>
//             <div className="p-4 sm:p-6">
//               <div className="space-y-4">
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0 mt-1">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                       <FiUser className="w-4 h-4 text-blue-600" />
//                     </div>
//                   </div>
//                   <div>
//                     <div className="font-medium text-slate-800">
//                       Issue Created
//                     </div>
//                     <div className="text-sm text-slate-500">
//                       {formatDate(issue.creation)} at{" "}
//                       {formatTime(issue.opening_time)}
//                     </div>
//                     <div className="mt-1 text-sm text-slate-600">
//                       Created by {issue.raised_by}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0 mt-1">
//                     <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
//                       <FiAlertCircle className="w-4 h-4 text-orange-600" />
//                     </div>
//                   </div>
//                   <div>
//                     <div className="font-medium text-slate-800">
//                       First Response Due
//                     </div>
//                     <div className="text-sm text-slate-500">
//                       {issue.agreement_status}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Meta Information */}
//         <div className="space-y-6">
//           {/* Details Card */}
//           <div className="card rounded-lg shadow-sm">
//             <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
//               <h2 className="text-lg font-semibold text-slate-800">
//                 Issue Details
//               </h2>
//             </div>
//             <div className="p-4 sm:p-6 space-y-4">
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Issue Type
//                 </div>
//                 <div className="font-medium text-slate-800">
//                   {issue.issue_type || "—"}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Raised By
//                 </div>
//                 <div className="font-medium text-slate-800">
//                   {issue.raised_by || "—"}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Opening Date
//                 </div>
//                 <div className="font-medium text-slate-800 flex items-center gap-2">
//                   <FiCalendar className="w-4 h-4 text-slate-400" />
//                   {formatDate(issue.opening_date)} at{" "}
//                   {formatTime(issue.opening_time)}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Last Modified
//                 </div>
//                 <div className="font-medium text-slate-800 flex items-center gap-2">
//                   <FiCalendar className="w-4 h-4 text-slate-400" />
//                   {formatDate(issue.modified)} at{" "}
//                   {formatTime(issue.modified.split(" ")[1])}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Company
//                 </div>
//                 <div className="font-medium text-slate-800">
//                   {issue.company || "—"}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Actions Card */}
//           <div className="card rounded-lg shadow-sm">
//             <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
//               <h2 className="text-lg font-semibold text-slate-800">Actions</h2>
//               {editing && (
//                 <button
//                   onClick={() => setEditing(false)}
//                   className="text-slate-500 hover:text-slate-700"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//             <div className="p-4 sm:p-6 space-y-3">
//               {!editing ? (
//                 <>
//                   <button
//                     className="btn-primary w-full flex items-center justify-center gap-2"
//                     onClick={() => setEditing(true)}
//                   >
//                     <FiEdit className="w-4 h-4" />
//                     Update Status
//                   </button>
//                   <button className="btn-secondary w-full flex items-center justify-center gap-2">
//                     <FiPlus className="w-4 h-4" />
//                     Add Comment
//                   </button>
//                 </>
//               ) : (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Status
//                     </label>
//                     <select
//                       value={selectedStatus}
//                       onChange={(e) => setSelectedStatus(e.target.value)}
//                       className="input-field w-full"
//                     >
//                       <option value="Open">Open</option>
//                       <option value="Closed">Closed</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Resolution Details
//                     </label>
//                     <textarea
//                       value={resolutionDetails}
//                       onChange={(e) => setResolutionDetails(e.target.value)}
//                       className="input-field w-full min-h-[100px]"
//                       placeholder="Enter resolution details..."
//                     />
//                   </div>
//                   <button
//                     className="btn-primary w-full"
//                     onClick={handleStatusUpdate}
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IssueDetails;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   FiAlertTriangle,
//   FiArrowLeft,
//   FiClock,
//   FiCheckCircle,
//   FiUser,
//   FiCalendar,
//   FiMessageSquare,
//   FiEdit,
//   FiX,
// } from "react-icons/fi";

// const IssueDetails = () => {
//   const { issueId } = useParams();
//   const [issue, setIssue] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [resolutionDetails, setResolutionDetails] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const navigate = useNavigate();

//   const fetchIssueDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/support/get-issue/${issueId}`
//       );
//       setIssue(response.data.data);
//       setSelectedStatus(response.data.data.status);
//     } catch (error) {
//       console.error("Error fetching issue details:", error);
//       toast.error("Failed to fetch issue details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusUpdate = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8000/api/support/update-issue/${issueId}`,
//         {
//           status: selectedStatus,
//           resolution_details: resolutionDetails,
//         }
//       );

//       toast.success(response.data.message);
//       setEditing(false);
//       fetchIssueDetails();
//     } catch (error) {
//       console.error("Error updating issue:", error);
//       toast.error("Failed to update issue");
//     }
//   };

//   useEffect(() => {
//     if (issueId) {
//       fetchIssueDetails();
//     }
//   }, [issueId]);

//   const getStatusBadge = (status) => {
//     const statusMap = {
//       Open: { color: "orange", icon: <FiClock className="w-3 h-3 mr-1" /> },
//       Closed: {
//         color: "green",
//         icon: <FiCheckCircle className="w-3 h-3 mr-1" />,
//       },
//       High: {
//         color: "red",
//         icon: <FiAlertTriangle className="w-3 h-3 mr-1" />,
//       },
//       Medium: { color: "yellow", icon: null },
//       Low: { color: "blue", icon: null },
//     };

//     const statusInfo = statusMap[status] || { color: "gray", icon: null };

//     return (
//       <span
//         className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//           statusInfo.color === "orange"
//             ? "bg-orange-100 text-orange-700 border border-orange-200"
//             : statusInfo.color === "green"
//             ? "bg-green-100 text-green-700 border border-green-200"
//             : statusInfo.color === "red"
//             ? "bg-red-100 text-red-700 border border-red-200"
//             : statusInfo.color === "yellow"
//             ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
//             : "bg-gray-100 text-gray-700 border border-gray-200"
//         }`}
//       >
//         {statusInfo.icon}
//         {status || "Unknown"}
//       </span>
//     );
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "—";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return "—";
//     return timeString.split(".")[0];
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[50vh]">
//         <div className="flex items-center gap-3 text-slate-600">
//           <div className="loading-spinner"></div>
//           <span>Loading issue details...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!issue) {
//     return (
//       <div className="text-center py-12">
//         <FiAlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//         <h3 className="text-lg font-medium text-slate-800 mb-2">
//           Issue not found
//         </h3>
//         <p className="text-slate-600 mb-6">
//           The requested issue could not be found or may have been deleted.
//         </p>
//         <button
//           onClick={() => navigate("/support")}
//           className="btn-primary flex items-center gap-2 mx-auto"
//         >
//           <FiArrowLeft className="w-4 h-4" />
//           Back to Issues
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 px-4 sm:px-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => navigate("/support")}
//             className="btn-ghost p-2 rounded-lg hover:bg-slate-100 transition-colors"
//             title="Back to Issues"
//           >
//             <FiArrowLeft className="w-5 h-5 text-slate-600" />
//           </button>
//           <div className="min-w-0">
//             <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 flex items-center gap-3 truncate">
//               <FiAlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
//               <span className="truncate">
//                 {issue.subject || "Issue Details"}
//               </span>
//             </h1>
//             <p className="text-slate-600 mt-1 text-sm sm:text-base truncate">
//               ID: {issue.name} • Created on {formatDate(issue.opening_date)}
//             </p>
//           </div>
//         </div>
//         <div className="flex gap-2 flex-shrink-0">
//           {getStatusBadge(issue.status)}
//           {getStatusBadge(issue.priority)}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
//         {/* Left Column - Issue Details */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Description Card */}
//           <div className="card rounded-lg shadow-sm">
//             <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
//               <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
//                 <FiMessageSquare className="w-5 h-5 text-blue-600" />
//                 Description
//               </h2>
//             </div>
//             <div className="p-4 sm:p-6">
//               <div
//                 className="prose max-w-none"
//                 dangerouslySetInnerHTML={{ __html: issue.description }}
//               />
//             </div>
//           </div>

//           {/* Actions Form (Replaced Activity Timeline) */}
//           <div className="card rounded-lg shadow-sm">
//             <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
//               <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
//                 <FiEdit className="w-5 h-5 text-blue-600" />
//                 Update Issue
//               </h2>
//               {editing && (
//                 <button
//                   onClick={() => setEditing(false)}
//                   className="text-slate-500 hover:text-slate-700"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//             <div className="p-4 sm:p-6">
//               {!editing ? (
//                 <button
//                   className="btn-primary w-full flex items-center justify-center gap-2"
//                   onClick={() => setEditing(true)}
//                 >
//                   <FiEdit className="w-4 h-4" />
//                   Update Status
//                 </button>
//               ) : (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Status
//                     </label>
//                     <select
//                       value={selectedStatus}
//                       onChange={(e) => setSelectedStatus(e.target.value)}
//                       className="input-field w-full"
//                     >
//                       <option value="Open">Open</option>
//                       <option value="Closed">Closed</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Resolution Details
//                     </label>
//                     <textarea
//                       value={resolutionDetails}
//                       onChange={(e) => setResolutionDetails(e.target.value)}
//                       className="input-field w-full min-h-[100px]"
//                       placeholder="Enter resolution details..."
//                     />
//                   </div>
//                   <button
//                     className="btn-primary w-full"
//                     onClick={handleStatusUpdate}
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Meta Information */}
//         <div className="space-y-6">
//           {/* Details Card */}
//           <div className="card rounded-lg shadow-sm">
//             <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
//               <h2 className="text-lg font-semibold text-slate-800">
//                 Issue Details
//               </h2>
//             </div>
//             <div className="p-4 sm:p-6 space-y-4">
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Issue Type
//                 </div>
//                 <div className="font-medium text-slate-800">
//                   {issue.issue_type || "—"}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Raised By
//                 </div>
//                 <div className="font-medium text-slate-800">
//                   {issue.raised_by || "—"}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Opening Date
//                 </div>
//                 <div className="font-medium text-slate-800 flex items-center gap-2">
//                   <FiCalendar className="w-4 h-4 text-slate-400" />
//                   {formatDate(issue.opening_date)} at{" "}
//                   {formatTime(issue.opening_time)}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Last Modified
//                 </div>
//                 <div className="font-medium text-slate-800 flex items-center gap-2">
//                   <FiCalendar className="w-4 h-4 text-slate-400" />
//                   {formatDate(issue.modified)} at{" "}
//                   {formatTime(issue.modified.split(" ")[1])}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Company
//                 </div>
//                 <div className="font-medium text-slate-800">
//                   {issue.company || "—"}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IssueDetails;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   FiAlertTriangle,
//   FiArrowLeft,
//   FiClock,
//   FiCheckCircle,
//   FiUser,
//   FiCalendar,
//   FiMessageSquare,
//   FiEdit,
//   FiX,
//   FiImage,
// } from "react-icons/fi";

// const IssueDetails = () => {
//   const { issueId } = useParams();
//   const [issue, setIssue] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [resolutionDetails, setResolutionDetails] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [imageUrl, setImageUrl] = useState(null);
//   const navigate = useNavigate();

//   const fetchIssueDetails = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/support/get-issue/${issueId}`
//       );

//       // Check if response is an image
//       if (response.headers["content-type"]?.startsWith("image/")) {
//         const imageBlob = new Blob([response.data], {
//           type: response.headers["content-type"],
//         });
//         const imageObjectUrl = URL.createObjectURL(imageBlob);
//         setImageUrl(imageObjectUrl);
//         setIssue({
//           name: issueId,
//           subject: "Image Issue",
//           description: "This issue contains an embedded image",
//         });
//       } else {
//         if (!response.data.data) {
//           throw new Error("No data received from server");
//         }
//         setIssue(response.data.data);
//         setSelectedStatus(response.data.data.status || "Open");
//         extractImageFromDescription(response.data.data.description);
//       }
//     } catch (error) {
//       console.error("Error fetching issue details:", error);
//       setError(error.message || "Failed to fetch issue details");
//       toast.error("Failed to fetch issue details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const extractImageFromDescription = (description) => {
//     if (!description) return;

//     try {
//       // Check for image markers in description
//       if (
//         description.includes("[IMAGE_1_START]") &&
//         description.includes("[IMAGE_1_END]")
//       ) {
//         const start = description.indexOf("[IMAGE_1_START]") + 15;
//         const end = description.indexOf("[IMAGE_1_END]");
//         const imageBlock = description.substring(start, end).trim();

//         // Find the base64 line
//         const base64Line = imageBlock
//           .split("\n")
//           .find(
//             (line) =>
//               line.startsWith("data:image/") ||
//               line.startsWith("data:application/") ||
//               (line.length > 100 && /^[A-Za-z0-9+/]+={0,2}$/.test(line))
//           );

//         if (base64Line) {
//           setImageUrl(base64Line);
//         }
//       }
//     } catch (error) {
//       console.error("Error extracting image from description:", error);
//     }
//   };

//   const handleStatusUpdate = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:8000/api/support/update-issue/${issueId}`,
//         {
//           status: selectedStatus,
//           resolution_details: resolutionDetails,
//         }
//       );

//       toast.success(response.data.message);
//       setEditing(false);
//       fetchIssueDetails();
//     } catch (error) {
//       console.error("Error updating issue:", error);
//       toast.error("Failed to update issue");
//     }
//   };

//   useEffect(() => {
//     if (issueId) {
//       fetchIssueDetails();
//     }

//     return () => {
//       if (imageUrl) {
//         URL.revokeObjectURL(imageUrl);
//       }
//     };
//   }, [issueId]);

//   const getStatusBadge = (status) => {
//     if (!status) return null;

//     const statusMap = {
//       Open: { color: "orange", icon: <FiClock className="w-3 h-3 mr-1" /> },
//       Closed: {
//         color: "green",
//         icon: <FiCheckCircle className="w-3 h-3 mr-1" />,
//       },
//       High: {
//         color: "red",
//         icon: <FiAlertTriangle className="w-3 h-3 mr-1" />,
//       },
//       Medium: { color: "yellow", icon: null },
//       Low: { color: "blue", icon: null },
//     };

//     const statusInfo = statusMap[status] || { color: "gray", icon: null };

//     return (
//       <span
//         className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//           statusInfo.color === "orange"
//             ? "bg-orange-100 text-orange-700 border border-orange-200"
//             : statusInfo.color === "green"
//             ? "bg-green-100 text-green-700 border border-green-200"
//             : statusInfo.color === "red"
//             ? "bg-red-100 text-red-700 border border-red-200"
//             : statusInfo.color === "yellow"
//             ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
//             : "bg-gray-100 text-gray-700 border border-gray-200"
//         }`}
//       >
//         {statusInfo.icon}
//         {status || "Unknown"}
//       </span>
//     );
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "—";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     } catch {
//       return "—";
//     }
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return "—";
//     try {
//       return timeString.split(".")[0];
//     } catch {
//       return "—";
//     }
//   };

//   const formatModifiedDate = (modifiedString) => {
//     if (!modifiedString) return { date: "—", time: "—" };
//     try {
//       const [datePart, timePart] = modifiedString.split(" ");
//       return {
//         date: formatDate(datePart),
//         time: formatTime(timePart),
//       };
//     } catch {
//       return { date: "—", time: "—" };
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[50vh]">
//         <div className="flex items-center gap-3 text-slate-600">
//           <div className="loading-spinner"></div>
//           <span>Loading issue details...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error || !issue) {
//     return (
//       <div className="text-center py-12">
//         <FiAlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//         <h3 className="text-lg font-medium text-slate-800 mb-2">
//           {error ? "Error loading issue" : "Issue not found"}
//         </h3>
//         <p className="text-slate-600 mb-6">
//           {error ||
//             "The requested issue could not be found or may have been deleted."}
//         </p>
//         <button
//           onClick={() => navigate("/support")}
//           className="btn-primary flex items-center gap-2 mx-auto"
//         >
//           <FiArrowLeft className="w-4 h-4" />
//           Back to Issues
//         </button>
//       </div>
//     );
//   }

//   const modified = formatModifiedDate(issue.modified);

//   return (
//     <div className="space-y-6 px-4 sm:px-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => navigate("/support")}
//             className="btn-ghost p-2 rounded-lg hover:bg-slate-100 transition-colors"
//             title="Back to Issues"
//           >
//             <FiArrowLeft className="w-5 h-5 text-slate-600" />
//           </button>
//           <div className="min-w-0">
//             <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 flex items-center gap-3 truncate">
//               <FiAlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
//               <span className="truncate">
//                 {issue.subject || "Issue Details"}
//               </span>
//             </h1>
//             <p className="text-slate-600 mt-1 text-sm sm:text-base truncate">
//               ID: {issue.name || "N/A"} • Created on{" "}
//               {formatDate(issue.opening_date)}
//             </p>
//           </div>
//         </div>
//         <div className="flex gap-2 flex-shrink-0">
//           {getStatusBadge(issue.status)}
//           {getStatusBadge(issue.priority)}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
//         {/* Left Column - Issue Details */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Description Card */}
//           <div className="card rounded-lg shadow-sm">
//             <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
//               <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
//                 <FiMessageSquare className="w-5 h-5 text-blue-600" />
//                 Description
//               </h2>
//             </div>
//             <div className="p-4 sm:p-6">
//               {imageUrl && (
//                 <div className="mb-4">
//                   <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
//                     <FiImage className="w-4 h-4" />
//                     <span>Attached Image</span>
//                   </div>
//                   <div className="border border-slate-200 rounded-lg overflow-hidden">
//                     <img
//                       src={imageUrl}
//                       alt="Issue attachment"
//                       className="w-full h-auto max-h-96 object-contain"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src =
//                           "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18b8b4b6b5e%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18b8b4b6b5e%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9140625%22%20y%3D%22318%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
//                       }}
//                     />
//                   </div>
//                 </div>
//               )}
//               <div
//                 className="prose max-w-none"
//                 dangerouslySetInnerHTML={{
//                   __html: issue.description || "No description provided",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Actions Form */}
//           <div className="card rounded-lg shadow-sm">
//             <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
//               <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
//                 <FiEdit className="w-5 h-5 text-blue-600" />
//                 Update Issue
//               </h2>
//               {editing && (
//                 <button
//                   onClick={() => setEditing(false)}
//                   className="text-slate-500 hover:text-slate-700"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>
//               )}
//             </div>
//             <div className="p-4 sm:p-6">
//               {!editing ? (
//                 <button
//                   className="btn-primary w-full flex items-center justify-center gap-2"
//                   onClick={() => setEditing(true)}
//                 >
//                   <FiEdit className="w-4 h-4" />
//                   Update Status
//                 </button>
//               ) : (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Status
//                     </label>
//                     <select
//                       value={selectedStatus}
//                       onChange={(e) => setSelectedStatus(e.target.value)}
//                       className="input-field w-full"
//                     >
//                       <option value="Open">Open</option>
//                       <option value="Closed">Closed</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-700 mb-1">
//                       Resolution Details
//                     </label>
//                     <textarea
//                       value={resolutionDetails}
//                       onChange={(e) => setResolutionDetails(e.target.value)}
//                       className="input-field w-full min-h-[100px]"
//                       placeholder="Enter resolution details..."
//                     />
//                   </div>
//                   <button
//                     className="btn-primary w-full"
//                     onClick={handleStatusUpdate}
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Column - Meta Information */}
//         <div className="space-y-6">
//           {/* Details Card */}
//           <div className="card rounded-lg shadow-sm">
//             <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
//               <h2 className="text-lg font-semibold text-slate-800">
//                 Issue Details
//               </h2>
//             </div>
//             <div className="p-4 sm:p-6 space-y-4">
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Issue Type
//                 </div>
//                 <div className="font-medium text-slate-800">
//                   {issue.issue_type || "—"}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Raised By
//                 </div>
//                 <div className="font-medium text-slate-800">
//                   {issue.raised_by || "—"}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Opening Date
//                 </div>
//                 <div className="font-medium text-slate-800 flex items-center gap-2">
//                   <FiCalendar className="w-4 h-4 text-slate-400" />
//                   {formatDate(issue.opening_date)} at{" "}
//                   {formatTime(issue.opening_time)}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Last Modified
//                 </div>
//                 <div className="font-medium text-slate-800 flex items-center gap-2">
//                   <FiCalendar className="w-4 h-4 text-slate-400" />
//                   {modified.date} at {modified.time}
//                 </div>
//               </div>
//               <div>
//                 <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
//                   Company
//                 </div>
//                 <div className="font-medium text-slate-800">
//                   {issue.company || "—"}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IssueDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiClock,
  FiCheckCircle,
  FiUser,
  FiCalendar,
  FiMessageSquare,
  FiEdit,
  FiX,
  FiImage,
  FiDownload,
} from "react-icons/fi";

const IssueDetails = () => {
  const { issueId } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [resolutionDetails, setResolutionDetails] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imageDownloadUrl, setImageDownloadUrl] = useState(null);
  const navigate = useNavigate();

  const fetchIssueDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/support/get-issue/${issueId}`
      );

      if (!response.data.data) {
        throw new Error("No data received from server");
      }

      const issueData = response.data.data;
      setIssue(issueData);
      setSelectedStatus(issueData.status || "Open");

      // Handle image URL from API
      if (issueData.image_url) {
        setImageUrl(`http://localhost:8000${issueData.image_url}`);
        setImageDownloadUrl(`http://localhost:8000${issueData.image_url}`);
      }
    } catch (error) {
      console.error("Error fetching issue details:", error);
      setError(error.message || "Failed to fetch issue details");
      toast.error("Failed to fetch issue details");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = () => {
    if (!imageDownloadUrl) return;

    const link = document.createElement("a");
    link.href = imageDownloadUrl;
    link.download = `issue-${issueId}-attachment.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/support/update-issue/${issueId}`,
        {
          status: selectedStatus,
          resolution_details: resolutionDetails,
        }
      );

      toast.success(response.data.message);
      setEditing(false);
      fetchIssueDetails();
    } catch (error) {
      console.error("Error updating issue:", error);
      toast.error("Failed to update issue");
    }
  };

  useEffect(() => {
    if (issueId) {
      fetchIssueDetails();
    }

    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [issueId]);

  const getStatusBadge = (status) => {
    if (!status) return null;

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
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "—";
    try {
      return timeString.split(".")[0];
    } catch {
      return "—";
    }
  };

  const formatModifiedDate = (modifiedString) => {
    if (!modifiedString) return { date: "—", time: "—" };
    try {
      const [datePart, timePart] = modifiedString.split(" ");
      return {
        date: formatDate(datePart),
        time: formatTime(timePart),
      };
    } catch {
      return { date: "—", time: "—" };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex items-center gap-3 text-slate-600">
          <div className="loading-spinner"></div>
          <span>Loading issue details...</span>
        </div>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="text-center py-12">
        <FiAlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-800 mb-2">
          {error ? "Error loading issue" : "Issue not found"}
        </h3>
        <p className="text-slate-600 mb-6">
          {error ||
            "The requested issue could not be found or may have been deleted."}
        </p>
        <button
          onClick={() => navigate("/support")}
          className="btn-primary flex items-center gap-2 mx-auto"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Issues
        </button>
      </div>
    );
  }

  const modified = formatModifiedDate(issue.modified);

  return (
    <div className="space-y-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/support")}
            className="btn-ghost p-2 rounded-lg hover:bg-slate-100 transition-colors"
            title="Back to Issues"
          >
            <FiArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 flex items-center gap-3 truncate">
              <FiAlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
              <span className="truncate">
                {issue.subject || "Issue Details"}
              </span>
            </h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base truncate">
              ID: {issue.name || "N/A"} • Created on{" "}
              {formatDate(issue.opening_date)}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {getStatusBadge(issue.status)}
          {getStatusBadge(issue.priority)}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
        {/* Left Column - Issue Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description Card */}
          <div className="card rounded-lg shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <FiMessageSquare className="w-5 h-5 text-blue-600" />
                Description
              </h2>
            </div>
            <div className="p-4 sm:p-6">
              {imageUrl && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <FiImage className="w-4 h-4" />
                      <span>Attached Image</span>
                    </div>
                    <button
                      onClick={handleDownloadImage}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FiDownload className="w-3 h-3" />
                      Download
                    </button>
                  </div>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt="Issue attachment"
                      className="w-full h-auto max-h-96 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18b8b4b6b5e%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18b8b4b6b5e%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.9140625%22%20y%3D%22318%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
                      }}
                    />
                  </div>
                </div>
              )}
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: issue.description || "No description provided",
                }}
              />
            </div>
          </div>

          {/* Actions Form */}
          <div className="card rounded-lg shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <FiEdit className="w-5 h-5 text-blue-600" />
                Update Issue
              </h2>
              {editing && (
                <button
                  onClick={() => setEditing(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="p-4 sm:p-6">
              {!editing ? (
                <button
                  className="btn-primary w-full flex items-center justify-center gap-2"
                  onClick={() => setEditing(true)}
                >
                  <FiEdit className="w-4 h-4" />
                  Update Status
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="input-field w-full"
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Resolution Details
                    </label>
                    <textarea
                      value={resolutionDetails}
                      onChange={(e) => setResolutionDetails(e.target.value)}
                      className="input-field w-full min-h-[100px]"
                      placeholder="Enter resolution details..."
                    />
                  </div>
                  <button
                    className="btn-primary w-full"
                    onClick={handleStatusUpdate}
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Meta Information */}
        <div className="space-y-6">
          {/* Details Card */}
          <div className="card rounded-lg shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-800">
                Issue Details
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                  Issue Type
                </div>
                <div className="font-medium text-slate-800">
                  {issue.issue_type || "—"}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                  Raised By
                </div>
                <div className="font-medium text-slate-800">
                  {issue.raised_by || "—"}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                  Opening Date
                </div>
                <div className="font-medium text-slate-800 flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-slate-400" />
                  {formatDate(issue.opening_date)} at{" "}
                  {formatTime(issue.opening_time)}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                  Last Modified
                </div>
                <div className="font-medium text-slate-800 flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-slate-400" />
                  {modified.date} at {modified.time}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                  Company
                </div>
                <div className="font-medium text-slate-800">
                  {issue.company || "—"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
