
import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import { route, SAStatusMap } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModalProps } from "../../../modal/types";
import Skeleton from "@mui/material/Skeleton/Skeleton";

const useGoalManagementPage = () => {
  const router = useRouter();
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const pageData: PageProps = {
    backText: "Back to Performance Management",
    onBackTextClick: () =>
      router.push(route.employee.performanceManagement.home),
    title: "Goal Management",
      smallHeading: true,
    hasButtons: true,
    rightButton: {
      type: ButtonType.contained,
      text: "Create Goal",
      onClick: () => router.push(route.employee.managerPerformanceManagement.createGoal),
    },
    rightButtonSm: true,
  };

    const myGoalsTableData: TableProps = {
    hasActionsColumn: true,
    hasCheckboxes: true,
    headerRowData: ["Goal Description", "Start Date" , "End Date" , "Progress" ],
    bodyRowData: Array(5).fill({
        id: `review-${Math.random().toString(36).substr(2, 9)}`,
        goalDescription: <Skeleton width={100} />,
        startDate: <Skeleton width={100} />,
        endDate : <Skeleton width={100}/> ,
        progress: <Skeleton width={100} />,
    }),
    fieldTypes: [
        FieldType.text,
        FieldType.text,
        FieldType.text,
        FieldType.text,
        FieldType.text,
    ],
    statusMap: SAStatusMap,
    displayedFields: ["goalDescription", "startDate", "endDate", "progress"],
    actions: [
        
        {
        name: "view Goal",
        onDataReturned: () => {
        },
        onClick() {
                router.push(route.employee.managerPerformanceManagement.viewGoal)
        },
        },
    ],
    fieldToReturnOnActionItemClick: "id",
    filters: [
        {
        name: "Employee Name",
        items: ["All", "John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"],
        },
        {
        name: "Status",
        items: ["All", "Completed", "Pending", "In Progress"],
        },
        {
        name: "Review Cycle",
        items: ["All", "Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"],
        },
    ],
    };

        
    const teamGoalsTableData: TableProps = {
    hasActionsColumn: true,
    hasCheckboxes: true,
    headerRowData: ["Goal Description", "Start Date" , "End Date" , "Progress" ],
    bodyRowData: Array(5).fill({
        id: `review-${Math.random().toString(36).substr(2, 9)}`,
        goalDescription: <Skeleton width={100} />,
        startDate: <Skeleton width={100} />,
        endDate : <Skeleton width={100}/> ,
        progress: <Skeleton width={100} />,
    }),
    fieldTypes: [
        FieldType.text,
        FieldType.text,
        FieldType.text,
        FieldType.text,
        FieldType.text,
    ],
    statusMap: SAStatusMap,
    displayedFields: ["goalDescription", "startDate", "endDate", "progress"],
    actions: [
       
        {
        name: "View Goal",
        onDataReturned: () => {
        },
        onClick() {
                router.push(route.employee.managerPerformanceManagement.viewGoal)
            
        },
        },
    ],
    fieldToReturnOnActionItemClick: "id",
    filters: [
        {
        name: "Employee Name",
        items: ["All", "John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"],
        },
        {
        name: "Status",
        items: ["All", "Completed", "Pending", "In Progress"],
        },
        {
        name: "Review Cycle",
        items: ["All", "Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"],
        },
    ],
    };
  

  const completeModalData: ModalProps = {
    open: showCompleteModal,
    onClose: () => setShowCompleteModal(false),
    hasHeading: false,
    centerImage: "/icons/modal-success.svg",
    centerTitle: "Goal marked as completed successfully",
    centerMessage: "You have successfully marked the task as completed",
    buttonOne: {
      type: ButtonType.contained,
      text: "Continue to Dashboard",
      onClick: () => {
        setShowCompleteModal(false);
      },
    },
    centerButton: true,
    reduceVerticalGap: true,
  };





  return {
    pageData,
    teamGoalsTableData,
    myGoalsTableData,
    completeModalData,
  };
};


  

export default useGoalManagementPage;
