/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { MdMoreVert } from "react-icons/md";
import Pagination from "./pagination";
import DeleteJobModal from "../delete-modal";
import { Dropdown } from "@/app/_components/ui/dropdown";
import Skeleton from "react-loading-skeleton"; 
import "react-loading-skeleton/dist/skeleton.css"; 

const JobsTabTable = ({
  jobs,
  columns,
  isFetching,
  totalPages,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  handleSearch,
  handleFilterChange,
}: any) => {
  const [isFilterDropdownOpen, setFilterDropdownOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State for modal visibility
  const [actionDropdowns, setActionDropdowns] = React.useState<{
    [key: number]: boolean;
  }>({});

  const filterDropdownRef = React.useRef<HTMLDivElement>(null);
  const actionDropdownRefs = React.useRef<{
    [key: number]: HTMLDivElement | null;
  }>({});

  const toggleFilterDropdown = () => setFilterDropdownOpen((prev) => !prev);
  const toggleActionDropdown = (rowIndex: number) => {
    setActionDropdowns((prev) => ({ ...prev, [rowIndex]: !prev[rowIndex] }));
  };

  const handleDeleteClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const applyFilters = () => {
    console.log("Filters applied");
    setFilterDropdownOpen(false);
  };

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }

      // Close action dropdowns
      Object.keys(actionDropdownRefs.current).forEach((key) => {
        const index = Number(key);
        if (
          actionDropdownRefs.current[index] &&
          !actionDropdownRefs.current[index]?.contains(event.target as Node)
        ) {
          setActionDropdowns((prev) => ({
            ...prev,
            [index]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="relative w-56">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md w-[200px] md:w-[300px] lg:w-[500px] py-1 md:py-2 text-sm pl-10"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>
        <div className="relative" ref={filterDropdownRef}>
          <button
            className="flex items-center border border-gray-300 rounded-md px-2 md:px-4 py-1 md:py-2 text-sm hover:bg-gray-100"
            onClick={toggleFilterDropdown}
          >
            <FiFilter className="mr-2 text-gray-500" size={20} />
            Filter
          </button>
          {isFilterDropdownOpen && (
            <div className="absolute bg-white shadow-lg border border-gray-300 w-44 rounded-md md:w-72 mt-1 p-2 md:p-4 z-10 right-0">
              <div className="py-1">
                <Dropdown
                  label="Job Title"
                  options={["Designer", "Developer", "Manager"]}
                  selected={""} // Provide appropriate state
                  onSelect={(value: any) => handleFilterChange("title", value)}
                />
              </div>
              
              <div className="flex justify-between">
                <button
                  className="text-sm text-gray-500 hover:underline"
                  onClick={() => handleFilterChange("title", "")}
                >
                  Reset
                </button>
                <button
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
                  onClick={applyFilters}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="flex-grow px-2 md:px-6 overflow-x-auto">
         {isFetching ? (
          // Skeleton Loader
          <table className="w-full">
            <thead>
              <tr>
                {columns.map((_ : any, index : number) => (
                  <th key={index} className="py-2">
                    <Skeleton height={20} width="100%" />
                  </th>
                ))}
                <th className="py-2 text-center">
                  <Skeleton height={20} width="100%" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className="border-b">
                    {columns.map((_ : any, colIndex : number) => (
                      <td key={colIndex} className="p-2">
                        <Skeleton height={20} />
                      </td>
                    ))}
                    <td className="p-2 text-center">
                      <Skeleton height={20} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
        <table className="w-full text-sm  text-left  ">
            <thead>
            <tr className="border-b bg-gray-50">
                {columns.map((column: any, index: number) => (
                  <th key={index} className="py-2  ">
                    {column.header}
                  </th>
                ))}
                <th className="py-2 text-center  ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job: any, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50 ">
                  <td className="p-2 ">{job.title}</td>
                  <td className="p-2 ">{job.department}</td>
                  <td className="p-2 ">{job.jobLocation}</td>
                  <td className="p-2 ">{job.jobLocation}</td>

                  <td className="p-2 text-center">
                    <div
                      className="relative"
                      ref={(el) => {
                        actionDropdownRefs.current[index] = el;
                      }}
                    >
                      <button onClick={() => toggleActionDropdown(index)}>
                        <MdMoreVert size={24} className="text-gray-800" />
                      </button>
                      {actionDropdowns[index] && (
                        <div className="absolute right-0 items-center text-sm bg-white shadow-lg border border-gray-300 w-[8rem] rounded-md z-10">
                          <ul>
                            <li className="p-2 hover:bg-gray-100">
                              View Details
                            </li>
                            <li className="p-2 hover:bg-gray-100 ">Edit</li>
                            <li
                              className="p-2 hover:bg-gray-100 text-red-500"
                              onClick={handleDeleteClick}
                            >
                              Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="px-4 py-4">
        <Pagination
          totalPages={totalPages}
          totalItems={totalPages * 10} // Adjust based on API
          itemsPerPage={10}
          currentPage={currentPage}
          onPageChange={(page) => onPageChange(page)} // Adjust to accept a single parameter
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>

      <DeleteJobModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default JobsTabTable;
