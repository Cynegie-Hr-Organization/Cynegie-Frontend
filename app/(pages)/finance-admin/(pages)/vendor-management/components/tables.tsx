"use client"

import EditVendorModal from "@/app/(pages)/finance-admin/(pages)/vendor-management/components/edit-modal";
import PreviewModal from "@/app/(pages)/finance-admin/(pages)/vendor-management/components/preview-modal";
import EmptyTable from "@/app/_components/shared/empty-table";
import TableSkeleton from "@/app/_components/shared/skelentons/table";
import { IVendor } from "@/app/_core/actions/finance/vendor";
import { useVendors } from "@/app/_core/use-cases/finance/useVendors";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HiDotsVertical } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import DeleteModal from "./delete-modal";



export const VendorTable = () => {
  const { data: vendors, isLoading } = useVendors()

  return (
    <div className="common-card space-y-4">
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
            <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
              <RiSearchLine className="text-gray-400" />
              <input type="text" placeholder="Search here..." className="w-full h-9 px-2 outline-none" />
            </div>
          </div>

          <div className='-mx-5 mt-4 space-y-4'>
            <table className='w-full border-collapse'>
              <thead className='bg-[#F7F9FC]'>
                <tr>
                  <th className='px-4 py-3 text-left'>Vendor Name</th>
                  <th className='px-4 py-3 text-left'>Contact Name</th>
                  <th className='px-4 py-3 text-left'>Contact Email</th>
                  <th className='px-4 py-3 text-left'>Payment Terms</th>
                  <th className='px-4 py-3 text-left'>Status</th>
                  <th className='px-4 py-3 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(vendors && (vendors?.length ?? 0) > 0) ? vendors?.reverse().map((vendor) => {
                  return (
                    <tr key={vendor?.id} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
                      <td className='px-4 py-4'>
                        <p className='text-sm'>{vendor?.vendorName}</p>
                      </td>
                      <td className='px-4 py-4'>
                        <p className='text-sm'>{vendor?.contactPerson}</p>
                      </td>
                      <td className='px-4 py-4'>
                        <p className='text-sm'>{vendor?.contactEmail}</p>
                      </td>
                      <td className='px-4 py-4'>
                        <p className='text-sm'>{vendor?.paymentTerms}</p>
                      </td>
                      <td className='px-4 py-4'>
                        <p className={`text-xs font-semibold rounded-full px-2 py-1 w-fit text-nowrap capitalize ${{
                          INACTIVE: "text-amber-600 bg-amber-50",
                          ACTIVE: "text-[#036B26] bg-[#E7F6EC]",
                        }[vendor?.status]}`}>{vendor?.status}
                        </p>
                      </td>
                      <td className='px-4 py-4'>
                        <div className="border border-gray-300 rounded-lg p-1 w-max">
                          <PopoverMenu vendor={vendor} />
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <EmptyTable message="No vendors found" />
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

const PopoverMenu: React.FC<{ vendor: IVendor }> = ({ vendor }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='cursor-pointer outline-none p-1'>
          <HiDotsVertical />
        </button>
      </PopoverTrigger>

      <PopoverContent className='w-40 bg-white cursor-pointer rounded-lg flex flex-col items-start text-[#475367] p-2'>
        <PreviewModal
          vendorId={vendor?.id}
          trigger={
            <button className='hover:bg-gray-100 rounded-lg p-2 w-full text-start'>View Details</button>
          } />
        <EditVendorModal
          vendorId={vendor?.id}
          trigger={
            <button className='hover:bg-gray-100 rounded-lg p-2 w-full text-start'>Edit Details</button>
          } />
        <DeleteModal
          vendor={vendor}
          trigger={
            <button className='hover:bg-red-50 rounded-lg p-2 w-full text-start text-red-500'>Deactivate</button>
          } />
      </PopoverContent>
    </Popover>
  );
}



export default VendorTable;