/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import InterviewTabTable from "./table";
import { useQuery } from "@tanstack/react-query";
import { RiSearchLine } from "react-icons/ri";
import { LuListFilter } from "react-icons/lu";
import { Dropdown } from "@/app/_components/ui/dropdown";
import { getInterviews } from "@/app/api/services/interview";
import { SortOrder } from "@/types/enum";

const InterviewTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);

  // Fetch data using React Query
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "interviews",
      currentPage,
      itemsPerPage,
      searchQuery,
      statusFilter,
    ],
    queryFn: () =>
      getInterviews(
        SortOrder.Des,
        currentPage,
        itemsPerPage,
        statusFilter,
        searchQuery,
      ),
    staleTime: 5 * 60 * 1000,
  });

  console.log(data);
  // Define columns
  const columns = [
    {
      header: "Candidate Name",
      accessor: (row: any) => {
        const firstName = row.candidate?.firstName || "";
        const lastName = row.candidate?.lastName || "";

        return `${firstName}  ${lastName}`.trim();
      },
    },
    {
      header: "Interviewer",
      accessor: (row: any) => {
        const firstName = row.interviewer?.personalInfo?.firstName || "";
        const lastName = row.interviewer?.personalInfo?.lastName || "";

        return `${firstName} ${lastName}`.trim();
      },
    },
    {
      header: "Applied Position",
      accessor: (row: any) => row.candidate?.job?.title,
    },
    {
      header: "Interview Date",
      accessor: (row: any) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Interview Time",
      accessor: (row: any) => row.startTime,
    },
    {
      header: "Status",
      accessor: (row: any) => (
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            row.status === "Completed"
              ? "bg-green-200 text-green-800"
              : "bg-blue-200 text-blue-800"
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
    <div className="container rounded-xl border bg-white w-full shadow-sm py-4">
      {/* Header with Search and Filter */}
      <div className="p-4 flex justify-between gap-2 items-center">
        {/* Search Input */}
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
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
        <div className="relative">
          <button
            className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2"
            onClick={() => setFilterDropdownOpen((prev) => !prev)}
          >
            <LuListFilter /> Filter
          </button>
          {isFilterDropdownOpen && (
            <div className="absolute bg-white shadow-lg border border-gray-300 w-44 rounded-md md:w-72 mt-1 p-2 md:p-4 z-10 right-0">
              <div className="py-1">
                <Dropdown
                  label="Status"
                  options={["Pending", "Completed"]}
                  selected={statusFilter || ""}
                  onSelect={(selected: string) => {
                    setStatusFilter(selected);
                    setCurrentPage(1);
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
                  onClick={() => setFilterDropdownOpen(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interview Table */}
      <InterviewTabTable
        data={data?.data || []}
        columns={columns}
        totalItems={data?.itemCount || 0}
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
  );
};

export default InterviewTab;
