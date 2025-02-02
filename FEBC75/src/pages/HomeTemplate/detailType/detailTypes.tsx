import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ForID } from "./slide"; // Import interface từ file slide.ts

// Định nghĩa kiểu dữ liệu cho props
interface DetailJobItemProps {
  data: ForID; // Nhận dữ liệu từ file cha
}

const DetailJobItem: React.FC<DetailJobItemProps> = ({ data }) => {
  const navigate = useNavigate(); // Hook điều hướng

  // Kiểm tra dữ liệu trước khi render
  if (!data || !data.congViec) {
    return <p className="text-red-500">Dữ liệu không hợp lệ</p>;
  }

  const { congViec, tenLoaiCongViec, tenNhomChiTietLoai, tenChiTietLoai } = data;

  // Hàm xử lý điều hướng
  const handleNavigate = () => {
    if (congViec.id) {
      navigate(`/Detail-Job/${congViec.id}`); // Điều hướng đến trang Detail-Job/:id
    }
  };

  return (
    <div className="detailtype">
    <div className="  bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4">
      {/* Hình ảnh (click để điều hướng) */}
      <img
        src={congViec.hinhAnh || "https://via.placeholder.com/150"} // Ảnh dự phòng
        alt={congViec.tenCongViec || "Công việc"}
        className=" w-full h-40 object-cover rounded cursor-pointer"
        onClick={handleNavigate} // Bắt sự kiện click
        onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150")} // Ảnh mặc định nếu lỗi
      />
      {/* Nội dung */}
      <div className="mt-4">
        {/* Tên loại công việc (click để điều hướng) */}
        <h1
          className="text-lg font-bold text-gray-800 truncate cursor-pointer"
          onClick={handleNavigate} // Bắt sự kiện click
        >
          {tenLoaiCongViec || "Chưa cập nhật"}
        </h1>
        {/* Tên nhóm chi tiết */}
        <h2 className="text-sm text-gray-600 truncate">{tenNhomChiTietLoai || "Chưa cập nhật"}</h2>
        {/* Tên chi tiết loại */}
        <p className="text-sm text-gray-500 truncate">{tenChiTietLoai || "Chưa cập nhật"}</p>
      </div>
    </div>
    </div>
  );
};

export default DetailJobItem;
