import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import CandidateTable from "./candidate-table";
import { Dropdown } from "@/app/_components/ui/dropdown";
import { SortOrder } from "@/types/enum";
import { getJobCandidate } from "@/app/api/services/candidate";
import { RiSearchLine } from "react-icons/ri";
import { LuListFilter } from "react-icons/lu";

const CandidateManagementTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const toggleFilterDropdown = () => setFilterDropdownOpen((prev) => !prev);

  // Fetch candidates using react-query
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "candidates",
      currentPage,
      itemsPerPage,
      searchQuery,
      statusFilter,
    ],
    queryFn: () =>
      getJobCandidate(
        SortOrder.Des,
        currentPage,
        itemsPerPage,
        statusFilter,
        searchQuery,
      ),
    staleTime: 5 * 60 * 1000,
  });

  // Close the filter dropdown when clicking outside
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

  const columns = [
    {
      header: "Candidate Name",
      accessor: (row: any) => `${row?.firstName} ${row?.lastName}`,
    },
    {
      header: "Applied Position",
      accessor: (row: any) => row?.job?.title,
    },
    {
      header: "Stages",
      accessor: (row: any) => row?.stage,
    },
    {
      header: "Application Date",
      accessor: (row: any) => new Date(row?.createdAt).toLocaleDateString(),
    },
    {
      header: "Status",
      accessor: (row: any) => (
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            row.status === "Pending"
              ? "bg-[#FEF6E7] text-[#865503]"
              : row.status === "Approved"
                ? "bg-[#E7F6EC] text-[#036B26]"
                : "bg-[#FBEAE9] text-[#9E0A05]"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  // Handle errors
  if (error) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="rounded-xl flex flex-col border bg-white shadow-sm w-full h-full py-4 overflow-x-auto">
      {/* Header */}
      <div className="p-4  w-full flex justify-between items-center">
        {/* Search Input */}
           {/* Search Input */}
          <div className="flex-grow max-w-[300px] mx-2 xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
            <RiSearchLine className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 px-2 outline-none"
            />
          </div>
  
          {/* Filter Dropdown */}
          <div className="relative" ref={filterDropdownRef}>
            <button
              className="text-gray-400 font-bold flex  gap-2 items-center border rounded-lg px-4 py-2"
              onClick={toggleFilterDropdown}
            >
              <LuListFilter /> Filter
            </button>
          {isFilterDropdownOpen && (
            <div className="absolute bg-white shadow-lg border border-gray-300 w-44 rounded-md mt-1 p-4 z-10 right-0">
              <Dropdown
                label="Status"
                options={["Pending", "Approved", "Rejected"]}
                selected={statusFilter || ""}
                onSelect={(selected: string) => {
                  setStatusFilter(selected);
                  setCurrentPage(1);
                }}
              />
              <div className="flex justify-between mt-2">
                <button
                  className="text-sm text-gray-500 hover:underline"
                  onClick={() => {
                    setStatusFilter(undefined);
                    setSearchQuery("");
                    refetch();
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

      {/* Candidate Table */}
      <div className="h-full w-full">
        <CandidateTable
          data={data?.data?.data || []}
          columns={columns}
          totalItems={data?.data?.count || 0}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(items) => {
            setItemsPerPage(items);
            setCurrentPage(1);
          }}
          isLoading={isLoading}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default CandidateManagementTable;
