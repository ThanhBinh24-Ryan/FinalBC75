import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store"; // Đường dẫn tới store
import { fetListDetailJob } from "../Detail-Job/slide"; // Redux action
import Header from "../components/Header";
import DetaiJob from "../Detail-Job/detailJob"; // Component React để hiển thị chi tiết công việc
import Loader from "../components/Loader";
import { fetListComments } from "../Detail-Job/slide-comments"; 
function DetailJobPage() {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const { data: job, } = useSelector(
    (state: RootState) => state.detailJobReducer
  );

  useEffect(() => {
    if (id) {
      dispatch(fetListDetailJob(Number(id))); // Gửi action để lấy chi tiết công việc
    }
  }, [dispatch, id]);
  const { loading, data: comments, error } = useSelector(
    (state: RootState) => state.listCommentsReducer
  );

  useEffect(() => {
    if (id) {
      console.log("Fetching comments for ID:", id);
      dispatch(fetListComments(Number(id)));
    }
  }, [dispatch, id]);
  

  // Hàm render nội dung
  const renderContent = () => {
    if (loading) {
      return <div className="text-center justify-center  py-10"><Loader/></div>;
    }

    if (error) {
      return <div className="text-red-500 text-center py-10">Error: {error}</div>;
    }

    if (!job) {
      return <div className="text-center py-10">No job details available</div>;
    }

    return <DetaiJob jobd={job[0]} />;
  };

  return (
    <div>
      <Header />
      <div className="p-4 ">
        {/* Gọi hàm render nội dung */}
        {renderContent()}
        <div className="container">
        <h1 className="text-center text-2xl font-bold">Comments</h1>
  {comments && comments.length > 0 ? (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <li key={comment.id} className="border-b pb-4">
          <div className="flex items-start">
            <img
              src={comment.avatar || ""}
              alt={comment.tenNguoiBinhLuan || "User Avatar"}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <h4 className="font-bold text-gray-800">{comment.tenNguoiBinhLuan || "Anonymous"}</h4>
              <p className="text-sm text-gray-600">{comment.ngayBinhLuan || "Unknown date"}</p>
              <p className="mt-2 text-gray-800">{comment.noiDung || "No content provided."}</p>
              <p className="text-yellow-500 mt-2">Rating: {comment.saoBinhLuan || 0} ★</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    !loading && <p>No comments available.</p>
  )}
</div>

      </div>
    </div>
  );
}

export default DetailJobPage;
