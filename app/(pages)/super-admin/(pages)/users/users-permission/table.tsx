"use client";

import { DeleteSvg } from "@/app/_components/icons/custom-icons";
import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import EmptyTable from "@/app/_components/shared/empty-table";
import { AppPagination } from "@/app/_components/shared/pagination";
import { AppSelect } from "@/app/_components/shared/select";
import TableSkeleton from "@/app/_components/shared/skelentons/table";
import {
  IPermissionStatus,
  IUserData,
} from "@/app/_core/interfaces/super-admin";
import { useAllPermissions } from "@/app/_core/use-cases/superadmin/useUserPermissions";
import { useDebounce } from "@/app/_hooks/debounce";
import { AppModal2 } from "@/components/drawer/modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

const UsersPermissionTable = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    IPermissionStatus | undefined
  >(undefined);
  const [filter, setFilter] = useState<{
    status?: IPermissionStatus;
    search?: string;
    limit?: number;
    page?: number;
  }>({
    search: "",
    limit: 5,
    page: 1,
    status: undefined,
  });
  const debouncedSearch = useDebounce(filter.search, 500);
  const { data, isLoading } = useAllPermissions({
    searchQuery: debouncedSearch,
    overrideStatus: selectedStatus,
    overridePagination: {
      limit: filter.limit,
      page: filter.page,
    },
  });
  // console.log(data)

  const financeTransactionsHeader = [
    "Admin Name",
    "Role",
    "Permissions",
    "Status",
    "Actions",
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-700 bg-green-50";
      case "Pending":
        return "text-amber-700 bg-amber-50";
      case "Inactive":
        return "text-red-700 bg-red-50";
      default:
        return "text-gray-700";
    }
  };

  const tableData = data?.data || [];
  const { limit, page, itemCount, pageCount } = data?.meta ?? {};

  return (
    <div className="space-y-4">
      <div className="common-card overflow-x-scroll space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
          <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
            <RiSearchLine className="text-gray-400" />
            <input
              type="text"
              placeholder="Search here..."
              className="w-full h-9 px-2 outline-none"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />
          </div>

          <AppDropdownMenu
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            trigger={
              <button
                type="button"
                className="text-gray-400 font-bold flex gap-2 items-center border rounded-lg px-4 py-2"
              >
                <LuListFilter /> Filter
              </button>
            }
            menuItems={
              <div className="p-4 space-y-10">
                <div className="space-y-4">
                  <AppSelect
                    listItems={[
                      { label: "Active", value: "active" },
                      { label: "Inactive", value: "inactive" },
                      { label: "Suspended", value: "suspended" },
                    ]}
                    label="Status"
                    placeholder="Select a status type"
                    onChange={(value) =>
                      setSelectedStatus(value as IPermissionStatus)
                    }
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <AppButton
                    label="Reset"
                    className="btn-secondary w-[90px]"
                    disabled={!filter.status}
                    onClick={() => {
                      setFilter({ ...filter, status: undefined });
                      setSelectedStatus(undefined);
                      setIsFilterOpen(false);
                    }}
                  />

                  <AppButton
                    label="Filter"
                    className="btn-primary w-[90px]"
                    disabled={!selectedStatus}
                    onClick={() => {
                      setFilter({ ...filter, status: selectedStatus });
                      setIsFilterOpen(false);
                    }}
                  />
                </div>
              </div>
            }
          />
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <div className="-mx-5 mt-4">
              <table className="w-full border-collapse">
                <thead className="bg-[#F7F9FC]">
                  <tr>
                    {financeTransactionsHeader.map((header, idx) => {
                      return (
                        <th key={idx} className="px-4 py-3 text-left">
                          {header}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {tableData && tableData.length > 0 ? (
                    tableData?.map((data, idx) => {
                      return (
                        <tr
                          key={idx}
                          className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                        >
                          <td className="px-4 py-3">
                            <p className="text-sm lowercase">
                              {data?.firstName} {data?.lastName}
                            </p>
                          </td>
                          <td className="px-4 py-3 max-w-40">
                            <p className="text-sm">
                              {data?.role?.map((role) => role?.name).join(", ")}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <p className="text-sm">
                              {data?.permissions
                                .map((permission) => permission?.type)
                                .join(", ")}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <p
                              className={`text-xs font-semibold ${getStatusClass(data?.isActive ? "Active" : "Inactive")} rounded-full px-2 py-1 w-fit text-nowrap`}
                            >
                              {data?.isActive ? "Active" : "Inactive"}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <PopoverMenu user={data} />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <EmptyTable message="No records found for this admin" />
                  )}
                </tbody>
              </table>
            </div>

            <AppPagination
              totalItems={itemCount ?? 0}
              totalPages={pageCount ?? 0}
              itemsPerPage={limit ?? 5}
              currentPage={page ?? 0}
              onPageChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  page: value,
                }))
              }
              onItemsPerPageChange={(value) =>
                setFilter((prev) => ({
                  ...prev,
                  limit: value,
                  page: 1,
                }))
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

function PopoverMenu({ user }: { user?: IUserData }) {
  const router = useRouter();

  const [toggleModal, setToggleModal] = useState({
    popOver: false,
    deactivateModal: false,
    deleteModal: false,
  });

  return (
    <>
      <Popover
        open={toggleModal.popOver}
        onOpenChange={() =>
          setToggleModal({ ...toggleModal, popOver: !toggleModal.popOver })
        }
      >
        <PopoverTrigger asChild>
          <button className="cursor-pointer outline-none p-2 border border-gray-300 rounded-lg">
            <HiDotsVertical />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-40 p-2 bg-white cursor-pointer rounded-lg flex flex-col items-start text-[#475367]">
          <button
            className="hover:bg-gray-100 w-full text-left p-2 rounded-md"
            onClick={() =>
              router.push(
                `/super-admin/users/users-permission/${user?.id}/edit`,
              )
            }
          >
            Edit Permissions
          </button>
          <button
            className="hover:bg-gray-100 w-full text-left p-2 rounded-md"
            onClick={() =>
              setToggleModal({ ...toggleModal, deactivateModal: true })
            }
          >
            Deactivate admin
          </button>
          <button
            className="hover:bg-gray-100 w-full text-left p-2 rounded-md text-red-500"
            onClick={() =>
              setToggleModal({ ...toggleModal, deleteModal: true })
            }
          >
            Delete admin
          </button>
        </PopoverContent>
      </Popover>
      <DeleteModal
        isOpen={toggleModal.deleteModal}
        onClose={() => setToggleModal({ ...toggleModal, deleteModal: false })}
      />
      <DeactivationModal
        user={user}
        isOpen={toggleModal.deactivateModal}
        onClose={() =>
          setToggleModal({ ...toggleModal, deactivateModal: false })
        }
      />
    </>
  );
}

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: IUserData;
}

const DeleteModal = ({ isOpen, onClose, user }: ActionModalProps) => {
  const handleDelete = () => {
    // deleteAdmin.mutate({ id: user?.id ?? '' })
    console.log(user?.id);
    onClose();
  };

  return (
    <AppModal2
      open={isOpen}
      onClose={onClose}
      header={
        <span className="text-lg font-bold text-center">
          <span className="flex flex-col items-center justify-center gap-y-6">
            <DeleteSvg />
            <span className="flex flex-col items-center justify-center gap-y-2 ">
              <span className="text-base">Delete Admin</span>
              <span className="text-sm font-normal text-black max-w-[367px] text-center">
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
            onClick={() => onClose()}
          />
          <AppButton
            label="Delete Admin"
            className="bg-red-700 text-white md:w-[150px] w-full border border-red-700"
            onClick={handleDelete}
          />
        </div>
      }
    >
      {/* <div className="md:p-4 lg:p-6 p-2">
        <AppInputTextArea
          requiredField
          label="Why are you deleting the admin"
          id="reason"
          placeholder="Enter reason"
          value=""
          onChange={(e) => console.log(e.target.value)}
        />
      </div> */}
    </AppModal2>
  );
};

const DeactivationModal = ({ isOpen, onClose, user }: ActionModalProps) => {
  const handleDeactivate = () => {
    // deactivate.mutate({ id: user?.id ?? '' })
    console.log(user?.id);
    onClose();
  };

  return (
    <AppModal2
      open={isOpen}
      onClose={onClose}
      header={
        <span className="text-lg font-bold text-center">
          <span className="flex flex-col items-center justify-center gap-y-6">
            <DeleteSvg />
            <span className="flex flex-col items-center justify-center gap-y-2 ">
              <span className="text-base">Deactivate Admin</span>
              <span className="text-sm font-normal text-black max-w-[367px] text-center">
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
            onClick={() => onClose()}
          />
          <AppButton
            label="Deactivate Admin"
            className="bg-red-700 text-white md:w-[150px] w-full border border-red-700"
            onClick={handleDeactivate}
          />
        </div>
      }
    />
  );
};

export default UsersPermissionTable;
