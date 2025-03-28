import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListJob, Job } from "../components/Header/slide";
import { AppDispatch, RootState } from "./../../../store";
import { useNavigate } from "react-router-dom";
import "./Sass/index.scss";

export default function HomePage() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.listJobReducer);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  // Carousel Scroll Handling
  const handleScroll = (direction: "left" | "right") => {
    const scrollAmount = 300;
    if (carouselRef.current) {
      if (direction === "left") {
        carouselRef.current.scrollLeft -= scrollAmount;
      } else {
        carouselRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  // Search Input Handling
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim().length > 0) {
      try {
        const result = await dispatch(fetchListJob(value)).unwrap();
        setFilteredJobs(result);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setFilteredJobs([]);
      }
    } else {
      setFilteredJobs([]);
    }
  };

  const handleSuggestionClick = (selectedJobName: string) => {
    setSearchTerm(selectedJobName);
    setFilteredJobs([]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      alert("Vui lòng nhập từ khóa để tìm kiếm!");
      return;
    }
    navigate(`/list-job?search=${searchTerm}`);
  };

  // Load Initial Data and User Info
  useEffect(() => {
    if (data && data.length > 0) {
      console.log("Redux Data:", data);
      setSearchTerm((prev) =>
        prev === "" ? data[0]?.congViec.tenCongViec || "" : prev
      );
    }
  }, [data]);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      console.log("User Info:", parsedData);
      setIsLoggedIn(true);
      setUserInfo(parsedData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserInfo(null);
    navigate("/login");
  };

  return (
    <>
      {/* Custom CSS for Delayed Hover-Out */}
      <style>
        {`
          .dropdown {
            opacity: 0;
            transition: opacity 300ms ease-in-out;
            transition-delay: 100ms;
          }
          .group:hover .dropdown {
            opacity: 1;
            transition-delay: 0ms;
          }
          .dropdown:hover {
            opacity: 1;
            transition-delay: 0ms;
          }
          .group:not(:hover) .dropdown {
            transition-delay: 300ms; /* Delay the fade-out by 300ms */
          }
        `}
      </style>

      {/* Navbar */}
      <nav
        className="bg-white border-gray-200 dark:bg-gray-900 relative"
        style={{
          backgroundImage: `url("/img/00. Pics/5.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative z-10">
          <a href="/" className="flex items-center space-x-3">
            <span
              className="text-3xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Fiverr
            </span>
          </a>
          <div className="flex items-center space-x-4">
            {isLoggedIn && userInfo ? (
              <div className="relative group flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={userInfo?.user?.avatar || "/img/image.png"}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <p className="text-sm text-white font-semibold">
                    {userInfo?.user?.name || "User"}
                  </p>
                </div>
                <div className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-lg z-50 py-2 dropdown">
                  <button
                    onClick={() => navigate(`/profile/${userInfo.user.id}`)}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <a
                  href="/"
                  className="text-white font-medium hover:text-green-400 transition"
                >
                  Become a Seller
                </a>
                <button
                  onClick={() => navigate("/login")}
                  className="text-white font-medium hover:text-green-400 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition font-semibold"
                >
                  Join
                </button>
              </>
            )}
          </div>
        </div>

        {/* Search Section */}
        <div className="flex flex-col mt-20 mb-12 items-center">
          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8 px-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Find the perfect <span className="italic">freelance</span> services{" "}
            <br /> for your business
          </h1>
          <div className="job-search-container pt-1 px-4 w-full max-w-3xl">
            <form
              onSubmit={handleSearch}
              className="flex items-center mb-6 relative"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder='Try "building mobile app"'
                className="w-full py-3 px-6 rounded-l-full border-none shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700"
              />
              <button
                disabled={!searchTerm.trim()}
                type="submit"
                className={`py-3 px-6 rounded-r-full flex items-center justify-center shadow-md ${
                  searchTerm.trim()
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              {filteredJobs.length > 0 && (
                <div className="absolute bg-white border top-14 rounded-lg shadow-lg w-full z-10 max-h-60 overflow-y-auto">
                  {filteredJobs.slice(0, 10).map((job) => (
                    <div
                      key={job.id}
                      className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                      onClick={() =>
                        handleSuggestionClick(job.congViec.tenCongViec)
                      }
                    >
                      {job.congViec.tenCongViec}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
          {/* Updated Popular Section */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 px-4 mb-4">
            <span className="text-sm font-medium text-white">Popular:</span>
            {["Website Design", "WordPress", "Logo Design", "Dropshipping"].map(
              (item) => (
                <button
                  key={item}
                  className="text-sm border border-white py-1 px-4 rounded-full hover:bg-green-100 hover:text-green-700 transition text-white"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Trusted By Section */}
      <div className="bg-gray-100 py-4 text-center">
        <div className="flex flex-wrap justify-center items-center gap-4">
          <p className="text-gray-500 text-sm font-semibold opacity-70">
            Trusted by:
          </p>
          {["Facebook", "Google", "Netflix", "P&G", "PayPal"].map((brand) => (
            <a
              key={brand}
              href={`https://www.${brand.toLowerCase()}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 text-lg font-semibold opacity-70 hover:opacity-100 hover:text-gray-600 transition"
            >
              {brand}
            </a>
          ))}
        </div>
      </div>

      {/* Carousel Section */}
      <div className="bg-white py-10 container mx-auto relative">
        <h2
          className="text-3xl font-bold text-gray-800 mb-6 px-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Popular Professional Services
        </h2>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto hide-scrollbar gap-6 px-4 scroll-smooth"
        >
          {[
            {
              img: "/img/00. Pics/crs6.png",
              title: "Logo Design",
              subtitle: "Build your brand",
            },
            {
              img: "/img/00. Pics/crs8.png",
              title: "WordPress",
              subtitle: "Customize your site",
            },
            {
              img: "/img/00. Pics/crs9.png",
              title: "Voice Over",
              subtitle: "Share your message",
            },
            {
              img: "/img/00. Pics/crs10.png",
              title: "Video Explainer",
              subtitle: "Engage your audience",
            },
            {
              img: "/img/00. Pics/crs7.png",
              title: "Social Media",
              subtitle: "Reach more customers",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] relative group flex-shrink-0"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-56 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                <p className="text-sm text-gray-200">{item.subtitle}</p>
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
          onClick={() => handleScroll("left")}
        >
          <span className="text-gray-600 text-xl">‹</span>
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
          onClick={() => handleScroll("right")}
        >
          <span className="text-gray-600 text-xl">›</span>
        </button>
      </div>

      {/* Features Section */}
      <div className="bg-green-50 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2
              className="text-3xl font-bold text-gray-800 mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              A whole world of freelance talent at your fingertips
            </h2>
            <ul className="space-y-6">
              {[
                {
                  title: "The best for every budget",
                  desc: "Find high-quality services at every price point. No hourly rates, just project-based pricing.",
                },
                {
                  title: "Quality work done quickly",
                  desc: "Find the right freelancer to begin working on your project within minutes.",
                },
                {
                  title: "Protected payments, every time",
                  desc: "Always know what you’ll pay upfront. Your payment isn’t released until you approve the work.",
                },
                {
                  title: "24/7 support",
                  desc: "Questions? Our round-the-clock support team is available to help anytime, anywhere.",
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 text-xl mr-4">✔</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <video className="w-full max-w-md rounded-lg shadow-md" controls>
              <source src="/video1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Testimonial & Marketplace */}
      <div className="bg-white p-6">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <video className="w-full max-w-md rounded-lg shadow-md" controls>
              <source src="/video2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-6 md:mt-0 md:w-1/2 text-center md:text-left">
            <h2 className="text-lg md:text-xl font-semibold text-gray-400">
              Kay Kim, Co-Founder:
            </h2>
            <p className="mt-2 text-sm md:text-base italic text-green-500">
              "It's extremely exciting that Fiverr has freelancers from all over
              the world — it broadens the talent pool."
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3
            className="text-xl md:text-2xl font-bold text-gray-800"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Explore the marketplace
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
            {[
              { icon: "fa-paint-brush", text: "Graphics & Design" },
              { icon: "fa-chart-line", text: "Digital Marketing" },
              { icon: "fa-pen", text: "Writing & Translation" },
              { icon: "fa-video", text: "Video & Animation" },
              { icon: "fa-music", text: "Music & Audio" },
              { icon: "fa-code", text: "Programming & Tech" },
              { icon: "fa-briefcase", text: "Business" },
              { icon: "fa-heart", text: "Lifestyle" },
              { icon: "fa-database", text: "Data" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <i className={`fas ${item.icon} text-gray-600`}></i>
                </div>
                <p className="mt-2 text-sm md:text-base text-gray-800 font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
