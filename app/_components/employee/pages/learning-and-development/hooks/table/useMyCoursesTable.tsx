"use client";

import { useRouter } from "next/navigation";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import { getAllAssignCourse } from "@/app/api/services/employee/learning";
import { AppRequestStatusMap } from "@/constants";

const useMyCoursesTable = () => {
  const router = useRouter();

  // Fetch courses using useQuery
  const { data: courses, isLoading } = useQuery({
    queryKey: ["assigned-courses"],
    queryFn: async () => {
      const response = await getAllAssignCourse("desc", 1, 10);
      console.log(response)
      return response.data.items;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });

  

  const tableProps: TableProps = {
    title: "My Courses",
    hasCheckboxes: true,
    hasActionsColumn: true,
    headerRowData: ["Course Title", "Status"],
    bodyRowData: isLoading
      ? Array(5).fill({
          title: <Skeleton width={150} />,
          status: <Skeleton width={100} />,
        })
      : Array.isArray(courses)
  ? courses.map((course) => ({
      title: course.courseTitle,
      status: course.status,
    }))
  : [],
    displayedFields: ["title", "status"],
    fieldTypes: [FieldType.text, FieldType.status],
      statusMap: AppRequestStatusMap,
  
    actions: [
      {
        name: "Continue Course",
        onClick: () => {
          console.log("Continue Course");
        },
      },
      {
        name: "View Details",
        onClick: () =>
          router.push("/employee/learning-development/view-course-details"),
      },
      {
        name: "Mark as Completed",
        onClick: () => {
          console.log("Mark as Completed");
        },
      },
    ],
    filters: [
      { name: "Completion Status", items: ["All", "Completed", "In Progress"] },
    ],
  };

  return { tableProps };
};

export default useMyCoursesTable;
