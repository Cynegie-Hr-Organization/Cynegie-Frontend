import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { InputTextArea } from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { DrawerDialog } from "@/components/drawer/modal";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogTitle } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

const PayrollManagementTable = () => {
  return (
    <div className="common-card overflow-x-scroll space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full h-9 px-2 outline-none"
          />
        </div>

        <AppDropdownMenu
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
                    { label: "High", value: "high" },
                    { label: "Medium", value: "medium" },
                    { label: "Low", value: "low" },
                  ]}
                  label="Priority"
                  placeholder="High"
                  onChange={function (value: string): void {
                    console.log(value);
                  }}
                />

                <AppSelect
                  listItems={[
                    { label: "Completed", value: "completed" },
                    { label: "In Progress", value: "in-progress" },
                    { label: "Not Started", value: "not-started" },
                  ]}
                  label="Status"
                  placeholder="Pending"
                  onChange={function (value: string): void {
                    console.log(value);
                  }}
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <AppButton label="Reset" className="btn-secondary w-[90px]" />
                <AppButton label="Filter" className="btn-primary w-[90px]" />
              </div>
            </div>
          }
        />
      </div>

      <div className="-mx-5 mt-4">
        <table className="w-full border-collapse">
          <thead className="bg-[#F7F9FC]">
            <tr>
              <th className="px-6 py-3 text-left">
                <Checkbox className={"rounded-md border-gray-300"} />
              </th>
              <th className="px-4 py-3 text-left">Payroll Name</th>
              <th className="px-4 py-3 text-left">Payroll Period</th>
              <th className="px-4 py-3 text-left">Payment date</th>
              <th className="px-4 py-3 text-left">Total Employees</th>
              <th className="px-4 py-3 text-left">Total Amount</th>
              <th className="px-4 py-3 text-left">Approval Status</th>
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
                    <p className="text-sm">Finance Sept 2024 Payroll</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">1st Sept - 31st Sept</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">17 Apr, 2023</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">22</p>
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
                    <PopoverMenu />
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
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="cursor-pointer outline-none p-1 border border-gray-300 rounded-lg">
          <HiDotsVertical />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-40 bg-white space-y-2 cursor-pointer rounded-lg flex flex-col items-start text-[#475367]">
        <button
          onClick={() =>
            router.push("/finance-admin/payroll-management/approval")
          }
          className=""
        >
          Approve
        </button>
        <RejectModal trigger={<button>Reject</button>} />
        <button
          onClick={() => router.push("/finance-admin/payroll-management/123")}
        >
          View Details
        </button>
      </PopoverContent>
    </Popover>
  );
}

const RejectModal = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <DrawerDialog
      trigger={trigger}
      header={
        <DialogTitle className="text-lg font-bold -mx-4 lg:mx-0 lg:px-6  pt-4 lg:pt-6">
          <span className="flex flex-col gap-y-1">
            <span>Confirm Rejection</span>
            <span className="text-sm text-gray-400 max-w-[367px]">
              Please provide a reason for rejecting this Payroll
            </span>
          </span>
        </DialogTitle>
      }
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 pb-4 lg:pb-6">
          <AppButton
            label="Cancel"
            className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full"
          />
          <AppButton
            label="Confirm Rejection"
            className="bg-red-700 text-white md:w-[150px] w-full border border-red-700"
          />
        </div>
      }
    >
      <div className="lg:p-6">
        <InputTextArea
          label="Rejection Reason"
          id="reason"
          placeholder="Enter reason"
          onChange={function (e) {
            console.log(e.target.value);
          }}
          value=""
        />
      </div>
    </DrawerDialog>
  );
};

export default PayrollManagementTable;
