import { TrashIcon, Cog6ToothIcon } from "@heroicons/react/16/solid";
import {
  MagnifyingGlassIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { useGetAllServices } from "../../../../../hooks/job-hook";
import { CongViecDuocThue } from "../../../../../types/CongViecDuocThue";
import AddServiceModal from "./AddServiceModal";

const PAGE_SIZE = 10;
const MAX_VISIBLE_PAGES = 15; // Limit to 15 pages in the pagination

export default function ServiceList() {
  const { data: services, isLoading, refetch } = useGetAllServices();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);

  const openAddServiceModal = () => {
    setIsAddServiceModalOpen(true);
  };

  const closeAddServiceModal = () => {
    setIsAddServiceModalOpen(false);
  };

  const handleAddService = () => {
    closeAddServiceModal();
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Trim spaces from the search query and service fields for comparison
  const filteredServices = services?.filter((service: CongViecDuocThue) => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    const trimmedMaCongViec =
      service.maCongViec?.toString().trim().toLowerCase() || "";
    const trimmedMaNguoiThue =
      service.maNguoiThue?.toString().trim().toLowerCase() || "";
    return (
      trimmedMaCongViec.includes(trimmedQuery) ||
      trimmedMaNguoiThue.includes(trimmedQuery)
    );
  });

  const totalPages = Math.ceil((filteredServices?.length || 0) / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const servicesInCurrentPage = filteredServices?.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Calculate the range of pages to display (up to 15 pages)
  const getPageRange = () => {
    const halfRange = Math.floor(MAX_VISIBLE_PAGES / 2);
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    // Adjust startPage if we're near the end of the page range
    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  const visiblePages = getPageRange();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Service Management</h2>
        <button
          type="button"
          onClick={openAddServiceModal}
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
          Add New Service
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
          placeholder="Search services by Job ID or User Rent ID..."
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
                Service ID
              </th>
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
                User Rent ID
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-left text-sm font-semibold text-gray-900"
              >
                Due Date
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {servicesInCurrentPage?.length > 0 ? (
              servicesInCurrentPage.map((service: CongViecDuocThue) => (
                <tr
                  key={service.id}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {service.id}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {service.maCongViec}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {service.maNguoiThue}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {service.ngayThue?.toString()}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {service.hoanThanh ? (
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Finished
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                        Not Finished
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  No services found.
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
              {Math.min(endIndex, filteredServices?.length || 0)}
            </span>{" "}
            of{" "}
            <span className="font-medium">{filteredServices?.length || 0}</span>{" "}
            services
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
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
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

      {/* Add Service Modal */}
      <AddServiceModal
        isOpen={isAddServiceModalOpen}
        onClose={closeAddServiceModal}
        onAddService={handleAddService}
      />
    </div>
  );
}
