import "./Sass/index.scss";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListJob } from "../components/Header/slide";
import { AppDispatch, RootState } from "./../../../store";
import  {Job}  from "../components/Header/slide";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Xử lý cuộn carousel
  const handleScroll = (direction: "left" | "right") => {
    const scrollAmount = 300; // Width to scroll each time
    if (carouselRef.current) {
      if (direction === "left") {
        carouselRef.current.scrollLeft -= scrollAmount;
      } else {
        carouselRef.current.scrollLeft += scrollAmount;
      }
    }
  };

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
 const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log("User Info:", parsedData); // Log dữ liệu người dùng
      setIsLoggedIn(true);
      setUserInfo(parsedData); // Đảm bảo lưu toàn bộ đối tượng
    }
  }, []);
  

  const handleLogout = () => {
    // Xóa dữ liệu người dùng khỏi localStorage
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate("/login"); // Điều hướng đến trang đăng nhập
  };

  return (
    <>
    <nav className="bg-white border-gray-200 dark:bg-gray-900 object-cover"  
    style={{
      backgroundImage: `url("/img/00. Pics/5.png")`, backgroundSize: "cover", backgroundPosition: "center"
    }}
    >
      <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        
          <span className="desktop:pl-14 iphone:text-xl iphoneplus:text-xl self-center text-3xl font-bold whitespace-nowrap text-white ">
            Fiverr
          </span>
        </a>

 

        {/* Right section */}
        <div className="flex items-center space-x-3 mt-0 md:mt-0 ml-4">
            {isLoggedIn && userInfo ? (
              <div className="relative group flex items-center space-x-2 cursor-pointer">
              {/* Avatar và tên người dùng */}
              <div>
                <img
                  src={
                    userInfo?.user?.avatar ||
                    "/img/image.png  "
                  }
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div>
              <p className="text-sm text-gray-50 font-semibold">
              {userInfo?.user?.name || "User"} {/* Hiển thị "No Name Available" nếu name không tồn tại */}
  </p>
              </div>
                {/* Dropdown menu */}

                <div className="absolute top-8 right-1 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg hidden group-hover:block z-50">
                  <button
                   onClick={() => {
                    if (userInfo && userInfo.user && userInfo.user.id) {
                      console.log("Navigating to:", `/profile/${userInfo.user.id}`);
                      navigate(`/profile/${userInfo.user.id}`); // Điều hướng đúng với ID
                    } else {
                      console.error("User ID không tồn tại:", userInfo);
                    }
                  }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Xem thông tin
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <>
                <a
                  href="/"
                  className="text-gray-700 text-sm hidden md:inline hover:text-blue-700 font-bold dark:text-white"
                >
                  Become a Seller
                </a>
                <button
                  onClick={() => navigate("/login")} // Navigate đến trang login
                  className="text-gray-700 text-sm font-bold hover:text-blue-700 dark:text-white"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/register")} // Navigate đến trang register
                  className="border-2 text-sm border-gray-700 text-gray-700 px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Join
                </button>
              </>
            )}
          </div>
      </div>
      




      <div className="flex flex-col mt-20 mb-12">

      <div className="mb-6 pl-4  iphone:text-center iphoneplus:pl-8 ipad:pl-10   desktop:px-32 ">
  <h1 className="text-2xl iphone:text-xl iphoneplus:text-2xl ipad:text-3xl desktop:text-4xl font-bold text-white">
    Find the perfect <span className="italic">freelance</span> <br />
    services for your business
  </h1>
</div>



<div className="job-search-container pt-1 desktop:px-32 px-4   ">
  <form onSubmit={handleSearch} className="flex items-center mb-2 relative ">
    {/* Ô tìm kiếm */}
    <input
      type="text"
      value={searchTerm}
      onChange={handleInputChange}
      placeholder='Try "building mobile app"'
      className="border border-gray-300 rounded-lg py-2 px-4  sm:w-70 md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Nút tìm kiếm */}
    <button
     disabled={!searchTerm.trim()}
  type="submit"
  className={`ml-1 px-4 py-2 rounded-lg flex items-center justify-center ${
    searchTerm.trim()
      ? "bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  <span className="hidden sm:inline">Search</span>
  <span className="sm:hidden">Search</span>
</button>


   
    {filteredJobs.length > 0 && (
      <div className="absolute bg-white border border-gray-700 top-10 rounded-lg shadow-lg mt-1 w-96 z-10 max-h-60 overflow-y-auto">
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




  <div className="mt-2 flex items-center space-x-2 desktop:pl-32 " style={{ width: "600px" }}>
  <p className="text-white text-xs font-medium">Popular:</p>

  <button className="text-white text-xs border border-white py-1 px-1 rounded-full hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300">
    Website Design
  </button>
  <button className="text-white text-xs border border-white py-1 px-1 rounded-full hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300">
    WordPress
  </button>
  <button className="text-white text-xs border border-white py-1 px-1  rounded-full hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300">
    Logo Design
  </button>
  <button className="text-white text-xs border border-white py-1 px-1  rounded-full hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300">
    Dropshipping
  </button>
</div>


</div>
<div className="flex flex-col iphone:text-center justify-items-end  items-end mr-20 text-white space-y-1">
  {/* Ngôi sao */}
  <div className="flex space-x-1 mr-14">
    <span className="text-yellow-400">★</span>
    <span className="text-yellow-400">★</span>
    <span className="text-yellow-400">★</span>
    <span className="text-yellow-400">★</span>
    <span className="text-yellow-400">★</span>
  </div>
  
  {/* Thông tin người dùng */}
  <p className="text-sm font-medium ">Gabrielle, Video Editor</p>
</div>

    </nav>
    <div className="bg-gray-100 py-4 text-center  text-3xl">
  <div className=" iphone:space-x-2 iphoneplus:space-x-2 mx-auto flex items-center space-x-5 ipad:text-xl justify-center">
    {/* Trusted by text */}
    <p className="text-gray-500 iphone:text-sm iphoneplus:text-sm opacity-70 text-sm font-semibold ">Trusted by:</p>

    {/* Logo names as links */}
    <a
      href="https://www.facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 text-lg font-semibold iphone:text-sm iphoneplus:text-sm  opacity-70 hover:opacity-100 hover:text-gray-600"
    >
      Facebook
    </a>
    <a
      href="https://www.google.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 text-lg iphone:text-sm iphoneplus:text-sm font-semibold opacity-80 hover:opacity-100 hover:text-gray-600"
    >
      Google
    </a>
    <a
      href="https://www.netflix.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 text-lg iphone:text-sm iphoneplus:text-sm  font-semibold opacity-70 hover:opacity-100 hover:text-gray-600"
  >
      Netflix
    </a>
    <a
      href="https://us.pg.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 text-lg iphone:text-sm iphoneplus:text-sm italic font-semibold opacity-70 hover:opacity-100 hover:text-gray-600"
    >
      P&amp;G
    </a>
    <a
      href="https://www.paypal.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 text-lg iphone:text-sm iphoneplus:text-sm italic font-semibold opacity-70 hover:opacity-100 hover:text-gray-600"
    >
      PayPal
    </a>
  </div>
</div>
<div className="bg-white py-10 container mx-auto  relative  ">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 ">
        Popular professional services
      </h2>

      {/* Carousel */}



      <div
        ref={carouselRef}
        className="flex   overflow-x-auto hide-scrollbar gap-4 scroll-snap-x "
      >
        {/* Card 1 */}
        <div className="scroll-snap-center min-w-[300px] relative group flex-shrink-0">
          <img
            src="../../../../public/img/00. Pics/crs6.png"
            alt="Logo Design"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start p-4 opacity-0 group-hover:opacity-100 transition">
            <p className="text-sm text-gray-200">Build your brand</p>
            <h3 className="text-lg font-semibold text-white">Logo Design</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="scroll-snap-center min-w-[300px] relative group flex-shrink-0">
          <img
            src="/img/00. Pics/crs8.png"
            alt="WordPress"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start p-4 opacity-0 group-hover:opacity-100 transition">
            <p className="text-sm text-gray-200">Customize your site</p>
            <h3 className="text-lg font-semibold text-white">WordPress</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="scroll-snap-center min-w-[300px] relative group flex-shrink-0">
          <img
            src="/img/00. Pics/crs9.png"
            alt="Voice Over"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start p-4 opacity-0 group-hover:opacity-100 transition">
            <p className="text-sm text-gray-200">Share your message</p>
            <h3 className="text-lg font-semibold text-white">Voice Over</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="scroll-snap-center min-w-[300px] relative group flex-shrink-0">
          <img
            src="/img/00. Pics/crs10.png"
            alt="Video Explainer"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start p-4 opacity-0 group-hover:opacity-100 transition">
            <p className="text-sm text-gray-200">Engage your audience</p>
            <h3 className="text-lg font-semibold text-white">Video Explainer</h3>
          </div>
        </div>

        {/* Card 5 */}
        <div className="scroll-snap-center min-w-[300px] relative group flex-shrink-0">
          <img
            src="/img/00. Pics/crs7.png"
            alt="Social Media"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start p-4 opacity-0 group-hover:opacity-100 transition">
            <p className="text-sm text-gray-200">Reach more customers</p>
            <h3 className="text-lg font-semibold text-white">Social Media</h3>
          </div>
        </div>
      </div>

  
      <button
        className="absolute left-0 px-4 py-2 top-44 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md p-2 hover:bg-gray-100"
        onClick={() => handleScroll("left")}
      >
        <span className="text-gray-600">{`<`}</span>
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-0 top-44 transform px-4 py-2 -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md p-2 hover:bg-gray-100"
        onClick={() => handleScroll("right")}
      >
        <span className="text-gray-600">{`>`}</span>
      </button>
    </div>
    <div className="bg-green-50 py-10 px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 py-14 px-16 md:grid-cols-2 gap-8 items-center">
    {/* Phần bên trái */}
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        A whole world of freelance talent at your fingertips
      </h2>
      <ul className="space-y-6">
        <li className="flex items-start">
          <span className="text-green-500 text-xl mr-4">✔</span>
          <div>
            <h3 className="font-semibold text-gray-800">The best for every budget</h3>
            <p className="text-gray-600">
              Find high-quality services at every price point. No hourly rates, just project-based
              pricing.
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 text-xl mr-4">✔</span>
          <div>
            <h3 className="font-semibold text-gray-800">Quality work done quickly</h3>
            <p className="text-gray-600">
              Find the right freelancer to begin working on your project within minutes.
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 text-xl mr-4">✔</span>
          <div>
            <h3 className="font-semibold text-gray-800">Protected payments, every time</h3>
            <p className="text-gray-600">
              Always know what you’ll pay upfront. Your payment isn’t released until you approve the
              work.
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-green-500 text-xl mr-4">✔</span>
          <div>
            <h3 className="font-semibold text-gray-800">24/7 support</h3>
            <p className="text-gray-600">
              Questions? Our round-the-clock support team is available to help anytime, anywhere.
            </p>
          </div>
        </li>
      </ul>
    </div>

    {/* Phần bên phải */}
    <div className="flex justify-center">
     
        <div className="w-full">
    <video className="w-full" controls>
  <source src="/video1.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

        </div>
      </div>
    </div>
  </div>
  <div className="bg-white p-6">
      {/* Testimonial Section */}
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        {/* Video Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-72 h-48 md:w-96 md:h-64">
          <video className="w-full" controls>
          <source src="/video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
          </div>
        </div>

        {/* Text Section */}
        <div className="mt-6 md:mt-0 md:w-1/2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-400">
            Kay Kim, Co-Founder: <span className="text-gray-900">rooted</span>
          </h2>
          <p className="mt-2 text-sm md:text-base italic text-green-500">
            "It's extremely exciting that Fiverr has freelancers from all over the world — it broadens the talent pool. One of the best things about Fiverr is that while we're sleeping, someone's working."
          </p>
        </div>
      </div>

      {/* Marketplace Section */}
      <div className="mt-12 text-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Explore the marketplace</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <i className="fas fa-paint-brush text-gray-600"></i>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-800 font-medium">Graphics & Design</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <i className="fas fa-chart-line text-gray-600"></i>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-800 font-medium">Digital Marketing</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <i className="fas fa-pen text-gray-600"></i>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-800 font-medium">Writing & Translation</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <i className="fas fa-video text-gray-600"></i>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-800 font-medium">Video & Animation</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <i className="fas fa-music text-gray-600"></i>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-800 font-medium">Music & Audio</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <i className="fas fa-code text-gray-600"></i>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-800 font-medium">Programming & Tech</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <i className="fas fa-briefcase text-gray-600"></i>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-800 font-medium">Business</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <i className="fas fa-heart text-gray-600"></i>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-800 font-medium">Lifestyle</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <i className="fas fa-database text-gray-600"></i>
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-800 font-medium">Data</p>
          </div>
        </div>
      </div>
    </div>




    </>
  );
}
