import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { fetAddComments } from "./slide-Usercoment";

type AddCommentProps = {
  onCommentAdded: () => void; // Callback to refresh the comments list
};

const AddComment: React.FC<AddCommentProps> = ({ onCommentAdded }) => {
  const { id: maCongViec } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [noiDung, setNoiDung] = useState<string>("");
  const [saoBinhLuan, setSaoBinhLuan] = useState<number>(5);
  const [maNguoiBinhLuan, setMaNguoiBinhLuan] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.user && parsedUser.token) {
          setMaNguoiBinhLuan(parsedUser.user.id);
          setToken(parsedUser.token);
        } else {
          throw new Error("Invalid user data.");
        }
      } catch (error) {
        console.error("Error reading userData from localStorage:", error);
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!noiDung.trim() || !maNguoiBinhLuan || !maCongViec || !token) {
      if (!maNguoiBinhLuan || !token) {
        navigate("/login");
      } else {
        setError("Please enter your comment content.");
      }
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const payload = {
        maCongViec: Number(maCongViec),
        maNguoiBinhLuan,
        ngayBinhLuan: new Date().toISOString(),
        noiDung,
        saoBinhLuan,
      };

      console.log("Payload sent to server:", payload);

      await dispatch(fetAddComments(payload)).unwrap();

      // Reset form after successful submission
      setNoiDung("");
      setSaoBinhLuan(5);

      // Call callback to refresh comments list
      onCommentAdded();
    } catch (err: any) {
      console.error("Error adding comment:", err);
      setError(err?.message || "Failed to add comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (rating: number) => {
    setSaoBinhLuan(rating); // Update the selected rating
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Content Textarea */}
        <div>
          <label
            htmlFor="noiDung"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="noiDung"
            name="noiDung"
            value={noiDung}
            onChange={(e) => setNoiDung(e.target.value)}
            required
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
            rows={4}
            placeholder="Enter your comment here..."
          />
        </div>

        {/* Star Rating */}
        <div>
          <label
            htmlFor="saoBinhLuan"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Rating (Stars)
          </label>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, index) => (
              <span
                key={index}
                onClick={() => handleStarClick(index + 1)}
                className={`cursor-pointer text-2xl transition-transform duration-200 transform hover:scale-110 ${
                  index < saoBinhLuan ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-100 text-red-800 border border-red-300 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 font-semibold text-white rounded-lg transition-all duration-200 ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:scale-95"
          }`}
        >
          {loading ? "Submitting..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
};

export default AddComment;
