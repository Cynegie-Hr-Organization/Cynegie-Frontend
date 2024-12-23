"use client";

import React, { useEffect, useState } from "react";
import { AppSelect } from "@/app/_components/shared/select";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import AppButton from "@/app/_components/shared/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import {
  Assessment,
  getAssessments,
} from "@/app/api/services/performance/assessments";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManagerAssessmentTable = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAssessments = async (search = "") => {
    setLoading(true);
    try {
      const response = await getAssessments(
        1,
        10,
        "asc",
        "MANAGER",
        search,
        undefined,
      );
      console.log(response);
      if (response.status === 200) {
        setAssessments(response.data.items);
      } else {
        toast.error("Failed to fetch assessments");
      }
    } catch (error) {
      console.error("Error fetching assessments:", error);
      toast.error("An error occurred while fetching assessments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  const handleSearch = () => {
    fetchAssessments(searchTerm);
  };

  return (
    <div className="common-card overflow-x-scroll">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" size={25} />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-9 px-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-primary font-semibold"
          >
            Search
          </button>
        </div>

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
                    { label: "Completed", value: "completed" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Not Started", value: "not-started" },
                  ]}
                  label="Status"
                  placeholder="Pending"
                  onChange={() => {}}
                />

                <AppSelect
                  listItems={[
                    { label: "Today", value: "today" },
                    { label: "This Week", value: "this-week" },
                    { label: "This Month", value: "this-month" },
                    { label: "This Year", value: "this-year" },
                  ]}
                  label="Date"
                  placeholder="Today"
                  onChange={() => {}}
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

      {/* Table Section */}
      <div className="-mx-5 mt-4">
        {loading ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left">
                  <Skeleton width={30} height={20} />
                </th>
                <th className="px-4 py-3 text-left">
                  <Skeleton width={100} height={20} />
                </th>
                <th className="px-4 py-3 text-left">
                  <Skeleton width={120} height={20} />
                </th>
                <th className="px-4 py-3 text-left">
                  <Skeleton width={80} height={20} />
                </th>
                <th className="px-4 py-3 text-left">
                  <Skeleton width={70} height={20} />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">
                      <Skeleton circle={true} width={20} height={20} />
                    </td>
                    <td className="px-4 py-4">
                      <Skeleton width={100} height={20} />
                    </td>
                    <td className="px-4 py-4">
                      <Skeleton width={120} height={20} />
                    </td>
                    <td className="px-4 py-4">
                      <Skeleton width={80} height={20} />
                    </td>
                    <td className="px-4 py-4">
                      <Skeleton width={70} height={20} />
                    </td>
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
                <th className="px-4 py-3 text-left">Assessment Name</th>

                <th className="px-4 py-3 text-left">Manager</th>
                <th className="px-4 py-3 text-left">Employees</th>

                <th className="px-4 py-3 text-left">Due Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {assessments.length > 0 ? (
                assessments.map((assessment) => (
                  <tr
                    key={assessment.id}
                    className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                  >
                    <td className="px-6 py-4">
                      <Checkbox className="rounded-md border-gray-300" />
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm">{assessment.assessmentName}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm ">
                        {assessment.manager?.personalInfo?.firstName || "N/A"}{" "}
                        {assessment.manager?.personalInfo?.lastName || ""}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm ">
                        {assessment.employees?.length > 0 ? (
                          <span>
                            {assessment.employees[0].personalInfo?.firstName ||
                              "N/A"}{" "}
                            {assessment.employees[0].personalInfo?.lastName ||
                              ""}
                            {assessment.employees.length > 1 && (
                              <span className="text-primary text-base">
                                {" "}
                                +{assessment.employees.length - 1}
                              </span>
                            )}
                          </span>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-sm">
                        {new Date(assessment.dueDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-1 w-fit text-nowrap">
                        {assessment.status.replace("_", " ")}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No assessments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManagerAssessmentTable;
