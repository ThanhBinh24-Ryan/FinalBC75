import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate
import { AppDispatch, RootState } from "../../../../store";
import { fetProfileLeft } from "./slide-left";
import "./Sass/sass.scss";

const ProfileLeft: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Assign useNavigate to a variable

  const { loading, data, error } = useSelector(
    (state: RootState) => state.fetchProfileLeft
  );

  useEffect(() => {
    if (id) {
      dispatch(fetProfileLeft(Number(id)));
    }
  }, [dispatch, id]);

  const handleEditProfile = () => {
    if (id) {
      navigate(`/editProfile/${id}`); // Navigate to editProfile/id using navigate
    }
  };

  const handleAddNew = () => {
    if (id) {
      navigate(`/editProfile/${id}`); // Navigate to editProfile/id using navigate
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Lỗi khi tải dữ liệu: {error}
      </div>
    );
  }

  return (
    <>
      {/* Profile Header */}
      <div className="profile-container bg-white rounded-lg shadow-md p-6 max-w-md mt-10 border  sm:max-w-full md:max-w-sm lg:max-w-md">
        <div className="text-end">
          <span className="text-green-500 text-sm">● Online</span>
        </div>
        <div className="profile-header flex flex-col items-center">
          <div className="avatar w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {data?.avatar ? (
              <img
                src={data.avatar}
                alt={data.name}
                className="w-full text-2xl h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-semibold text-gray-500">
                {data?.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <h2 className="mt-2 text-lg font-semibold">{data?.name}</h2>
          <span onClick={handleEditProfile}><i className="fa-solid fa-pen text-gray-400 cursor-pointer"></i></span>
        </div>

        {/* Thông tin cơ bản */}
        <div className="profile-info mt-4 border-t border-gray-300 pt-4">
          <p className="text-sm text-gray-600 flex items-center">
            <span className="material-icons text-gray-400 mr-2"></span>
            <strong>From:</strong> Vietnam
          </p>
          <p className="text-sm text-gray-600 flex items-center mt-2">
            <span className="material-icons text-gray-400 mr-2"></span>
            <strong>Member since:</strong> May 2021
          </p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="profile-details bg-white rounded-xl border shadow-lg p-6 mt-6 max-w-md  sm:max-w-full md:max-w-sm lg:max-w-md">
        {/* Description */}
        <div className="profile-section">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">Description</h3>
            <button onClick={handleAddNew} className="text-blue-500 text-sm hover:underline">
              Edit Description
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
          Add a description
          </p>
        </div>

        {/* Languages */}
        <div className="profile-section mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Languages</h3>
            <button onClick={handleAddNew} className="text-blue-500 text-sm hover:underline">
              Add New
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">English - Basic</p>
        </div>

        {/* Linked Accounts */}
        {/* Linked Accounts */}
        <div className="profile-section mt-6">
          <h3 className="text-xl font-semibold">Linked Accounts</h3>
          <ul className="mt-2 space-y-2">
            {["Facebook", "Google", "Dribbble", "GitHub", "Twitter"].map(
              (account) => (
                <li
                  key={account}
                  className="text-sm text-blue-500 hover:underline cursor-pointer"
                >
                  + {account}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Skills */}
        <div className="profile-section mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Skills</h3>
            <button onClick={handleAddNew} className="text-blue-500 text-sm hover:underline">
              Add Now
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {data?.skill ? data.skill.join(", ") : "No skills added"}
          </p>
        </div>

        {/* Education */}
        <div className="profile-section mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Education</h3>
            <button onClick={handleAddNew} className="text-blue-500 text-sm hover:underline">
              Add Now
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            No education added
          </p>
        </div>

        {/* Certifications */}
        <div className="profile-section mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Certification</h3>
            <button onClick={handleAddNew} className="text-blue-500 text-sm hover:underline">
              Add Now
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {data?.certification ? data.certification.join(", ") : "No certifications added"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileLeft;
