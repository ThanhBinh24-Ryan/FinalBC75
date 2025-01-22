import React from "react";
import { ForID } from "./slide"; // Import interface từ file slide.ts

// Định nghĩa kiểu dữ liệu cho props
interface DetailJobItemProps {
  data: ForID; // Nhận dữ liệu từ file cha
}

const DetailJobItem: React.FC<DetailJobItemProps> = ({ data }) => {
  const { congViec, tenLoaiCongViec, tenNhomChiTietLoai, tenChiTietLoai } = data;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4">
      {/* Hình ảnh */}
      <img
        src={congViec.hinhAnh}
        alt={congViec.tenCongViec}
        className="w-full h-40 object-cover rounded"
      />
      {/* Nội dung */}
      <div className="mt-4">
        {/* Tên loại công việc */}
        <h1 className="text-lg font-bold text-gray-800 truncate">{tenLoaiCongViec}</h1>
        {/* Tên nhóm chi tiết */}
        <h2 className="text-sm text-gray-600 truncate">{tenNhomChiTietLoai}</h2>
        {/* Tên chi tiết loại */}
        <p className="text-sm text-gray-500 truncate">{tenChiTietLoai}</p>
      </div>
    </div>
  );
};

export default DetailJobItem;
