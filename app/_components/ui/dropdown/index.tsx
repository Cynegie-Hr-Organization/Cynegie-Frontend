import React, { useState, useEffect, useRef } from "react";

interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (selected: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selected,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative py-1 md:py-2 w-full">
      {/* Dropdown Button */}
      <div
        className="border border-gray-300 justify-between flex items-center rounded-md py-2 px-1 md:px-3 bg-white text-xs md:text-sm cursor-pointer"
        onClick={toggleDropdown}
      >
        {selected || `Select ${label}`}
        <svg
          className="ml-2"
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M1.175 0.912109L5 4.72878L8.825 0.912109L10 2.08711L5 7.08711L0 2.08711L1.175 0.912109Z"
            fill="#303030"
          />
        </svg>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute bg-white shadow-lg border border-gray-300 rounded-md w-full mt-1 z-10">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
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
