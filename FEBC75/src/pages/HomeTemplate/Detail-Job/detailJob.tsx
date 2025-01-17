import React from "react";
import { DetaiJob } from "../Detail-Job/slide"; // Điều chỉnh đường dẫn nếu cần

interface DetailJobProps {
  jobd: DetaiJob; // Dùng interface chính xác cho kiểu dữ liệu
}

const DetailJob: React.FC<DetailJobProps> = ({ jobd }) => {
  // Đảm bảo kiểm tra jobd
  if (!jobd) {
    return <div className="container mx-auto p-4">Job details not available</div>;
  }

  return (
    <div className="">
    <div className="bg-white border-b   p-4">
      {/* Header */}
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
  <h1 className="text-xl font-bold hover:text-blue-800 hover:underline cursor-pointer transition duration-200 mt-2">
    {jobd.congViec.tenCongViec}
  </h1>
</div>

      
      </div>
      <div className="flex flex-wrap items-center space-x-4 py-4 border-b border-gray-200">
  {/* Avatar */}
  <img
    src={jobd.avatar}
    alt={jobd.tenNguoiTao}
    className="w-12 h-12 ml-2 rounded-full border border-gray-300"
  />
  
  {/* Thông tin người bán */}
  <div className="flex flex-wrap">
    <div className="flex items-center space-x-2">
      {/* Tên người bán */}
      <span className="text-lg font-bold text-gray-800">{jobd.tenNguoiTao}</span>
      {/* Nhãn Top Rated Seller */}
      <span className="text-sm font-medium text-orange-500">Top Rated Seller</span>
    </div>
    
    <div className="flex items-center space-x-2">
      {/* Sao đánh giá */}
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
      {/* Số điểm đánh giá và lượt đánh giá */}
      <span className="text-sm text-gray-600">
        {jobd.congViec.saoCongViec} ({jobd.congViec.danhGia})
      </span>
      {/* Số đơn hàng trong hàng đợi */}
      <span className="text-sm text-gray-600">| {jobd.congViec.nguoiTao} Orders in Queue</span>
    </div>
  </div>
  
  {/* Nhãn Fiverr's Choice */}
  <div className="ml-auto flex flex-wrap">
    <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded">
      Fiverr's <span className="text-green-700">Choice</span> 
    </span>
  </div>
</div>
<div className="flex   p-4  max-w-xl ">
      <div className="text-2xl text-yellow-500 mr-4">🏆</div>
      <div className="">
        <h3 className="text-lg font-bold text-gray-800 m-0">Buyers keep returning!  <span className="text-sm text-gray-500 mt-1">nofilrazzaq has an exceptional number of repeat buyers.</span></h3>
      
      </div>
    </div>
      {/* Main Content */}
      <div className=" gap-6">
        {/* Image Section */}
        <div>
          <img
            src={jobd.congViec.hinhAnh}
            alt={jobd.congViec.tenCongViec}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
  
        {/* Details Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">About This Gig</h2>
          <p className="text-gray-600 mb-4">{jobd.congViec.moTa}</p>
          {/* <div className="flex items-center space-x-2 mb-4">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={
                  index < jobd.congViec.saoCongViec
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
              >
                &#9733;
              </span>
            ))}
            <span className="text-sm text-gray-600">
              ({jobd.congViec.danhGia} reviews)
            </span>
          </div>
          <span className="text-xl font-bold text-green-600">
            ${jobd.congViec.giaTien}
          </span> */}
        </div>
      </div>
  
      {/* About the Seller */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">About The Seller</h2>
        <div className="flex items-start space-x-6">
          <img
            src={jobd.avatar}
            alt={jobd.tenNguoiTao}
            className="w-16 h-16 rounded-full border border-gray-300"
          />
          <div>
            <h3 className="text-lg font-bold text-gray-800">{jobd.tenNguoiTao}</h3>
            <p className="text-sm text-gray-600">Web Developer</p>
            <div className="flex items-center space-x-2">
      {/* Sao đánh giá */}
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
      {/* Số điểm đánh giá và lượt đánh giá */}
      <span className="text-sm text-gray-600">
        {jobd.congViec.saoCongViec} 
      </span>
      {/* Số đơn hàng trong hàng đợi */}
     
    </div>
            <button className="mt-4 px-4 py-2 border border-black text-black  rounded-lg hover:bg-blue-600">
              Contact Me
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-50">
      {/* FAQ Section */}
      <div className="w-full mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">FAQ</h2>
        <div className="space-y-2">
          <details className="bg-white border rounded-lg p-4">
            <summary className="cursor-pointer text-gray-800 font-medium">Do you provide regular updates on order?</summary>
            <p className="mt-2 text-gray-600">Yes, we provide updates at every stage of your order process.</p>
          </details>
          <details className="bg-white border rounded-lg p-4">
            <summary className="cursor-pointer text-gray-800 font-medium">How do you guarantee product quality and reliability?</summary>
            <p className="mt-2 text-gray-600">We perform multiple quality checks to ensure product reliability.</p>
          </details>
          <details className="bg-white border rounded-lg p-4">
            <summary className="cursor-pointer text-gray-800 font-medium">Do you give post-development support?</summary>
            <p className="mt-2 text-gray-600">Yes, we offer support for three months after delivery.</p>
          </details>
          <details className="bg-white border rounded-lg p-4">
            <summary className="cursor-pointer text-gray-800 font-medium">Do you convert PSD to HTML?</summary>
            <p className="mt-2 text-gray-600">Yes, we specialize in converting PSD designs to high-quality HTML.</p>
          </details>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">335 Reviews</h2>
        <div className="bg-white border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-yellow-500 mr-2">5</span>
              <span className="text-gray-800">Stars</span>
            </div>
            <span className="text-sm text-gray-600">Sort By: Most relevant</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center w-full">
                <span className="text-sm text-gray-800">5 Stars</span>
                <div className="flex-grow bg-gray-200 h-2 mx-4 rounded-full">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '99%' }}></div>
                </div>
                <span className="text-sm text-gray-600">(333)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center w-full">
                <span className="text-sm text-gray-800">4 Stars</span>
                <div className="flex-grow bg-gray-200 h-2 mx-4 rounded-full">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '1%' }}></div>
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
            <p className="text-sm text-gray-800">Seller communication level: <span className="text-yellow-500">5 ★</span></p>
            <p className="text-sm text-gray-800">Recommend to a friend: <span className="text-yellow-500">5 ★</span></p>
            <p className="text-sm text-gray-800">Service as described: <span className="text-yellow-500">5 ★</span></p>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  </div>
  
  );
};

export default DetailJob;
