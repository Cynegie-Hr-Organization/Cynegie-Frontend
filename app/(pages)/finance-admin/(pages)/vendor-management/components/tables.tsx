"use client"

import EditVendorModal from "@/app/(pages)/finance-admin/(pages)/vendor-management/components/edit-modal";
import OtherActionsModal, { vendorStatus } from "@/app/(pages)/finance-admin/(pages)/vendor-management/components/other-actions-modal";
import PreviewModal from "@/app/(pages)/finance-admin/(pages)/vendor-management/components/preview-modal";
import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import EmptyTable from "@/app/_components/shared/empty-table";
import { AppPagination } from "@/app/_components/shared/pagination";
import { AppSelect } from "@/app/_components/shared/select";
import TableSkeleton from "@/app/_components/shared/skelentons/table";
import { IVendor, IVendorStatus } from "@/app/_core/actions/finance/vendor";
import { useVendors } from "@/app/_core/use-cases/finance/useVendors";
import { useDebounce } from "@/app/_hooks/debounce";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";



export const VendorTable = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<IVendorStatus | undefined>(undefined)
  const [filterOverride, setFilterOverride] = useState<{ status?: IVendorStatus, search?: string, limit?: number, page?: number }>({
    status: selectedStatus,
    search: '',
    limit: 5,
    page: 1
  })
  const debouncedSearch = useDebounce(filterOverride?.search, 500);

  const { data, isLoading } = useVendors({
    searchQuery: debouncedSearch,
    overrideStatus: filterOverride.status,
    overridePagination: {
      page: filterOverride.page,
      limit: filterOverride.limit
    }
  });

  const { vendors, limit, page, total, totalPages } = data ?? {}



  return (
    <div className="common-card space-y-4 overflow-x-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by vendor name"
            className="w-full h-9 px-2 outline-none"
            // disabled={isLoading}
            value={filterOverride?.search}
            onChange={(e) => setFilterOverride({ ...filterOverride, search: e.target.value })}
          />
        </div>

        <AppDropdownMenu
          isOpen={isFilterOpen}
          setIsOpen={setIsFilterOpen}
          trigger={
            <button type="button" className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2">
              <LuListFilter /> Filter
            </button>
          }
          menuItems={
            <div className="p-4 space-y-5">
              <div className="space-y-4">
                <AppSelect
                  value={filterOverride.status ? selectedStatus : undefined}
                  listItems={[
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                    // { label: "Pending", value: "pending" },
                  ]}
                  label="Status"
                  placeholder="select a status type"
                  onChange={(value) => setSelectedStatus(value as IVendorStatus)}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <AppButton
                  label="Reset"
                  className="btn-secondary w-[90px]"
                  disabled={!(filterOverride.status)}
                  onClick={() => {
                    setFilterOverride({ ...filterOverride, status: undefined })
                    setSelectedStatus(undefined)
                    setIsFilterOpen(false)
                  }}
                />

                <AppButton
                  label="Filter"
                  className="btn-primary w-[90px]"
                  disabled={!selectedStatus}
                  onClick={() => {
                    setFilterOverride({ ...filterOverride, status: selectedStatus })
                    setIsFilterOpen(false)
                  }}
                />
              </div>
            </div>
          } />
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
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
                    <td className='px-4 py-3'>
                      <p className='text-sm'>{vendor?.vendorName}</p>
                    </td>
                    <td className='px-4 py-3'>
                      <p className='text-sm'>{vendor?.contactPerson}</p>
                    </td>
                    <td className='px-4 py-3'>
                      <p className='text-sm'>{vendor?.contactEmail}</p>
                    </td>
                    <td className='px-4 py-3'>
                      <p className='text-sm'>{vendor?.paymentTerms}</p>
                    </td>
                    <td className='px-4 py-3'>
                      <p className={`text-xs font-semibold rounded-full px-2 py-1 w-fit text-nowrap capitalize ${{
                        "pending": "bg-amber-50 text-amber-700",
                        "active": "bg-green-50 text-green-700",
                        "inactive": "bg-red-50 text-red-700",
                      }[vendor?.status]}`}>{vendor?.status}
                      </p>
                    </td>
                    <td className='px-4 py-3'>
                      <PopoverMenu vendor={vendor} />
                    </td>
                  </tr>
                );
              }) : (
                <EmptyTable message="No vendors found" />
              )}
            </tbody>
          </table>

        </div>
      )}

      <AppPagination
        totalItems={total ?? 0}
        totalPages={totalPages ?? 0}
        currentPage={page}
        itemsPerPage={limit}
        onItemsPerPageChange={(value) => setFilterOverride(prev => ({
          ...prev,
          limit: value,
          page: 1
        }))}
        onPageChange={(value) => setFilterOverride(prev => ({
          ...prev,
          page: value
        }))}
      />
    </div>
  )
}







const PopoverMenu: React.FC<{ vendor: IVendor }> = ({ vendor }) => {
  const [modalState, setModalState] = useState({
    popOver: false,
    previewModal: false,
    editModal: false,
    otherActionsModal: false
  });

  const menuActions = [
    {
      slug: "view-details",
      label: "View Details",
      onSelect: () => setModalState({ ...modalState, previewModal: true }),
    },
    {
      slug: "edit-details",
      label: "Edit Details",
      onSelect: () => setModalState({ ...modalState, editModal: true }),
    },
    {
      slug: "other-actions",
      label: `${vendor?.status === vendorStatus.ACTIVE_VENDOR ? "Deactivate" : "Activate"}`,
      onSelect: () => setModalState({ ...modalState, otherActionsModal: true }),
      className: "cursor-pointer hover:!bg-red-50 text-red-700 hover:!text-red-700 rounded-lg"
    }
  ]

  return (
    <>
      <DropdownMenu open={modalState.popOver} onOpenChange={() => setModalState({ ...modalState, popOver: !modalState.popOver })}>
        <DropdownMenuTrigger asChild>
          <button className='cursor-pointer outline-none p-2 border border-gray-300 rounded-lg w-max'>
            <HiDotsVertical />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40 bg-white">
          {menuActions.map((action) => (
            <DropdownMenuItem
              key={action.slug}
              className={`cursor-pointer ${action.className ?? ''}`}
              onSelect={action.onSelect}>
              <span>{action.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <PreviewModal
        vendorId={vendor?.id}
        isOpen={modalState.previewModal}
        onClose={() => setModalState({ ...modalState, previewModal: false })}
      />

      <EditVendorModal
        vendorId={vendor?.id}
        isOpen={modalState.editModal}
        onClose={() => setModalState({ ...modalState, editModal: false })}
      />

      <OtherActionsModal
        vendor={vendor}
        isOpen={modalState.otherActionsModal}
        onClose={() => setModalState({ ...modalState, otherActionsModal: false })}
      />
    </>
  )
}

export default VendorTable;