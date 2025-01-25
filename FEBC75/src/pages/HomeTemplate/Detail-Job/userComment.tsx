import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { fetAddComments } from "./slide-Usercoment";

type AddCommentProps = {
  onCommentAdded: () => void; // Hàm callback để làm mới danh sách bình luận
};

const AddComment: React.FC<AddCommentProps> = ({ onCommentAdded }) => {
  const { id: maCongViec } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [noiDung, setNoiDung] = useState<string>("");
  const [saoBinhLuan, setSaoBinhLuan] = useState<number>(5);
  const [maNguoiBinhLuan, setMaNguoiBinhLuan] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!noiDung.trim() || !maNguoiBinhLuan || !maCongViec || !token) {
      if (!maNguoiBinhLuan || !token) navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        maCongViec: Number(maCongViec),
        maNguoiBinhLuan,
        ngayBinhLuan: new Date().toISOString(),
        noiDung,
        saoBinhLuan,
      };

      console.log("Payload gửi lên server:", payload);

      await dispatch(fetAddComments(payload)).unwrap();

      // Reset form sau khi gửi bình luận thành công
      setNoiDung("");
      setSaoBinhLuan(5);

      // Gọi hàm callback để làm mới danh sách bình luận
      onCommentAdded();
    } catch (err: any) {
      console.error("Error adding comment:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (rating: number) => {
    setSaoBinhLuan(rating); // Cập nhật số sao được chọn
  };

  return (
    <div className="w-full max-w-full rounded-md border border-gray-300 p-4">
      <div className="bg-white p-6 w-full max-w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Thêm Bình Luận
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="noiDung"
              className="block text-sm font-medium text-gray-700"
            >
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
          <div>
            <label
              htmlFor="saoBinhLuan"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Đánh giá (số sao)
            </label>
            <div className="flex space-x-1">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index + 1)}
                  className={`cursor-pointer text-3xl ${
                    index < saoBinhLuan
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 font-medium text-white rounded-md focus:outline-none ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
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
