"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoSearchSharp } from "react-icons/io5";

export function AppSelectWithSearch({
  listLabel,
  label,
  requiredField = false,
  listItems,
  placeholder,
  onChange,
  selectedItems = [],
  width = "w-full",
  triggerStyle = "border-gray-300",
  isLoading = false,
  onSearch,
}: {
  listLabel?: string;
  label?: string;
  requiredField?: boolean;
  listItems: { label: string; value: string }[];
  placeholder?: string;
  onChange: (selected: string[]) => void;
  selectedItems?: string[];
  width?: string;
  triggerStyle?: string;
  isLoading?: boolean;
  onSearch?: (query: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = listItems.filter((item) =>
    item?.label?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const isAllSelected =
    filteredItems.length > 0 && selectedItems.length === filteredItems.length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      onChange([]);
    } else {
      onChange(filteredItems.map((item) => item.value));
    }
  };

  const handleItemChange = (value: string) => {
    if (selectedItems.includes(value)) {
      onChange(selectedItems.filter((item) => item !== value));
    } else {
      onChange([...selectedItems, value]);
    }
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${width}`}>
      {label && (
        <p
          className={`text-sm font-semibold flex justify-start w-full ${
            requiredField
              ? 'after:content-["*"] after:text-red-500 after:ml-1 after:font-bold'
              : ""
          }`}
        >
          {label}
        </p>
      )}

      <Select value="" onValueChange={() => {}}>
        <SelectTrigger
          className={`${triggerStyle} placeholder:text-gray-400 ${width}`}
        >
          <SelectValue
            className="placeholder:text-gray-400"
            placeholder={<p className="text-gray-400">{placeholder}</p>}
          />
        </SelectTrigger>

        <SelectContent className="bg-white p-0">
          {/* Search Bar */}
          <div className="flex items-center p-2 gap-2 border-b border-gray-300">
            <IoSearchSharp size={20} />
            <input
              type="text"
              className="w-full outline-none text-sm"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <SelectGroup className="flex flex-col gap-y-2 justify-start p-0 text-sm">
            {listLabel && filteredItems.length > 0 && (
              <SelectLabel className="text-sm px-2">{listLabel}</SelectLabel>
            )}

            {isLoading ? (
              <p className="text-sm text-gray-500 px-2">Loading...</p>
            ) : filteredItems.length > 0 ? (
              <div className="max-h-60 overflow-y-auto">
                {/* Select All Checkbox */}
                <div className="flex items-center gap-2 px-4 py-2 border-b">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="form-checkbox text-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Select All</span>
                </div>

                {/* Individual Items */}
                {filteredItems.map((item) => (
                  <div
                    key={item.value}
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleItemChange(item.value)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.value)}
                      onChange={() => handleItemChange(item.value)}
                      className="form-checkbox text-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 px-2">No results found</p>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
