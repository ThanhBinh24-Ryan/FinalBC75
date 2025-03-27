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
