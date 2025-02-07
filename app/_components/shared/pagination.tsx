"use client"

import { AppSelect } from '@/app/_components/shared/select';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  totalItems: number;
  totalPages: number;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

export const AppPagination: React.FC<PaginationProps> = ({
  totalItems,
  totalPages,
  itemsPerPage = 5,
  currentPage = 1,
  onPageChange,
  onItemsPerPageChange
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && onPageChange) {
      onPageChange(newPage)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-y-2 md:gap-y-0 items-center justify-between">
      <div className="flex items-center gap-x-2">
        <p>Show rows per page</p>
        <AppSelect
          value={`${itemsPerPage}`}
          width={'w-16'}
          listItems={[
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '20', value: '20' },
          ]}
          onChange={(value) => {
            if (onItemsPerPageChange) {
              onItemsPerPageChange(Number(value))
            }
          }}
        />
      </div>

      <div className='flex items-center gap-x-2'>
        <p>{`${startItem} to ${endItem} of ${totalItems}`}</p>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="hover:cursor-pointer hover:bg-gray-100 active:ring-1 transition-all duration-300 ring-primary rounded-lg h-max w-max p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoIosArrowBack />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="hover:cursor-pointer hover:bg-gray-100 active:ring-1 transition-all duration-300 ring-primary rounded-lg h-max w-max p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  )
}