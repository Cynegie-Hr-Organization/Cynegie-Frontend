import { getEmployee } from "@/app/api/services/employee";
import { SortOrder } from "@/types/enum";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useFetchEmployees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Asc);
  const [statusFilter, setStatusFilter] = useState<string | undefined>("");

  const { data, isFetching, refetch } = useQuery({
    queryKey: [
      "employees",
      currentPage,
      itemsPerPage,
      sortOrder,
      statusFilter,
      searchQuery,
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

  useEffect(() => {
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
