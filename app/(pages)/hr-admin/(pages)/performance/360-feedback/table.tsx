"use client";

import React, { useEffect, useState } from "react";
import { AppSelect } from "@/app/_components/shared/select";
import { LuListFilter } from "react-icons/lu";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { RiSearchLine } from "react-icons/ri";
import AppButton from "@/app/_components/shared/button";
import {
  Feedback,
  get360Feedback,
} from "@/app/api/services/performance/360-feedback";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FeedbackTable = () => {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const data = await get360Feedback(1, 10, "desc", status, search);
        setFeedbackItems(data?.data.items || []);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [search, status]);

  const columns = [
    "Employee Name",
    "Feedback Cycle Name",
    "Start Date",
    "End Date",
    "Status",
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-2 outline-none"
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
          width="mr-4 w-56 -mt-10"
          menuItems={
            <div className="p-4 space-y-10">
              <div className="space-y-4">
                <AppSelect
                  listItems={[
                    { label: "Pending", value: "pending" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Completed", value: "completed" },
                  ]}
                  label="Status"
                  placeholder="Select Status"
                  onChange={(value) => setStatus(value || "")}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <AppButton
                  label="Reset"
                  className="btn-secondary w-[90px]"
                  onClick={() => {
                    setSearch("");
                    setStatus("");
                  }}
                />
                <AppButton label="Filter" className="btn-primary w-[90px]" />
              </div>
            </div>
          }
        />
      </div>

      {/* Feedback Table */}
      <div className="-mx-5 mt-4">
        {loading ? (
          <table className="w-full">
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className="py-3 px-4 text-left">
                    <Skeleton height={20} width="80%" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill(0)
                .map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {columns.map((_, colIndex) => (
                      <td key={colIndex} className="p-4">
                        <Skeleton height={20} />
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        ) : feedbackItems.length > 0 ? (
          <table className="w-full border-collapse">
            <thead className="bg-[#F7F9FC]">
              <tr>
                <th className="px-4 py-3 text-left">Employee Name</th>
                <th className="px-4 py-3 text-left">Feedback Cycle Name</th>
                <th className="px-4 py-3 text-left">Start Date</th>
                <th className="px-4 py-3 text-left">End Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {feedbackItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                >
                  <td className="px-4 py-4">
                    <p className="text-sm text-primary">
                      {`${item.employees?.[0].personalInfo.firstName} ${item.employees?.[0].personalInfo.lastName}`}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">{item.feedbackName}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">
                      {new Date(item.startDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">
                      {new Date(item.endDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p
                      className={`text-sm font-semibold px-2 py-1 w-fit text-nowrap ${
                        item.status === "in-progress"
                          ? "text-amber-600 bg-amber-50"
                          : item.status === "completed"
                            ? "text-green-600 bg-green-50"
                            : "text-gray-600 bg-gray-50"
                      } rounded-full`}
                    >
                      {item.status.replace("_", " ").toUpperCase()}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackTable;
