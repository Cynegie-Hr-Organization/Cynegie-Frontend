/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import Pagination from "@/app/_components/hr-admin/pages/hiring/shared/pagination";
import { useRouter } from "next/navigation";
import RejectCandidateModal from "../../reject-candidate-modal";
import MoveStageModal from "../../candidate-details/move-stage-modal";
import AppMenubar from "@/app/_components/shared/menubar";
import { Candidate } from "@/types";
import Skeleton from "react-loading-skeleton";

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

const CandidateTable = ({
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
}: TableProps<Candidate>) => {
  const router = useRouter();
  const [selectedRowData, setSelectedRowData] = useState<Candidate | null>(
    null,
  );
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const actionDropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>(
    {},
  );

  const handleRejectCandidate = (rowData: Candidate) => {
    setSelectedRowData(rowData);
    setIsRejectModalOpen(true);
  };

  const handleMoveStage = (rowData: Candidate) => {
    setSelectedRowData(rowData);
    setIsMoveModalOpen(true);
  };

  return (
    <div className="bg-white w-full h-full flex flex-col ">
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
                {showActions && (
                  <th className="px-6 py-3 text-left">
                    <Skeleton height={20} />
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {Array(5)
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
                    {showActions && (
                      <td className="px-6 py-4 text-center">
                        <Skeleton height={20} />
                      </td>
                    )}
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
                {showActions && (
                  <th className="px-6 py-3 text-left">Actions</th>
                )}
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
                  {showActions && (
                    <td className="px-6 py-4 text-center relative">
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
                              key: "reject-candidate",
                              label: "Reject Candidate",
                              onClick: () => handleRejectCandidate(row),
                            },
                            {
                              key: "move-stage",
                              label: "Move to Stage",
                              onClick: () => handleMoveStage(row),
                            },
                            {
                              key: "view-details",
                              label: "View Details",
                              onClick: () =>
                                router.push(
                                  `/hr-admin/hiring/candidate-management/candidate-details/${row.id}`,
                                ),
                            },
                            {
                              key: "create-job-offer",
                              label: "Create Job Offer",
                              onClick: () =>
                                router.push(
                                  `/hr-admin/hiring/offer-management/create-job-offer/${row.id}`,
                                ),
                            },
                          ]}
                        >
                          <button>
                            <span className="text-gray-800">⋮</span>
                          </button>
                        </AppMenubar>
                      </div>
                    </td>
                  )}
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
      {isRejectModalOpen && selectedRowData && (
        <RejectCandidateModal
          isOpen={isRejectModalOpen}
          onClose={() => setIsRejectModalOpen(false)}
          rowData={selectedRowData}
          refetch={refetch}
        />
      )}
      {isMoveModalOpen && selectedRowData && (
        <MoveStageModal
          isOpen={isMoveModalOpen}
          onClose={() => setIsMoveModalOpen(false)}
          rowData={selectedRowData}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default CandidateTable;
