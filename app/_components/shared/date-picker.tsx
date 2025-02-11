"use client";

import { format } from "date-fns";
import { Calendar1, Clock } from "lucide-react";
import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
  const [open, setOpen] = useState(false);

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
              className={`text-xs font-semibold text-gray-700 ${requiredField ? 'after:content-["*"] after:text-red-500 after:ml-1 after:font-bold' : ""}`}
            >
              {label}
            </label>
          )}

          <button
            type="button"
            className={cn(
              "w-full text-left font-normal flex items-center gap-2 justify-between border border-gray-300 rounded-md p-2 outline-none text-xs",
              !selectedDate && "text-muted-foreground",
            )}
          >
            {selectedDate ? (
              format(selectedDate, "MMM d, yyyy")
            ) : (
              <span className="text-gray-400 text-xs">{placeholder}</span>
            )}{" "}
            <Calendar1 size={18} />
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
            head_cell:
              "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            day_selected:
              "bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white rounded-full h-6 w-6 font-semibold text-sm",
            day_today: "text-amber-500 font-semibold",
            day_outside: "day-outside hidden",
            day: "text-xs p-3 h-7 w-7 flex items-center justify-center hover:bg-gray-200 hover:text-black focus:bg-primary focus:text-white rounded-full transition-all duration-300",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export function AppTimePicker({
  label,
  requiredField = false,
  selectedTime,
  setSelectedTime,
  placeholder = "Pick a time",
  className,
  minutesOnly = false,
}: {
  label?: string;
  requiredField?: boolean;
  selectedTime?: Date;
  setSelectedTime: (time?: Date) => void;
  placeholder?: string;
  className?: string;
  minutesOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(
    selectedTime ? selectedTime.getHours() % 12 || 12 : 12,
  );
  const [selectedMinute, setSelectedMinute] = useState(
    selectedTime ? selectedTime.getMinutes() : 0,
  );
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">(
    selectedTime ? (selectedTime.getHours() >= 12 ? "PM" : "AM") : "AM",
  );

  const handleTimeChange = () => {
    if (minutesOnly) {
      const newTime = new Date();
      newTime.setMinutes(selectedMinute);
      setSelectedTime(newTime);
      setOpen(false);
      return;
    }

    const newTime = new Date();
    const adjustedHour =
      selectedPeriod === "PM"
        ? selectedHour === 12
          ? 12
          : selectedHour + 12
        : selectedHour === 12
          ? 0
          : selectedHour;

    newTime.setHours(adjustedHour, selectedMinute, 0, 0);
    setSelectedTime(newTime);
    setOpen(false);
  };

  const renderDisplayText = () => {
    if (minutesOnly) {
      return selectedMinute === 1
        ? `${selectedMinute} minute`
        : `${selectedMinute} minutes`;
    }

    return selectedTime ? (
      `${selectedHour}:${selectedMinute.toString().padStart(2, "0")} ${selectedPeriod}`
    ) : (
      <span className="text-gray-400 text-xs">{placeholder}</span>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={`flex flex-col gap-1 w-full ${className}`}>
          {label && (
            <label
              className={`text-xs font-semibold text-gray-700 ${requiredField ? 'after:content-["*"] after:text-red-500 after:ml-1 after:font-bold' : ""}`}
            >
              {label}
            </label>
          )}

          <button
            type="button"
            className={cn(
              "w-full text-left font-normal flex items-center gap-2 justify-between border border-gray-300 rounded-md p-2 outline-none text-xs",
              !selectedTime && "text-muted-foreground",
            )}
          >
            {renderDisplayText()}
            <Clock size={18} />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 bg-white shadow-lg rounded-lg border overflow-hidden"
        align="start"
      >
        {!minutesOnly ? (
          <div className="flex w-full">
            {/* Hours Column */}
            <div className="w-1/3 max-h-64 overflow-y-auto border-r ios-scrollbar">
              <div className="divide-y divide-gray-200">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <button
                    key={hour}
                    type="button"
                    onClick={() => setSelectedHour(hour)}
                    className={cn(
                      "w-full p-2 hover:bg-gray-100 transition-colors duration-200 text-xs text-center",
                      selectedHour === hour &&
                        "bg-primary/10 text-primary font-semibold",
                    )}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes Column */}
            <div className="w-1/3 max-h-64 overflow-y-auto border-r ios-scrollbar">
              <div className="divide-y divide-gray-200">
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <button
                    key={minute}
                    type="button"
                    onClick={() => setSelectedMinute(minute)}
                    className={cn(
                      "w-full p-2 hover:bg-gray-100 transition-colors duration-200 text-xs text-center",
                      selectedMinute === minute &&
                        "bg-primary/10 text-primary font-semibold",
                    )}
                  >
                    {minute.toString().padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>

            {/* Period Column */}
            <div className="w-1/3 max-h-64 overflow-y-auto">
              <div className="divide-y divide-gray-200">
                {(["AM", "PM"] as const).map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setSelectedPeriod(period)}
                    className={cn(
                      "w-full p-2 hover:bg-gray-100 transition-colors duration-200 text-xs text-center",
                      selectedPeriod === period &&
                        "bg-primary/10 text-primary font-semibold",
                    )}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-h-64 overflow-y-auto">
            <div className="divide-y divide-gray-200">
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <button
                  key={minute}
                  type="button"
                  onClick={() => {
                    setSelectedMinute(minute);
                    handleTimeChange();
                  }}
                  className={cn(
                    "w-full text-left p-2 hover:bg-gray-100 transition-colors duration-200 text-xs",
                    selectedMinute === minute &&
                      "bg-primary/10 text-primary font-semibold",
                  )}
                >
                  {minute} {minute === 1 ? "minute" : "minutes"}
                </button>
              ))}
            </div>
          </div>
        )}

        {!minutesOnly && (
          <div className="p-2 border-t flex justify-end">
            <button
              type="button"
              onClick={handleTimeChange}
              className="text-sm font-semibold bg-primary text-white px-3 py-1 rounded hover:bg-primary/90"
            >
              Set Time
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
