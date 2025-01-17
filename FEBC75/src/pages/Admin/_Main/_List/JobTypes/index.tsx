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
    return <div>Loading...</div>;
  }

  const filteredJobTypes = jobTypes?.filter((jobType: LoaiCongViec) =>
    jobType.tenLoaiCongViec?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil((jobTypes?.length || 0) / PAGE_SIZE);
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
    <div className="mb-5 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto border-b border-gray-200">
        <div className="sm:mt-0 sm:pt-4 sm:pb-2 lg:pt-6 lg:pb-4">
          {/* <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Create new job
          </button> */}
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
                    className="w-30 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Job Type Id
                  </th>
                  <th
                    scope="col"
                    className="w-30 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Job Type Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {jobTypesInCurrentPage?.map((jobType: LoaiCongViec) => (
                  <tr key={jobType.id}>
                    <td className="whitespace-nowrap py-5 px-8 text-sm sm:pl-0">
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {jobType.id}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-5 text-left text-sm text-gray-500">
                      <div>{jobType.tenLoaiCongViec}</div>
                    </td>
                    {/* <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        <Cog6ToothIcon className="h-5 w-5" />
                      </a>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-red-600 hover:text-red-900">
                        <TrashIcon className="h-5 w-5" />
                      </a>
                    </td> */}
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
    </div>
  );
}
