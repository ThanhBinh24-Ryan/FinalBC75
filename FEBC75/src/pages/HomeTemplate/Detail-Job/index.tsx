import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store"; // Path to store
import { fetListDetailJob } from "../Detail-Job/slide"; // Redux action
import Header from "../components/Header";
import DetaiJob from "../Detail-Job/detailJob"; // Component to display job details
import Loader from "../components/Loader";
import AddComment from "./userComment";
import { fetListComments } from "../Detail-Job/slide-comments"; // Redux action to fetch comments
import PostJobForm from "./thue";

function DetailJobPage() {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>(); // Get ID from URL
  const { data: job } = useSelector(
    (state: RootState) => state.detailJobReducer
  );
  const {
    loading,
    data: comments,
    error,
  } = useSelector((state: RootState) => state.listCommentsReducer);

  const [selected, setSelected] = useState<"helpful" | "notHelpful" | null>(
    null
  );

  // Fetch job details
  useEffect(() => {
    if (id) {
      dispatch(fetListDetailJob(Number(id)));
    }
  }, [dispatch, id]);

  // Fetch comments
  const fetchComments = () => {
    if (id) {
      dispatch(fetListComments(Number(id)));
    }
  };

  useEffect(() => {
    fetchComments(); // Fetch comments when the component mounts
  }, [id]);

  // Callback to refresh comments after adding a new one
  const handleCommentAdded = () => {
    fetchComments(); // Re-fetch comments
  };

  // Render content based on loading, error, or data state
  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center justify-center py-10">
          <Loader />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 text-center py-10">Error: {error}</div>
      );
    }

    if (!job) {
      return <div className="text-center py-10">No job details available</div>;
    }

    return <DetaiJob jobd={job[0]} />;
  };

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row gap-8 bg-gray-50 min-h-screen">
        {/* Main Content */}
        <div className="w-full lg:w-4/5 p-4 md:p-6">
          {/* Job Details */}
          {renderContent()}

          {/* Comments Section */}
          <div className="container mx-auto mt-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Comments
            </h1>
            {comments && comments.length > 0 ? (
              <ul className="space-y-6">
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start">
                      <img
                        src={
                          comment.avatar ||
                          "https://randomuser.me/api/portraits/lego/1.jpg"
                        }
                        alt={comment.tenNguoiBinhLuan || "User Avatar"}
                        className="w-12 h-12 rounded-full mr-4 border border-gray-300"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-gray-800">
                              {comment.tenNguoiBinhLuan || "Anonymous"}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {comment.ngayBinhLuan || "Unknown date"}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }, (_, index) => (
                              <span
                                key={index}
                                className={
                                  index < (comment.saoBinhLuan || 0)
                                    ? "text-yellow-500"
                                    : "text-gray-400"
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700">
                          {comment.noiDung || "No content provided."}
                        </p>
                        <div className="flex space-x-4 mt-3">
                          <span
                            className="cursor-pointer flex items-center space-x-1 group"
                            onClick={() => setSelected("helpful")}
                          >
                            <span
                              className={`${
                                selected === "helpful"
                                  ? "text-blue-500"
                                  : "text-gray-500 group-hover:text-blue-400"
                              } transition-colors duration-200`}
                            >
                              <i className="fa-solid fa-thumbs-up"></i>
                            </span>
                            <span
                              className={`${
                                selected === "helpful"
                                  ? "text-blue-500"
                                  : "text-gray-700 group-hover:text-blue-400"
                              } text-sm transition-colors duration-200`}
                            >
                              Helpful
                            </span>
                          </span>
                          <span
                            className="cursor-pointer flex items-center space-x-1 group"
                            onClick={() => setSelected("notHelpful")}
                          >
                            <span
                              className={`${
                                selected === "notHelpful"
                                  ? "text-blue-500"
                                  : "text-gray-500 group-hover:text-blue-400"
                              } transition-colors duration-200`}
                            >
                              <i className="fa-solid fa-thumbs-down"></i>
                            </span>
                            <span
                              className={`${
                                selected === "notHelpful"
                                  ? "text-blue-500"
                                  : "text-gray-700 group-hover:text-blue-400"
                              } text-sm transition-colors duration-200`}
                            >
                              Not Helpful
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              !loading && (
                <p className="text-center text-gray-600">
                  No comments available.
                </p>
              )
            )}
          </div>

          {/* Add Comment Section */}
          <div className="container mx-auto mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Add a Comment
            </h2>
            <AddComment onCommentAdded={handleCommentAdded} />
          </div>
        </div>

        {/* Sidebar (PostJobForm) */}
        <div className="w-full lg:w-1/5 p-4 md:p-6">
          <div className="sticky top-6">
            <PostJobForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailJobPage;
