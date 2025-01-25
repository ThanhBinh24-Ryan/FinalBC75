import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import { fetEditProfile } from "./slide";
import Header from "../components/Header";
const EditProfile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.editProfileReducer
  );

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: true,  // Cập nhật gender kiểu boolean
    skill: [],
    certification: [],
    role: "", // Thêm role vào formData
  });

  // Lấy dữ liệu người dùng từ localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setFormData((prev) => ({
        ...prev,
        id: parsedUserData.user.id,
        name: parsedUserData.user.name || "",
        email: parsedUserData.user.email || "",
        phone: parsedUserData.user.phone || "",
        birthday: parsedUserData.user.birthday || "",
        role: parsedUserData.user.role || "", // Lấy thông tin role
        gender: parsedUserData.user.gender || true, // Đảm bảo gender là boolean
        skill: parsedUserData.user.skill || [],
        certification: parsedUserData.user.certification || [],
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Nếu trường là 'skill' hoặc 'certification', ta tách chuỗi theo dấu phẩy
    if (name === "skill" || name === "certification") {
      const arrayValue = value.split(",").map((item) => item.trim()); // Tách chuỗi thành mảng
      setFormData((prev) => ({
        ...prev,
        [name]: arrayValue,
      }));
    } else if (name === "gender") {
      setFormData((prev) => ({
        ...prev,
        gender: value === "true", // Chuyển thành boolean
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(fetEditProfile(formData)).unwrap();
      
      // Lưu lại thông tin đã cập nhật vào localStorage
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);

        // Cập nhật chỉ những thông tin thay đổi, không thay đổi token
        localStorage.setItem("userData", JSON.stringify({
          token: parsedUserData.token,  // Giữ nguyên token
          user: {
            ...parsedUserData.user, // Giữ nguyên user cũ
            ...formData,  // Cập nhật thông tin mới
          }
        }));
      }

      alert("Profile updated successfully!");
      navigate(`/profile/${id}`); // Điều hướng về trang profile
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <>
    <Header />
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit Profile
      </h1>
      {loading && <p className="text-center text-gray-500">Updating...</p>}
      {error && (
        <p className="text-center text-red-500">
          {/* Hiển thị lỗi nếu có */}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Birthday */}
        <div>
          <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <div className="mt-2 flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="true"
                checked={formData.gender === true}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="false"
                checked={formData.gender === false}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label htmlFor="skill" className="block text-sm font-medium text-gray-700">
            Skills
          </label>
          <input
            type="text"
            id="skill"
            name="skill"
            value={formData.skill.join(", ")} // Hiển thị như chuỗi cho dễ nhìn
            onChange={handleChange}
            placeholder="Enter your skills (comma-separated)"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Certifications */}
        <div>
          <label
            htmlFor="certification"
            className="block text-sm font-medium text-gray-700"
          >
            Certifications
          </label>
          <input
            type="text"
            id="certification"
            name="certification"
            value={formData.certification.join(", ")} // Hiển thị như chuỗi cho dễ nhìn
            onChange={handleChange}
            placeholder="Enter your certifications (comma-separated)"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
    </>
  );
};

export default EditProfile;
