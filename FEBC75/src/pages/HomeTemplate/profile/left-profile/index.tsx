import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../store";
import { fetProfileLeft } from "./slide-left";
import "./Sass/sass.scss";

const ProfileLeft: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
      navigate(`/editProfile/${id}`);
    }
  };

  const handleAddNew = () => {
    if (id) {
      navigate(`/editProfile/${id}`);
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
    <div className="profile-left-container max-w-md mx-auto sm:max-w-full md:max-w-sm lg:max-w-md space-y-6 p-4">
      {/* Profile Header */}
      <div className="profile-container bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-end">
          <span className="text-green-500 text-sm font-medium flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span> Online
          </span>
        </div>
        <div className="profile-header flex flex-col items-center">
          <div className="avatar w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-green-100 shadow-md">
            {data?.avatar ? (
              <img
                src={data.avatar}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-semibold text-gray-500">
                {data?.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <h2 className="mt-3 text-xl font-bold text-gray-800">{data?.name}</h2>
          <button
            onClick={handleEditProfile}
            className="mt-2 text-gray-400 hover:text-green-500 transition-colors duration-200"
          >
            <i className="fa-solid fa-pen"></i> Edit Profile
          </button>
        </div>

        {/* Basic Info */}
        <div className="profile-info mt-6 border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <i className="fa-solid fa-globe text-gray-400"></i>
            <span className="font-semibold">From:</span> Vietnam
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2 mt-3">
            <i className="fa-solid fa-calendar-alt text-gray-400"></i>
            <span className="font-semibold">Member since:</span> May 2021
          </p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="profile-details bg-white rounded-xl border border-gray-100 shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        {/* Description */}
        <div className="profile-section">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Description</h3>
            <button
              onClick={handleAddNew}
              className="text-sm text-green-500 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Edit Description
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3 italic">
            {data?.description ||
              "Add a description to showcase your expertise."}
          </p>
        </div>

        {/* Languages */}
        <div className="profile-section mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Languages</h3>
            <button
              onClick={handleAddNew}
              className="text-sm text-green-500 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Add New
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            {data?.languages?.length
              ? data.languages.join(", ")
              : "English - Basic"}
          </p>
        </div>

        {/* Linked Accounts */}
        <div className="profile-section mt-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Linked Accounts
          </h3>
          <ul className="mt-3 space-y-2">
            {["Facebook", "Google", "Dribbble", "GitHub", "Twitter"].map(
              (account) => (
                <li
                  key={account}
                  className="text-sm text-green-500 hover:text-green-600 font-medium transition-colors duration-200 cursor-pointer flex items-center gap-2"
                >
                  <i
                    className={`fab fa-${account.toLowerCase()} text-gray-400`}
                  ></i>
                  + {account}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Skills */}
        <div className="profile-section mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
            <button
              onClick={handleAddNew}
              className="text-sm text-green-500 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Add New
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {data?.skill?.length ? (
              data.skill.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="text-sm text-gray-700 bg-gray-100 rounded-full px-3 py-1 border border-gray-200"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-600 italic">No skills added</p>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="profile-section mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Education</h3>
            <button
              onClick={handleAddNew}
              className="text-sm text-green-500 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Add New
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3 italic">
            {data?.education?.length
              ? data.education.join(", ")
              : "No education added"}
          </p>
        </div>

        {/* Certifications */}
        <div className="profile-section mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Certification
            </h3>
            <button
              onClick={handleAddNew}
              className="text-sm text-green-500 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Add New
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {data?.certification?.length ? (
              data.certification.map((cert: string, index: number) => (
                <span
                  key={index}
                  className="text-sm text-gray-700 bg-gray-100 rounded-full px-3 py-1 border border-gray-200"
                >
                  {cert}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-600 italic">
                No certifications added
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLeft;
