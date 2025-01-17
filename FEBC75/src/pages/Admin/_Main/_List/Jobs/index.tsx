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
  const openAddJobModal = () => {
    setIsAddJobModalOpen(true);
  };

  const closeAddJobModal = () => {
    setIsAddJobModalOpen(false);
  };

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
    console.log(error);
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
    return <div>Loading...</div>;
  }

  const filteredJobs = jobs?.filter(
    (job: CongViec) =>
      job.tenCongViec?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.moTa?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.moTaNgan?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil((jobs?.length || 0) / PAGE_SIZE);
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
    <div className="mb-5 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto border-b border-gray-200">
        <div className="sm:mt-0 sm:pt-4 sm:pb-2 lg:pt-6 lg:pb-4">
          <button
            type="button"
            onClick={openAddJobModal}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Create new job
          </button>
        </div>
      </div>
      <div>
        <div className="mx-auto mt-4 relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-20 py-3.5 px-8 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Job Id
                  </th>
                  <th
                    scope="col"
                    className="w-20 py-3.5 px-8 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Job Image & Overview
                  </th>
                  <th
                    scope="col"
                    className="w-20 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Job Description
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-1 text-left text-sm font-semibold text-gray-900"
                  >
                    Job Marks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {jobsInCurrentPage?.map((job: CongViec) => (
                  <tr key={job.id}>
                    <td className="whitespace-nowrap py-5 pr-16 text-sm text-gray-500">
                      <div className="truncate">{job.id}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 px-8 pl-4 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img className="h-11 w-11" src={job.hinhAnh} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {job.tenCongViec}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-5 pr-16 text-sm text-gray-500">
                      <div className="w-64 truncate">{job.moTa}</div>
                    </td>
                    <td className="whitespace-nowrap py-5 text-sm text-gray-500">
                      <div className="flex items-center">
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
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => openUpdateModal(job)}
                      >
                        <Cog6ToothIcon className="h-5 w-5" />
                      </button>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        onClick={() => handleDeleteJob(job.id!)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div className="-mt-px flex w-0 flex-1">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </button>
        </div>
        <div className="hidden md:-mt-px md:flex">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                currentPage === index + 1
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>
      <AddJobModal
        isOpen={isAddJobModalOpen}
        onClose={closeAddJobModal}
        onAddJob={handleAddJob}
      />
      <UpdateJobModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        onUpdateJob={handleUpdateJob}
        selectingJob={selectingJob!}
      />
    </div>
  );
}
