/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import OfferTable from './offer-table';
import { offerData } from './offer-table/data';

const OfferManagementTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalItems = offerData.length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = offerData.slice(indexOfFirstItem, indexOfLastItem);

  // Define columns
  const columns = [
    {
      header: 'Candidate Name',
      accessor: (row: any) => row.candidateName,
    },
    {
      header: 'Job title',
      accessor: (row: any) => row.jobTitle,
    },
    {
      header: 'Department',
      accessor: (row: any) => row.department,
    },
    {
      header: 'Offer Date',
      accessor: (row: any) => new Date(row.offerDate).toLocaleDateString(),

    },
    {
      header: 'Expiration Date',
      accessor: (row: any) => new Date(row.expirationDate).toLocaleDateString(),

    },
    
    {
      header: 'Status',
      accessor: (row: any) => (
        <span
  className={`px-3 py-1 text-sm rounded-full ${
    row.status === 'Pending'
      ? 'bg-[#FEF6E7] text-[#865503]' // Pending
      : row.status === 'Approved'
      ? 'bg-[#E7F6EC] text-[#036B26]' // Approved
      : 'bg-[#FBEAE9] text-[#9E0A05]' // Rejected
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
        <OfferTable
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

export default OfferManagementTable;
