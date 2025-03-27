import { useDeleteUser, useGetAllUsers } from "../../../../../hooks/user-hook";
import { User } from "../../../../../types/User.type";
import { TrashIcon, Cog6ToothIcon } from "@heroicons/react/16/solid";
import {
  MagnifyingGlassIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import AddAdminModal from "./AddAdminModal";
import Swal from "sweetalert2";
import UpdateUserModal from "./UpdateUserModal";

const PAGE_SIZE = 10;
const MAX_VISIBLE_PAGES = 15; // Maximum number of pages to show at a time

export default function UserList() {
  const { data: users, isLoading, refetch } = useGetAllUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectingUser, setSelectingUser] = useState<User | null>(null);

  // Modal operations remain the same
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const handleAddAdmin = () => {
    closeAddModal();
    refetch();
  };

  const openUpdateModal = (user: User) => {
    setSelectingUser(user);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => setIsUpdateModalOpen(false);
  const handleUpdateUser = () => {
    closeUpdateModal();
    refetch();
  };

  // Delete operation remains the same
  const onSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "User deleted successfully",
    });
    refetch();
  };
  const onError = (error: any) => {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: error + " Please try again later.",
    });
  };
  const { mutate: deleteUser } = useDeleteUser(onSuccess, onError);
  const handleDeleteUser = (userId: number) => {
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
        deleteUser(userId);
      }
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const filteredUsers = users?.filter(
    (user: User) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalUsers = filteredUsers?.length || 0;
  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, totalUsers);
  const usersInCurrentPage = filteredUsers?.slice(startIndex, endIndex);

  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Calculate the range of pages to display (max 15 pages)
  const getPageRange = () => {
    const halfVisiblePages = Math.floor(MAX_VISIBLE_PAGES / 2);
    let startPage = Math.max(1, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

    // Adjust startPage if endPage is at the totalPages limit
    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return {
      pages,
      showLeftEllipsis: startPage > 1,
      showRightEllipsis: endPage < totalPages,
    };
  };

  const { pages, showLeftEllipsis, showRightEllipsis } = getPageRange();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              User Management
            </h2>
            <button
              onClick={openAddModal}
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
              Add New User
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Search by name, email, phone, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Birthday
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersInCurrentPage?.map((user: User) => (
                <tr
                  key={user.email}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatar}
                        alt=""
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.birthday}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role?.toLowerCase() === "admin"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => openUpdateModal(user)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                      >
                        <Cog6ToothIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id!)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Showing {startIndex + 1} to {endIndex} of {totalUsers} users
              </span>
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
            </div>
            <div className="flex items-center space-x-2">
              {showLeftEllipsis && (
                <span className="px-3 py-1 text-sm text-gray-500">...</span>
              )}
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  } transition-colors duration-200`}
                >
                  {page}
                </button>
              ))}
              {showRightEllipsis && (
                <span className="px-3 py-1 text-sm text-gray-500">...</span>
              )}
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
          </nav>
        </div>
      </div>

      {/* Modals */}
      <AddAdminModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAddAdmin={handleAddAdmin}
      />
      <UpdateUserModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        onUpdateUser={handleUpdateUser}
        selectingUser={selectingUser!}
      />
    </div>
  );
}
