import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

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

    try {
      if (mode === "login") {
        const res = await axios.post("http://localhost:8000/auth/login", {
          email,
          password,
        });

        const token = res.data.access_token;

        localStorage.setItem("token", token);
        localStorage.setItem("userRole", res.data.role);
        localStorage.setItem("tenantSiteName", res.data.tenant_site_name);
        localStorage.setItem("userName", res.data.userName);
        localStorage.setItem("userEmail", res.data.userEmail);

        toast.success("Login successful");
        setShowLogin(false);
        navigate("/");
      } else {
        await axios.post("http://localhost:8000/auth/signup", {
          full_name: fullName,
          email,
          password,
        });
        toast.success("Signup successful. You can now log in.");
        setMode("login");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.detail || "Authentication failed. Try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative">
        <button
          className="absolute top-3 right-4 text-xl text-gray-700 hover:text-red-500"
          onClick={() => setShowLogin(false)}
        >
          &times;
        </button>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setMode("login")}
            className={`px-4 py-2 rounded-l-full transition-all ${
              mode === "login"
                ? "bg-white text-blue-700 font-bold border border-b-0 border-blue-500"
                : "bg-blue-100 text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`px-4 py-2 rounded-r-full transition-all ${
              mode === "signup"
                ? "bg-white text-purple-700 font-bold border border-b-0 border-purple-500"
                : "bg-purple-100 text-gray-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          )}

          <div className="flex items-start gap-2 text-sm text-gray-500">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-xl text-white font-semibold transition-colors ${
              mode === "login"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-purple-600 font-semibold cursor-pointer"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-blue-600 font-semibold cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
