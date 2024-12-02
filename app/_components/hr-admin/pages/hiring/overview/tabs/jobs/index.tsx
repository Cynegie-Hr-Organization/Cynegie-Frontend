/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import JobsTabTable from "./table";
import useFetchJobs from "@/utils/usefetchJobs";

const JobsTab = () => {
  const {
    jobs,
    isFetching,
    currentPage,
    totalPages,
    handleSearch,
    handleFilterChange,
    handlePageChange,
    handleItemsPerPageChange,
  } = useFetchJobs();

  // Define columns
  const columns = [
    {
      header: "Job Title",
      accessor: (row: any) => row.jobTitle,
    },
    {
      header: "Department",
      accessor: (row: any) => row.department,
    },
    {
      header: "Date Created",
      accessor: (row: any) => new Date(row.dateCreated).toLocaleDateString(),
    },
    {
      header: "Status",
      accessor: (row: any) => (
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            row.status === "Open"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="rounded-xl border bg-white shadow-sm w-full h-full py-4">
      <div className="h-full w-full">
        <JobsTabTable
          jobs={jobs} // Pass jobs data to the table
          columns={columns} // Pass columns to the Table component
          isFetching={isFetching}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          handleSearch={handleSearch}
          handleFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default JobsTab;
