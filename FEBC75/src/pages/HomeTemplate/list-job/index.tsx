import "./Sass/sass.scss";
import Header from "../components/Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListJob } from "../HomePage/slide"; // Import action to fetch job list
import { AppDispatch, RootState } from "../../../store"; // Import store types
import { useLocation } from "react-router-dom"; // Import useLocation for query params
import Job from "./job"; // Import Job component
import Page from "../components/Pages";

export default function ListJob() {
  const dispatch: AppDispatch = useDispatch();
  const { data, error } = useSelector(
    (state: RootState) => state.listJobReducer
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || ""; // Extract search term from URL

  // Fetch job list based on search term
  useEffect(() => {
    dispatch(fetchListJob(searchTerm));
  }, [dispatch, searchTerm]);

  // Render job list with filtering
  const renderJobList = () => {
    if (!data) return null;

    if (data.length === 0) {
      return (
        <div className="col-span-full text-center text-gray-500">
          No jobs found.
        </div>
      );
    }

    const filteredJobs = data.filter((job) =>
      job.congViec.tenCongViec.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredJobs.length === 0) {
      return (
        <div className="col-span-full text-center text-gray-500">
          No jobs found matching "{searchTerm}".
        </div>
      );
    }

    return filteredJobs.map((job) => <Job key={job.id} job={job} />);
  };

  // Handle error state
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Results for "{searchTerm}"
        </h1>

        {/* Filters and Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Dropdown Filters */}
          <div className="flex flex-wrap gap-4">
            <select className="border p-1 rounded w-full sm:w-auto">
              <option>Category</option>
            </select>
            <select className="border p-1 rounded w-full sm:w-auto">
              <option>Service Options</option>
            </select>
            <select className="border p-1 rounded w-full sm:w-auto">
              <option>Location</option>
            </select>
            <select className="border p-1 rounded w-full sm:w-auto">
              <option>Budget</option>
            </select>
            <select className="border p-1 rounded w-full sm:w-auto">
              <option>Delivery Time</option>
            </select>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Pro Service
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Local Sellers
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Online Sellers
              </span>
            </label>
          </div>
        </div>

        {/* Job List */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Job List</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderJobList()}
          </div>
        </div>
      </div>
      <Page />
    </>
  );
}
