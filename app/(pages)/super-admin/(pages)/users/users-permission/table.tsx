'use client'


import { DeleteSvg } from "@/app/_components/icons/custom-icons";
import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { AppInputTextArea } from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { AppModal } from "@/components/drawer/modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";





const UsersPermissionTable = () => {

  const financeTransactionsHeader = [
    "Admin Name",
    "Role",
    "Permissions",
    "Status",
    "Actions"
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-500 bg-green-50";
      case "Pending":
        return "text-amber-500 bg-amber-50";
      case "Inactive":
        return "text-red-500 bg-red-50";
      default:
        return "text-gray-500";
    }
  };


  const tableData = [
    {
      name: "Ashima Olu",
      role: "Admin",
      permissions: "Full Access",
      status: "Active",
    },
    {
      name: "Perfect Sam",
      role: "IT Admin",
      permissions: "Limited Access",
      status: "Pending",
    }
  ];

  return (
    <div className="space-y-4">
      <div className="common-card overflow-x-scroll space-y-4">
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
                    { label: "High", value: "high" },
                    { label: "Medium", value: "medium" },
                    { label: "Low", value: "low" },
                  ]}
                    label="Date"
                    placeholder="High"
                    onChange={function (value: string): void {
                      console.log(value)
                    }} />

                  <AppSelect
                    listItems={[
                      { label: "Completed", value: "completed" },
                      { label: "In Progress", value: "in-progress" },
                      { label: "Not Started", value: "not-started" },
                    ]}
                    label="Category"
                    placeholder="Revenue"
                    onChange={function (value: string): void {
                      console.log(value)
                    }} />
                  <AppSelect
                    listItems={[
                      { label: "Completed", value: "completed" },
                      { label: "In Progress", value: "in-progress" },
                      { label: "Not Started", value: "not-started" },
                    ]}
                    label="Status"
                    placeholder="Completed"
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
                {financeTransactionsHeader.map((header, idx) => {
                  return (
                    <th key={idx} className='px-4 py-3 text-left'>{header}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {tableData?.map((data, idx) => {
                return (
                  <tr key={idx} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
                    <td className='px-4 py-4'>
                      <p className='text-sm'>{data?.name}</p>
                    </td>
                    <td className='px-4 py-4'>
                      <p className='text-sm'>{data?.role}</p>
                    </td>
                    <td className='px-4 py-4'>
                      <p className='text-sm'>{data?.permissions}</p>
                    </td>
                    <td className='px-4 py-4'>
                      <p className={`text-xs font-semibold ${getStatusClass(data?.status)} rounded-full px-2 py-1 w-fit text-nowrap`}>{data?.status}</p>
                    </td>
                    <td className='px-4 py-4'>
                      <PopoverMenu />
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




function PopoverMenu() {
  const router = useRouter();
  const data = {
    id: "1234567890"
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className='cursor-pointer outline-none p-2 border border-gray-300 rounded-lg'>
          <HiDotsVertical />
        </button>
      </PopoverTrigger>

      <PopoverContent className='w-40 p-2 bg-white cursor-pointer rounded-lg flex flex-col items-start text-[#475367]'>
        <button className="hover:bg-gray-100 w-full text-left p-2 rounded-md" onClick={() => router.push(`/super-admin/users/users-permission/${data?.id}/edit`)}>Edit Permissions</button>
        <button className="hover:bg-gray-100 w-full text-left p-2 rounded-md" onClick={() => setIsOpen(false)}>Deactivate admin</button>
        <DeleteModal trigger={<button className="hover:bg-gray-100 w-full text-left p-2 rounded-md text-red-500">Delete admin</button>} />
      </PopoverContent>
    </Popover>
  );
}



const DeleteModal = ({ trigger }: { trigger: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppModal
      trigger={trigger}
      open={isOpen}
      setOpen={setIsOpen}
      header={
        <span className="text-lg font-bold text-center">
          <span className="flex flex-col items-center justify-center gap-y-6">
            <DeleteSvg />
            <span className="flex flex-col items-center justify-center gap-y-2">
              <span>Delete Admin</span>
              <span className="text-xs font-normal text-black max-w-[367px] text-center">
                If you delete this admin, they will no longer have permissions
              </span>
            </span>
          </span>
        </span>
      }
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <AppButton
            label="Cancel"
            className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full"
            onClick={() => setIsOpen(false)} />
          <AppButton
            label="Delete Admin"
            className="bg-red-700 text-white md:w-[150px] w-full border border-red-700"
            onClick={() => setIsOpen(false)}
          />
        </div>
      }
    >
      <div className="md:p-4 lg:p-6 p-2">
        <AppInputTextArea
          requiredField
          label="Why are you deleting the admin"
          id="reason"
          placeholder="Enter reason"
          value=""
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
    </AppModal>
  )
}


export default UsersPermissionTable;