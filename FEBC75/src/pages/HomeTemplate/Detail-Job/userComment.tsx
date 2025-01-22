import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { fetAddComments } from "./slide-mt";

const AddComment = () => {
  const { id: maCongViec } = useParams<{ id: string }>(); // Lấy mã công việc từ URL
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [noiDung, setNoiDung] = useState<string>("");
  const [maNguoiBinhLuan, setMaNguoiBinhLuan] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.user && parsedUser.token) {
          setMaNguoiBinhLuan(parsedUser.user.id);
          setToken(parsedUser.token);
        } else {
          throw new Error("Dữ liệu người dùng không hợp lệ.");
        }
      } catch (error) {
        console.error("Lỗi khi đọc userData từ localStorage:", error);
        navigate("/login");
      }
    } else {
      console.warn("Không tìm thấy userData trong localStorage!");
      navigate("/login");
    }
  }, [navigate]);

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!noiDung.trim() || !maNguoiBinhLuan || !maCongViec || !token) {
      alert(
        !noiDung.trim()
          ? "Vui lòng nhập nội dung bình luận!"
          : !maNguoiBinhLuan
          ? "Không thể xác định người bình luận. Vui lòng đăng nhập lại!"
          : !token
          ? "Token không hợp lệ. Vui lòng đăng nhập lại!"
          : "Không thể xác định mã công việc. URL không hợp lệ!"
      );
      if (!maNguoiBinhLuan || !token) navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        maCongViec: Number(maCongViec),
        maNguoiBinhLuan,
        ngayBinhLuan: new Date().toISOString(), // Sử dụng định dạng ISO 8601
        noiDung,
        saoBinhLuan: 5, // Mặc định số sao là 5
      };
      console.log("Payload gửi lên server:", payload);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      await dispatch(fetAddComments({ data: payload, headers })).unwrap();

      alert("Bình luận đã được thêm thành công!");
      setNoiDung("");
    } catch (err: any) {
      console.error("Error adding comment:", err);
      const errorMessage = err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full rounded-md border border-gray-300 p-4">
      <div className="bg-white p-6  w-full max-w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Thêm Bình Luận
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="noiDung" className="block text-sm font-medium text-gray-700">
              Nội Dung
            </label>
            <textarea
              id="noiDung"
              name="noiDung"
              value={noiDung}
              onChange={(e) => setNoiDung(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Nhập nội dung bình luận của bạn..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 font-medium text-white rounded-md focus:outline-none ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Đang gửi..." : "Thêm Bình Luận"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddComment;
