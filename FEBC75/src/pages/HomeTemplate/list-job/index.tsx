import "./Sass/sass.scss";
import Header from "../components/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListJob } from "../HomePage/slide"; // Import action fetchListJob
import { AppDispatch, RootState } from "./../../../store"; // Import store
import { useLocation } from "react-router-dom"; // Import useLocation từ react-router-dom
import Job from "./job"; // Import Job component
import Page from "../components/Pages";

export default function ListJob() {
  const dispatch: AppDispatch = useDispatch();
  const {  data, error } = useSelector(
    (state: RootState) => state.listJobReducer
  );

  const location = useLocation(); // Lấy thông tin URL hiện tại
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || ""; // Lấy giá trị 'search' từ query string

  useEffect(() => {
    // Gọi API với từ khóa tìm kiếm
    dispatch(fetchListJob(searchTerm)); // Truyền từ khóa tìm kiếm vào action fetchListJob
  }, [dispatch, searchTerm]);

  const renderListJob = () => {
    if (data && data.length > 0) {
      // Lọc danh sách công việc dựa trên từ khóa tìm kiếm
      const filteredJobs = data.filter((job) =>
        job.congViec.tenCongViec.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredJobs.length > 0) {
        return filteredJobs.map((job) => {
          return <Job key={job.id} job={job} />;
        });
      } else {
        return (
          <div className="col-span-full text-center text-gray-500">
            Không tìm thấy công việc nào phù hợp với từ khóa "{searchTerm}".
          </div>
        );
      }
    }

    if (data && data.length === 0) {
      return (
        <div className="col-span-full text-center text-gray-500">
          Không tìm thấy công việc nào.
        </div>
      );
    }
    return null;
  };



  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4">
          Results for "{searchTerm}"{/* Hiển thị từ khóa tìm kiếm */}
        </h1>

        {/* Filters + Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Dropdown Filters */}
          <div className="flex gap-4 flex-wrap">
            <select className="border p-1 rounded w-full sm:w-auto">
              <option>Category</option>
            </select>
            <select className="border p-1 rounded w-full md:w-auto">
              <option>Service Options</option>
            </select>
            <select className="border p-1 rounded w-full md:w-auto">
              <option>Location</option>
              <option>Location</option>
            </select>

            <select className="border p-1 rounded w-full md:w-auto">
              <option>Budget</option>
            </select>
            <select className="border p-1 rounded w-full md:w-auto">
              <option>Delivery Time</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="sr-only peer form-checkbox" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Pro Service
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="sr-only peer form-checkbox" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Local Sellers
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="sr-only peer form-checkbox" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Online Sellers
              </span>
            </label>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Danh sách công việc
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderListJob()}
        </div>
      </div>
      <Page />
    </>
  );
}
