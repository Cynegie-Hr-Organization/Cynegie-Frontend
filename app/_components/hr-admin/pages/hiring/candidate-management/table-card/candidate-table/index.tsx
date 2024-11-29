/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import Pagination from './pagination';
import {Dropdown} from '../../../../../../../_components/ui/dropdown'
import { useRouter } from 'next/navigation';
import RejectCandidateModal from "../../reject-candidate-modal";
import MoveStageModal from "../../candidate-details/move-stage-modal";

interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  showActions?: boolean;
}

const CandidateTable = <T extends Record<string, any>>({
  data,
  columns,
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  showActions = true,
}: TableProps<T>) => {

    const router = useRouter();

  
 const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [filters, setFilters] = useState({ candidate: '', job: '' });
  const [actionDropdowns, setActionDropdowns] = useState<{ [key: number]: boolean }>({}); 

  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const actionDropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [isMoveModalOpen, setIsMoveModalOpen] = useState(false); // State for modal visibility

  // Toggle filter dropdown
  const toggleFilterDropdown = () => {
    setFilterDropdownOpen((prev) => !prev);
  };

  // Toggle action dropdown for a specific row
  const toggleActionDropdown = (rowIndex: number) => {
    setActionDropdowns((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

  const closeModal = () => {
  setIsModalOpen(false); 
  };

  const closeMoveModal = () => {
  setIsMoveModalOpen(false); 
  };

  const handleRejectClick = () => {
    setIsModalOpen(true); 
  };

   const handleMoveStageClick = () => {
    setIsMoveModalOpen(true); 
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const applyFilters = () => {
    console.log('Filters applied:', filters);
    setFilterDropdownOpen(false);
  };

  const candidates = ['Precious Henry', 'Law Luke', 'Other Candidate'];
  const jobTitles = ['Snr. UX Designer', 'Content Creator', 'Other Title'];


  

  return (
    <div className="bg-white w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        {/* Search Input */}
        <div className="relative w-56">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md w-[200px] md:w-[300px] lg:w-[500px] py-1 md:py-2 text-sm pl-10"
          />
          {/* Search SVG Icon inside the input */}
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 17.6094L12.3333 12.9427M13.8889 9.05382C13.8889 12.0607 11.4513 14.4983 8.44444 14.4983C5.43756 14.4983 3 12.0607 3 9.05382C3 6.04694 5.43756 3.60938 8.44444 3.60938C11.4513 3.60938 13.8889 6.04694 13.8889 9.05382Z"
              stroke="#667185"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Filter Button */}
        <div className="relative" ref={filterDropdownRef}>
          <button
            className="flex items-center border border-gray-300 rounded-md px-2 md:px-4 py-1 md:py-2 text-sm hover:bg-gray-100"
            onClick={toggleFilterDropdown}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M3.33301 5.60946C3.33301 5.14922 3.7061 4.77612 4.16634 4.77612H15.833C16.2932 4.77612 16.6663 5.14922 16.6663 5.60946C16.6663 6.06969 16.2932 6.44279 15.833 6.44279H4.16634C3.7061 6.44279 3.33301 6.06969 3.33301 5.60946Z"
                fill="#344054"
              />
              <path
                d="M4.99967 10.6095C4.99967 10.1492 5.37277 9.77612 5.83301 9.77612H14.1663C14.6266 9.77612 14.9997 10.1492 14.9997 10.6095C14.9997 11.0697 14.6266 11.4428 14.1663 11.4428H5.83301C5.37277 11.4428 4.99967 11.0697 4.99967 10.6095Z"
                fill="#344054"
              />
              <path
                d="M7.49967 14.7761C7.03944 14.7761 6.66634 15.1492 6.66634 15.6095C6.66634 16.0697 7.03944 16.4428 7.49967 16.4428H12.4997C12.9599 16.4428 13.333 16.0697 13.333 15.6095C13.333 15.1492 12.9599 14.7761 12.4997 14.7761H7.49967Z"
                fill="#344054"
              />
            </svg>
            Filter
          </button>

          {isFilterDropdownOpen && (
            <div className="absolute bg-white shadow-lg border border-gray-300 w-44 rounded-md md:w-72 mt-1 p-2 md:p-4 z-10 right-0">
              <div className="py-1">
                <Dropdown
                  label="Candidate Name"
                  options={candidates}
                  selected={filters.candidate}
                  onSelect={(value: string) =>
                    setFilters({ ...filters, candidate: value })
                  }
                />
                <Dropdown
                  label="Job Title"
                  options={jobTitles}
                  selected={filters.job}
                  onSelect={(value: string) =>
                    setFilters({ ...filters, job: value })
                  }
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="text-sm text-gray-500 hover:underline"
                  onClick={() => setFilters({ candidate: '', job: '' })}
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


      {/* Selected Filters Display */}
  {(filters.candidate || filters.job) && (
  <div className="p-4 flex gap-2 text-sm text-gray-700">
    {/* Candidate Filter */}
    {filters.candidate && (
      <div className="flex items-center border bg-white border-gray-300 p-1 px-2 rounded-md">
        <span className="mr-2">{filters.candidate}</span>
        <button
          onClick={() => setFilters({ ...filters, candidate: '' })}
          className="text-gray-500 text-base hover:text-gray-700"
          aria-label="Remove candidate filter"
        >
          &times;
        </button>
      </div>
    )}

    {/* Job Filter */}
    {filters.job && (
      <div className="flex items-center border bg-white border-gray-300 p-1 px-2 rounded-md">
        <span className="mr-2">{filters.job}</span>
        <button
          onClick={() => setFilters({ ...filters, job: '' })}
          className="text-gray-500 text-base hover:text-gray-700"
          aria-label="Remove job filter"
        >
          &times;
        </button>
      </div>
    )}
  </div>
)}



      {/* Table */}
      <div className="flex-grow px-2 overflow-x-auto">
        <table className="w-full text-sm md:text-base text-left ">
          <thead>
            <tr className="border-b bg-gray-50">
              {columns.map((column, index) => (
                <th key={index} className="p-2">{column.header}</th>
              ))}
              {showActions && (
                <th className="p-2 justify-center">
                  <div className="flex justify-center">Actions</div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="p-2">
                    {column.accessor(row)}
                  </td>
                ))}
               {showActions && (
                  <td className="p-2 pr-2 items-end">
                    <div
                      className="relative"
ref={(el) => {
                actionDropdownRefs.current[rowIndex] = el;
              }}                    >
                      <button onClick={() => toggleActionDropdown(rowIndex)}>
                        <svg
                          width="32"
                          height="33"
                          viewBox="0 0 32 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.5"
                            y="1.10938"
                            width="31"
                            height="31"
                            rx="7.5"
                            fill="white"
                          />
                          <rect
                            x="0.5"
                            y="1.10938"
                            width="31"
                            height="31"
                            rx="7.5"
                            stroke="#E4E7EC"
                          />
                          <path
                            d="M17 11.2761C17 11.8284 16.5523 12.2761 16 12.2761C15.4477 12.2761 15 11.8284 15 11.2761C15 10.7238 15.4477 10.2761 16 10.2761C16.5523 10.2761 17 10.7238 17 11.2761Z"
                            fill="black"
                          />
                          <path
                            d="M17 16.6095C17 17.1617 16.5523 17.6095 16 17.6095C15.4477 17.6095 15 17.1617 15 16.6095C15 16.0572 15.4477 15.6095 16 15.6095C16.5523 15.6095 17 16.0572 17 16.6095Z"
                            fill="black"
                          />
                          <path
                            d="M16 22.9428C16.5523 22.9428 17 22.4951 17 21.9428C17 21.3905 16.5523 20.9428 16 20.9428C15.4477 20.9428 15 21.3905 15 21.9428C15 22.4951 15.4477 22.9428 16 22.9428Z"
                            fill="black"
                          />
                        </svg>
                      </button>
                      {actionDropdowns[rowIndex] && (
                        <div className="absolute right-0 items-center text-sm bg-white  shadow-lg border border-gray-300 w-[7.5rem] rounded-md  z-10"
                        >
                          <ul>
                            <li className="p-2 hover:bg-gray-100"                           onClick={() => router.push('/hr-admin/hiring/candidate-management/candidate-details')} >View Profile </li>
                            <li className="p-2 hover:bg-gray-100" onClick={handleMoveStageClick}>Move Stage</li>
                                                        <li className="p-2 hover:bg-gray-100 text-red-500" onClick={handleRejectClick}>Reject</li>

                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
    <RejectCandidateModal isOpen={isModalOpen} onClose={closeModal} />
      <MoveStageModal isOpen={isMoveModalOpen} onClose={closeMoveModal} />

    </div>
  );
};

export default CandidateTable;
