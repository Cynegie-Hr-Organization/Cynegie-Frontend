import AppAvatar from "@/app/_components/shared/avatar";
import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import { AppSelect } from "@/app/_components/shared/select";
import { Checkbox } from "@/components/ui/checkbox";
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
              <th className="px-4 py-3 text-left">Employee Name</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Gross Pay</th>
              <th className="px-4 py-3 text-left">Deduction</th>
              <th className="px-4 py-3 text-left">Net Pay</th>
              <th className="px-4 py-3 text-left">Overtime Pay</th>
              <th className="px-4 py-3 text-left">Status</th>
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
                  <td className="px-4 py-4 flex items-center gap-2">
                    <AppAvatar
                      src="/images/avatar.png"
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm">Ashima Lile</p>
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
                    <p className="text-sm">₦18,205,000</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-semibold text-amber-700 bg-amber-50 rounded-full px-2 py-1 w-fit text-nowrap capitalize">
                      Pending
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

export default PayrollManagementTable;
