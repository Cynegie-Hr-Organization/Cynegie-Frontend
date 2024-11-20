import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

// import { getFormattedDate } from "@/utils/helpers/date";
import { Button } from "@/components/ui/button";

import { OnboardingOverviewModal } from "@/components/modals";

export type Template = {
  Name: string;
  Department: string;
  Position: string;
  Start: string;
};

export const overviewColumns: ColumnDef<Template>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="SelectOptions all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="SelectOptions row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Name",
    header: "Name",
    cell: ({ row }) => (
      <div className="text-[#344054]">{row.getValue("Name")}</div>
    ),
  },
  {
    accessorKey: "Department",
    header: () => {
      return (
        <Button
          variant="ghost"
          // onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          {/* <ArrowUpDown className="w-4 h-4 ml-2" /> */}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-[#344054]">{row.getValue("Department")}</div>
    ),
  },
  {
    accessorKey: "Position",
    header: "Position",
    cell: ({ row }) => (
      <div className="text-[#344054]">{row.getValue("Position")}</div>
    ),
  },
  {
    accessorKey: "Start",
    header: () => <div className="">Start</div>,
    cell: ({ row }) => (
      <div className="font-medium text-[#344054]">{row.getValue("Start")}</div>
    ),
    // {
    //   const formatted = getFormattedDate(row.getValue("Start"));
    //
    //     return <div className="font-medium">{formatted}</div>;
    //   },
  },
  {
    id: "actions",
    header: () => <div className="">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      // Extract data into a structured object
      const rowData = {
        Name: row.getValue("Name"),
        Department: row.getValue("Department"),
        Position: row.getValue("Position"),
        Start: row.getValue("Start"),
      } as Template;

      // Pass the structured rowData to the modal
      return <OnboardingOverviewModal data={rowData} />;
    },
  },
];
