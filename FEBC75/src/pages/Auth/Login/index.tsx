import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "./slide";
import { useNavigate, Link } from "react-router-dom";
import { AppDispatch, RootState } from "./../../../store";
import FiverrLogo from "../../../assets/Fiverr_Logo_Black.png";
import "./Sass/sass.scss"; // Import custom SCSS if still needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(
    (state: RootState) => state.loginReducer
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

    const resultAction = await dispatch(fetchLogin({ email, password }));

    if (fetchLogin.fulfilled.match(resultAction)) {
      const userData = resultAction.payload;
      localStorage.setItem("userData", JSON.stringify(userData));
      console.log("User data saved to localStorage:", userData);

      const savedData = JSON.parse(localStorage.getItem("userData") || "{}");
      const role = savedData.user?.role?.toLowerCase();

      if (role) {
        console.log("Role from localStorage:", role);
        role === "admin" ? navigate("/admin") : navigate("/");
      } else {
        alert("Role not found in user data!");
      }
    } else if (fetchLogin.rejected.match(resultAction)) {
      console.error("Login failed:", resultAction.payload);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Login Form Section */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <img
            className="h-12 w-auto mx-auto"
            src={FiverrLogo}
            alt="Fiverr Logo"
          />
          <h2 className="mt-8 text-3xl font-bold tracking-tight text-gray-900 text-center">
            Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Welcome back! Please enter your credentials.
          </p>

          <form className="mt-10 space-y-6" onSubmit={handleLogin}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Social Login Buttons */}
            <div className="space-y-4">
              <button
                type="button"
                className="w-full py-2 px-4 rounded-md text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="white"
                    d="M12.24 10.32v3.26h5.12c-.21 1.1-.85 2.03-1.81 2.66 1.06.62 1.81 1.73 1.81 3.03 0 1.93-1.56 3.49-3.49 3.49-1.63 0-3-.98-3.38-2.36H7.76v-6.68h4.48zm-1.47 7.48c0 .81.66 1.47 1.47 1.47s1.47-.66 1.47-1.47-.66-1.47-1.47-1.47-1.47.66-1.47 1.47zm1.47-9.48c-.81 0-1.47.66-1.47 1.47s.66 1.47 1.47 1.47 1.47-.66 1.47-1.47-.66-1.47-1.47-1.47z"
                  />
                </svg>
                Sign In with Google
              </button>

              <button
                type="button"
                className="w-full py-2 px-4 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="white"
                    d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z"
                  />
                </svg>
                Sign In with Facebook
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
          )}

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* Background Image Section */}
      <div className="relative hidden flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
          alt="Decorative background"
        />
      </div>
    </div>
  );
};

export default Login;
