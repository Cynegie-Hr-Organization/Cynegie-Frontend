'use client'

import AppButton from "@/app/_components/shared/button";
import InputText from "@/app/_components/shared/input-text";
import { DrawerDialog } from "@/components/drawer/modal";
import { DrawerTitle } from "@/components/ui/drawer";
import { VendorTable } from "./tables";





const FinanceAdminJournals = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-black font-roboto">Vendor Management </h3>
        <AddVendorModal trigger={<AppButton label="Add Vendor" className="btn-primary" />} />
      </div>

      <VendorTable />
    </div>
  )
}

const AddVendorModal: React.FC<{ trigger: React.ReactNode }> = ({ trigger }) => {

  return (
    <DrawerDialog trigger={trigger}
      header={
        <DrawerTitle>
          <p className="font-roboto text-xl font-bold">New Vendor</p>
          <p className="font-roboto text-sm font-normal text-gray-500">Add details</p>
        </DrawerTitle>
      }
      footer={
        <div className="flex items-center justify-center gap-4">
          <AppButton label="Cancel" className="btn-secondary w-[296px]" />
          <AppButton label="Add" className="btn-primary w-[296px]" />
        </div>}>

      <form>
        <div className="space-y-4">
          <InputText
            label="Vendor Name"
            placeholder="Enter vendor name"
            onChange={() => { }}
            value={""}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <InputText
            label="Phone Number"
            placeholder="Enter vendor name"
            onChange={() => { }}
            value={""}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <InputText
            label="Email"
            placeholder="Enter vendor name"
            onChange={() => { }}
            value={""}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <InputText
            label="Contact Person"
            placeholder="Enter vendor name"
            onChange={() => { }}
            value={""}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <InputText
            label="Payment Terms"
            placeholder="Enter vendor name"
            onChange={() => { }}
            value={""}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <InputText
            label="Vendor Address"
            placeholder="Enter vendor name"
            onChange={() => { }}
            value={""}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
        </div>
      </form>
    </DrawerDialog>
  )
}

export default FinanceAdminJournals;