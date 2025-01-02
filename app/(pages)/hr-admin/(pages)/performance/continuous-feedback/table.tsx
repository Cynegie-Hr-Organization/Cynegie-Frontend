import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { AppSelect } from "@/app/_components/shared/select";
import AppButton from "@/app/_components/shared/button";
import Pagination from "@/app/_components/hr-admin/pages/hiring/shared/pagination";
import Skeleton from "react-loading-skeleton";
import { RiSearchLine } from "react-icons/ri";
import { LuListFilter } from "react-icons/lu";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { getAllFeedback } from "@/app/api/services/performance/continous-feedback";
import { formatDate } from "@/lib/utils";

const CandidateFeedbackTable = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch feedback using useQuery
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["feedback", currentPage, itemsPerPage, search, status],
    queryFn: () =>
    getAllFeedback(currentPage, itemsPerPage, "desc", status, search),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const feedbacks = data?.data?.items || [];
  console.log("Contnous Feedback", data);

  const totalItems = data?.data?.totalItems || 0;

  const columns = ["Candidate", "Feedback Type", "Date", "Feedback"];

  return (
    <div className="common-card overflow-x-scroll">
      {/* Header: Search and Filter */}
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
                    { label: "Positive", value: "positive" },
                    { label: "Negative", value: "negative" },
                    { label: "Neutral", value: "neutral" },
                  ]}
                  label="Feedback Type"
                  placeholder="Select Type"
                  onChange={(value) => setStatus(value)}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <AppButton
                  label="Reset"
                  className="btn-secondary w-[90px]"
                  onClick={() => {
                    setStatus("");
                    setSearch("");
                    refetch();
                  }}
                />
                <AppButton
                  label="Filter"
                  className="btn-primary w-[90px]"
                  onClick={refetch}
                />
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
                {columns.map((column) => (
                  <th key={column} className="px-4 py-3 text-left">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback : any) => (
                <tr
                  key={feedback.id}
                  className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                >
                  <td className="px-6 py-4">
                    <Checkbox className="rounded-md border-gray-300" />
                  </td>
                  <td className="px-4 py-4">{`${feedback.recipient?.[0]?.personalInfo?.firstName} ${feedback.recipient?.[0]?.personalInfo?.lastName}`}</td>
                  <td className="px-4 py-4">{feedback.feedbackType}</td>
                  <td className="px-4 py-4">
                    {formatDate(feedback.createdAt)}
                  </td>
                  <td className="px-4 py-4">{feedback.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
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

export default CandidateFeedbackTable;
