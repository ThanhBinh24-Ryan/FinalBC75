import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "./slide";
import { useNavigate, Link } from "react-router-dom";
import { AppDispatch, RootState } from "./../../../store";
import FiverLogo from "../../../assets/Fiverr_Logo_Black.png";
import "./Sass/sass.scss"; // Import CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Trạng thái để hiển thị hoặc ẩn mật khẩu

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy state từ Redux
  const { loading, error } = useSelector(
    (state: RootState) => state.loginReducer
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra xem email và password có rỗng không
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    // Gọi API login
    const resultAction = await dispatch(fetchLogin({ email, password }));

    // Kiểm tra nếu login thành công
    if (fetchLogin.fulfilled.match(resultAction)) {
      const userData = resultAction.payload; // Dữ liệu trả về từ server
      localStorage.setItem("userData", JSON.stringify(userData)); // Lưu toàn bộ dữ liệu vào localStorage

      console.log("User data saved to localStorage:", userData);

      // Lấy dữ liệu từ localStorage để kiểm tra role
      const savedData = JSON.parse(localStorage.getItem("userData") || "{}");
      const role = savedData.user?.role?.toLowerCase(); // Lấy role từ localStorage và chuyển thành chữ thường

      if (role) {
        console.log("Role từ localStorage:", role);

        // Điều hướng dựa trên role
        if (role === "admin") {
          console.log("Navigating to /admin...");
          navigate("/admin"); // Điều hướng tới trang Admin
        } else if (role === "user") {
          console.log("Navigating to /...");
          navigate("/"); // Điều hướng tới trang chính (HomePage)
        } else {
          console.error("Unknown role:", role);
          alert("Quyền của bạn không được hỗ trợ!");
        }
      } else {
        alert("Không tìm thấy role trong dữ liệu!");
      }
    } else if (fetchLogin.rejected.match(resultAction)) {
      console.error("Login failed:", resultAction.payload); // Hiển thị lỗi trong console
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <img
            className="h-10 w-auto mx-auto"
            src={FiverLogo}
            alt="Fiverr Logo"
          />
          <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 text-center">
            Login
          </h2>
          <form className="mt-10 space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border border-gray-300 py-1.5 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 block w-full rounded-md border border-gray-300 py-1.5 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
                <span
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "🙈"}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
          <p className="mt-10 text-center text-sm text-gray-500">
            Bạn chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
          alt="Background"
        />
      </div>
    </div>
  );
};

export default Login;
