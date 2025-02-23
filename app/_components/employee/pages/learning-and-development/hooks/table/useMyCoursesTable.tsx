"use client";

import { useRouter } from "next/navigation";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import {
  completeCourse,
  getAllAssignCourse,
} from "@/app/api/services/employee/learning";
import { CourseStatusMap } from "@/constants";
import { useToast } from "@/hooks/use-toast";

const useMyCoursesTable = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    data: courses,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-courses"],
    queryFn: async () => {
      const response = await getAllAssignCourse("desc", 1, 10);
      console.log(response);
      return response.data.items;
    },
    refetchOnWindowFocus: false,
    staleTime: 30000,
  });

  const completedCourses =
    courses
      ?.filter((course) => course.status === "COMPLETED")
      .map((course) => ({
        name: course.courseTitle,
        datePhrase: "Completed On",
        date: new Date(course.updatedAt).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      })) || [];

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
            id: course.id,
            title: course.courseTitle,
            status: course.status,
          }))
        : [],
    displayedFields: ["title", "status"],
    fieldTypes: [FieldType.text, FieldType.status],
    statusMap: CourseStatusMap,
    actions: [
      {
        name: "Continue Course",
        onClick: () => {
          console.log("Continue Course");
        },
      },
      {
        name: "View Details",
        onClick: () => {},
        onDataReturned: (id) => {
          router.push(
            `/employee/learning-development/view-course-details/${id}`,
          );
        },
      },
      {
        name: "Mark as Completed",
        onClick: () => {
          console.log("Mark as Completed"); //TODO: Implement this
        },
        onDataReturned: async (id) => {
          try {
            const response = await completeCourse(id, "COMPLETED");
            console.log(response);
            if (response.created !== "") {
              refetch();
              toast({
                title: "Success!",
                description: "Course status updated successfully.",
              });
              console.log(
                "Course marked as completed successfully:",
                response.data,
              );
            } else {
              toast({
                title: "Warning!",
                description: `Unexpected response status: ${response.status}`,
              });
              console.warn("Unexpected status in response:", response.status);
            }
          } catch (error) {
            toast({
              title: "Error!",
              description:
                "Failed to mark course as completed. Please try again.",
            });
            console.error("Failed to mark course as completed:", error);
          }
        },
      },
    ],
    fieldToReturnOnActionItemClick: "id",
    filters: [
      { name: "Completion Status", items: ["All", "Completed", "In Progress"] },
    ],
  };

  return { tableProps, completedCourses };
};

export default useMyCoursesTable;
