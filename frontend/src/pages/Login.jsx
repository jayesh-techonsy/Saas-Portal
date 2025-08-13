import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { API_BASE_URL } from "../config/api";
import {  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiServer,
  FiShield,
  FiZap,
  FiUsers,
  FiArrowLeft,
} from "react-icons/fi";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (mode === "signup" && !fullName)) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (mode === "signup" && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, {
          email,
          password,
        });

        const token = res.data.access_token;
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", res.data.role);
        localStorage.setItem("tenantSiteName", res.data.tenant_site_name);
        localStorage.setItem("userName", res.data.userName);
        localStorage.setItem("userEmail", res.data.userEmail);

        toast.success("Welcome back! Login successful");
        navigate("/");
      } else {
        await axios.post(`${API_BASE_URL}/auth/signup`, {
          full_name: fullName,
          email,
          password,
        });
        toast.success("Account created successfully! You can now log in.");
        setMode("login");
        setFullName("");
        setConfirmPassword("");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.detail ||
          "Authentication failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: FiServer,
      title: "Multi-Tenant Architecture",
      description: "Scalable ERPNext hosting with isolated tenant environments",
    },
    {
      icon: FiShield,
      title: "Enterprise Security",
      description: "Advanced security protocols and data protection",
    },
    {
      icon: FiZap,
      title: "High Performance",
      description: "Optimized infrastructure for lightning-fast operations",
    },
    {
      icon: FiUsers,
      title: "Team Collaboration",
      description: "Seamless collaboration tools for your entire organization",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col lg:flex-row">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:w-3/5 xl:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-8 lg:px-12 xl:px-16 py-16 text-white">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <FiServer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Wassal ERP</h1>
              <p className="text-blue-100 text-sm">
                Multi-Tenant SaaS Platform
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight">
              Enterprise ERPNext
              <span className="block text-blue-200">Made Simple</span>
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 mb-16 leading-relaxed max-w-2xl">
              Powerful multi-tenant ERPNext hosting with enterprise-grade
              security, scalability, and performance for modern businesses.
            </p>

            {/* Features */}
            <div className="space-y-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-5">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2 text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-blue-100 text-base leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <blockquote className="text-blue-100 italic">
              "Transforming businesses through intelligent ERP solutions"
            </blockquote>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-2/5 xl:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-12 min-h-screen">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors duration-200 mb-4 sm:mb-8 w-fit"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto card p-6 sm:p-8 lg:p-10 scale-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-6 sm:mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <FiServer className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Wassal ERP</h1>
              <p className="text-slate-500 text-xs">
                Multi-Tenant SaaS Platform
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 sm:mb-3">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              {mode === "login"
                ? "Sign in to access your ERPNext dashboard"
                : "Join thousands of businesses using our platform"}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-slate-100 rounded-lg p-1 mb-8 sm:mb-10">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                mode === "login"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                mode === "signup"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 sm:space-y-7 fade-in"
          >
            {mode === "signup" && (
              <div>
                <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2 sm:mb-3">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field pl-10 text-base sm:text-lg py-3 sm:py-4"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2 sm:mb-3">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-10 text-base sm:text-lg py-3 sm:py-4"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2 sm:mb-3">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 pr-12 text-base sm:text-lg py-3 sm:py-4"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-sm sm:text-base font-medium text-slate-700 mb-2 sm:mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-field pl-10 pr-12 text-base sm:text-lg py-3 sm:py-4"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-slate-600">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 sm:py-4 text-base sm:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 sm:mt-10 text-center">
            <p className="text-sm text-slate-600">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Sign up for free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Sign in here
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-center space-x-6 text-xs text-slate-500">
              <div className="flex items-center space-x-1">
                <FiShield className="w-3 h-3" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiServer className="w-3 h-3" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-1">
                <FiUsers className="w-3 h-3" />
                <span>1000+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
