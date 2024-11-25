/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import InterviewTabTable from './table';
import { interviewTabData } from './table/data';

const InterviewTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalItems = interviewTabData.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = interviewTabData.slice(indexOfFirstItem, indexOfLastItem);

  // Define columns
  const columns = [
    {
      header: 'Candidate Name',
      accessor: (row: any) => row.candidateName,
    },
    {
      header: 'Interviewer',
      accessor: (row: any) => row.interviewer,
    },
    {
      header: 'Applied Position',
      accessor: (row: any) => row.appliedPosition,
    },
    {
      header: 'Interview Date',
      accessor: (row: any) => new Date(row.interviewDate).toLocaleDateString(),
    },
    {
      header: 'Interview Time',
      accessor: (row: any) => row.interviewTime,
    },
    {
      header: 'Status',
      accessor: (row: any) => (
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            row.status === 'Completed'
              ? 'bg-green-200 text-green-800'
              : 'bg-blue-200 text-blue-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="container rounded-xl border bg-white w-full  shadow-sm  py-4">
      <InterviewTabTable
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
  );
};

export default InterviewTab;
