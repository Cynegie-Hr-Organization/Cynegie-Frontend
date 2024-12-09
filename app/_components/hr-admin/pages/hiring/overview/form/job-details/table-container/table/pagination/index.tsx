import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
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
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        <span className="mr-1 md:mr-2 text-sm text-gray-700">
          Show rows per page:
        </span>
        <select
          className="border border-gray-300 rounded px-[2px] md:px-2 py-1 text-sm"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className="flex items-center">
        <span className="mr-1 md:mr-2 text-sm text-DarkShadeGray">
          {itemsPerPage * (currentPage - 1) + 1}-
          {Math.min(itemsPerPage * currentPage, totalItems)} of {totalItems}
        </span>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1 rounded-full hover:bg-LightGray"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-5 w-5 text-MediumGray" />
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1 rounded-full hover:bg-LightGray"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-5 w-5 text-MediumGray" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
