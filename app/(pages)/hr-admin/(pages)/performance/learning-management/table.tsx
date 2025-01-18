"use client";

import { useState, useEffect } from "react";
import { AppSelect } from "@/app/_components/shared/select";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import AppButton from "@/app/_components/shared/button";
import Pagination from "@/app/_components/hr-admin/pages/hiring/shared/pagination";
import Skeleton from "react-loading-skeleton";
import { getAllCourses } from "@/app/api/services/performance/learning";

const LearningManagementTable = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10); // Number of items per page
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string | undefined>();
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    setLoading(true);
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses(
          page,
          limit,
          "desc",
          status,
          search,
        );
        setCourses(response.data);
        setTotalItems(response.itemCount);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [page, limit, search, status]);

  const columns = ["Employee Name", "Course Title", "Start Date", "End Date"];

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
                    { label: "Published", value: "published" },
                    { label: "Draft", value: "draft" },
                  ]}
                  label="Status"
                  placeholder="Select Status"
                  onChange={(value) => setStatus(value)}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <AppButton
                  label="Reset"
                  className="btn-secondary w-[90px]"
                  onClick={() => {
                    setSearch("");
                    setStatus(undefined);
                  }}
                />
                <AppButton label="Filter" className="btn-primary w-[90px]" />
              </div>
            </div>
          }
        />
      </div>

      {/* Table */}
      <div className=" mt-4">
        {loading ? (
          <SkeletonTable columns={columns} />
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-[#F7F9FC]">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="px-4 py-3 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                >
                  <td className="px-4 py-4">
                    {`${course.employee.personalInfo.firstName} ${course.employee.personalInfo.lastName}`}
                  </td>
                  <td className="px-4 py-4">{course.courseTitle}</td>
                  <td className="px-4 py-4">
                    {new Date(course.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    {new Date(course.endDate).toLocaleDateString()}
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
        itemsPerPage={limit}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
};

// Helper component for loading skeleton
const SkeletonTable = ({ columns }: { columns: string[] }) => (
  <table className="w-full border-collapse">
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index} className="px-4 py-3 text-left">
            <Skeleton height={20} />
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array(5)
        .fill(0)
        .map((_, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-b border-[#E4E7EC] hover:bg-gray-50"
          >
            {Array(columns.length)
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

export default LearningManagementTable;
