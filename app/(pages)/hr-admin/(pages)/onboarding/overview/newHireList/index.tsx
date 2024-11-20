'use client'

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import { Template } from "@/components/table/templates.column";


import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ListFilter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { overviewColumns } from "@/components/table/overview.column";



const data = [
  {
    Name: "Ayomide Alibaba",
    Department: "Admin",
    Position: "Admin Officer",
    Start: "21st June, 2024",
  },
  {
    Name: "Bisola Azubuike",
    Department: "Design ",
    Position: "Product designer",
    Start: "23rd June, 2024",
  },
  {
    Name: "Brenda Ifeanyi",
    Department: "Development",
    Position: "Software developer",
    Start: "1st August, 2024",
  },
  {
    Name: "Charles Obafemi",
    Department: "Engineering",
    Position: "Project Manager",
    Start: "15th August, 2024",
  },
  {
    Name: "Charleson Udor",
    Department: "Sales",
    Position: "Sales Rep",
    Start: "5th September, 2024",
  },
];

const NewHireList = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: overviewColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <section
      className={
        "border border-[#E4E7EC] rounded-md pt-5 pb-10 shadow-md bg-white mt-5"
      }
    >
      <div className="flex items-center justify-between p-4">
        <Input placeholder="Search here..." className="h-8 max-w-sm" />
        <Popover>
          <PopoverTrigger className="flex items-center gap-2 p-3 py-2 border rounded-md">
            <ListFilter className="w-4 h-4" />
            <span className="text-sm font-semibold">Filter</span>
          </PopoverTrigger>
          <PopoverContent>Filters</PopoverContent>
        </Popover>
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-[#F7F9FC]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={overviewColumns.length}
                  className={"h-24 text-center"}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end px-4 py-4 space-x-2 ">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm">Show rows per page</p>
            <Select>
              <SelectTrigger className="text-sm w-fit">
                <SelectValue defaultValue={"5"} placeholder="5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center text-sm space-x-">
          <div>
            <span className={"mr-2.5"}>1-5</span>
            of 3
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewHireList;
