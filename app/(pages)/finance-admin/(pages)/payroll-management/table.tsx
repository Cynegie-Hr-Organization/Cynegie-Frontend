import AppButton from "@/app/_components/shared/button";
import AppCheckbox from "@/app/_components/shared/checkbox";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import EmptyTable from "@/app/_components/shared/empty-table";
import { AppInputTextArea } from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import TableSkeleton from "@/app/_components/shared/skelentons/table";
import {
  usePayroll,
  usePayrollMutations,
} from "@/app/_core/use-cases/finance/usePayroll";
import useSelection from "@/app/_hooks/useSelection";
import { AppModal } from "@/components/drawer/modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { localTime } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

// const TableSkelenton = dynamic(
//   () => import("@/app/_components/shared/skelentons/table"),
//   { ssr: false },
// );

const PayrollManagementTable = () => {
  const { selectedItems, toggleSelection, selectAll, clearSelection } =
    useSelection<string>();
  const [filter, setFilter] = useState({
    status: "",
  });

  const { data, isLoading: isPayrollsLoading } = usePayroll({
    statusOverride: filter.status,
  });

  const { data: payrolls } = data ?? {};
  const totalItems = payrolls?.length ?? 0;

  const handleSelectAll = () => {
    if (selectedItems.size === totalItems) {
      clearSelection();
    } else {
      selectAll(payrolls?.map((payroll) => payroll.id) || []);
    }
  };

  return (
    <div className="common-card overflow-x-scroll space-y-4">
      {isPayrollsLoading ? (
        <TableSkeleton />
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
                <div className="p-4 space-y-5">
                  <div className="space-y-4">
                    <AppSelect
                      listItems={[
                        { label: "Pending", value: "pending" },
                        { label: "Approved", value: "approved" },
                        { label: "Rejected", value: "rejected" },
                      ]}
                      label="Status"
                      placeholder="Pending"
                      onChange={(value) =>
                        setFilter({ ...filter, status: value })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <AppButton
                      label="Reset"
                      className="btn-secondary w-[90px]"
                    />
                    <AppButton
                      label="Filter"
                      className="btn-primary w-[90px]"
                    />
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
                    <AppCheckbox
                      id=""
                      checked={selectedItems.size === totalItems}
                      onChange={handleSelectAll}
                    />
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
                {payrolls && payrolls.length > 0 ? (
                  payrolls.map((payroll, idx) => {
                    const {
                      payrollName,
                      startDate,
                      endDate,
                      paymentDate,
                      totalNetPay,
                      status,
                      employees,
                      id,
                    } = payroll;

                    return (
                      <tr
                        key={idx}
                        className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                      >
                        <td className="px-6 py-4">
                          <AppCheckbox
                            id={`payroll-item-${id}`}
                            checked={selectedItems.has(id)}
                            onChange={() => toggleSelection(id)}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm">{payrollName}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm">
                            {localTime(startDate, "dd MMM, yyyy")} -{" "}
                            {localTime(endDate, "dd MMM, yyyy")}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm">
                            {localTime(paymentDate, "dd MMM, yyyy")}3
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm">{employees.length}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm">₦{totalNetPay}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p
                            className={`text-sm font-semibold rounded-full px-2 py-1 w-fit text-nowrap ${
                              {
                                pending:
                                  " text-amber-700 bg-amber-50 capitalize",
                                approved:
                                  " text-green-700 bg-green-50 capitalize",
                                rejected: " text-red-700 bg-red-50 capitalize",
                                declined: " text-red-700 bg-red-50 capitalize",
                                draft: " text-slate-700 bg-slate-50 capitalize",
                                processed:
                                  " text-green-700 bg-green-50 capitalize",
                              }[status]
                            }`}
                          >
                            {status}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <PopoverMenu payrollId={id} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <EmptyTable message="No Payrolls found" />
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

function PopoverMenu({ payrollId }: { payrollId: string }) {
  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="cursor-pointer outline-none p-2 border border-gray-300 rounded-lg">
          <HiDotsVertical />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-40 bg-white cursor-pointer rounded-lg flex flex-col items-start text-[#475367] p-2">
        <button
          className="hover:bg-gray-100 w-full text-left text-sm p-2 rounded-md"
          onClick={() =>
            router.push(
              `/finance-admin/payroll-management/${payrollId}/approval`,
            )
          }
        >
          Approve
        </button>
        <RejectModal
          payrollId={payrollId}
          trigger={
            <button className="hover:bg-red-50 text-red-500 w-full text-left text-sm p-2 rounded-md">
              Reject
            </button>
          }
        />
        <button
          className="hover:bg-gray-100 w-full text-left text-sm p-2 rounded-md"
          onClick={() =>
            router.push(`/finance-admin/payroll-management/${payrollId}`)
          }
        >
          View Details
        </button>
      </PopoverContent>
    </Popover>
  );
}

const RejectModal = ({
  trigger,
  payrollId,
}: {
  trigger: React.ReactNode;
  payrollId: string;
}) => {
  const { rejectPayroll } = usePayrollMutations({ id: payrollId });
  const [rejectionReason, setRejectionReason] = useState("");
  const [toggleRejectionModal, setToggleRejectionModal] = useState(false);

  const handlePayrollRejection = () => {
    rejectPayroll.mutate(
      {
        id: payrollId,
        rejectionReason,
      },
      {
        onSuccess: () => {
          setToggleRejectionModal(false);
        },
      },
    );
  };
  return (
    <AppModal
      open={toggleRejectionModal}
      setOpen={setToggleRejectionModal}
      trigger={trigger}
      header={
        <span className="text-lg font-bold -mx-4 lg:mx-0 lg:px-6  pt-4 lg:pt-6">
          <span className="flex flex-col gap-y-1">
            <span>Confirm Rejection</span>
            <span className="text-sm text-gray-400 max-w-[367px]">
              Please provide a reason for rejecting this Payroll
            </span>
          </span>
        </span>
      }
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 pb-4 lg:pb-6">
          <AppButton
            label="Cancel"
            className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full"
            onClick={() => setToggleRejectionModal(false)}
          />
          <AppButton
            label="Confirm Rejection"
            className="bg-red-700 text-white md:w-[150px] w-full border border-red-700"
            onClick={handlePayrollRejection}
          />
        </div>
      }
    >
      <div className="lg:p-6">
        <AppInputTextArea
          label="Rejection Reason"
          id="rejection-reason"
          placeholder="Enter reason"
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
        />
      </div>
    </AppModal>
  );
};

export default PayrollManagementTable;
