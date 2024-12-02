/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SortOrder } from "@/types/enum";
import { getJobs } from "@/app/api/services/job";

const useFetchJobs = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(SortOrder.Asc);
  const [filters, setFilters] = React.useState({
    status: "",
    title: "",
    department: "",
    jobLocation: "",
    company: "",
    requiredSkills: [] as string[],
    type: "",
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: [currentPage, itemsPerPage, sortOrder, searchQuery, filters],
    queryFn: () =>
      getJobs(
        currentPage,
        itemsPerPage,
        sortOrder,
        filters.status,
        filters.title,
        filters.department,
        filters.jobLocation,
        searchQuery,
        filters.company,
        filters.requiredSkills,
        filters.type,
          ),
    staleTime: 2 * 60 * 1000,
  });

  React.useEffect(() => {
    if (data) {
      console.log("Fetched jobs data:", data);
    }
  }, [data]); // Re-run whenever data changes

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    refetch();
  };

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    refetch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items); // Update itemsPerPage (limit)
    refetch();
  };

  return {
    jobs: data?.data?.data || [],
    isFetching,
    currentPage,
    totalPages: data?.data?.totalPages || 0, // Directly use the backend-provided totalPages
    handleSearch,
    handleFilterChange,
    handlePageChange,
    handleItemsPerPageChange,
    setSortOrder,
  };
};

export default useFetchJobs;
