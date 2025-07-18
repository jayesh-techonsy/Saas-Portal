// import React, { useState } from "react";

// const Login = () => {
//   const [mode, setMode] = useState("login");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center px-4">
//       <div className="backdrop-blur-lg bg-white/40 shadow-2xl rounded-3xl w-full max-w-md p-8 transition-all duration-500">
//         <div className="flex justify-center mb-6">
//           <button
//             onClick={() => setMode("login")}
//             className={`px-4 py-2 rounded-l-full transition-colors ${
//               mode === "login"
//                 ? "bg-white text-blue-700 font-bold"
//                 : "bg-blue-100 text-gray-600"
//             }`}
//           >
//             Login
//           </button>
//           <button
//             onClick={() => setMode("signup")}
//             className={`px-4 py-2 rounded-r-full transition-colors ${
//               mode === "signup"
//                 ? "bg-white text-purple-700 font-bold"
//                 : "bg-purple-100 text-gray-600"
//             }`}
//           >
//             Sign Up
//           </button>
//         </div>

//         <form className="space-y-4 animate-fade-in">
//           <input
//             type="text"
//             placeholder="Username"
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//           {mode === "signup" && (
//             <>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//                 required
//               />
//             </>
//           )}
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//           {mode === "signup" && (
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//               required
//             />
//           )}
//           <button
//             type="submit"
//             className={`w-full py-2 rounded-xl text-white font-semibold transition-colors ${
//               mode === "login"
//                 ? "bg-blue-600 hover:bg-blue-700"
//                 : "bg-purple-600 hover:bg-purple-700"
//             }`}
//           >
//             {mode === "login" ? "Login" : "Sign Up"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// pages/Login.jsx

// -----------------------------------------------------------------------------

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [mode, setMode] = useState("login");
//   const navigate = useNavigate();

//   return (
//     <div className="relative backdrop-blur-sm bg-white/40 shadow-2xl rounded-3xl w-full max-w-md p-8">
//       <button
//         className="absolute top-4 right-5 text-gray-800 text-xl font-bold hover:text-red-500"
//         onClick={() => navigate("/")}
//       >
//         ✕
//       </button>

//       <div className="flex justify-center mb-6">
//         <button
//           onClick={() => setMode("login")}
//           className={`px-4 py-2 rounded-l-full transition-colors ${
//             mode === "login"
//               ? "bg-white text-blue-700 font-bold"
//               : "bg-blue-100 text-gray-600"
//           }`}
//         >
//           Login
//         </button>
//         <button
//           onClick={() => setMode("signup")}
//           className={`px-4 py-2 rounded-r-full transition-colors ${
//             mode === "signup"
//               ? "bg-white text-purple-700 font-bold"
//               : "bg-purple-100 text-gray-600"
//           }`}
//         >
//           Sign Up
//         </button>
//       </div>

//       <form className="space-y-4 animate-fade-in">
//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           required
//         />
//         {mode === "signup" && (
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//             required
//           />
//         )}
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           required
//         />
//         {mode === "signup" && (
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//             required
//           />
//         )}
//         <button
//           type="submit"
//           className={`w-full py-2 rounded-xl text-white font-semibold transition-colors ${
//             mode === "login"
//               ? "bg-blue-600 hover:bg-blue-700"
//               : "bg-purple-600 hover:bg-purple-700"
//           }`}
//         >
//           {mode === "login" ? "Login" : "Sign Up"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [mode, setMode] = useState("login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     try {
//       if (mode === "login") {
//         const res = await axios.post("http://localhost:8000/auth/login", {
//           email,
//           password,
//         });

//         const token = res.data.access_token;
//         console.log(res.data);

//         localStorage.setItem("token", token);
//         localStorage.setItem("userRole", res.data.role); // "admin" or "client"
//         localStorage.setItem("tenantSiteName", res.data.tenant_site_name);
//         localStorage.setItem("userName", res.data.userName);
//         localStorage.setItem("userEmail", res.data.userEmail);

//         toast.success("Login successful");
//         navigate("/"); // change as per your app
//       } else {
//         await axios.post("http://localhost:8000/auth/signup", {
//           full_name: fullName,
//           email,
//           password,
//         });
//         toast.success("Signup successful. You can now log in.");
//         setMode("login");
//       }
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.detail || "Authentication failed. Try again."
//       );
//     }
//   };

//   return (
//     <div className="relative backdrop-blur-sm bg-white/40 shadow-2xl rounded-3xl w-full max-w-md p-8">
//       <button
//         className="absolute top-4 right-5 text-gray-800 text-xl font-bold hover:text-red-500"
//         onClick={() => navigate("/")}
//       >
//         ✕
//       </button>

//       <div className="flex justify-center mb-6">
//         <button
//           onClick={() => setMode("login")}
//           className={`px-4 py-2 rounded-l-full transition-colors ${
//             mode === "login"
//               ? "bg-white text-blue-700 font-bold"
//               : "bg-blue-100 text-gray-600"
//           }`}
//         >
//           Login
//         </button>
//         <button
//           onClick={() => setMode("signup")}
//           className={`px-4 py-2 rounded-r-full transition-colors ${
//             mode === "signup"
//               ? "bg-white text-purple-700 font-bold"
//               : "bg-purple-100 text-gray-600"
//           }`}
//         >
//           Sign Up
//         </button>
//       </div>

//       <form className="space-y-4 animate-fade-in" onSubmit={handleSubmit}>
//         {mode === "signup" && (
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//             required
//           />
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           required
//         />
//         {mode === "signup" && (
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//             required
//           />
//         )}
//         <button
//           type="submit"
//           className={`w-full py-2 rounded-xl text-white font-semibold transition-colors ${
//             mode === "login"
//               ? "bg-blue-600 hover:bg-blue-700"
//               : "bg-purple-600 hover:bg-purple-700"
//           }`}
//         >
//           {mode === "login" ? "Login" : "Sign Up"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [mode, setMode] = useState("login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password || (mode === "signup" && !fullName)) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     try {
//       if (mode === "login") {
//         const res = await axios.post("http://localhost:8000/auth/login", {
//           email,
//           password,
//         });

//         const token = res.data.access_token;
//         localStorage.setItem("token", token);
//         localStorage.setItem("userRole", res.data.role);
//         localStorage.setItem("tenantSiteName", res.data.tenant_site_name);
//         localStorage.setItem("userName", res.data.userName);
//         localStorage.setItem("userEmail", res.data.userEmail);

//         toast.success("Login successful");
//         navigate("/");
//       } else {
//         await axios.post("http://localhost:8000/auth/signup", {
//           full_name: fullName,
//           email,
//           password,
//         });
//         toast.success("Signup successful. You can now log in.");
//         setMode("login");
//       }
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.detail || "Authentication failed. Try again."
//       );
//     }
//   };

//   return (
//     <div className="flex h-screen w-screen bg-white text-black">
//       {/* Left - Image */}
//       <div className="hidden md:flex w-1/2">
//         <img
//           src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8VGVhbXxlbnwwfHwwfHx8MA%3D%3D"
//           alt="Login"
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src =
//               "https://via.placeholder.com/800x1000?text=Login+Image";
//           }}
//         />
//       </div>

//       {/* Right - Form */}
//       <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold mb-6 text-center">
//             {mode === "login" ? "Welcome Back" : "Create an Account"}
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {mode === "signup" && (
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 className="w-full px-4 py-3 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
//               />
//             )}

//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
//               required
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
//               required
//             />

//             {mode === "signup" && (
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 className="w-full px-4 py-3 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
//                 required
//               />
//             )}

//             <button
//               type="submit"
//               className="w-full py-3 rounded-md bg-black text-white font-semibold hover:bg-opacity-80 transition duration-200"
//             >
//               {mode === "login" ? "Login" : "Sign Up"}
//             </button>
//           </form>

//           <p className="mt-4 text-center">
//             {mode === "login" ? (
//               <>
//                 Don’t have an account?{" "}
//                 <button
//                   onClick={() => setMode("signup")}
//                   className="text-black font-semibold underline hover:text-gray-700"
//                 >
//                   Click here to sign up
//                 </button>
//               </>
//             ) : (
//               <>
//                 Already have an account?{" "}
//                 <button
//                   onClick={() => setMode("login")}
//                   className="text-black font-semibold underline hover:text-gray-700"
//                 >
//                   Click here to login
//                 </button>
//               </>
//             )}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (mode === "signup" && !fullName)) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 h-[100vh] my-auto flex-col justify-center items-center bg-black text-white px-8 ">
        <h1 className="text-4xl font-bold mb-6">Wassal Systems</h1>
        <h2 className="text-2xl font-light text-center max-w-md">
          <Typewriter
            words={[
              "Empowering Businesses with ERPNext SaaS.",
              "Multi-Tenant ERP Hosting Made Simple.",
              "Reliable, Scalable, and Secure ERP Infrastructure.",
              "Your Success Starts with Better Systems.",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={30}
            delaySpeed={1500}
          />
        </h2>
        <p className="mt-8 text-center italic text-gray-300 max-w-sm">
          "The secret of change is to focus all of your energy not on fighting
          the old, but on building the new."
        </p>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {mode === "login" ? "Welcome Back" : "Create an Account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
              required
            />

            {mode === "signup" && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-md border border-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 cursor-pointer rounded-md bg-black text-white font-semibold hover:bg-opacity-80 transition duration-200 flex items-center justify-center"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : mode === "login" ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="mt-4 text-center">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-black font-semibold underline cursor-pointer hover:text-gray-700"
                >
                  Click here to sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-black font-semibold underline cursor-pointer hover:text-gray-700"
                >
                  Click here to login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
