/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import SoftwareManagementTabTable from "./table";
import { getSoftwareManagement } from "@/app/api/services/it-admin"; // Replace with actual service
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { Dropdown } from "@/app/_components/ui/dropdown";
import { Software } from "@/types";

const SoftwareManagementTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const toggleFilterDropdown = () => setFilterDropdownOpen((prev) => !prev);

  // Fetch data with search and filter
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "softwareManagement",
      currentPage,
      itemsPerPage,
      searchQuery,
      statusFilter,
    ],
    queryFn: () =>
      getSoftwareManagement(
        currentPage,
        itemsPerPage,
        "asc",
        statusFilter,
        searchQuery,
      ),
    staleTime: 5 * 60 * 1000,
  });

  // Define columns for the table
  const columns = [
    {
      header: "Software Name",
      accessor: (row: Software) => row.softwareName,
    },
    {
      header: "Version",
      accessor: (row: Software) => row.version,
    },
    {
      header: "License Count",
      accessor: (row: Software) => row.licenseCount,
    },
    {
      header: "License Expiry Date",
      accessor: (row: Software) =>
        new Date(row.licenseExpiryDate).toLocaleDateString(),
    },
    {
      header: "Status",
      accessor: (row: Software) => (
        <span
          className={`text-xs font-semibold ${
            row.status === "ACTIVE" ? "text-green-800" : "text-red-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  // Close the filter dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle errors
  if (error)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <div className="rounded-xl border bg-white w-full shadow-sm py-4">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        {/* Search Input */}
        <div className="relative w-56">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md w-[200px] md:w-[300px] lg:w-[500px] py-1 md:py-2 text-sm pl-10"
          />
          <FiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative" ref={filterDropdownRef}>
          <button
            className="flex items-center border border-gray-300 rounded-md px-2 md:px-4 py-1 md:py-2 text-sm hover:bg-gray-100"
            onClick={toggleFilterDropdown}
          >
            <MdFilterList className="mr-2 text-gray-500" size={20} />
            Filter
          </button>
          {isFilterDropdownOpen && (
            <div className="absolute bg-white shadow-lg border border-gray-300 w-44 rounded-md md:w-72 mt-1 p-2 md:p-4 z-10 right-0">
              <div className="py-1">
                <Dropdown
                  label="Status"
                  options={["ACTIVE", "INACTIVE"]}
                  selected={statusFilter || ""}
                  onSelect={(selected: string) => {
                    console.log("Selected Status:", selected);
                    setStatusFilter(selected);
                    setCurrentPage(1); // Reset current page when status filter changes
                  }}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="text-sm text-gray-500 hover:underline"
                  onClick={() => {
                    setStatusFilter(undefined);
                    setSearchQuery("");
                  }}
                >
                  Reset
                </button>
                <button
                  className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
                  onClick={toggleFilterDropdown}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Software Table */}
      <SoftwareManagementTabTable
        data={data?.software || []}
        columns={columns}
        totalItems={data?.count || 0}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(items) => {
          setItemsPerPage(items);
          setCurrentPage(1);
        }}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default SoftwareManagementTab;
