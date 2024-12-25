"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar1 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function AppDatePicker({
  label,
  requiredField = false,
  selectedDate,
  setSelectedDate,
  placeholder = "Pick a date",
}: {
  label?: string;
  requiredField?: boolean;
  selectedDate?: Date;
  setSelectedDate: (date?: Date) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);

  const handleDateChange = (date?: Date) => {
    setSelectedDate(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-col gap-2 w-full">
          {label && (
            <label
              className={`text-sm font-semibold text-gray-700 ${requiredField ? 'after:content-["*"] after:text-red-500 after:ml-1 after:font-bold' : ""}`}
            >
              {label}
            </label>
          )}

          <button
            type="button"
            className={cn(
              "w-full text-left font-normal flex items-center gap-2 justify-between border border-gray-300 rounded-md p-2 outline-none text-sm",
              !selectedDate && "text-muted-foreground",
            )}
          >
            {selectedDate ? (
              format(selectedDate, "MMM d, yyyy")
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}{" "}
            <Calendar1 />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          initialFocus
          classNames={{
            day_selected:
              "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white rounded-full h-6 w-6 font-semibold",
            day_today: "text-amber-500 font-semibold",
            day_outside: "day-outside hidden",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
