"use client"

import { DeleteSvg } from "@/app/_components/icons/delete";
import AppButton from "@/app/_components/shared/button";
import { InputTextArea } from "@/app/_components/shared/input-text";
import { DrawerDialog } from "@/components/drawer/modal";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HiDotsVertical } from "react-icons/hi";

export const JournalsTable = () => {
  return (
    <div className="common-card overflow-x-scroll space-y-4">
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
                    <p className='text-sm'>17 Apr, 2023</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>Credit</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>56hgklotrn23</p>
                  </td>
                  <td className='px-4 py-4'>
                    <p className='text-sm'>₦18,205,000</p>
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
                    <div className="border border-gray-300 rounded-lg p-1 w-max">
                      <PopoverMenu />
                    </div>
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


// const NewLedgerAccountModal = ({ trigger }: { trigger: React.ReactNode }) => {
//   return (
//     <DrawerDialog
//       trigger={trigger}
//       header={
//         <DialogTitle className="">
//           <p className="text-lg font-bold">New Ledger Account</p>
//           <p className="text-sm text-gray-400">Create a new ledger account</p>
//         </DialogTitle>
//       }
//       footer={
//         <div className="flex flex-col md:flex-row items-center justify-center gap-2">
//           <AppButton label="Close" className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full" />
//           <AppButton label="Create" className="bg-primary text-white md:w-[150px] w-full border border-primary" />
//         </div>
//       }
//     >
//       <form className="p-4 space-y-6">
//         <InputText id="account-name" label="Account Name" requiredField placeholder="Enter name" onChange={function (e) {
//           console.log(e.target.value)
//         }} value={""} />
//         <AppSelect listItems={[
//           { label: "High", value: "high" },
//           { label: "Medium", value: "medium" },
//           { label: "Low", value: "low" },
//         ]} label="Account Type"
//           requiredField
//           placeholder="Enter name"
//           onChange={function (e) {
//             console.log(e)
//           }}
//         />
//         <AppSelect listItems={[
//           { label: "High", value: "high" },
//           { label: "Medium", value: "medium" },
//           { label: "Low", value: "low" },
//         ]}
//           label="Account Group"
//           requiredField
//           placeholder="Enter name"
//           onChange={function (e) {
//             console.log(e)
//           }}
//         />
//         <AppSelect listItems={[
//           { label: "High", value: "high" },
//           { label: "Medium", value: "medium" },
//           { label: "Low", value: "low" },
//         ]} label="BCR" requiredField placeholder="Enter name" onChange={function (e) {
//           console.log(e)
//         }}
//         />
//         <InputTextArea
//           id="description"
//           label="Description"
//           requiredField
//           placeholder="Enter description"
//           onChange={function (e) {
//             console.log(e.target.value)
//           }}
//           value={""}
//         />

//         <InputText
//           id="opening-balance"
//           label="Opening Balance"
//           placeholder="0"
//           onChange={function (e) {
//             console.log(e.target.value)
//           }}
//           value={""}
//         />
//         <AppDatePicker
//           label="Opening Balance Date"
//           requiredField
//           placeholder="Enter opening balance date"
//           setSelectedDate={function (e) {
//             console.log(e)
//           }}
//           selectedDate={new Date()}
//         />
//       </form>
//     </DrawerDialog>
//   )
// }



function PopoverMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='cursor-pointer outline-none p-1'>
          <HiDotsVertical />
        </button>
      </PopoverTrigger>

      <PopoverContent className='w-40 bg-white space-y-2 cursor-pointer rounded-lg flex flex-col items-start text-[#475367]'>
        <PreviewModal trigger={<button className=''>View</button>} />
        <DeleteModal trigger={<button className='text-red-500'>Delete</button>} />
      </PopoverContent>
    </Popover>
  );
}


const DeleteModal = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <DrawerDialog
      trigger={trigger}
      header={<DialogTitle className="text-lg font-bold text-center">
        <span className="flex flex-col items-center justify-center gap-y-6">
          <DeleteSvg />
          <span className="flex flex-col items-center justify-center gap-y-2">
            <span>Are you sure you want to delete this transaction?</span>
            <span className="text-sm text-gray-400 max-w-[367px] text-center">
              Why do you want to delete this transaction? This action cannot be reversed!
            </span>
          </span>
        </span>
      </DialogTitle>
      }
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <AppButton label="Cancel" className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full" />
          <AppButton label="Delete" className="bg-red-700 text-white md:w-[150px] w-full border border-red-700" />
        </div>
      }
    >
      <div className="md:p-4 lg:p-6 p-2">
        <InputTextArea id="reason" placeholder="Enter reason" onChange={function (e) {
          console.log(e.target.value)
        }} value="" />
      </div>
    </DrawerDialog>
  )
}

const PreviewModal = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <DrawerDialog
      trigger={trigger}
      header={<DialogTitle className="text-lg font-bold pl-4">
        <p>Transaction Details</p>
      </DialogTitle>}
    >
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
      {pillValue && <p className="text-sm font-semibold text-green-600 bg-green-50 rounded-full px-2 py-1 w-fit text-nowrap">{pillValue}</p>}
    </div>
  )
}

