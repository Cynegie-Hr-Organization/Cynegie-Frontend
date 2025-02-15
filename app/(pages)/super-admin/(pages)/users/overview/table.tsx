"use client";

import { DeleteSvg } from "@/app/_components/icons/custom-icons";
import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import EmptyTable from "@/app/_components/shared/empty-table";
import { AppInputTextArea } from "@/app/_components/shared/input-text";
import { AppPagination } from "@/app/_components/shared/pagination";
import { AppSelect } from "@/app/_components/shared/select";
import TableSkeleton from "@/app/_components/shared/skelentons/table";
import { IEmployee } from "@/app/_core/actions/user/employee";
import { useEmployeeMutations, useEmployees } from "@/app/_core/use-cases/user/employee";
import { AppModal2 } from "@/components/drawer/modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

const UsersOverviewTable = () => {
  const { data, isLoading } = useEmployees({})
  const [filter, setFilter] = useState({
    page: 1,
    limit: 5,
    search: '',
    status: undefined
  })


  const { data: users } = data ?? {};
  const { meta: pagination } = data ?? {};
  const { itemCount, limit, page, totalPages } = pagination ?? {}



  const tableHeader = [
    "User ID",
    "User Name",
    "Role",
    "Status",
    "Actions"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-700 bg-green-50";
      case "pending":
        return "text-amber-700 bg-amber-50";
      case "inactive":
        return "text-red-700 bg-red-50";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="common-card overflow-x-scroll space-y-4">
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
            <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
              <RiSearchLine className="text-gray-400" />
              <input type="text" placeholder="Search here..." className="w-full h-9 px-2 outline-none" />
            </div>

            <AppDropdownMenu
              trigger={
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
                  {tableHeader.map((header, idx) => (
                    <th key={idx} className='px-4 py-3 text-left'>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {(users && users.length > 0) ? (
                  users?.map((user, idx) => {
                    const { personalInfo } = user ?? {};
                    const { employmentInformation } = user ?? {};

                    return (
                      <tr key={idx} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
                        <td className='px-4 py-4'>
                          <p className='text-sm'>{user?.id}</p>
                        </td>
                        <td className='px-4 py-4 capitalize'>
                          <p className='text-sm'>{personalInfo?.firstName ?? 'NIL'} {personalInfo?.lastName ?? 'NIL'}</p>
                        </td>
                        <td className='px-4 py-4'>
                          <div className="flex items-center gap-x-2">
                            {/* <div className="w-8 h-8 overflow-hidden rounded-full">
                              <Image
                                src={'/images/avatars/avatar-1.png'}
                                alt={`${user?.firstName ?? 'unknown'}, ${user?.lastName ?? ''}`}
                                width={30}
                                height={30}
                                className="rounded-full w-auto h-auto object-cover"
                              />
                            </div> */}
                            <p className='text-sm'>{employmentInformation?.jobTitle ?? 'NIL'}</p>
                          </div>
                        </td>
                        <td className='px-4 py-4'>
                          <p className={`text-xs font-semibold ${getStatusColor(employmentInformation?.employmentStatus)} rounded-full px-2 py-1 w-fit text-nowrap`}>
                            {employmentInformation?.employmentStatus ?? 'NIL'}
                          </p>
                        </td>
                        <td className='px-4 py-4'>
                          <PopoverMenu user={user} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <EmptyTable message="No users found" />
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      <AppPagination
        totalPages={totalPages ?? 0}
        totalItems={itemCount ?? 0}
        itemsPerPage={limit ?? 0}
        currentPage={page}
        onPageChange={(value) => setFilter({ ...filter, page: value })}
        onItemsPerPageChange={(value) => setFilter({ ...filter, limit: value })}
      />
    </div>
  );
};

function PopoverMenu({ user }: { user?: IEmployee }) {
  const [toggleModal, setToggleModal] = useState({
    popOver: false,
    deleteModal: false,
  });
  const router = useRouter();

  return (
    <>
      <Popover open={toggleModal.popOver} onOpenChange={() => setToggleModal({ ...toggleModal, popOver: !toggleModal.popOver })}>
        <PopoverTrigger asChild>
          <button className='cursor-pointer outline-none p-2 border border-gray-300 rounded-lg'>
            <HiDotsVertical />
          </button>
        </PopoverTrigger>

        <PopoverContent className='w-40 p-2 bg-white cursor-pointer rounded-lg flex flex-col items-start text-[#475367]'>
          <button
            onClick={() => router.push(`/super-admin/users/overview/${user?.id}`)}
            className="hover:bg-gray-100 w-full text-left p-2 rounded-md"
          >View user details</button>
          <button
            onClick={() => setToggleModal({ ...toggleModal, deleteModal: true })}
            className="hover:bg-gray-100 w-full text-left p-2 rounded-md text-red-500"
          >Delete user</button>
        </PopoverContent>
      </Popover>

      <DeleteModal isOpen={toggleModal.deleteModal} onClose={() => setToggleModal({ ...toggleModal, deleteModal: false })} employee={user} />
    </>
  );
}



const DeleteModal = ({ isOpen, onClose, employee }: { isOpen: boolean, onClose: () => void, employee?: IEmployee }) => {
  const { firstName, lastName, id } = employee?.personalInfo ?? {}
  const [deletionReason, setDeletionReason] = useState('');
  const { deleteUser } = useEmployeeMutations();
  const isLoading = deleteUser.isPending;
  // const currentGender = (() => gender === "male" ? 'he' : gender === "female" ? 'she' : 'they')();

  const handleDeletion = () => {
    deleteUser.mutate({ id: employee?.id ?? '', deletionReason }, {
      onSuccess: () => {
        onClose()
      },
    })
  };

  return (
    <AppModal2
      open={isOpen}
      onClose={onClose}
      header={
        <span className="text-lg font-bold text-center">
          <span className="flex flex-col items-center justify-center gap-y-6">
            <DeleteSvg />
            <span className="flex flex-col items-center justify-center gap-y-2">
              <span>Delete user <span className="capitalize">{firstName} {lastName}</span></span>
              <span className="text-sm font-normal text-black max-w-[367px] text-center">
                If you delete this user record, it will be removed from the database list and it will be inaccessible
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
            onClick={onClose} />
          <AppButton
            label="Delete User"
            className="bg-red-700 text-white md:w-[150px] w-full border border-red-700"
            isLoading={isLoading}
            onClick={handleDeletion}
          />
        </div>
      }
    >
      <div className="md:p-4 lg:p-6 p-2">
        <AppInputTextArea
          requiredField
          label="Why are you deleting the user?"
          id="reason"
          placeholder="Enter reason"
          value={deletionReason}
          onChange={(e) => setDeletionReason(e.target.value)}
        />
      </div>
    </AppModal2>
  )
}


export default UsersOverviewTable;
