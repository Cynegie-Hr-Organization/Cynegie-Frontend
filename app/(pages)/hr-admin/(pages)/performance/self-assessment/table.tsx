'use client'

import { AppSelect } from "@/app/_components/shared/select"
import { LuListFilter } from "react-icons/lu"
import { RiSearchLine } from "react-icons/ri"
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu"
import AppButton from "@/app/_components/shared/button"
import { Checkbox } from "@/components/ui/checkbox"

const SelfAssessmentTable = () => {
  return (
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
                  label="Status"
                  placeholder="Pending"
                  onChange={() => { }}
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
                  onChange={() => { }}
                />
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
              <th className='px-6 py-3 text-left'>
                <Checkbox className={"rounded-md border-gray-300"} />
              </th>
              <th className='px-4 py-3 text-left'>Employee Name</th>
              <th className='px-4 py-3 text-left'>Assessment Name</th>
              <th className='px-4 py-3 text-left'>Due Date</th>
              <th className='px-4 py-3 text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(Array(5)).map((_, idx) => {
              return (
                <tr key={idx} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
                  <td className='px-6 py-4'>
                    <Checkbox className={"rounded-md border-gray-300"} />
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm text-primary'>Sarah Johnson</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>Q3 Performance Review</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>28 July 2024</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-1 w-fit text-nowrap'>In Progress</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SelfAssessmentTable