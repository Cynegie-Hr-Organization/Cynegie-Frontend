/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from "@/app/_components/hr-admin/pages/hiring/shared/pagination";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import AppMenubar from "@/app/_components/shared/menubar";

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

const InterviewTabTable = <T extends Record<string, any>>({
  data,
  columns,
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  showActions = true,
  isLoading,
}: TableProps<T>) => {
  const router = useRouter();

  return (
    <div className="bg-white w-full h-full flex flex-col">
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
                  <td className="px-6  text-center relative">
                    {showActions && (
                      <div className="p-2 pr-2 justify-center">
                        <div className="relative">
                          <AppMenubar
                            menuItems={[
                              ...(row.status === "Completed"
                                ? [
                                    {
                                      key: "view-details",
                                      label: "View Details",
                                      onClick: () =>
                                        router.push(
                                          `/hr-admin/hiring/interview-details/${row.id}`,
                                        ),
                                    },
                                    {
                                      key: "cancel",
                                      label: "Cancel",
                                      onClick: () =>
                                        console.log("Cancel action clicked"), // Replace with cancel logic
                                      className: "text-red-500", // Style for cancel option
                                    },
                                  ]
                                : []),
                              ...(row.status === "Scheduled"
                                ? [
                                    {
                                      key: "view-details",
                                      label: "View Details",
                                      onClick: () =>
                                        router.push(
                                          `/hr-admin/hiring/interview-details/${row.id}`,
                                        ),
                                    },
                                    {
                                      key: "reschedule",
                                      label: "Reschedule",
                                      onClick: () =>
                                        router.push(
                                          `/hr-admin/hiring/candidate-management/interviews-schedule/${row.candidate.id}`,
                                        ),
                                    },
                                  ]
                                : []),
                              ...(row.status === "Pending"
                                ? [
                                    {
                                      key: "view-details",
                                      label: "View Details",
                                      onClick: () =>
                                        router.push(
                                          `/hr-admin/hiring/interview-details/${row.id}`,
                                        ),
                                    },
                                    {
                                      key: "reschedule",
                                      label: "Reschedule",
                                      onClick: () =>
                                        router.push(
                                          `/hr-admin/hiring/candidate-management/interviews-schedule/${row.candidate.id}`,
                                        ),
                                    },
                                  ]
                                : []),
                            ]}
                          >
                            <svg
                              width="32"
                              height="33"
                              viewBox="0 0 32 33"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                x="0.5"
                                y="1.10938"
                                width="31"
                                height="31"
                                rx="7.5"
                                fill="white"
                              />
                              <rect
                                x="0.5"
                                y="1.10938"
                                width="31"
                                height="31"
                                rx="7.5"
                                stroke="#E4E7EC"
                              />
                              <path
                                d="M17 11.2761C17 11.8284 16.5523 12.2761 16 12.2761C15.4477 12.2761 15 11.8284 15 11.2761C15 10.7238 15.4477 10.2761 16 10.2761C16.5523 10.2761 17 10.7238 17 11.2761Z"
                                fill="black"
                              />
                              <path
                                d="M17 16.6095C17 17.1617 16.5523 17.6095 16 17.6095C15.4477 17.6095 15 17.1617 15 16.6095C15 16.0572 15.4477 15.6095 16 15.6095C16.5523 15.6095 17 16.0572 17 16.6095Z"
                                fill="black"
                              />
                              <path
                                d="M16 22.9428C16.5523 22.9428 17 22.4951 17 21.9428C17 21.3905 16.5523 20.9428 16 20.9428C15.4477 20.9428 15 21.3905 15 21.9428C15 22.4951 15.4477 22.9428 16 22.9428Z"
                                fill="black"
                              />
                            </svg>
                          </AppMenubar>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="px-4 py-4">
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default InterviewTabTable;
