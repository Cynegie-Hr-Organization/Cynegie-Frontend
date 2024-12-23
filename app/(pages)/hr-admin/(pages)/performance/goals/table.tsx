import React, { useState, useEffect, useCallback } from "react";
import { LuListFilter, LuMoreVertical } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { Checkbox } from "@/components/ui/checkbox";
import { AppSelect } from "@/app/_components/shared/select";
import AppButton from "@/app/_components/shared/button";
import Pagination from "@/app/_components/hr-admin/pages/hiring/shared/pagination";
import AppMenubar from "@/app/_components/shared/menubar";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { getGoals } from "@/app/api/services/performance/goals";
import { Goal } from "@/types";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import DeleteGoalModal from "@/app/_components/hr-admin/performance/goal/delete-modal";

const GoalTable = () => {
  const [search, setSearch] = useState("");
  const [filter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [goalIdToDelete, setGoalIdToDelete] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getGoals(
        currentPage,
        itemsPerPage,
        "asc",
        filter,
        search,
      );
      setGoals(data.items || []); // Fallback to empty array if data is undefined

      setTotalItems(data.totalItems || 0); // Optional chaining with fallback to 0 if meta or totalItems is undefined
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, filter, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = (goalId: string) => {
    setGoalIdToDelete(goalId);
    setModalOpen(true); // Open the modal when clicking delete
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setGoalIdToDelete(null);
    fetchData();
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
                  onChange={function (value: string): void {
                    console.log(value);
                  }}
                />

                <AppSelect
                  listItems={[
                    { label: "Completed", value: "completed" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Not Started", value: "not-started" },
                  ]}
                  label="Status"
                  placeholder="Pending"
                  onChange={function (value: string): void {
                    console.log(value);
                  }}
                />
                <AppSelect
                  listItems={[
                    { label: "HR Team", value: "hr-team" },
                    { label: "Marketing Team", value: "marketing-team" },
                    { label: "Sales Team", value: "sales-team" },
                  ]}
                  label="Assigned To"
                  placeholder="HR Team"
                  onChange={function (value: string): void {
                    console.log(value);
                  }}
                />
                <AppSelect
                  listItems={[
                    { label: "All Goals", value: "all-goals" },
                    { label: "Personal Goals", value: "personal-goals" },
                    { label: "Team Goals", value: "team-goals" },
                  ]}
                  label="Goal Type"
                  placeholder="All Goals"
                  onChange={function (value: string): void {
                    console.log(value);
                  }}
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
        {loading ? (
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
                    <td className="px-6 py-4">
                      <Skeleton height={20} />
                    </td>
                    {columns.map((_, colIndex) => (
                      <td key={colIndex} className="px-4 py-4">
                        <Skeleton height={20} />
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
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
                  <td className="px-4 py-4">{goal.employees}</td>
                  <td className="px-4 py-4">
                    {new Date(goal.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-1">
                      {goal.status}
                    </p>
                  </td>
                  <td className="px-4 py-4">{goal.priority}</td>
                  <td className="px-4 py-4">
                    <AppMenubar
                      menuItems={
                        <ul className="flex flex-col w-full text-base">
                          {/* <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md w-full">
                          <Link href={`/goals/edit/${goal.id}`}>Edit</Link>
                        </li> */}
                          <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md w-full">
                            <Link
                              href={`/hr-admin/performance/goals/goal-detail/${goal.id}`}
                            >
                              View Details
                            </Link>
                          </li>
                          <li className="hover:text-red-600 cursor-pointer text-red-500 hover:bg-gray-100 px-2 py-1 rounded-md w-full">
                            <button
                              type="button"
                              onClick={() => handleDelete(goal.id)}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      }
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

export default GoalTable;
