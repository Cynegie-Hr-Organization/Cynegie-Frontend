"use client";

import { DeleteSvg } from "@/app/_components/icons/delete";
import AppButton from "@/app/_components/shared/button";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import InputText from "@/app/_components/shared/input-text";
import { DrawerDialog } from "@/components/drawer/modal";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogTitle } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

export const VendorTable = () => {
  return (
    <div className="common-card overflow-x-scroll space-y-4">
      <div className="-mx-5 mt-4">
        <table className="w-full border-collapse">
          <thead className="bg-[#F7F9FC]">
            <tr>
              <th className="px-6 py-3 text-left">
                <Checkbox className={"rounded-md border-gray-300"} />
              </th>
              <th className="px-4 py-3 text-left">Vendor Name</th>
              <th className="px-4 py-3 text-left">Contact Name</th>
              <th className="px-4 py-3 text-left">Contact Email</th>
              <th className="px-4 py-3 text-left">Payment Terms</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(Array(5)).map((_, idx) => {
              return (
                <tr
                  key={idx}
                  className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                >
                  <td className="px-6 py-4">
                    <Checkbox className={"rounded-md border-gray-300"} />
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">17 Apr, 2023</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">Credit</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">56hgklotrn23</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">₦18,205,000</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-1 w-fit text-nowrap">
                      In Progress
                    </p>
                  </td>
                  <td className="px-4 py-4">
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
  );
};

function PopoverMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="cursor-pointer outline-none p-1">
          <HiDotsVertical />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-40 bg-white space-y-2 cursor-pointer rounded-lg flex flex-col items-start text-[#475367]">
        <PreviewModal trigger={<button className="">View</button>} />
        <EditVendorModal trigger={<button className="">Edit</button>} />
        <DeleteModal
          trigger={<button className="text-red-500">Deactivate</button>}
        />
      </PopoverContent>
    </Popover>
  );
}

const DeleteModal = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <DrawerDialog
      trigger={trigger}
      header={
        <DialogTitle className="text-lg font-bold text-center">
          <span className="flex flex-col items-center justify-center gap-y-6">
            <DeleteSvg />
            <span className="flex flex-col items-center justify-center gap-y-2">
              <span>Are you sure you want to deactivate Michael Jackson?</span>
            </span>
          </span>
        </DialogTitle>
      }
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <AppButton
            label="Cancel"
            className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full"
          />
          <AppButton
            label="Delete"
            className="bg-red-700 text-white md:w-[150px] w-full border border-red-700"
          />
        </div>
      }
    >
      <></>
    </DrawerDialog>
  );
};

const PreviewModal = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <DrawerDialog
      trigger={trigger}
      header={
        <DialogTitle className="text-lg font-bold pl-4">
          <p>Vendor Details</p>
        </DialogTitle>
      }
    >
      <div className="md:p-4 lg:p-6 p-2 space-y-4 py-5">
        <TransactionDetailItem label="Vendor Name" value="Tech Supplies Ltd" />
        <hr className="border-gray-300 border-b-1 py-5 border-dashed" />
        <TransactionDetailItem label="Phone Number" value="12345678901" />
        <hr className="border-gray-300 border-b-1 py-5 border-dashed" />
        <TransactionDetailItem
          label="Email Address"
          value="info@techsupplies.com"
        />
        <hr className="border-gray-300 border-b-1 py-5 border-dashed" />
        <TransactionDetailItem label="Contact Person" value="Michael Jackson" />
        <hr className="border-gray-300 border-b-1 py-5 border-dashed" />
        <TransactionDetailItem label="Payment Terms" value="Net 30days" />
        <hr className="border-gray-300 border-b-1 py-5 border-dashed" />
        <TransactionDetailItem
          label="Vendor Address"
          value="123 TechStreet, Lagos , Nigeria"
        />
        <hr className="border-gray-300 border-b-1 py-5 border-dashed" />
        <TransactionDetailItem label="Vendor Status" pillValue="Active" />
      </div>
    </DrawerDialog>
  );
};

const TransactionDetailItem = ({
  label,
  value,
  pillValue,
}: {
  label: string;
  value?: string;
  pillValue?: string;
}) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <p className="text-gray-400">{label}</p>
      <p className="text-black font-bold">{value}</p>
      {pillValue && (
        <p className="text-sm font-semibold text-green-600 bg-green-50 rounded-full px-2 py-1 w-fit text-nowrap">
          {pillValue}
        </p>
      )}
    </div>
  );
};

const EditVendorModal: React.FC<{ trigger: React.ReactNode }> = ({
  trigger,
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    vendorName: "John Doe",
    phoneNumber: "01234567890",
    email: "john@example.com",
    address: "123 Street",
    city: "City",
    state: "State",
    paymentTerms: [] as string[],
  });

  return (
    <DrawerDialog
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      header={
        <DialogTitle>
          <p className="font-roboto text-xl font-bold">Edit Vendor</p>
        </DialogTitle>
      }
      footer={
        <div className="flex items-center justify-center gap-4">
          <AppButton
            label="Cancel"
            className="btn-secondary w-[296px]"
            onClick={() => setOpen(false)}
          />
          <AppButton
            label="Edit"
            className="btn-primary w-[296px]"
            onClick={() => setOpen(false)}
          />
        </div>
      }
    >
      <form>
        <div className="space-y-4">
          <InputText
            label="Vendor Name"
            placeholder="Enter vendor name"
            onChange={(e) => {
              setFormData({ ...formData, vendorName: e.target.value });
            }}
            value={formData.vendorName}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <InputText
            label="Phone Number"
            placeholder="Enter vendor name"
            onChange={(e) => {
              setFormData({ ...formData, phoneNumber: e.target.value });
            }}
            value={formData.phoneNumber}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <InputText
            label="Email"
            placeholder="Enter vendor name"
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            value={formData.email}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <InputText
            label="Address"
            placeholder="Enter vendor name"
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value });
            }}
            value={formData.address}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <InputText
            label="City"
            placeholder="Enter vendor name"
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
            }}
            value={formData.city}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <InputText
            label="State"
            placeholder="Enter vendor name"
            onChange={(e) => {
              setFormData({ ...formData, state: e.target.value });
            }}
            value={formData.state}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />

          <AppMultipleSelect
            label="Payment Terms"
            placeholder="Select payment terms"
            items={[
              { label: "Net 30", value: "net_30" },
              { label: "Net 45", value: "net_45" },
              { label: "Net 60", value: "net_60" },
              { label: "Net 70", value: "net_70" },
              { label: "Net 80", value: "net_80" },
              { label: "Net 90", value: "net_90" },
              { label: "Net 100", value: "net_100" },
            ]}
            selectedValues={formData.paymentTerms}
            onSelectionChange={(values) => {
              setFormData({ ...formData, paymentTerms: values });
              console.log(values);
            }}
          />
        </div>
      </form>
    </DrawerDialog>
  );
};
