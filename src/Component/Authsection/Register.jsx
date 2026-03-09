
import React, { useState } from "react";
import Lottie from "lottie-react";
import signupfron from "../../../public/Register.json";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../Authsection/Authcontex";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const errorMsg = validatePassword(password);
    if (errorMsg) {
      Swal.fire({ icon: "error", title: "Oops...", text: errorMsg });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Passwords do not match" });
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "Your account has been created."
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (loading) return; // prevent multiple clicks
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);

      Swal.fire({
        icon: "success",
        title: "Logged in with Google!"
      });

      navigate("/");
    } catch (err) {
      if (err.code !== "auth/cancelled-popup-request") {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: err.message
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">

        {/* Animation */}
        <div className="hidden lg:flex w-1/2 p-12 bg-white/5 items-center justify-center">
          <div className="w-full max-w-md">
            <Lottie animationData={signupfron} loop={true} />
          </div>
        </div>

        {/* Form */}
        <div className="w-full lg:w-1/2 bg-white p-8 md:p-12 lg:p-16">
          <div className="max-w-md mx-auto">

            <h2 className="text-4xl font-extrabold text-gray-800 mb-2 text-center lg:text-left">
              Join Us
            </h2>

            <p className="text-gray-500 mb-8 font-medium text-center lg:text-left">
              Create an account to start your journey.
            </p>

            <form onSubmit={handleSignup} className="space-y-5">

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600 ml-1">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all duration-300 transform active:scale-95 disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Creating Account...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-70"
              >
                <FcGoogle className="text-2xl" />
                <span>Sign up with Google</span>
              </button>

              <p className="text-center text-gray-600 font-medium pt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline font-bold">
                  Log in
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

