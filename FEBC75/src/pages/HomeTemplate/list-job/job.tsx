import React, { useState } from "react";
import { Job as TJob } from "../HomePage/slide"; // Import kiểu Job từ slice
import { useNavigate } from "react-router-dom";

interface IJobProps {
  job: TJob;
}

export default function Job(props: IJobProps) {
  const { job } = props;
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between">
      {/* Hình ảnh công việc */}
      <img
        className="w-full h-48 object-cover cursor-pointer"
        src={job.congViec.hinhAnh}
        alt={job.congViec.tenCongViec}
        onClick={() => navigate(`/Detail-Job/${job.id}`)}
      />

      {/* Avatar và tên người tạo */}
      <div className="flex items-center mt-4 px-4">
        <img
          className="w-10 h-10 rounded-full border border-gray-300"
          src={job.avatar}
          alt={job.tenNguoiTao}
        />
        <span className="ml-3 text-sm font-medium text-gray-800 truncate">
          {job.tenNguoiTao}
        </span>
      </div>

      {/* Nội dung công việc */}
      <div className="p-4 flex-1 flex flex-col">
        <h5
          className="text-xl font-bold tracking-tight text-gray-900 cursor-pointer mb-4"
          onClick={() => navigate(`/Detail-Job/${job.id}`)}
        >
          {job.congViec.tenCongViec}
        </h5>

        {/* Đánh giá */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={
                  index < job.congViec.saoCongViec
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
              >
                &#9733;
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({job.congViec.danhGia} reviews)
            </span>
          </div>
        </div>

        {/* Giá và trái tim yêu thích */}
        <div className="flex justify-between items-center mt-auto">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setLiked(!liked)}
          >
            <span
              className={
                liked ? "text-red-500 text-3xl" : "text-gray-400 text-3xl"
              }
            >
              &#9829;
            </span>
          </div>
          <span className="text-gray-500 font-bold truncate">
           STRING AT: ${job.congViec.giaTien}
          </span>
        </div>
      </div>
    </div>
  );
}
