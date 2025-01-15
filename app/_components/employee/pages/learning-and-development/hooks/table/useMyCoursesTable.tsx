import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import { useRouter } from "next/navigation";

const useMyCoursesTable = () => {
  const router = useRouter();
  const myCourseTableData: TableProps = {
    title: "My Courses",
    hasCheckboxes: true,
    hasActionsColumn: true,
    headerRowData: ["Course Title", "Progress", "Next Lesson"],
    bodyRowData: [
      {
        title: "Advanced UX Design",
        progress: 60,
        nextLesson: 3,
      },
      {
        title: "Advanced UX Design",
        progress: 60,
        nextLesson: 3,
      },
      {
        title: "Advanced UX Design",
        progress: 60,
        nextLesson: 3,
      },
      {
        title: "Advanced UX Design",
        progress: 60,
        nextLesson: 3,
      },
      {
        title: "Advanced UX Design",
        progress: 60,
        nextLesson: 3,
      },
    ],
    displayedFields: ["title", "progress", "nextLesson"],
    fieldTypes: [FieldType.text, FieldType.progress, FieldType.nextLesson],
    actions: [
      { name: "Continue Course", onClick: () => {} },
      {
        name: "View Details",
        onClick: () =>
          router.push("/employee/learning-development/view-course-details"),
      },
      { name: "Mark as Completed", onClick: () => {} },
    ],
    filters: [
      { name: "Completion Status", items: ["All", "Completed", "In Progress"] },
    ],
    fieldToReturnOnActionItemClick: "status",
  };
  return { myCourseTableData };
};

export default useMyCoursesTable;
