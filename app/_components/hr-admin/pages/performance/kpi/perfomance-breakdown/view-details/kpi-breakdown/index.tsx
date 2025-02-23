import React, { useState } from "react";
import KPIBreakdownTable from "./table";
import { formatDate } from "@/lib/utils";

const KPIBreakdown = () => {
  // Dummy data
  const [data] = useState([
    {
      id: 1,
      assessment_type: "John Doe",
      score: "85%",
      rating: "90%",
      date: "2024-01-15",
    },
    {
      id: 2,
      assessment_type: "Jane Smith",
      score: "78%",
      rating: "85%",
      date: "2024-02-20",
    },
    {
      id: 3,
      assessment_type: "Alice Johnson",
      score: "92%",
      rating: "95%",
      date: "2024-03-10",
    },
    {
      id: 4,
      assessment_type: "Bob Brown",
      score: "70%",
      rating: "80%",
      date: "2024-04-05",
    },
  ]);

  // Define columns
  const columns = [
    {
      header: "Assessment Type",
      accessor: (row: { assessment_type: any }) => row.assessment_type,
    },
    {
      header: "Score",
      accessor: (row: { score: any }) => row.score,
    },
    {
      header: "Rating",
      accessor: (row: { rating: any }) => row.rating,
    },
    {
      header: "Date",
      accessor: (row: { date: any }) => formatDate(row.date),
    },
  ];

  return (
    <div className="rounded-xl border bg-white shadow-sm w-full h-fit py-4">
      <div className="h-full w-full">
        <KPIBreakdownTable
          data={data}
          columns={columns}
          isFetching={false} // Since we're using dummy data, fetching is false
          totalPages={1} // Only one page of dummy data
          currentPage={1}
          onPageChange={() => {}}
          onItemsPerPageChange={() => {}}
          handleSearch={() => {}}
          handleFilterChange={() => {}}
          refetch={() => {}}
        />
      </div>
    </div>
  );
};

export default KPIBreakdown;
