import React, { useState, useRef, useEffect } from "react";
import SecurityManagementTabTable from "./table";
import { getSecurityAlerts } from "@/app/api/services/it-admin";
import { useQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";
import { Dropdown } from "@/app/_components/ui/dropdown";
import { SecurityAlert } from "@/types";

const SecurityManagementTab: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string | undefined>();
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const toggleFilterDropdown = () => setFilterDropdownOpen((prev) => !prev);

  // Fetch security alerts with filters and search
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "securityManagement",
      currentPage,
      itemsPerPage,
      searchQuery,
      severityFilter,
    ],
    queryFn: () =>
      getSecurityAlerts(
        currentPage,
        itemsPerPage,
        "asc",
        severityFilter,
        searchQuery,
      ),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Define columns for the table
  const columns = [
    {
      header: "Alert Type",
      accessor: (row: SecurityAlert) => row.alertTitle,
    },
    {
      header: "Severity",
      accessor: (row: SecurityAlert) => (
        <span
          className={`text-xs font-semibold ${
            row.severity === "HIGH"
              ? "text-red-600"
              : row.severity === "MEDIUM"
                ? "text-yellow-600"
                : "text-green-600"
          }`}
        >
          {row.severity}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: (row: SecurityAlert) => new Date(row.date).toLocaleDateString(),
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
  if (error) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

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
                  label="Severity"
                  options={["HIGH", "MEDIUM", "LOW"]}
                  selected={severityFilter || ""}
                  onSelect={(selected: string) => {
                    setSeverityFilter(selected);
                    setCurrentPage(1); // Reset to the first page when filter changes
                  }}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="text-sm text-gray-500 hover:underline"
                  onClick={() => {
                    setSeverityFilter(undefined);
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

      {/* Security Alerts Table */}
      <SecurityManagementTabTable
        data={data?.securityAlerts || []}
        columns={columns}
        totalItems={data?.count || 0}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(items) => {
          setItemsPerPage(items);
          setCurrentPage(1); // Reset to the first page when items per page changes
        }}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default SecurityManagementTab;
