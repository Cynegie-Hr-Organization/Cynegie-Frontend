import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SortOrder } from "@/types/enum";
import { getEmployee } from "@/app/api/services/employee";

const useFetchEmployees = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(SortOrder.Asc);
  const [statusFilter, setStatusFilter] = React.useState<string | undefined>(
    "",
  );

  const { data, isFetching, refetch } = useQuery({
    queryKey: [
      "employees",
      currentPage,
      itemsPerPage,
      sortOrder,
      searchQuery,
      statusFilter,
    ],
    queryFn: () =>
      getEmployee(
        currentPage,
        itemsPerPage,
        sortOrder,
        statusFilter,
        searchQuery,
      ),
  });

  React.useEffect(() => {
    if (data) {
      console.log("Fetched employees data:", data);
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
    employees: data?.data || [],
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

export default useFetchEmployees;
