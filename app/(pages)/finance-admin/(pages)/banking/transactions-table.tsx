import AppButton from "@/app/_components/shared/button";
import { AppDropdownMenu } from "@/app/_components/shared/dropdown-menu";
import AppMenubar from "@/app/_components/shared/menubar";
import { AppSelect } from "@/app/_components/shared/select";
import { HiDotsVertical } from "react-icons/hi";
import { LuListFilter } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

const TransactionsTable = () => {
  return (
    <TableStructure />
  );
};

const TableStructure = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
        <div className="flex-grow max-w-[300px] xl:max-w-[479px] flex items-center border pl-4 border-gray-300 rounded-lg overflow-hidden transition-all duration-300 focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
          <RiSearchLine className="text-gray-400" />
          <input type="text" placeholder="Search here..." className="w-full h-9 px-2 outline-none" />
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
            {Array.from(Array(5)).map((_, idx) => {
              return (
                <tr key={idx} className='border-b border-[#E4E7EC] hover:bg-gray-50 text-[#344054]'>
                  <td className='px-5 py-4'>John Doe</td>
                  <td className='px-5 py-4'>123456789</td>
                  <td className='px-5 py-4'>ABC Bank</td>
                  <td className='px-5 py-4'>2023-08-01</td>
                  <td className='px-5 py-4'>
                    <AppMenubar
                      menuItems={
                        [
                          {
                            key: "preview",
                            label: "Preview",
                            onClick: () => {
                              console.log("Preview")
                            }
                          },
                          {
                            key: "edit",
                            label: "Edit",
                            onClick: () => {
                              console.log("Edit")
                            }
                          },
                          {
                            key: "delete",
                            label: "Deactivate",
                            onClick: () => {
                              console.log("Deactivate")
                            }
                          }
                        ]
                      }
                    >
                      <button className="border border-gray-300 rounded-lg p-2 w-max hover:ring-1 hover:ring-gray-400 outline-none">
                        <HiDotsVertical />
                      </button>
                    </AppMenubar>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;