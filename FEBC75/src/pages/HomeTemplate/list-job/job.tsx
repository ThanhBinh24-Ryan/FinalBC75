import React, { useState } from "react";
import { Job as TJob } from "../HomePage/slide"; // Job type imported from slice
import { useNavigate } from "react-router-dom";

interface IJobProps {
  job: TJob;
}

export default function Job({ job }: IJobProps) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transition-transform transform hover:scale-105">
      {/* Job Image */}
      <img
        className="w-full h-48 object-cover cursor-pointer"
        src={job.congViec.hinhAnh}
        alt={job.congViec.tenCongViec}
        onClick={() => navigate(`/Detail-Job/${job.id}`)}
      />

      {/* Creator Info */}
      <div className="flex items-center mt-4 px-4">
        <img
          className="w-10 h-10 rounded-full border border-gray-300 object-cover"
          src={job.avatar}
          alt={job.tenNguoiTao}
        />
        <span className="ml-3 text-sm font-medium text-gray-800 truncate">
          {job.tenNguoiTao}
        </span>
      </div>

      {/* Job Details */}
      <div className="p-4 flex-1 flex flex-col">
        <h5
          className="text-xl font-bold text-gray-900 cursor-pointer mb-4 hover:text-blue-600 transition-colors"
          onClick={() => navigate(`/Detail-Job/${job.id}`)}
        >
          {job.congViec.tenCongViec}
        </h5>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={
                  index < job.congViec.saoCongViec
                    ? "text-yellow-500 text-lg"
                    : "text-gray-300 text-lg"
                }
              >
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({job.congViec.danhGia} reviews)
            </span>
          </div>
        </div>

        {/* Price and Like Button */}
        <div className="flex justify-between items-center mt-auto">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setLiked(!liked)}
            aria-label="Toggle favorite"
          >
            <span
              className={`text-3xl transition-colors ${
                liked ? "text-red-500" : "text-gray-400"
              }`}
            >
              ♥
            </span>
          </div>
          <span className="text-gray-700 font-semibold">
            Starting at: ${job.congViec.giaTien}
          </span>
        </div>
      </div>
    </div>
  );
}
