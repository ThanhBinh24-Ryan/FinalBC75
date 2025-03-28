import React from "react";
import { DetaiJob } from "../Detail-Job/slide"; // Adjust the path if needed

interface DetailJobProps {
  jobd: DetaiJob; // Use the correct interface for the data type
}

const DetailJob: React.FC<DetailJobProps> = ({ jobd }) => {
  // Ensure jobd is available
  if (!jobd) {
    return (
      <div className="container mx-auto p-4">Job details not available</div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="bg-white border-b rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <p className="text-lg text-blue-500 font-medium space-x-2">
                <span className="inline-block hover:text-blue-700 hover:underline cursor-pointer transition duration-200">
                  {jobd.tenLoaiCongViec}
                </span>
                <i className="fa-solid fa-arrow-right text-blue-500"></i>
                <span className="inline-block hover:text-blue-700 hover:underline cursor-pointer transition duration-200">
                  {jobd.tenNhomChiTietLoai}
                </span>
                <i className="fa-solid fa-arrow-right text-blue-500"></i>
                <span className="inline-block hover:text-blue-700 hover:underline cursor-pointer transition duration-200">
                  {jobd.tenChiTietLoai}
                </span>
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-blue-800 hover:underline cursor-pointer transition duration-200 mt-2">
                {jobd.congViec.tenCongViec}
              </h1>
            </div>
          </div>

          {/* Seller Info */}
          <div className="flex flex-wrap items-center space-x-4 py-4 border-b border-gray-200">
            <img
              src={jobd.avatar}
              alt={jobd.tenNguoiTao}
              className="w-12 h-12 ml-2 rounded-full border border-gray-300 shadow-sm"
            />
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-800">
                  {jobd.tenNguoiTao}
                </span>
                <span className="text-sm font-medium text-orange-500">
                  Top Rated Seller
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`fa-solid fa-star ${
                        index < jobd.congViec.saoCongViec
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    ></i>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {jobd.congViec.saoCongViec} ({jobd.congViec.danhGia})
                </span>
                <span className="text-sm text-gray-600">
                  | {jobd.congViec.nguoiTao} Orders in Queue
                </span>
              </div>
            </div>
            <div className="ml-auto">
              <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded">
                Fiverr's <span className="text-green-500">Choice</span>
              </span>
            </div>
          </div>

          {/* Repeat Buyers Notice */}
          <div className="flex items-center p-4 max-w-xl">
            <div className="text-2xl text-yellow-500 mr-4">🏆</div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 m-0">
                Buyers keep returning!{" "}
                <span className="text-sm text-gray-500 font-normal">
                  {jobd.tenNguoiTao} has an exceptional number of repeat buyers.
                </span>
              </h3>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Left Section (Details) */}
          <div className="flex-1">
            {/* Image Section */}
            <div className="mb-6">
              <img
                src={jobd.congViec.hinhAnh}
                alt={jobd.congViec.tenCongViec}
                className="w-full h-80 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* About This Gig */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About This Gig
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {jobd.congViec.moTa}
              </p>
            </div>

            {/* About the Seller */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About The Seller
              </h2>
              <div className="flex items-start space-x-6">
                <img
                  src={jobd.avatar}
                  alt={jobd.tenNguoiTao}
                  className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {jobd.tenNguoiTao}
                  </h3>
                  <p className="text-sm text-gray-600">Web Developer</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fa-solid fa-star ${
                            index < jobd.congViec.saoCongViec
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {jobd.congViec.saoCongViec}
                    </span>
                  </div>
                  <button className="mt-4 px-4 py-2 border border-black text-black rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition duration-200">
                    Contact Me
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">FAQ</h2>
              <div className="space-y-3">
                <details className="bg-gray-50 border rounded-lg p-4">
                  <summary className="cursor-pointer text-gray-800 font-medium flex items-center gap-2">
                    <i className="fas fa-question-circle text-blue-500"></i>
                    Do you provide regular updates on order?
                  </summary>
                  <p className="mt-2 text-gray-600 pl-6">
                    Yes, we provide updates at every stage of your order
                    process.
                  </p>
                </details>
                <details className="bg-gray-50 border rounded-lg p-4">
                  <summary className="cursor-pointer text-gray-800 font-medium flex items-center gap-2">
                    <i className="fas fa-question-circle text-blue-500"></i>
                    How do you guarantee product quality and reliability?
                  </summary>
                  <p className="mt-2 text-gray-600 pl-6">
                    We perform multiple quality checks to ensure product
                    reliability.
                  </p>
                </details>
                <details className="bg-gray-50 border rounded-lg p-4">
                  <summary className="cursor-pointer text-gray-800 font-medium flex items-center gap-2">
                    <i className="fas fa-question-circle text-blue-500"></i>
                    Do you give post-development support?
                  </summary>
                  <p className="mt-2 text-gray-600 pl-6">
                    Yes, we offer support for three months after delivery.
                  </p>
                </details>
                <details className="bg-gray-50 border rounded-lg p-4">
                  <summary className="cursor-pointer text-gray-800 font-medium flex items-center gap-2">
                    <i className="fas fa-question-circle text-blue-500"></i>
                    Do you convert PSD to HTML?
                  </summary>
                  <p className="mt-2 text-gray-600 pl-6">
                    Yes, we specialize in converting PSD designs to high-quality
                    HTML.
                  </p>
                </details>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                335 Reviews
              </h2>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-yellow-500 mr-2">
                      5
                    </span>
                    <span className="text-gray-800">Stars</span>
                  </div>
                  <select className="text-sm text-gray-600 border rounded p-1">
                    <option>Sort By: Most relevant</option>
                    <option>Sort By: Newest</option>
                    <option>Sort By: Highest Rated</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center w-full">
                      <span className="text-sm text-gray-800">5 Stars</span>
                      <div className="flex-grow bg-gray-200 h-2 mx-4 rounded-full">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "99%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">(333)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center w-full">
                      <span className="text-sm text-gray-800">4 Stars</span>
                      <div className="flex-grow bg-gray-200 h-2 mx-4 rounded-full">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "1%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">(2)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center w-full">
                      <span className="text-sm text-gray-800">3 Stars</span>
                      <div className="flex-grow bg-gray-200 h-2 mx-4 rounded-full"></div>
                      <span className="text-sm text-gray-600">(0)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center w-full">
                      <span className="text-sm text-gray-800">2 Stars</span>
                      <div className="flex-grow bg-gray-200 h-2 mx-4 rounded-full"></div>
                      <span className="text-sm text-gray-600">(0)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center w-full">
                      <span className="text-sm text-gray-800">1 Star</span>
                      <div className="flex-grow bg-gray-200 h-2 mx-4 rounded-full"></div>
                      <span className="text-sm text-gray-600">(0)</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm text-gray-800">
                    Seller communication level:{" "}
                    <span className="text-yellow-500">5 ★</span>
                  </p>
                  <p className="text-sm text-gray-800">
                    Recommend to a friend:{" "}
                    <span className="text-yellow-500">5 ★</span>
                  </p>
                  <p className="text-sm text-gray-800">
                    Service as described:{" "}
                    <span className="text-yellow-500">5 ★</span>
                  </p>
                </div>
              </div>

              {/* Sample Review */}
              <div className="mt-6 border-t pt-4">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="Reviewer"
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-gray-800">
                          John Doe
                        </h4>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, index) => (
                            <i
                              key={index}
                              className={`fa-solid fa-star ${
                                index < 5 ? "text-yellow-400" : "text-gray-300"
                              } text-xs`}
                            ></i>
                          ))}
                          <span className="text-xs text-gray-600 ml-1">
                            5.0
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Amazing work! Delivered on time and exceeded my
                      expectations. Highly recommend!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section (Pricing Sidebar) */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Order Details
              </h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Price</span>
                <span className="text-xl font-bold text-green-600">
                  ${jobd.congViec.giaTien}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Delivery Time</span>
                <span className="text-gray-800">3 Days</span>
              </div>
              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200">
                Continue (${jobd.congViec.giaTien})
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                You won’t be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailJob;
