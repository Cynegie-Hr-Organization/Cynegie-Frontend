'use client'

import { RiSearchLine } from "react-icons/ri";
import { LuListFilter } from "react-icons/lu";
import AppButton from "../../../../../_components/shared/button";
import { AppDropdownMenu } from "../../../../../_components/shared/dropdown-menu";
import { AppSelect } from "@/app/_components/shared/select";

const PerformanceTable = () => {
  return (
    <div className="space-y-4">
      <div className="common-card overflow-x-scroll">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
          <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
            <RiSearchLine className="text-gray-400" />
            <input type="text" placeholder="Search here..." className="w-full h-9 px-2 outline-none" />
          </div>

          <AppDropdownMenu trigger={
            <button type="button" className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2">
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
                    label="Rating"
                    placeholder="5.0"
                    onChange={function (value: string): void {
                      console.log(value)
                    }} />


                </div>
                <div className="flex items-center justify-between gap-4">
                  <AppButton label="Reset" className="btn-secondary w-[90px]" />
                  <AppButton label="Filter" className="btn-primary w-[90px]" />
                </div>
              </div>
            } />
        </div>

        <div className='-mx-5 mt-4'>
          <table className='w-full border-collapse'>
            <thead className='bg-[#F7F9FC]'>
              <tr>
                <th className='pl-7 pr-4 py-4 text-left'>Category </th>
                <th className='px-4 py-3 text-left'>Rating</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(Array(5)).map((_, idx) => {
                return (
                  <tr key={idx} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
                    <td className='pl-7 pr-4 py-4'>
                      <p className='text-sm'>Teamwork</p>
                    </td>
                    <td className='px-4 py-4'>
                      <p className='text-sm'>4.2</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PerformanceTable;