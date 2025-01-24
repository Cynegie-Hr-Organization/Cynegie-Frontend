import React, { useState } from "react";
import { LuListFilter, LuMoreVertical } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { AppSelect } from "@/app/_components/shared/select";
import AppButton from "@/app/_components/shared/button";
import Pagination from "@/app/_components/hr-admin/pages/hiring/shared/pagination";
import AppMenubar from "@/app/_components/shared/menubar";
import Skeleton from "react-loading-skeleton";
import { getGoals } from "@/app/api/services/performance/goals";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import DeleteGoalModal from "@/app/_components/hr-admin/performance/goal/delete-modal";
import { GoalResponse } from "@/types";
import { useRouter } from "next/navigation";

const GoalTable = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [goalIdToDelete, setGoalIdToDelete] = useState<string | null>(null);

  // Fetch goals using useQuery
  const { data, isLoading, refetch } = useQuery<GoalResponse>({
    queryKey: ["goals", currentPage, itemsPerPage, search, filter],
    queryFn: () => getGoals(currentPage, itemsPerPage, "desc", filter, search),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  console.log(data);

  const goals = data?.data?.items || [];
  const totalItems = data?.data?.totalItems || 0;

  const handleDelete = (goalId: string) => {
    setGoalIdToDelete(goalId);
    setModalOpen(true); // Open the modal when clicking delete
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setGoalIdToDelete(null);
    refetch(); // Refetch data after deletion
  };

  const columns = [
    "Goal Name",
    "Assigned To",
    "Due Date",
    "Status",
    "Priority",
  ];

  return (
    <div className="common-card overflow-x-scroll">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        {/* Search Bar */}
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-9 px-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <AppDropdownMenu
          trigger={
            <button
              type="button"
              className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2"
            >
              <LuListFilter /> Filter
            </button>
          }
          menuItems={
            <div className="p-4 space-y-10">
              <div className="space-y-4">
                <AppSelect
                  listItems={[
                    { label: "High", value: "high" },
                    { label: "Medium", value: "medium" },
                    { label: "Low", value: "low" },
                  ]}
                  label="Priority"
                  placeholder="High"
                  onChange={console.log}
                />
                <AppSelect
                  listItems={[
                    { label: "Completed", value: "completed" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Not Started", value: "not-started" },
                  ]}
                  label="Status"
                  placeholder="Pending"
                  onChange={console.log}
                />
                <AppSelect
                  listItems={[
                    { label: "HR Team", value: "hr-team" },
                    { label: "Marketing Team", value: "marketing-team" },
                    { label: "Sales Team", value: "sales-team" },
                  ]}
                  label="Assigned To"
                  placeholder="HR Team"
                  onChange={console.log}
                />
                <AppSelect
                  listItems={[
                    { label: "All Goals", value: "all-goals" },
                    { label: "Personal Goals", value: "personal-goals" },
                    { label: "Team Goals", value: "team-goals" },
                  ]}
                  label="Goal Type"
                  placeholder="All Goals"
                  onChange={console.log}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <AppButton label="Reset" className="btn-secondary w-[90px]" />
                <AppButton label="Filter" className="btn-primary w-[90px]" />
              </div>
            </div>
          }
        />
      </div>

      {/* Table */}
      <div className="-mx-5 mt-4">
        {isLoading ? (
          <SkeletonTable columns={columns} />
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-[#F7F9FC]">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Checkbox className="rounded-md border-gray-300" />
                </th>
                {columns.map((col) => (
                  <th key={col} className="px-4 py-3 text-left">
                    {col}
                  </th>
                ))}
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal) => (
                <tr
                  key={goal.id}
                  className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                >
                  <td className="px-6 py-4">
                    <Checkbox className="rounded-md border-gray-300" />
                  </td>
                  <td className="px-4 py-4">{goal.goalName}</td>
                  <td className="px-4 py-4">{`${goal?.employees[0]?.personalInfo?.firstName} ${goal.employees[0]?.personalInfo?.lastName}`}</td>
                  <td className="px-4 py-4">
                    {new Date(goal.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm w-fit font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-1">
                      {goal.status}
                    </p>
                  </td>
                  <td className="px-4 py-4">{goal.priority}</td>
                  <td className="px-4 py-4">
                    <AppMenubar
                      menuItems={[
                        {
                          key: "view-details",
                          label: (
                            <button
                              type="button"
                              onClick={() =>
                                router.push(
                                  `/hr-admin/performance/goals/goal-detail/${goal.id}`,
                                )
                              }
                              className="hover:text-blue-600 cursor-pointer text-blue-500"
                            >
                              View Details
                            </button>
                          ),
                        },
                        {
                          key: "delete",
                          label: (
                            <button
                              type="button"
                              onClick={() => handleDelete(goal.id)}
                              className="hover:text-red-600 cursor-pointer text-red-500"
                            >
                              Delete
                            </button>
                          ),
                        },
                      ]}
                    >
                      <LuMoreVertical />
                    </AppMenubar>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />

      {/* Delete Modal */}
      <DeleteGoalModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        id={goalIdToDelete || ""}
      />
    </div>
  );
};

// Helper component for loading skeleton
const SkeletonTable = ({ columns }: { columns: string[] }) => (
  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th className="px-6 py-3 text-left">
          <Skeleton height={20} />
        </th>
        {columns.map((col, index) => (
          <th key={index} className="px-4 py-3 text-left">
            <Skeleton height={20} />
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array(4)
        .fill(0)
        .map((_, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-b border-[#E4E7EC] hover:bg-gray-50"
          >
            {Array(columns.length + 1)
              .fill(0)
              .map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-4">
                  <Skeleton height={20} />
                </td>
              ))}
          </tr>
        ))}
    </tbody>
  </table>
);

export default GoalTable;
