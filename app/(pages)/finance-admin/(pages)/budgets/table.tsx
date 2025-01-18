"use client"

import { Spinner } from "@/app/_components/shared/buttons";
import { useAllBudget } from "@/app/_core/use-cases/finance/useBudget";
import { localTime } from "@/lib/utils";
import { RiSearchLine } from "react-icons/ri";

const BudgetsTable = () => {
  // const { selectedItems, toggleSelection, selectAll, clearSelection } = useSelection<string>()
  // const { totalItems } = budgets?.data ?? { totalItems: 0 }
  const { data: budgets, isLoading } = useAllBudget();


  return (
    <div className="common-card space-y-4">
      {isLoading ? (
        <div className='h-10 w-full flex justify-center items-center'>
          <Spinner className="text-primary" />
        </div>
      ) :
        (
          <>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
              <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
                <RiSearchLine className="text-gray-400" />
                <input type="text" placeholder="Search here..." className="w-full h-9 px-2 outline-none" />
              </div>
            </div>

            <div className='-mx-5 mt-4 overflow-x-scroll '>
              <table className='w-full border-collapse'>
                <thead className='bg-[#F7F9FC]'>
                  <tr>
                    {/* <th className='px-6 py-3 text-left'>
                      <Checkbox
                        id={""}
                        className={"rounded-md border-gray-300"}
                        checked={selectedItems.size === totalItems}
                        onChange={handleSelectAll}
                      />
                    </th> */}
                    <th className='px-4 py-3 text-left text-nowrap'>Department</th>
                    <th className='px-4 py-3 text-left text-nowrap'>Start date</th>
                    <th className='px-4 py-3 text-left text-nowrap'>End date</th>
                    <th className='px-4 py-3 text-left text-nowrap'>Total Allocation</th>
                    <th className='px-4 py-3 text-left text-nowrap'>Spent</th>
                    <th className='px-4 py-3 text-left text-nowrap'>Remaining</th>
                    <th className='px-4 py-3 text-left text-nowrap'>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {budgets?.data?.items?.reverse().map((budget, idx) => {
                    const { department, startDate, endDate, allocation, status } = budget;
                    const { departmentName} = department;

                    return (
                      <tr key={idx} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
                        {/* <td className='px-6 py-4'>
                          <Checkbox
                            id={budget.id}
                            className={"rounded-md border-gray-300"}
                            checked={selectedItems.has(budget.id)}
                            onChange={(e) => toggleSelection(e.target.id)}
                          />
                        </td> */}
                        <td className='px-4 py-4'>
                          <p className='text-sm'>{departmentName}</p>
                        </td>
                        <td className='px-4 py-4'>
                          <p className='text-sm'>{localTime(startDate, 'Do MMM yyyy')}</p>
                        </td>
                        <td className='px-4 py-4'>
                          <p className='text-sm'>{localTime(endDate, 'Do MMM yyyy')}</p>
                        </td>
                        <td className='px-4 py-4'>
                          <p className='text-sm'>₦{allocation}</p>
                        </td>
                        <td className='px-4 py-4'>
                          <p className='text-sm'>₦{allocation}</p>
                        </td>
                        <td className='px-4 py-4'>
                          <p className='text-sm'>₦{allocation}</p>
                        </td>
                        <td className='px-4 py-4'>
                          <p className='text-xs font-semibold text-amber-700 bg-amber-100 rounded-full px-2 py-1 w-fit text-nowrap lowercase'>{status}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>)}
    </div>
  );
};

export default BudgetsTable;