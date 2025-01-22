import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "./slide";
import { useNavigate, Link } from "react-router-dom";
import { AppDispatch, RootState } from "./../../../store";
import "./Sass/sass.scss"; // Import CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Trạng thái để hiển thị hoặc ẩn mật khẩu

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy state từ Redux
  const { loading, error } = useSelector((state: RootState) => state.loginReducer);

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
    <div className="bgLogin min-h-screen flex items-center justify-center ">
      <div className="bg-white  shadow-lg rounded-lg p-8 w-full max-w-sm relative">
        {/* Nút Close */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-blue-500 text-xl"
          onClick={() => navigate("/")}
        >
          ×
        </button>

        {/* Tiêu đề */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Input Email */}
          <div className="relative mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Input Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"} // Hiển thị hoặc ẩn mật khẩu
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Biểu tượng con mắt */}
            <span
              className="absolute top-3 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"} {/* Biểu tượng con mắt */}
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Thông báo lỗi */}
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

        {/* Link đăng ký */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
