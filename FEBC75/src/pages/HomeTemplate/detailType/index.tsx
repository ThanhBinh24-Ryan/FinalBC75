import Header from '../components/Header';
import Section from '../components/Section';
import ServicesCarousel from '../components/Carousel';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../../store"; // Đường dẫn tới store
import { fetListForID } from "./slide"; // Import thunk từ slice
import DetailJobItem from './detailTypes'; // Sử dụng tên mới cho file con

export default function DetailType() {
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.listForIDReducer);

  useEffect(() => {
    if (id) {
      dispatch(fetListForID(parseInt(id, 10))); // Gọi Redux thunk với ID từ URL
    }
  }, [dispatch, id]);

  // Logic render danh sách công việc
  const renderListJob = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message || "Something went wrong"}</div>;
    }

    if (!data || data.length === 0) {
      return <div>No data found</div>;
    }

    // Lọc các công việc có maChiTietLoaiCongViec trùng với ID từ URL
    const filteredJobs = data.filter(
      (job) => job.congViec.maChiTietLoaiCongViec === parseInt(id || "0", 10)
    );

    if (filteredJobs.length === 0) {
      return <div>No jobs match the given criteria</div>;
    }

    // Render toàn bộ danh sách công việc phù hợp
    return  (
        <div className="grid grid-cols-1 px-5  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <DetailJobItem key={job.id} data={job} />
          ))}
        </div>
      );
  };

  return (
    <>
      <Header />
      <Section />
     
      <div className="p-4">
        {/* Gọi hàm renderListJob để render danh sách */}
        {renderListJob()}
      </div>
      <ServicesCarousel />
    </>
  );
}
