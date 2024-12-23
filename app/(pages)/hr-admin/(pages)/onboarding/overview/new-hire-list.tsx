/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CardLayout from "@/app/_components/shared/cards";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

const NewHireList = () => {
  return (
    <CardLayout className="bg-white overflow-x-scroll space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-9 px-2 outline-none"
          />
        </div>

        <button
          type="button"
          className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2"
        >
          <LuListFilter /> Filter
        </button>
      </div>

      <div className="-mx-6">
        <table className="w-full border-collapse">
          <thead className="bg-[#F7F9FC]">
            <tr>
              <th className="px-4 py-3 text-left">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Position</th>
              <th className="px-4 py-3 text-left">Start Date</th>
              <th className="px-4 py-3 text-left">OnBoarding Template</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.from(Array(5)).map((_, idx) => {
              return (
                <tr
                  key={idx}
                  className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                >
                  <td className="px-4 py-4">
                    <input type="checkbox" className="border-gray-300" />
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">Ayomide Alibaba</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">Admin</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">Admin Officer</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">21st June, 2024</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">IT Department Template</p>
                  </td>
                  <td className="p-4">
                    <div className="cursor-pointer border rounded-lg w-max p-1">
                      <PiDotsThreeVerticalBold />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </CardLayout>
  );
};

export default NewHireList;
