
import React, {  useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListJob } from "./slide";
import { AppDispatch, RootState } from "./../../../../store";
import  {Job}  from "./slide";
import { useNavigate } from "react-router-dom";
import MenuBar from "./../Menu/index";
import "./Sass.scss/sass.scss";
export default function Header() {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate(); // Hook điều hướng
  
    const {  data } = useSelector((state: RootState) => state.listJobReducer);
  
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
  
      if (value.trim().length > 0) {
        try {
          // Gọi API để tìm kiếm công việc
          const result = await dispatch(fetchListJob(value)).unwrap();
          setFilteredJobs(result); // Cập nhật danh sách gợi ý
        } catch (err) {
          console.error("Error fetching jobs:", err);
          setFilteredJobs([]); // Làm trống danh sách nếu có lỗi
        }
      } else {
        setFilteredJobs([]); // Làm trống danh sách khi input rỗng
      }
    };
  
    const handleSuggestionClick = (selectedJobName: string) => {
      setSearchTerm(selectedJobName); // Điền tên công việc vào ô input
      setFilteredJobs([]); // Ẩn danh sách gợi ý
    };
  
    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchTerm.trim()) {
        // Hiển thị thông báo nếu ô tìm kiếm rỗng
        alert("Vui lòng nhập từ khóa để tìm kiếm!");
        return; // Ngăn điều hướng nếu input trống
      }
      navigate(`/list-job?search=${searchTerm}`); // Điều hướng sang trang khác
    };
  useEffect(() => {
    if (data && data.length > 0) {
      console.log("Redux Data:", data); // Kiểm tra Redux state
      setSearchTerm((prev) => (prev === "" ? data[0]?.congViec.tenCongViec || "" : prev));
    }
  }, [data]);
  return (
    <>
   <div className="bg-gray-100">
  <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 flex-wrap">
    {/* Logo và ô tìm kiếm */}
    <div className="flex items-center space-x-6 flex-1">
      {/* Logo */}
      <a href="/" className="flex items-center space-x-3">
        <img
          src="../../../../../public/img/00. Pics/Fiverr_Logo_Black.png"
          alt="Logo"
          style={{ width: "80px" }}
        />
      </a>

      {/* Ô tìm kiếm */}
      <div className="job-search-container flex-grow max-w-lg mt-3">
        <form
          onSubmit={handleSearch}
          className="flex items-center mb-2 relative"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder='Try "building mobile app"'
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
           disabled={!searchTerm.trim()}
           type="submit"
           className={`ml-1 px-4 py-2 rounded-lg flex items-center justify-center ${
             searchTerm.trim()
               ? "bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
               : "bg-gray-300 text-gray-500 cursor-not-allowed"
           }`}
          >
          <span className="hidden sm:inline"> Search</span>
          <span className="sm:hidden"><i className="fa-solid fa-magnifying-glass"></i></span>
          </button>

          {/* Gợi ý công việc */}
          {filteredJobs.length > 0 && (
            <div className="absolute bg-white border border-gray-700 top-10 rounded-lg shadow-lg mt-1 w-full z-10 max-h-60 overflow-y-auto">
              {filteredJobs.slice(0, 10).map((job) => (
                <div
                  key={job.id}
                  className="px-4 py-2 hover:bg-blue-500 hover:text-white border-b border-gray-300 cursor-pointer"
                  onClick={() => handleSuggestionClick(job.congViec.tenCongViec)}
                >
                  {job.congViec.tenCongViec}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>

    {/* Right section */}
    <div className="flex items-center space-x-3 mt-0 md:mt-0 ml-4">
      <a
        href="/"
        className="text-gray-700 text-sm hidden md:inline hover:text-blue-700 font-bold dark:text-white"
      >
        Become a Seller
      </a>
      <a
        href="/"
        className="text-gray-700 text-sm font-bold hover:text-blue-700 dark:text-white"
      >
        Sign In
      </a>
      <button className="border-2 text-sm border-gray-700 text-gray-700 px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
        Join
      </button>
    </div>
  </div>
</div>

    <MenuBar/>
    </>
  )
}
