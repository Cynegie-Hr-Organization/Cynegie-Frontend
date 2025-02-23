import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { AppSelect } from "@/app/_components/shared/select";
import AppTabs from "@/app/_components/shared/tabs";
import { AppModal } from "@/components/drawer/modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

const SuperAdminOverviewTable = () => {
  const [currentTab, setCurrentTab] = useState("complianceTasks");

  const tabs = [
    {
      label: "Compliance Tasks",
      onClick: () => setCurrentTab("complianceTasks"),
    },
    {
      label: "Finance Transactions",
      onClick: () => setCurrentTab("financeTransactions"),
    },
  ];

  const complianceTasksHeader = ["Task Name", "Due Date", "Status"];

  const financeTransactionsHeader = [
    "Transaction Type",
    "Category",
    "Date",
    "Amount",
    "Status",
    "Actions",
  ];

  const complianceTasksData = [
    {
      name: "Task 1",
      dueDate: "2023-06-30",
      status: "Pending",
    },
    {
      name: "Task 2",
      dueDate: "2023-07-15",
      status: "In Progress",
    },
  ];

  const financeTransactionsData = [
    {
      transactionType: "Payment",
      category: "Salary",
      date: "2023-06-30",
      amount: "$1000",
      status: "Completed",
    },
    {
      transactionType: "Refund",
      category: "Marketing",
      date: "2023-07-15",
      amount: "$500",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="px-6">
        <AppTabs tabs={tabs} />
      </div>

      {currentTab === "complianceTasks" && (
        <ComplianceTaskTable
          tableHeader={complianceTasksHeader}
          tableData={complianceTasksData}
        />
      )}
      {currentTab === "financeTransactions" && (
        <FinancialTransactionsTable
          tableHeader={financeTransactionsHeader}
          tableData={financeTransactionsData}
        />
      )}
    </div>
  );
};

const ComplianceTaskTable = <T extends Record<string, string>>({
  tableHeader,
  tableData,
}: {
  tableHeader: string[];
  tableData?: T[];
}) => {
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
                  label="Date"
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
                  label="Category"
                  placeholder="Revenue"
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
                  placeholder="Completed"
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
              {tableHeader.map((header, idx) => {
                return (
                  <th key={idx} className="px-4 py-3 text-left">
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((data, idx) => {
              return (
                <tr
                  key={idx}
                  className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                >
                  <td className="px-4 py-4">
                    <p className="text-sm">{data?.name}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">{data?.dueDate}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-1 w-fit text-nowrap">
                      {data?.status}
                    </p>
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

const FinancialTransactionsTable = <T extends Record<string, string>>({
  tableHeader,
  tableData,
}: {
  tableHeader: string[];
  tableData?: T[];
}) => {
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
                  label="Date"
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
                  label="Category"
                  placeholder="Revenue"
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
                  placeholder="Completed"
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
              {tableHeader.map((header, idx) => {
                return (
                  <th key={idx} className="px-4 py-3 text-left">
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((data, idx) => {
              return (
                <tr
                  key={idx}
                  className="border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]"
                >
                  <td className="px-4 py-4">
                    <p className="text-sm">{data?.transactionType}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">{data?.category}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">{data?.date}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">{data?.amount}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-1 w-fit text-nowrap">
                      {data?.status}
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="cursor-pointer outline-none p-1 border border-gray-300 rounded-lg">
          <HiDotsVertical />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-40 p-2 bg-white space-y-2 cursor-pointer rounded-lg flex flex-col items-start text-[#475367]">
        <PreviewModal
          trigger={
            <button className="hover:bg-gray-100 w-full text-left p-2 rounded-md ">
              View
            </button>
          }
        />
      </PopoverContent>
    </Popover>
  );
}

const PreviewModal = ({ trigger }: { trigger: React.ReactNode }) => {
  const transactionDetailLabels = [
    "Transaction ID",
    "Transaction date",
    "Amount",
    "Description",
    "Payment Method",
    "Catergory",
    "Status",
  ];

  const mockTransactionDetails: TransactionDetails = {
    "Transaction ID": { value: "1234567890" },
    "Transaction date": { value: "Aug 28, 2024; 3:40 PM" },
    Amount: { value: "₦18,205,000" },
    Description: { value: "Product" },
    "Payment Method": { value: "Bank Transfer" },
    Category: { value: "Revenue" },
    Status: { value: "Completed", pillValue: "Completed" },
  };

  return (
    <AppModal
      trigger={trigger}
      header={
        <span className="text-lg font-bold pl-4">
          <span>Transaction Details</span>
        </span>
      }
    >
      <div className="md:p-4 lg:p-6 p-2 space-y-4 py-5">
        {transactionDetailLabels.map((label) => {
          const detail = mockTransactionDetails[label] ?? { value: "N/A" };

          return (
            <div
              key={label}
              className="flex justify-between items-center text-sm"
            >
              <p className="text-gray-400">{label}</p>
              {detail.pillValue ? (
                <p className="text-sm font-semibold text-green-600 bg-green-50 rounded-full px-2 py-1 w-fit text-nowrap">
                  {detail.pillValue}
                </p>
              ) : (
                <p className="text-black font-bold">{detail.value}</p>
              )}
            </div>
          );
        })}
      </div>
    </AppModal>
  );
};

type TransactionDetail = {
  value: string;
  pillValue?: string;
};

type TransactionDetails = {
  [key: string]: TransactionDetail;
};

export default SuperAdminOverviewTable;
