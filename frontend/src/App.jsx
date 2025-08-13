import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Sites from "./pages/Sites";
import GetApps from "./pages/GetApps";
import RemoteApps from "./pages/RemoteApps.jsx";
import CreateTenant from "./pages/CreateTenant.jsx";
import SiteDetails from "./pages/SiteDetails.jsx";
import Footer from "./components/Footer.jsx";
import LoginPopup from "./components/LoginPopup.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ManagePlans from "./pages/ManagePlans.jsx";
import FleetDetails from "./pages/FleetDetails.jsx";
import ImportExcel from "./pages/ImportExcel.jsx";
import EmployeePool from "./pages/EmployeePool.jsx";
import EmployeeDetails from "./pages/EmployeeDetails.jsx";
import IssuesList from "./pages/IssuesList.jsx";
import IssueDetails from "./pages/IssueDetails.jsx";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      {!isAuthPage && <Navbar />}

      <div className="flex min-h-[calc(100vh-4rem)]">
        {!isAuthPage && <Sidebar />}

        <main className="flex-1 flex flex-col min-w-0">
          <div
            className={`flex-1 ${
              isAuthPage
                ? "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4"
                : "max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-20 lg:pb-8"
            }`}
          >
            <ScrollToTop />
            <div className="fade-in w-full">
              <Routes>
                <Route path="/sites" element={<Sites />} />
                <Route path="/apps" element={<GetApps />} />
                <Route path="/fleet" element={<FleetDetails />} />
                <Route path="/create" element={<CreateTenant />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/site/:siteId" element={<SiteDetails />} />
                <Route path="/manage-plans" element={<ManagePlans />} />
                <Route path="/import-excel" element={<ImportExcel />} />
                <Route path="/employees" element={<EmployeePool />} />
                <Route
                  path="/employee/:iqama_number"
                  element={<EmployeeDetails />}
                />
                <Route path="/support" element={<IssuesList />} />
                <Route
                  path="/support/issue/:issueId"
                  element={<IssueDetails />}
                />
              </Routes>
            </div>
          </div>
          {!isAuthPage && <Footer />}
        </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="!top-4 !right-4 !w-auto !max-w-sm"
        toastClassName="!bg-white !text-slate-800 !shadow-lg !border !border-slate-200 !rounded-lg !text-sm"
        progressClassName="!bg-blue-500"
      />
    </div>
  );
}

export default App;
