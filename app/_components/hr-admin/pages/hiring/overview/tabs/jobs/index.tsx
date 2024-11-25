/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import JobsTabTable from './table';
import { jobsTabData } from './table/data';

const JobsTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalItems = jobsTabData.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobsTabData.slice(indexOfFirstItem, indexOfLastItem);

  // Define columns
  const columns = [
    {
      header: 'Job Title',
      accessor: (row: any) => row.jobTitle,
    },
    {
      header: 'Department',
      accessor: (row: any) => row.department,
    },
    {
      header: 'Date Created',
      accessor: (row: any) => new Date(row.dateCreated).toLocaleDateString(),
    },
    {
      header: 'Status',
      accessor: (row: any) => (
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            row.status === 'Open'
              ? 'bg-green-200 text-green-800'
              : 'bg-red-200 text-red-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className=" rounded-xl border bg-white shadow-sm w-full h-full py-4">
      <div className="h-full w-full">
        <JobsTabTable
          data={currentItems}
          columns={columns} // Pass columns to the Table component
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(items) => {
            setItemsPerPage(items);
            setCurrentPage(1); // Reset to first page when items per page changes
          }}
        />
      </div>
    </div>
  );
};

export default JobsTab;
