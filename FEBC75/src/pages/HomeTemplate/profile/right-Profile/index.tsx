import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../store";
import { fetProfileRight } from "./slide";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ProfileRight: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, data, error } = useSelector(
    (state: RootState) => state.profileRightProfile
  );

  useEffect(() => {
    dispatch(fetProfileRight());
  }, [dispatch]);

  const handleViewDetail = (id: number) => {
    navigate(`/Detail-Job/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-job/${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleted job with ID: ${id}`);
    alert(`Deleted job with ID: ${id}`);
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error fetching data: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6 px-4 ">
       <div className="bg-gray-100 py-6 px-4">
      {/* Banner */}
      <div className="bg-white shadow-md rounded-md p-4  items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-gray-200 w-12 h-12 rounded-full  items-center justify-center mr-4">
            <img
              src="./../../../../../public/img/images-h.png" // Thay thế bằng URL ảnh của bạn
              alt="Icon"
              className="w-full h-full"
            />
          </div>
         
          <div>
            <h3 className="text-gray-800 font-semibold text-sm md:text-base">
              Buying services for work?
            </h3>
            <p className="text-sm md:text-base text-gray-500">
              Help us tailor your experience to fit your needs.
            </p>
          </div>
        </div>
   
        <a
          href="#"
          className="text-green-500 sm:ml-16 mt-5 font-semibold text-sm md:text-base hover:underline"
        >
          Tell us more about your business &gt;
        </a>
      </div>
      
      {/* Message */}
      <div className="bg-white shadow-md rounded-md p-4 flex flex-wrap items-center justify-between">
        <p className="text-gray-600 text-sm md:text-base">
          It seems that you don’t have any active Gigs. Get selling!
        </p>
        <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600">
          Create a New Gig
        </button>
      </div>
    </div>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">
          You don’t have any active gigs. Get selling!
        </p>
      ) : (
        <div className="grid gap-6">
          {data.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-start gap-4"
            >
              {/* Hình ảnh công việc */}
              <div className="flex-shrink-0 w-full h-full md:w-1/4 relative">
  <img
    src={job.congViec.hinhAnh}
    alt={job.congViec.tenCongViec}
    className="absolute inset-0 w-full h-full object-cover rounded-lg"
  />
</div>


              {/* Nội dung công việc */}
              <div className="flex-grow">
  <h2 className="text-[10px] md:text-xs font-semibold text-gray-800">
    {job.congViec.tenCongViec}
  </h2>
  <p className="text-[8px] md:text-[10px] text-gray-600 mt-1">
    {job.congViec.moTaNgan}
  </p>
  <div className="flex items-center justify-between mt-2">
    <div>
      <span className="text-yellow-500 text-xs md:text-sm">★</span>
      <span className="text-gray-700 ml-1 text-[8px] md:text-[10px]">
        {job.congViec.saoCongViec} ({job.congViec.danhGia} reviews)
      </span>
    </div>

    {/* Hành động */}
    <div className="flex justify-start items-center gap-1">
      {/* Nút View Detail */}
      <button
        onClick={() => handleViewDetail(job.congViec.id)}
        className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-[8px] md:text-[10px]"
      >
        View Detail
      </button>

      {/* Nút Edit */}
      <button
        onClick={() => handleEdit(job.congViec.id)}
        className="text-yellow-500 mx-1 hover:text-yellow-600"
        title="Edit"
      >
        <AiFillEdit size={16} />
      </button>

      {/* Nút Delete */}
      <button
        onClick={() => handleDelete(job.congViec.id)}
        className="text-red-500 hover:text-red-600"
        title="Delete"
      >
        <AiFillDelete size={16} />
      </button>
    </div>
  </div>
</div>

              <br/>
            
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileRight;
