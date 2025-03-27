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

  // Initialize form state
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: true, // Boolean type for gender
    skill: [] as string[],
    certification: [] as string[],
    role: "", // Added role field
  });

  // Load user data from localStorage on mount
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
        role: parsedUserData.user.role || "",
        gender: parsedUserData.user.gender ?? true, // Default to true if undefined
        skill: parsedUserData.user.skill || [],
        certification: parsedUserData.user.certification || [],
      }));
    }
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "skill" || name === "certification") {
      const arrayValue = value.split(",").map((item) => item.trim());
      setFormData((prev) => ({ ...prev, [name]: arrayValue }));
    } else if (name === "gender") {
      setFormData((prev) => ({ ...prev, gender: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(fetEditProfile(formData)).unwrap();

      // Update localStorage with new user data
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            token: parsedUserData.token, // Preserve token
            user: { ...parsedUserData.user, ...formData }, // Merge updated data
          })
        );
      }

      alert("Profile updated successfully!");
      navigate(`/profile/${id}`);
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
        {error && <p className="text-center text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="birthday"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
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
            <label
              htmlFor="skill"
              className="block text-sm font-medium text-gray-700"
            >
              Skills
            </label>
            <input
              type="text"
              id="skill"
              name="skill"
              value={formData.skill.join(", ")}
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
              value={formData.certification.join(", ")}
              onChange={handleChange}
              placeholder="Enter your certifications (comma-separated)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
