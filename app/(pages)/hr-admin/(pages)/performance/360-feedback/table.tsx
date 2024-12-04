'use client'

import { AppSelect } from "@/app/_components/shared/select";
import { LuListFilter } from "react-icons/lu";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { RiSearchLine } from "react-icons/ri";
import AppButton from "@/app/_components/shared/button";



const FeedbackTable = () => {
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
        width="mr-4 w-56 -mt-10"
          menuItems={
            <div className="p-4 space-y-10">
              <div className="space-y-4">
                <AppSelect
                  listItems={[
                    { label: "Q1 2024", value: "q1-2024" },
                    { label: "Q2 2024", value: "q2-2024" },
                    { label: "Q3 2024", value: "q3-2024" },
                    { label: "Q4 2024", value: "q4-2024" },
                  ]}
                  label="Feedback Cycle Title"
                  placeholder="Q1 2024"
                  onChange={() => { }}
                />

                <AppSelect
                  listItems={[
                    { label: "Pending", value: "pending" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Completed", value: "completed" },
                  ]}
                  label="Status"
                  placeholder="Pending"
                  onChange={() => { }}
                />
                <AppSelect
                  listItems={[
                    { label: "Pending", value: "pending" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Completed", value: "completed" },
                  ]}
                  label="Status"
                  placeholder="Pending"
                  onChange={() => { }}
                />
                <AppSelect
                  listItems={[
                    { label: "All", value: "all" },
                    { label: "Finance", value: "finance" },
                    { label: "Marketing", value: "marketing" },
                    { label: "Sales", value: "sales" },
                    { label: "Engineering", value: "engineering" },
                  ]}
                  label="Department"
                  placeholder="All"
                  onChange={() => { }}
                />
                <AppSelect
                  listItems={[
                    { label: "Pending", value: "pending" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Completed", value: "completed" },
                  ]}
                  label="Employee"
                  placeholder="Sarah Johnson"
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
              <th className='px-4 py-3 text-left'>Employee Namee</th>
              <th className='px-4 py-3 text-left'>Feedback Cycle Name</th>
              <th className='px-4 py-3 text-left'>Start Date</th>
              <th className='px-4 py-3 text-left'>End Date</th>
              <th className='px-4 py-3 text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(Array(5)).map((_, idx) => {
              return (
                <tr key={idx} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
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
  );
};

export default FeedbackTable;
