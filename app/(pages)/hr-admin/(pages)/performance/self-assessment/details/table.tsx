import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

const DetailsTable = () => {
  return (
    <div className="space-y-4">
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
            <thead className='bg-[#F7F9FC] text-gray-700'>
              <tr>
                <th className='px-6 py-3 text-left'>Criterion</th>
                <th className='px-6 py-3 text-left'>Self Rating</th>
                <th className='px-6 py-3 text-left'>Comments</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(Array(3)).map((_, idx) => {
                return (
                  <tr key={idx} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
                    <td className='px-6 py-4'>
                      <p className='text-sm'>Teamwork</p>
                    </td>
                    <td className='px-6 py-4'>
                      <p className='text-sm'>4.2</p>
                    </td>
                    <td className='px-6 py-4'>
                      <p className='text-sm truncate'>Strong leadership potential, but needs to take more initiative in high-pressure situations</p>
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

export default DetailsTable
