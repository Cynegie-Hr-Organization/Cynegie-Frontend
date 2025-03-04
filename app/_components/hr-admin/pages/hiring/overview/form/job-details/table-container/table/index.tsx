/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Pagination from "./pagination";
import { useRouter } from "next/navigation";

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

const JobDetailsTable = <T extends Record<string, any>>({
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

  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenRowIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-white w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="relative w-56">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md w-[200px] md:w-[300px] lg:w-[500px] py-1 md:py-2 text-sm pl-10"
          />
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
        <div className="relative">
          <button className="flex items-center border border-gray-300 rounded-md px-2 md:px-4 py-1 md:py-2 text-sm hover:bg-gray-100">
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
        </div>
      </div>

      {/* Table */}
      <div className="flex-grow px-2 overflow-x-auto">
        <table className="w-full text-sm  text-left ">
          <thead>
            <tr className="border-b bg-gray-50">
              {columns.map((column, index) => (
                <th key={index} className="p-2">
                  {column.header}
                </th>
              ))}
              {showActions && (
                <th className="p-2 justify-end">
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
                  <td className="p-2 pr-2 justify-center">
                    <div className="relative flex justify-center">
                      <button
                        onClick={() => toggleDropdown(rowIndex)}
                        className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
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

                      {openRowIndex === rowIndex && (
                        <div className="absolute top-0 right-24 bg-white shadow-lg border flex flex-col border-gray-300 w-44 rounded-md mt-1 p-2 z-10">
                          <button
                            className="text-sm p-1 text-gray-900 hover:bg-gray-100"
                            onClick={() =>
                              router.push("/hr-admin/hiring/job-details")
                            }
                          >
                            View Details
                          </button>
                          <button
                            className="text-sm p-1 text-gray-900 hover:bg-gray-100"
                            onClick={() =>
                              router.push("/hr-admin/hiring/edit-job")
                            }
                          >
                            Edit
                          </button>
                          <button className="text-sm p-1 text-red-500 hover:bg-gray-100">
                            Delete
                          </button>
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

      <div className="px-4 py-4">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default JobDetailsTable;
