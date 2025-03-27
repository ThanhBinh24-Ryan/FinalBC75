import { CongViec } from "../../../../../types/CongViec.type";
import { TrashIcon, Cog6ToothIcon } from "@heroicons/react/16/solid";
import {
  MagnifyingGlassIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { useDeleteJob, useGetAllJobs } from "../../../../../hooks/job-hook";
import UpdateJobModal from "./UpdateJobModal";
import AddJobModal from "./AddJobModal";
import Swal from "sweetalert2";

const PAGE_SIZE = 10;

export default function JobList() {
  const { data: jobs, isLoading, refetch } = useGetAllJobs();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectingJob, setSelectingJob] = useState<CongViec | null>(null);

  const openAddJobModal = () => setIsAddJobModalOpen(true);
  const closeAddJobModal = () => setIsAddJobModalOpen(false);

  const handleAddJob = () => {
    closeAddJobModal();
    refetch();
  };

  const openUpdateModal = (job: CongViec) => {
    setSelectingJob(job);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectingJob(null);
  };

  const handleUpdateJob = () => {
    closeUpdateModal();
    refetch();
  };

  const onDeleteSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Job deleted successfully",
    });
    refetch();
  };

  const onDeleteError = (error: any) => {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: error.content,
    });
  };

  const { mutate: deleteJob } = useDeleteJob(onDeleteSuccess, onDeleteError);

  const handleDeleteJob = (jobId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJob(jobId);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Trim spaces from the search query and job fields for comparison
  const filteredJobs = jobs?.filter((job: CongViec) => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    const trimmedTenCongViec = job.tenCongViec?.trim().toLowerCase() || "";
    const trimmedMoTa = job.moTa?.trim().toLowerCase() || "";
    const trimmedMoTaNgan = job.moTaNgan?.trim().toLowerCase() || "";
    return (
      trimmedTenCongViec.includes(trimmedQuery) ||
      trimmedMoTa.includes(trimmedQuery) ||
      trimmedMoTaNgan.includes(trimmedQuery)
    );
  });

  const totalPages = Math.ceil((filteredJobs?.length || 0) / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const jobsInCurrentPage = filteredJobs?.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Job Management</h2>
        <button
          type="button"
          onClick={openAddJobModal}
          className="inline-flex items-center gap-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 transition-all duration-200"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Job
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          name="search"
          id="search"
          className="block w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          placeholder="Search jobs by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-4 px-6 text-left text-sm font-semibold text-gray-900"
              >
                Job ID
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-left text-sm font-semibold text-gray-900"
              >
                Job Overview
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-left text-sm font-semibold text-gray-900"
              >
                Description
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-left text-sm font-semibold text-gray-900"
              >
                Rating
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-right text-sm font-semibold text-gray-900"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobsInCurrentPage?.length > 0 ? (
              jobsInCurrentPage.map((job: CongViec) => (
                <tr
                  key={job.id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="py-4 px-6 text-sm text-gray-600">{job.id}</td>
                  <td className="py-4 px-6 text-sm">
                    <div className="flex items-center gap-x-4">
                      <img
                        className="h-12 w-12 rounded-md object-cover"
                        src={job.hinhAnh}
                        alt={job.tenCongViec}
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {job.tenCongViec}
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          {job.moTaNgan}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <div className="max-w-xs truncate">{job.moTa}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <div className="flex items-center gap-x-1">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-5 h-5 ${
                            index < job.saoCongViec!
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-4.326 2.273 1.039-4.814L3.286 9.56l4.842-.703L10 4.415l1.872 4.442 4.842.703-3.427 3.484 1.039 4.814L10 15.585z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right text-sm">
                    <div className="flex justify-end gap-x-3">
                      <button
                        onClick={() => openUpdateModal(job)}
                        className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                        title="Edit Job"
                      >
                        <Cog6ToothIcon className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id!)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                        title="Delete Job"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav className="flex items-center justify-between border-t border-gray-200 px-4 py-6 sm:px-0">
        <div className="flex items-center gap-x-2">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(endIndex, filteredJobs?.length || 0)}
            </span>{" "}
            of <span className="font-medium">{filteredJobs?.length || 0}</span>{" "}
            jobs
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`inline-flex items-center gap-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ArrowLongLeftIcon className="h-5 w-5" />
            Previous
          </button>
          <div className="flex items-center gap-x-1">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center gap-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Next
            <ArrowLongRightIcon className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Modals */}
      <AddJobModal
        isOpen={isAddJobModalOpen}
        onClose={closeAddJobModal}
        onAddJob={handleAddJob}
      />
      {isUpdateModalOpen && selectingJob && (
        <UpdateJobModal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          onUpdateJob={handleUpdateJob}
          selectingJob={selectingJob}
        />
      )}
    </div>
  );
}
