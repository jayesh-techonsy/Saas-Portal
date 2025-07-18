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

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login";

  return (
    <div className="h-screen w-screen overflow-hidden font-sans text-gray-800">
      {!isAuthPage && <Navbar />}

      <div className="flex h-[calc(100vh-64px)]">
        {" "}
        {/* 64px height assumed for navbar */}
        {!isAuthPage && <Sidebar />}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 scrollbar-hide">
          <div
            className={`${
              isAuthPage
                ? "max-w-full flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200"
                : "max-w-5xl mx-auto"
            }`}
          >
            <ScrollToTop />
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
            </Routes>
          </div>
          <div>{!isAuthPage && <Footer />}</div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
