import { TrashIcon, Cog6ToothIcon } from "@heroicons/react/16/solid";
import {
  MagnifyingGlassIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { useGetAllJobTypes } from "../../../../../hooks/job-hook";
import { LoaiCongViec } from "../../../../../types/LoaiCongViec.type";

const PAGE_SIZE = 10;

export default function JobTypeList() {
  const { data: jobTypes, isLoading } = useGetAllJobTypes();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Trim spaces from the search query and job type names for comparison
  const filteredJobTypes = jobTypes?.filter((jobType: LoaiCongViec) => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    const trimmedJobTypeName =
      jobType.tenLoaiCongViec?.trim().toLowerCase() || "";
    return trimmedJobTypeName.includes(trimmedQuery);
  });

  const totalPages = Math.ceil((filteredJobTypes?.length || 0) / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const jobTypesInCurrentPage = filteredJobTypes?.slice(startIndex, endIndex);

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
        <h2 className="text-2xl font-bold text-gray-800">
          Job Type Management
        </h2>
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
          placeholder="Search job types by name..."
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
                Job Type ID
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-left text-sm font-semibold text-gray-900"
              >
                Job Type Name
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobTypesInCurrentPage?.length > 0 ? (
              jobTypesInCurrentPage.map((jobType: LoaiCongViec) => (
                <tr
                  key={jobType.id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {jobType.id}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {jobType.tenLoaiCongViec}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-10 text-center text-gray-500">
                  No job types found.
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
              {Math.min(endIndex, filteredJobTypes?.length || 0)}
            </span>{" "}
            of{" "}
            <span className="font-medium">{filteredJobTypes?.length || 0}</span>{" "}
            job types
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
    </div>
  );
}
