/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import Pagination from "./pagination";
import "react-loading-skeleton/dist/skeleton.css";
import { MdMoreVert } from "react-icons/md";
import ViewSecurityModal from "../view-security-modal"; // Import your modal component
import RemoveSecurityModal from "../remove-security-modal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

const SecurityManagementTabTable = <T extends Record<string, any>>({
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
  const [actionDropdowns, setActionDropdowns] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedRowData, setSelectedRowData] = useState<T | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const handleRemoveDevice = (rowData: T) => {
    setSelectedRowData(rowData);
    setIsRemoveModalOpen(true);
  };

  const actionDropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>(
    {},
  );

  const toggleActionDropdown = (rowIndex: number) => {
    setActionDropdowns((prev) => ({ ...prev, [rowIndex]: !prev[rowIndex] }));
  };

  // Handle "View Details" action
  const handleViewDetails = (rowData: T) => {
    setSelectedRowData(rowData);
    setIsViewModalOpen(true);
  };

  // Handle "Edit Details" action
  const handleEditDetails = (rowData: T) => {
    setSelectedRowData(rowData);
    setIsEditModalOpen(true);
  };

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(actionDropdownRefs.current).forEach((key) => {
        const index = Number(key);
        if (
          actionDropdownRefs.current[index] &&
          !actionDropdownRefs.current[index]?.contains(event.target as Node)
        ) {
          setActionDropdowns((prev) => ({
            ...prev,
            [index]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white w-full h-full flex flex-col">
      {/* Table */}
      <div className="flex-grow px-2 md:px-6 overflow-x-auto">
        {isLoading ? (
          <table className="w-full">
            <thead>
              <tr>
                {columns.map((_, index) => (
                  <th key={index} className="py-2">
                    <Skeleton height={20} width="100%" />
                  </th>
                ))}
                <th className="py-2 text-center">
                  <Skeleton height={20} width="100%" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className="border-b">
                    {columns.map((_, colIndex) => (
                      <td key={colIndex} className="p-2">
                        <Skeleton height={20} />
                      </td>
                    ))}
                    <td className="p-2 text-center">
                      <Skeleton height={20} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full  text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                {columns.map((column, index) => (
                  <th key={index} className="py-2">
                    {column.header}
                  </th>
                ))}
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="">
                      {column.accessor(row)}
                    </td>
                  ))}
                  <td className="p-2 relative text-center">
                    {showActions && (
                      <div
                        className="relative"
                        ref={(el: HTMLDivElement | null) => {
                          if (el) {
                            actionDropdownRefs.current[index] = el;
                          }
                        }}
                      >
                        <button onClick={() => toggleActionDropdown(index)}>
                          <MdMoreVert size={24} className="text-gray-800" />
                        </button>
                        {actionDropdowns[index] && (
                          <div className="absolute right-0 items-center text-sm bg-white shadow-lg border border-gray-300 w-fit md:w-[11rem] rounded-md z-10">
                            <ul>
                              <li
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleViewDetails(row)}
                              >
                                View Software details
                              </li>
                              <li
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleEditDetails(row)}
                              >
                                Update Software
                              </li>
                              <li
                                className="p-2 hover:bg-gray-100 cursor-pointer text-red-500"
                                onClick={() => handleRemoveDevice(row)}
                              >
                                Remove Software
                              </li>
                            </ul>
                          </div>
                        )}
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
      <div className="px-4  py-4">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>

      {/* View Details Modal */}
      {isViewModalOpen && (
        <ViewSecurityModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          rowData={selectedRowData} // Pass selected row data
          refetch={refetch}
        />
      )}

      {/* Edit Details Modal */}
      {isEditModalOpen && (
        <ViewSecurityModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          rowData={selectedRowData} // Pass selected row data
          isEdit={true}
          refetch={refetch}
        />
      )}

      {isRemoveModalOpen && (
        <RemoveSecurityModal
          rowData={selectedRowData?.id}
          isOpen={isRemoveModalOpen}
          onClose={() => {
            refetch();
            setIsRemoveModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default SecurityManagementTabTable;
