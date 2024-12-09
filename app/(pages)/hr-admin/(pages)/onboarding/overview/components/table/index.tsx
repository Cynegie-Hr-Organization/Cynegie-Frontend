/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Pagination from "./pagination";
import { LuListFilter } from "react-icons/lu";

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
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}: TableProps<T>) => {
  return (
    <div className="bg-white w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-2 text-sm pl-10"
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
        <button className="flex items-center border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100 gap-x-3">
          <LuListFilter />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="flex-grow overflow-x-auto mt-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              {columns.map((column, index) => (
                <th key={index} className="p-2">
                  {column.header}
                </th>
              ))}
              <th className="p-2">Actions</th>
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
                <td className="p-2">
                  <button>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer (Pagination) */}
      <div className="p-1 md:p-4">
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

export default Table;
