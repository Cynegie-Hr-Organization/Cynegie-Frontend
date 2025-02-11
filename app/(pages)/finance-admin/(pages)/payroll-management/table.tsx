import AppButton from "@/app/_components/shared/button";
import AppCheckbox from "@/app/_components/shared/checkbox";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { AppInputTextArea } from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { IPayroll, PayrollStatus } from "@/app/_core/actions/finance/payroll";
import { usePayroll } from "@/app/_core/use-cases/finance/usePayroll";
import { DrawerDialog } from "@/components/drawer/modal";
import { DialogTitle } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { localTime } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

const TableSkelenton = dynamic(
  () => import("@/app/_components/shared/skelentons/table"),
  { ssr: false },
);

const PayrollManagementTable = () => {
  const { data, isLoading } = usePayroll();
  const { data: payrolls } = data ?? {};

  const getStatusBadgeClasses = (status: PayrollStatus) => {
    const statusClassMap = {
      pending: "text-amber-700 bg-amber-100",
      processed: "text-blue-700 bg-blue-100",
      rejected: "text-red-700 bg-red-100",
      approved: "text-green-700 bg-green-100",
      draft: "text-slate-700 bg-slate-100",
    };

    return `text-sm font-semibold rounded-full px-2 py-1 w-fit text-nowrap capitalize ${statusClassMap[status] || "text-gray-700 bg-gray-100"}`;
  };

  return (
    <div className="common-card space-y-4">
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

      {isLoading ? (
        <TableSkelenton />
      ) : (
        <div className="-mx-5 mt-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#F7F9FC] text-nowrap">
              <tr>
                <th className="px-6 py-3 text-left">
                  <AppCheckbox
                    id="finance-payroll-select-all"
                    name="finance-payroll-select-all"
                    checked={false}
                    onChange={() => {}}
                    className={"rounded-md border-gray-300"}
                  />
                </th>
                <th className="px-4 py-3 text-left">Payroll Name</th>
                <th className="px-4 py-3 text-left">Payroll Period</th>
                <th className="px-4 py-3 text-left">Payment date</th>
                <th className="px-4 py-3 text-left">Total Employees</th>
                <th className="px-4 py-3 text-left">Total Amount</th>
                <th className="px-4 py-3 text-left">Approval Status</th>
                <th className="px-4 py-3 text-left">Payroll Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrolls &&
                payrolls.length > 0 &&
                payrolls.map((payroll, idx) => {
                  const {
                    employees,
                    payrollName,
                    startDate,
                    endDate,
                    paymentDate,
                    status,
                    totalNetPay,
                  } = payroll;
                  const numberOfEmployees = employees.length;

                  return (
                    <tr
                      key={idx}
                      className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054] text-nowrap"
                    >
                      <td className="px-6 py-4">
                        <AppCheckbox
                          id={`finance-payroll-select-${idx}`}
                          name={`finance-payroll-select-${idx}`}
                          checked={false}
                          onChange={() => {}}
                          className={"rounded-md border-gray-300"}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm">{payrollName}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm">
                          {localTime(startDate, "MMM dd, yyyy")} -{" "}
                          {localTime(endDate, "MMM dd, yyyy")}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm">
                          {localTime(paymentDate, "MMM dd, yyyy")}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm">{numberOfEmployees}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm">₦{totalNetPay}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className={getStatusBadgeClasses(status)}>
                          {status}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <p className={getStatusBadgeClasses(status)}>
                          {status}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <PopoverMenu payroll={payroll} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

function PopoverMenu({ payroll }: { payroll: IPayroll }) {
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
            router.push(
              `/finance-admin/payroll-management/${payroll?.id}/approval`,
            )
          }
          className=""
        >
          Approve
        </button>
        <RejectModal trigger={<button>Reject</button>} />
        <button
          onClick={() =>
            router.push(`/finance-admin/payroll-management/${payroll?.id}`)
          }
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
        <AppInputTextArea
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
