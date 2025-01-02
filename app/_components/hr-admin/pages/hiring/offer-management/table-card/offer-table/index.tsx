/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdMoreVert } from "react-icons/md";
import WithdrawModal from "../../withdraw-offer-modal";
import ResendModal from "../../resend-modal";
import AppMenubar from "@/app/_components/shared/menubar";
import { useRouter } from "next/navigation";
import Pagination from "@/app/_components/hr-admin/pages/hiring/shared/pagination";

interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  showActions?: boolean;
  isLoading: boolean;
  refetch: () => void;
}

const OffersTable = <T extends { id: string }>({
  data,
  columns,
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  showActions = true,
  isLoading,
  refetch,
}: TableProps<T>) => {
  const [selectedRowData, setSelectedRowData] = useState<T | null>(null);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);

  const actionDropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>(
    {},
  );

  const router = useRouter();

  const handleWithdrawOffer = (rowData: T) => {
    setSelectedRowData(rowData);
    setIsWithdrawModalOpen(true);
  };

  const handleResendOffer = (rowData: T) => {
    setSelectedRowData(rowData);
    setIsResendModalOpen(true);
  };

  return (
    <div className="bg-white w-full h-full flex flex-col overflow-x-auto">
      {/* Table */}
      <div className="mt-4">
        {isLoading ? (
          // Skeleton Loader
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {columns.map((_: any, index: number) => (
                  <th key={index} className="px-6 py-3 text-left">
                    <Skeleton height={20} />
                  </th>
                ))}
                <th className="px-6 py-3 text-left">
                  <Skeleton height={20} />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(4)
                .fill(0)
                .map((_, rowIndex: number) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-[#E4E7EC] hover:bg-gray-50"
                  >
                    {columns.map((_: any, colIndex: number) => (
                      <td key={colIndex} className="px-6 py-4">
                        <Skeleton height={20} />
                      </td>
                    ))}
                    <td className="px-6 py-4 text-center">
                      <Skeleton height={20} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full border-collapse text-sm text-left">
            <thead className="bg-[#F7F9FC]">
              <tr>
                {columns.map((column: any, index: number) => (
                  <th key={index} className="px-6 py-3 text-left">
                    {column.header}
                  </th>
                ))}
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row: any, index: number) => (
                <tr
                  key={index}
                  className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                >
                  {columns.map((column: any, colIndex: number) => (
                    <td key={colIndex} className="px-6 py-4">
                      {column.accessor(row)}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-center relative">
                    {showActions && (
                      <div
                        className="relative"
                        ref={(el: HTMLDivElement | null) => {
                          if (el) {
                            actionDropdownRefs.current[index] = el;
                          }
                        }}
                      >
                        <AppMenubar
                          menuItems={[
                            {
                              key: "resend-offer",
                              label: "Resend Offer",
                              onClick: () => handleResendOffer(row),
                            },
                            {
                              key: "withdraw-offer",
                              label: "Withdraw Offer",
                              onClick: () => handleWithdrawOffer(row),
                            },
                            {
                              key: "edit-job-offer",
                              label: "Edit Job Offer",
                              onClick: () => {
                                const id = row.id;
                                router.push(
                                  `/hr-admin/hiring/offer-management/edit-job-offer/${id}`,
                                );
                                refetch();
                              },
                            },
                            {
                              key: "view-details",
                              label: "View Details",
                              onClick: () => {
                                const id = row.id;
                                router.push(
                                  `/hr-admin/hiring/offer-management/job-offer-details/${id}`,
                                );
                                refetch();
                              },
                            },
                          ]}
                        >
                          <MdMoreVert size={24} className="text-gray-800" />
                        </AppMenubar>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="px-4 py-4">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>

      {/* Modals */}
      {isWithdrawModalOpen && (
        <WithdrawModal
          isOpen={isWithdrawModalOpen}
          onClose={() => setIsWithdrawModalOpen(false)}
          rowData={selectedRowData}
          refetch={refetch}
        />
      )}
      {isResendModalOpen && (
        <ResendModal
          isOpen={isResendModalOpen}
          onClose={() => setIsResendModalOpen(false)}
          rowData={selectedRowData}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default OffersTable;
