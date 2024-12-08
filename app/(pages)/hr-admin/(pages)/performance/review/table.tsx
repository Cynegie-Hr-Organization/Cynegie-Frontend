import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { Checkbox } from "@/components/ui/checkbox";



const ReviewTable = () => {
  return (
    <div className="common-card overflow-x-scroll">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input type="text" placeholder="Search here..." className="w-full h-9 px-2 outline-none" />
        </div>

        <button type="button" className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2">
          <LuListFilter /> Filter
        </button>
      </div>

      <div className='-mx-5 mt-4'>
        <table className='w-full border-collapse'>
          <thead className='bg-[#F7F9FC]'>
            <tr>
              <th className='px-6 py-3 text-left'>
                <Checkbox className={"rounded-md border-gray-300"} />
              </th>
              <th className='px-4 py-3 text-left'>Cycle Name</th>
              <th className='px-4 py-3 text-left'>Start Date</th>
              <th className='px-4 py-3 text-left'>End Date</th>
              <th className='px-4 py-3 text-left'>Employees</th>
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
                    <p className='text-sm'>Standard Onboarding Template</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>Ayomide Alibaba</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>21st June, 2024</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>21st June, 2024</p>
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

export default ReviewTable