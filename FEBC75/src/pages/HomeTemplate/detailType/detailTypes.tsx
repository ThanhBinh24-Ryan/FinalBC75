import React from "react";
import { useNavigate } from "react-router-dom";
import { ForID } from "./slide";

// Define the props interface
interface DetailJobItemProps {
  data: ForID; // Data received from the parent component
}

const DetailJobItem: React.FC<DetailJobItemProps> = ({ data }) => {
  const navigate = useNavigate();

  // Check data validity before rendering
  if (!data || !data.congViec) {
    return <p className="text-red-500 text-center py-4">Invalid data</p>;
  }

  const { congViec, tenLoaiCongViec, tenNhomChiTietLoai, tenChiTietLoai } =
    data;

  // Handle navigation to the job detail page
  const handleNavigate = () => {
    if (congViec.id) {
      navigate(`/Detail-Job/${congViec.id}`);
    }
  };

  return (
    <div className="detailtype">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-4 transition-all duration-200 hover:shadow-md">
        {/* Image (clickable to navigate) */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={congViec.hinhAnh || "https://via.placeholder.com/150"}
            alt={congViec.tenCongViec || "Job"}
            className="w-full h-40 object-cover rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={handleNavigate}
            onError={(e) =>
              (e.currentTarget.src = "https://via.placeholder.com/150")
            }
          />
        </div>

        {/* Content */}
        <div className="mt-3">
          {/* Job Type (clickable to navigate) */}
          <h1
            className="text-lg font-semibold text-gray-800 truncate cursor-pointer hover:text-blue-600 transition-colors duration-200"
            onClick={handleNavigate}
          >
            {tenLoaiCongViec || "Not updated"}
          </h1>
          {/* Job Group */}
          <h2 className="text-sm text-gray-600 truncate mt-1">
            {tenNhomChiTietLoai || "Not updated"}
          </h2>
          {/* Job Detail Type */}
          <p className="text-sm text-gray-500 truncate mt-1">
            {tenChiTietLoai || "Not updated"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailJobItem;
