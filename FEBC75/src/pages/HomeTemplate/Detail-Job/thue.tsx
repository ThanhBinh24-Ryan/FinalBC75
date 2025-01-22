import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetListThue } from "./slide-thue";
import { RootState, AppDispatch } from "./../../../store";

const PostJobForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for form inputs
  const [maCongViec, setMaCongViec] = useState("");
  const [ngayThue, setNgayThue] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { loading } = useSelector((state: RootState) => state.listThueReducer);

  // Extract maCongViec from URL and set default ngayThue
  useEffect(() => {
    const url = window.location.href;
    const jobId = url.split("/").pop();
    if (jobId) setMaCongViec(jobId);

    const currentDate = new Date().toISOString().split("T")[0];
    setNgayThue(currentDate);
  }, []);

  // Check authentication and fetch user ID
  const checkAuthentication = (): { userId: number | null; token: string | null } => {
    const userData = localStorage.getItem("userData");

    if (!userData) {
      setMessage("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
      setIsSuccess(false);
      setShowMessage(true);
      navigate("/login");
      return { userId: null, token: null };
    }

    try {
      const parsedUserData = JSON.parse(userData);

      if (!parsedUserData.user || !parsedUserData.user.id || !parsedUserData.token) {
        throw new Error("Dữ liệu người dùng không hợp lệ.");
      }

      return { userId: parsedUserData.user.id, token: parsedUserData.token };
    } catch (err) {
      console.error("Lỗi khi phân tích dữ liệu người dùng:", err);
      setMessage("Lỗi xác thực. Vui lòng đăng nhập lại.");
      setIsSuccess(false);
      setShowMessage(true);
      navigate("/login");
  
      return { userId: null, token: null };
     
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { userId, token } = checkAuthentication();
    if (!userId || !token) return;

    const data = {
      maCongViec: Number(maCongViec),
      maNguoiThue: userId,
      ngayThue: new Date(ngayThue),
      hoanThanh: true, // Default value
    };
    console.log("Data to post:", data);
    const to = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3MjQiLCJlbWFpbCI6InRAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJuYmYiOjE3Mzc1NjA0NjEsImV4cCI6MTczODE2NTI2MX0.wC2q1uKYJP_vnkd62YW1VJBVwwMDb2MDpcQPPRO29hc";
    const headers = {
      Authorization: `Bearer ${to}`,
    };
    console.log("Data to post:", data);
    try {
      await dispatch(fetListThue({ data, headers }));
      setMessage("Công việc đã được đăng thành công!");
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Lỗi xảy ra:", err);
      setMessage(`Đăng công việc thất bại. Chi tiết lỗi: ${err.message || "Không xác định."}`);
      setIsSuccess(false);
    } finally {
      setShowMessage(true);
    }
  };

  return (
    <div className="package-container" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    

      <div className="package-header" style={{ display: "flex", justifyContent: "space-around", borderBottom: "2px solid #ccc", paddingBottom: "10px" }}>
        <div>Basic</div>
        <div style={{ fontWeight: "bold", color: "green" }}>Standard</div>
        <div>Premium</div>
      </div>

      <div className="package-details" style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px", marginTop: "20px" }}>
        <h3>Standard</h3>
        <p style={{ fontSize: "14px", color: "#555" }}>Create a simple web application for your business.</p>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "14px", color: "#333" }}>
          <li>✔️ 30 Days Delivery</li>
          <li>✔️ 1 Revision</li>
          <li>✔️ Design Customization</li>
          <li>✔️ Content Upload</li>
          <li>✔️ Responsive Design</li>
          <li>✔️ Include Source Code</li>
          <li>✔️ 1 Page</li>
        </ul>

        <button
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
            width: "100%",
          }}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Continue with $1000"}
        </button>
        {showMessage && (
        <div
          style={{
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: isSuccess ? "#d4edda" : "#f8d7da",
            color: isSuccess ? "#155724" : "#721c24",
            border: `1px solid ${isSuccess ? "#c3e6cb" : "#f5c6cb"}`,
            borderRadius: "5px",
          }}
        >
          {message}
        </div>
      )}
      </div>

      <div className="quote-container" style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          style={{
            backgroundColor: "#f5f5f5",
            color: "#333",
            padding: "10px 20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get a Quote
        </button>
      </div>
    </div>
  );
};

export default PostJobForm;
