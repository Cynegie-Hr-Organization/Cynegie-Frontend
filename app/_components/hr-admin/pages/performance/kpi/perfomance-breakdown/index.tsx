import React, { useState } from "react";
import PerformanceBreakdownTable from "./table";

const PerformanceBreakdown = () => {
  // Dummy data
  const [data] = useState([
    {
      id: 1,
      emp_name: "John Doe",
      avg_score: 85,
      goal_achievement: "90%",
      training_completion: "80%",
    },
    {
      id: 2,
      emp_name: "Jane Smith",
      avg_score: 78,
      goal_achievement: "85%",
      training_completion: "75%",
    },
    {
      id: 3,
      emp_name: "Alice Johnson",
      avg_score: 92,
      goal_achievement: "95%",
      training_completion: "88%",
    },
    {
      id: 4,
      emp_name: "Bob Brown",
      avg_score: 70,
      goal_achievement: "80%",
      training_completion: "65%",
    },
  ]);

  // Define columns
  const columns = [
    {
      header: "Employee Name",
      accessor: (row: { emp_name: any }) => row.emp_name,
    },
    {
      header: "Average Score",
      accessor: (row: { avg_score: any }) => row.avg_score,
    },
    {
      header: "Goal Achievement",
      accessor: (row: { goal_achievement: any }) => row.goal_achievement,
    },
    {
      header: "Training Completion",
      accessor: (row: { training_completion: any }) => row.training_completion,
    },
  ];

  return (
    <div className="rounded-xl border bg-white shadow-sm w-full h-full py-4">
      <div className="h-full w-full">
        <PerformanceBreakdownTable
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

export default PerformanceBreakdown;
