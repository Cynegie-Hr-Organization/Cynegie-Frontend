/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const Dropdown = ({ label, options, selected, onSelect }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative py-1 md:py-2 w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {/* Dropdown Button */}
      <div
        className="border border-gray-300 justify-between flex items-center rounded-md py-2 px-3 bg-white text-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
              {selected || `Select ${label}`}
              <svg className="ml-2" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.5" d="M1.175 0.912109L5 4.72878L8.825 0.912109L10 2.08711L5 7.08711L0 2.08711L1.175 0.912109Z" fill="#303030"/>
</svg>

      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute bg-white shadow-lg border border-gray-300 rounded-md w-full mt-1 z-10">
          {options.map((option: string, index: number) => (
            <div
              key={index}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="py-2 px-3 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

