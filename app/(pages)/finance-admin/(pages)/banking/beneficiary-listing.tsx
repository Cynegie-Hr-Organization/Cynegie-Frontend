'use client'

import { DeleteSvg } from "@/app/_components/icons/custom-icons";
import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import EmptyTable from "@/app/_components/shared/empty-table";
import { AppSelect } from "@/app/_components/shared/select";
import TableSkeleton from "@/app/_components/shared/skelentons/table";
import { IBeneficiary } from "@/app/_core/actions/finance/banking";
import { useBeneficiaries } from "@/app/_core/use-cases/finance/useBanking";
import { AppModal } from "@/components/drawer/modal";
import { localTime } from "@/lib/utils";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

const BeneficiaryListing = () => {

  const { data, isLoading } = useBeneficiaries();
  const { beneficiaries } = data ?? {};


  return (
    <div className="space-y-3 max-h-[460px] h-max lg:h-full">
      <p className="text-base font-semibold">Beneficiary Listing</p>


      <div className="common-card space-y-4 h-full overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <TableSkeleton />
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
              <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
                <RiSearchLine className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full h-9 px-2 outline-none"
                />
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


            <div className='-mx-5 mt-4 overflow-x-scroll'>
              <table className='w-full border-collapse'>
                <thead className='bg-[#F7F9FC]'>
                  <tr>
                    <th className='px-5 py-3 text-left'>Name</th>
                    <th className='px-5 py-3 text-left'>Account Number</th>
                    <th className='px-5 py-3 text-left'>Bank Name</th>
                    <th className='px-5 py-3 text-left'>Date Added</th>
                    <th className='px-5 py-3 text-left'>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {(beneficiaries && beneficiaries.length > 0) ? beneficiaries?.map((beneficiary) => {
                    return (
                      <tr key={beneficiary.id} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
                        <td className='px-5 py-4'>{beneficiary?.accountName}</td>
                        <td className='px-5 py-4'>{beneficiary?.accountNumber}</td>
                        <td className='px-5 py-4'>{beneficiary?.ownedBy}</td>
                        <td className='px-5 py-4'>{localTime(beneficiary?.dateAdded, 'Do MMM, yyyy')}</td>
                        <td className='px-5 py-4'>
                          <AppDropdownMenu
                            width="w-max"
                            trigger={
                              <button className="border border-gray-300 rounded-lg p-2 w-max hover:ring-1 hover:ring-gray-400 outline-none">
                                <HiDotsVertical />
                              </button>
                            }
                            menuItems={
                              <DeleteModal
                                beneficiary={beneficiary}
                                trigger={
                                  <button
                                    className="w-full p-2 text-left hover:bg-gray-50 text-red-500 text-sm">
                                    Delete Beneficiary
                                  </button>
                                }
                                handleDelete={() => { }}
                              />
                            }
                          />
                        </td>
                      </tr>
                    )
                  }) : (
                    <EmptyTable message="No beneficiaries found" />
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

    </div>
  );
};




const DeleteModal = ({ trigger, handleDelete, beneficiary }: {
  trigger: React.ReactNode, handleDelete: () => void, beneficiary?: Partial<IBeneficiary>
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  return (
    <AppModal
      open={openModal}
      setOpen={setOpenModal}
      trigger={trigger}
      header={
        <span className="text-lg font-bold text-center">
          <span className="flex flex-col items-center justify-center gap-y-6">
            <DeleteSvg />
            <span className="flex flex-col items-center justify-center gap-y-2">
              <span className="text-xl text-[#303030] max-w-[367px] text-center font-roboto text-semibold">
                Are you sure you want to delete {beneficiary?.accountName} as Beneficiary
              </span>
            </span>
          </span>
        </span>
      }
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <AppButton label="Cancel" className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full" />
          <AppButton
            isLoading={isLoading}
            label="Delete"
            className="bg-red-700 text-white md:w-[150px] w-full border border-red-700"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
              setTimeout(() => {
                handleDelete();
                setOpenModal(false);
              }, 1500);
            }} />
        </div>
      }
    />
  )
}




export default BeneficiaryListing;


// interface Beneficiary {
//   id: number;
//   accountNumber: string;
//   accountName: string;
//   bankName: string;
//   bankCode: string;
// }