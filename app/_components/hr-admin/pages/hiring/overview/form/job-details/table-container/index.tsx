/* eslint-disable @typescript-eslint/no-explicit-any */
// JobsDetailsTable.tsx
import React, { useState } from "react";
import JobDetailsTable from "./table";
import { jobDetailsData } from "./table/data";

const JobsDetailsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalItems = jobDetailsData.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobDetailsData.slice(indexOfFirstItem, indexOfLastItem);

  // Define columns with updated headers
  const columns = [
    {
      header: "Date",
      accessor: (row: any) => new Date(row.date).toLocaleDateString(),
    },
    {
      header: "Time",
      accessor: (row: any) => row.time,
    },
    {
      header: "User",
      accessor: (row: any) => row.user,
    },
    {
      header: "Action",
      accessor: (row: any) => row.action,
    },
    {
      header: "Details",
      accessor: (row: any) => row.details,
    },
  ];

  return (
    <div className="rounded-xl border bg-white shadow-sm w-full h-full py-4">
      <div className="h-full w-full">
        <JobDetailsTable
          data={currentItems}
          columns={columns} // Pass updated columns to the Table component
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(items) => {
            setItemsPerPage(items);
            setCurrentPage(1); // Reset to first page when items per page changes
          }}
          showActions={false}
        />
      </div>
    </div>
  );
};

export default JobsDetailsTable;
