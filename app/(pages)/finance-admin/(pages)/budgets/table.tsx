"use client";

import { RiSearchLine } from "react-icons/ri";
import { Checkbox } from "@/components/ui/checkbox";

const BudgetsTable = () => {
  return (
    <div className="common-card overflow-x-scroll space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-9 px-2 outline-none"
          />
        </div>
      </div>

      <div className="-mx-5 mt-4">
        <table className="w-full border-collapse">
          <thead className="bg-[#F7F9FC]">
            <tr>
              <th className="px-6 py-3 text-left">
                <Checkbox className={"rounded-md border-gray-300"} />
              </th>
              <th className="px-4 py-3 text-left">Budget ID</th>
              <th className="px-4 py-3 text-left">Period</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-left">Total Income</th>
              <th className="px-4 py-3 text-left">Total Expenses</th>
              <th className="px-4 py-3 text-left">Net Income/Loss</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(Array(5)).map((_, idx) => {
              return (
                <tr
                  key={idx}
                  className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                >
                  <td className="px-6 py-4">
                    <Checkbox className={"rounded-md border-gray-300"} />
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">17 Apr, 2023</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">Credit</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">56hgklotrn23</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">₦18,205,000</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">₦18,205,000</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">Revenue</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-1 w-fit text-nowrap">
                      In Progress
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetsTable;
