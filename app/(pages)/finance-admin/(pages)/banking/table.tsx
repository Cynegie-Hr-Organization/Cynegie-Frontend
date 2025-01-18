import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { AppSelect } from "@/app/_components/shared/select";
import { DrawerDialog } from "@/components/drawer/modal";
import { Checkbox } from "@/components/ui/checkbox";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";






const TransactionsHistoryTable = () => {

  return (
    <div className="common-card overflow-x-scroll space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input type="text" placeholder="Search here..." className="w-full h-9 px-2 outline-none" />
        </div>

        <AppDropdownMenu trigger={
          <button
            type="button"
            className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2">
            <LuListFilter /> Filter
          </button>
        }
          menuItems={
            <div className="p-4 space-y-10">
              <div className="space-y-4">
                <AppSelect listItems={[
                  { label: "High", value: "high" },
                  { label: "Medium", value: "medium" },
                  { label: "Low", value: "low" }
                ]}
                  label="Priority"
                  placeholder="High"
                  onChange={(value) => {
                    console.log(value)
                  }} />

                <AppSelect
                  listItems={[
                    { label: "Completed", value: "completed" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Not Started", value: "not-started" },
                  ]}
                  label="Status"
                  placeholder="Pending"
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
              <th className='px-4 py-3 text-left'>Transaction ID</th>
              <th className='px-4 py-3 text-left'>Date</th>
              <th className='px-4 py-3 text-left'>Description</th>
              <th className='px-4 py-3 text-left'>Payment Method</th>
              <th className='px-4 py-3 text-left'>Amount</th>
              <th className='px-4 py-3 text-left'>Category</th>
              <th className='px-4 py-3 text-left'>Status</th>
              <th className='px-4 py-3 text-left'>Actions</th>
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
                    <p className='text-sm'>56hgklotrn23</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>Aug 28, 2024</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>56hgklotrn23</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>Bank Transfer</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>₦18,205,000</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>Revenue</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-1 w-fit text-nowrap'>In Progress</p>
                  </td>
                  <td className='px-4 py-4'>
                    <AppDropdownMenu
                      width="w-40"
                      trigger={
                        <button className="border border-gray-300 rounded-lg p-2 w-max hover:ring-1 hover:ring-gray-400 outline-none">
                          <HiDotsVertical />
                        </button>
                      }
                      menuItems={
                        <>
                          <PreviewModal
                            trigger={
                              <button
                                type='button'
                                className='p-2 hover:bg-gray-100 w-full text-left rounded-lg transition-all duration-300'
                              >
                                View Details
                              </button>
                            }
                          />
                        </>
                      }
                    />
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

const PreviewModal = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <DrawerDialog
      trigger={trigger}
      header={
        <span className="text-lg font-bold pl-4">
          <p>Transaction Details</p>
        </span>
      }>
      <div className="md:p-4 lg:p-6 p-2 space-y-4 py-5">
        <TransactionDetailItem label="Transaction ID" value="1234567890" />
        <TransactionDetailItem label="Transaction date" value="Aug 28, 2024; 3:40 PM" />
        <TransactionDetailItem label="Amount" value="₦18,205,000" />
        <TransactionDetailItem label="Description" value="Product" />
        <TransactionDetailItem label="Payment Method" value="Bank Transfer" />
        <TransactionDetailItem label="Catergory" value="Revenue" />
        <TransactionDetailItem label="Status" pillValue="Completed" />
      </div>
    </DrawerDialog>
  )
}

const TransactionDetailItem = ({ label, value, pillValue }: { label: string, value?: string, pillValue?: string }) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <p className="text-gray-400">{label}</p>
      <p className="text-black font-bold">{value}</p>
      {pillValue && (
        <p className="text-sm font-semibold text-green-600 bg-green-50 rounded-full px-2 py-1 w-fit text-nowrap">{pillValue}</p>
      )}
    </div>
  )
}






export default TransactionsHistoryTable;