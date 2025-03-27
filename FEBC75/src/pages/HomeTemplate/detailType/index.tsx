import Header from "../components/Header";
import Section from "../components/Section";
import ServicesCarousel from "../components/Carousel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../../store"; // Path to the store
import { fetListForID } from "./slide"; // Import thunk from slice
import DetailJobItem from "./detailTypes"; // New name for the child component file

export default function DetailType() {
  const { id } = useParams<{ id: string }>(); // Extract ID from URL
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.listForIDReducer
  );

  // Fetch job list based on ID when component mounts or ID changes
  useEffect(() => {
    if (id) {
      dispatch(fetListForID(parseInt(id, 10))); // Call Redux thunk with parsed ID
    }
  }, [dispatch, id]);

  // Function to render the job list based on state
  const renderJobList = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message || "Something went wrong"}</div>;
    }

    if (!data || data.length === 0) {
      return <div>No data found</div>;
    }

    // Filter jobs where maChiTietLoaiCongViec matches the ID from URL
    const filteredJobs = data.filter(
      (job) => job.congViec.maChiTietLoaiCongViec === parseInt(id || "0", 10)
    );

    if (filteredJobs.length === 0) {
      return <div>No jobs match the given criteria</div>;
    }

    // Render the filtered job list in a responsive grid
    return (
      <div className="grid grid-cols-1 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        {/* Render the job list */}
        {renderJobList()}
      </div>
      <ServicesCarousel />
    </>
  );
}
