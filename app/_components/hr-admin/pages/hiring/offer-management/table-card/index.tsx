import React, { useState, useRef, useEffect } from "react";
import OfferTable from "./offer-table";
import { useQuery } from "@tanstack/react-query";
import { RiSearchLine } from "react-icons/ri";
import { LuListFilter } from "react-icons/lu";
import { Dropdown } from "@/app/_components/ui/dropdown";
import { getJobOffers } from "@/app/api/services/job-offer";
import { SortOrder } from "@/types/enum";

const OfferManagementTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const toggleFilterDropdown = () => setFilterDropdownOpen((prev) => !prev);

  // Fetch data with React Query
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [
      "jobOffers",
      currentPage,
      itemsPerPage,
      searchQuery,
      statusFilter,
    ],
    queryFn: () =>
      getJobOffers(
        SortOrder.Des,
        currentPage,
        itemsPerPage,
        statusFilter,
        searchQuery,
      ),
    staleTime: 5 * 60 * 1000,
  });
  console.log(data);
  const columns = [
    {
      header: "Candidate Name",
      accessor: (row: any) =>
        `${row?.candidate?.firstName} ${row?.candidate?.lastName}`,
    },
    {
      header: "Job Title",
      accessor: (row: any) => row?.jobTitle,
    },
    {
      header: "Department",
      accessor: (row: any) => row?.department,
    },
    {
      header: "Offer Date",
      accessor: (row: any) => new Date(row?.offerDate).toLocaleDateString(),
    },
    {
      header: "Expiration Date",
      accessor: (row: any) =>
        new Date(row?.expirationDate).toLocaleDateString(),
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
    <div className="rounded-xl border bg-white shadow-sm w-full h-full py-4">
      {/* Header */}
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
                  label="Status"
                  options={["Pending", "Approved", "Withdrawn"]}
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
                  onClick={toggleFilterDropdown}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Offer Table */}
      <div className="h-full w-full">
        <OfferTable
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

export default OfferManagementTable;
