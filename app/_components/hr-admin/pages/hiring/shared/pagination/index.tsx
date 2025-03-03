import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (items: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="grid grid-cols-2 gap-4 md:flex md:items-center md:justify-between mt-4 overflow-x-hidden">
  <div className="flex items-center justify-start">
    <span className=" hidden md:flex mr-1 md:mr-2 text-xs md:text-sm text-gray-700 whitespace-nowrap">
      Show rows per page:
    </span>
    <select
      className="border border-gray-300 rounded px-1 md:px-2 py-[1px] text-sm"
      value={itemsPerPage}
      onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  </div>
  <div className="flex items-center justify-end">
    <span className="mr-1 md:mr-2 text-xs md:text-sm text-DarkShadeGray">
      {itemsPerPage * (currentPage - 1) + 1} of {totalItems}
    </span>
    <button
      onClick={() => onPageChange(currentPage - 1)}
      className="p-1 rounded-full hover:bg-LightGray disabled:opacity-50"
      disabled={currentPage === 1}
    >
      <ChevronLeft className="h-5 w-5 text-MediumGray" />
    </button>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      className="p-1 rounded-full hover:bg-LightGray disabled:opacity-50"
      disabled={currentPage === totalPages}
    >
      <ChevronRight className="h-5 w-5 text-MediumGray" />
    </button>
  </div>
</div>
  );
};

export default Pagination;
