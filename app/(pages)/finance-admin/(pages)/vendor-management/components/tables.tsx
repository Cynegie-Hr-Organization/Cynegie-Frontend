"use client";

import EditVendorModal from "@/app/(pages)/finance-admin/(pages)/vendor-management/components/edit-modal";
import PreviewModal from "@/app/(pages)/finance-admin/(pages)/vendor-management/components/preview-modal";
import { IVendor } from "@/app/_core/actions/finance/vendor";
import { useVendors } from "@/app/_core/use-cases/finance/useVendors";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { HiDotsVertical } from "react-icons/hi";
import DeleteModal from "./delete-modal";

export const VendorTable = () => {
  const { data: vendors, isLoading } = useVendors();

  return (
    <div className="common-card overflow-x-scroll space-y-4">
      <div className="-mx-5 mt-4">
        {isLoading ? (
          <TableSkelenton />
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-[#F7F9FC]">
              <tr>
                <th className="px-4 py-3 text-left">Vendor Name</th>
                <th className="px-4 py-3 text-left">Contact Name</th>
                <th className="px-4 py-3 text-left">Contact Email</th>
                <th className="px-4 py-3 text-left">Payment Terms</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors && (vendors?.length ?? 0) > 0 ? (
                vendors?.reverse().map((vendor) => {
                  return (
                    <tr
                      key={vendor?.id}
                      className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                    >
                      <td className="px-4 py-4">
                        <p className="text-sm">{vendor?.vendorName}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm">{vendor?.contactPerson}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm">{vendor?.contactEmail}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm">{vendor?.paymentTerms}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p
                          className={`text-xs font-semibold rounded-full px-2 py-1 w-fit text-nowrap capitalize ${
                            {
                              INACTIVE: "text-amber-600 bg-amber-50",
                              ACTIVE: "text-[#036B26] bg-[#E7F6EC]",
                            }[vendor?.status]
                          }`}
                        >
                          {vendor?.status}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="border border-gray-300 rounded-lg p-1 w-max">
                          <PopoverMenu vendor={vendor} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No vendors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const PopoverMenu: React.FC<{ vendor: IVendor }> = ({ vendor }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="cursor-pointer outline-none p-1">
          <HiDotsVertical />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-40 bg-white cursor-pointer rounded-lg flex flex-col items-start text-[#475367] px-0 py-0">
        <PreviewModal
          vendorId={vendor?.id}
          trigger={
            <button className="hover:bg-gray-100 py-2 px-4 w-full text-start">
              View Details
            </button>
          }
        />
        <EditVendorModal
          vendorId={vendor?.id}
          trigger={
            <button className="hover:bg-gray-100 py-2 px-4 w-full text-start">
              Edit Details
            </button>
          }
        />
        <DeleteModal
          vendor={vendor}
          trigger={
            <button className="hover:bg-gray-100 py-2 px-4 w-full text-start text-red-500">
              Deactivate
            </button>
          }
        />
      </PopoverContent>
    </Popover>
  );
};

const TableSkelenton = () => {
  return (
    <table className="w-full border-collapse">
      <thead className="bg-[#F7F9FC]">
        <tr>
          <th className="px-6 py-3 text-left">
            <Skeleton className="w-4 h-4 rounded-md bg-neutral-400" />
          </th>
          <th className="px-4 py-3 text-left">
            <Skeleton className="w-24 h-4 rounded-md bg-neutral-400" />
          </th>
          <th className="px-4 py-3 text-left">
            <Skeleton className="w-24 h-4 rounded-md bg-neutral-400" />
          </th>
          <th className="px-4 py-3 text-left">
            <Skeleton className="w-32 h-4 rounded-md bg-neutral-400" />
          </th>
          <th className="px-4 py-3 text-left">
            <Skeleton className="w-24 h-4 rounded-md bg-neutral-400" />
          </th>
          <th className="px-4 py-3 text-left">
            <Skeleton className="w-20 h-4 rounded-md bg-neutral-400" />
          </th>
          <th className="px-4 py-3 text-left">
            <Skeleton className="w-10 h-4 rounded-md bg-neutral-400" />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 5 }).map((_, idx) => (
          <tr key={idx} className="border-b border-[#E4E7EC]">
            <td className="px-6 py-4">
              <Skeleton className="w-4 h-4 rounded-md bg-neutral-300" />
            </td>
            <td className="px-4 py-4">
              <Skeleton className="w-24 h-2 rounded-md bg-neutral-300" />
            </td>
            <td className="px-4 py-4">
              <Skeleton className="w-24 h-2 rounded-md bg-neutral-300" />
            </td>
            <td className="px-4 py-4">
              <Skeleton className="w-32 h-2 rounded-md bg-neutral-300" />
            </td>
            <td className="px-4 py-4">
              <Skeleton className="w-24 h-2 rounded-md bg-neutral-300" />
            </td>
            <td className="px-4 py-4">
              <Skeleton className="w-20 h-2 rounded-full bg-neutral-300" />
            </td>
            <td className="px-4 py-4">
              <Skeleton className="w-10 h-2 rounded-md bg-neutral-300" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VendorTable;
