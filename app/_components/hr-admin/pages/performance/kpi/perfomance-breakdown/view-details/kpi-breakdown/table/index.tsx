/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LuListFilter } from "react-icons/lu";
import Pagination from "@/app/_components/hr-admin/pages/hiring/shared/pagination";
import { Dropdown } from "@/app/_components/ui/dropdown";
import Skeleton from "react-loading-skeleton";

import { RiSearchLine } from "react-icons/ri";

const KPIBreakdownTable = ({
  data = [],
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

  const filterDropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleFilterDropdown = () => setFilterDropdownOpen((prev) => !prev);

  const applyFilters = () => {
    console.log("Filters applied");
    setFilterDropdownOpen(false);
  };

  return (
    <div className="bg-white w-full h-full flex flex-col overflow-x-scroll">
      {/* Header */}
      <div className="p-4 flex justify-between gap-2 items-center">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-9 px-2 outline-none"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="relative" ref={filterDropdownRef}>
          <button
            className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2"
            onClick={toggleFilterDropdown}
          >
            <LuListFilter /> Filter
          </button>
          {isFilterDropdownOpen && (
            <div className="absolute bg-white shadow-lg border border-gray-300 w-44 rounded-md md:w-72 mt-1 p-2 md:p-4 z-10 right-0">
              <div className="py-1">
                <Dropdown
                  label="Time Period"
                  options={["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"]}
                  selected={""}
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
      <div className=" mt-4">
        {isFetching ? (
          // Skeleton Loader
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {columns.map((_: any, index: number) => (
                  <th key={index} className="px-6 py-3 text-left">
                    <Skeleton height={20} />
                  </th>
                ))}
                <th className="px-6 py-3 text-left">
                  <Skeleton height={20} />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(4)
                .fill(0)
                .map((_, rowIndex: number) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-[#E4E7EC] hover:bg-gray-50"
                  >
                    {columns.map((_: any, colIndex: number) => (
                      <td key={colIndex} className="px-6 py-4">
                        <Skeleton height={20} />
                      </td>
                    ))}
                    <td className="px-6 py-4 text-center">
                      <Skeleton height={20} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full border-collapse text-sm text-left">
            <thead className="bg-[#F7F9FC]">
              <tr>
                {columns.map((column: any, index: number) => (
                  <th key={index} className="px-6 py-2 text-left">
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((data: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                  >
                    <td className="px-6 py-2">{data.assessment_type}</td>
                    <td className="px-6 py-2">{data.score}</td>
                    <td className="px-6 py-2">{data.rating}</td>
                    <td className="px-6 py-2">{data.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center py-4">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="px-4 py-4">
        <Pagination
          totalItems={totalPages * 10}
          itemsPerPage={5}
          currentPage={currentPage}
          onPageChange={(page) => onPageChange(page)}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default KPIBreakdownTable;
