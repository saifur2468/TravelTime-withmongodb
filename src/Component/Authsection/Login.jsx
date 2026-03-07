import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import loginLottie from "../../../public/login.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Authsection/Authcontex"; 
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errorMsg = validatePassword(password);
    if (errorMsg) {
      Swal.fire({ icon: "error", title: "Oops...", text: errorMsg });
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({ icon: "success", title: "Login Successful", text: "Welcome back!" });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Login Failed", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      Swal.fire({ icon: "success", title: "Logged in with Google!" });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Google Login Failed", text: err.message });
    }
  };

  return (
    <div className=" flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        
        {/* Left Side: Lottie Animation (Hidden on small devices for better UX) */}
        <div className="hidden lg:flex w-1/2 p-10 bg-white/5 items-center justify-center">
          <div className="w-full max-w-sm">
            <Lottie animationData={loginLottie} loop={true} />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 bg-white p-8 md:p-12 lg:p-16">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-8 font-medium">Please enter your details to login in.</p>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-gray-600">Password</label>
                  <Link to="#" className="text-sm font-bold text-blue-600 hover:underline">
                    Forgot?
                  </Link>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                   Login in...
                  </span>
                ) : "Login"}
              </button>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200 shadow-sm"
              >
                <FcGoogle className="text-2xl" />
                <span>Continue with Google</span>
              </button>

              {/* Footer */}
              <p className="text-center text-gray-600 font-medium">
                Don't have an account?{" "}
                <Link to="/Register" className="text-blue-600 hover:underline font-bold">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;