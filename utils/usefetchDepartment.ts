import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SortOrder } from "@/types/enum";
import { getDepartment } from "@/app/api/services/department";

const useFetchDepartment = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(SortOrder.Asc);
  const [statusFilter, setStatusFilter] = React.useState<string | undefined>(
    "",
  );

  const { data, isFetching, refetch } = useQuery({
    queryKey: [
      ,
      currentPage,
      itemsPerPage,
      sortOrder,
      searchQuery,
      statusFilter,
    ],
    queryFn: () =>
      getDepartment(
        currentPage,
        itemsPerPage,
        sortOrder,
        statusFilter,
        searchQuery,
      ),
  });

  React.useEffect(() => {
    if (data) {
      console.log("departments", data);
    }
  }, [data]); // Re-run whenever data changes

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    refetch();
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status || undefined);
    refetch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    refetch();
  };

  return {
    department: data?.data || [],
    meta: data?.meta || null,
    isFetching,
    currentPage,
    handleSearch,
    handleStatusFilterChange,
    handlePageChange,
    handleItemsPerPageChange,
    setSortOrder,
    refetch,
  };
};

export default useFetchDepartment;
