import AppButton from "@/app/_components/shared/button";
import { AppSelect } from "@/app/_components/shared/select";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

const ContinuousFeedbackTable = () => {
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
                <AppSelect listItems={[
                  { label: "Received", value: "received" },
                  { label: "Given", value: "given" },
                ]}
                  label="Type"
                  placeholder="Received"
                  onChange={function (value: string): void {
                    console.log(value)
                  }} />

                <AppSelect
                  listItems={[
                    { label: "July", value: "july" },
                    { label: "August", value: "august" },
                    { label: "September", value: "september" },
                  ]}
                  label="Date"
                  placeholder="July"
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
              <th className='px-6 py-3 text-left'>
                <Checkbox className={"rounded-md border-gray-300"} />
              </th>
              <th className='px-4 py-3 text-left'>Giver</th>
              <th className='px-4 py-3 text-left'>Feedback Type</th>
              <th className='px-4 py-3 text-left'>Feedback Date</th>
              <th className='px-4 py-3 text-left'>Feedback</th>
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
                    <p className='text-sm'>Ngozi Adaobi</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>Positive</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>21st June, 2024</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>21st June, 2024</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>Great job on the quarterly report</p>
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

export default ContinuousFeedbackTable;