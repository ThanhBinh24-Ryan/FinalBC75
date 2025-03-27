import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetListThue } from "./slide-thue";
import { RootState, AppDispatch } from "./../../../store";
import { FaCheckCircle } from "react-icons/fa";

const PostJobForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [maCongViec, setMaCongViec] = useState("");
  const [ngayThue, setNgayThue] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("Premium");

  const { loading } = useSelector((state) => state.listThueReducer);

  // Fetch job ID from URL and set default hire date
  useEffect(() => {
    const jobId = window.location.pathname.split("/").pop();
    if (jobId) setMaCongViec(jobId);
    const currentDate = new Date().toISOString().split("T")[0];
    setNgayThue(currentDate);
  }, []);

  // Validate user authentication
  const getUserData = () => {
    const userData = localStorage.getItem("userData");
    if (!userData) {
      setMessage("Please log in to continue");
      setIsSuccess(false);
      setShowMessage(true);
      setTimeout(() => navigate("/login"), 2000);
      return null;
    }

    try {
      const parsedUserData = JSON.parse(userData);
      if (!parsedUserData.user?.id || !parsedUserData.token) {
        throw new Error("Invalid user data");
      }
      return { userId: parsedUserData.user.id, token: parsedUserData.token };
    } catch (error) {
      setMessage("Authentication error. Please log in again");
      setIsSuccess(false);
      setShowMessage(true);
      setTimeout(() => navigate("/login"), 2000);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = getUserData();
    if (!userData) return;

    const data = {
      maCongViec: Number(maCongViec),
      maNguoiThue: userData.userId,
      ngayThue: new Date(ngayThue),
      hoanThanh: true,
    };

    try {
      await dispatch(fetListThue(data)).unwrap();
      setMessage("Job posted successfully!");
      setIsSuccess(true);
    } catch (err) {
      setMessage(err?.message || "Failed to post job");
      setIsSuccess(false);
    } finally {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  // Package data
  const packages = {
    Basic: {
      name: "Basic",
      price: 500,
      description: "Create a simple web application for your business",
      features: [
        "15 Days Delivery",
        "1 Revision",
        "Responsive Design",
        "Source Code Included",
        "1 Page",
      ],
    },
    Standard: {
      name: "Standard",
      price: 1000,
      description: "Create a simple web application for your business",
      features: [
        "30 Days Delivery",
        "1 Revision",
        "Design Customization",
        "Content Upload",
        "Responsive Design",
        "Source Code Included",
        "1 Page",
      ],
    },
    Premium: {
      name: "Premium",
      price: 2000,
      description: "Create a fully-featured web application for your business",
      features: [
        "45 Days Delivery",
        "3 Revisions",
        "Design Customization",
        "Content Upload",
        "Responsive Design",
        "Source Code Included",
        "3 Pages",
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
        {/* Package Tabs */}
        <div className="flex justify-between border-b border-gray-200 mb-6">
          {["Basic", "Standard", "Premium"].map((pkg) => (
            <button
              key={pkg}
              onClick={() => setSelectedPackage(pkg)}
              className={`relative flex-1 py-3 text-base font-medium transition-all duration-300 ${
                selectedPackage === pkg
                  ? "text-green-600 border-b-4 border-green-600"
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              {pkg}
            </button>
          ))}
        </div>

        {/* Package Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800">
              {packages[selectedPackage].name}
            </h3>
            <span className="text-2xl font-semibold text-green-600">
              ${packages[selectedPackage].price}
            </span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {packages[selectedPackage].description}
          </p>

          <ul className="space-y-3">
            {packages[selectedPackage].features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                <span className="text-base text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Continue Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-base text-white transition-all duration-300 flex items-center justify-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 active:scale-95 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {loading
              ? "Processing..."
              : `Continue with $${packages[selectedPackage].price}`}
          </button>

          {/* Message Notification */}
          {showMessage && (
            <div
              className={`p-4 rounded-lg flex items-center gap-3 animate-fade-in ${
                isSuccess
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              <FaCheckCircle
                className={`text-lg ${
                  isSuccess ? "text-green-500" : "text-red-500"
                }`}
              />
              <span className="text-base">{message}</span>
            </div>
          )}
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PostJobForm;
