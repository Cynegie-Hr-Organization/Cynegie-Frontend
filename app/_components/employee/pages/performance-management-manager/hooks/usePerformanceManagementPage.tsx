import { ButtonType } from "@/app/_components/shared/page/heading/types";
import { PageProps } from "@/app/_components/shared/page/types";
import { FieldType, TableProps } from "@/app/_components/shared/table/types";
import { icon, route, SAStatusMap } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModalProps } from "../../../modal/types";
import { FetchParams } from "@/types";
import { debounce } from "lodash";
import SvgIcon from "@/app/_components/icons/container";
import {  useQuery } from "@tanstack/react-query";
import {
  
  getAllMySelfAssessment,
} from "@/app/api/services/employee/performance-mgt";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import { formatDate } from "@/lib/utils";
import { CardGroupProps } from "@/app/_components/shared/section-with-cards/types";

const useManagerPerformanceManagementPage = () => {
  const router = useRouter();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [fetchParams, setFetchParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortOrder: "desc",
    search: undefined,
  });

  // Debounced search
  const debouncedSearch = debounce((value: string) => {
    setFetchParams((prev) => ({ ...prev, search: value || undefined }));
  }, 300);

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  

  const { data: selfAssessmentsData, isLoading: isSelfAssessmentsLoading } =
    useQuery({
      queryKey: ["selfAssessments", { ...fetchParams }],
      queryFn: async () => {
        const response = await getAllMySelfAssessment(
          fetchParams.sortOrder,
          fetchParams.page,
          fetchParams.limit,
          fetchParams.search,
        );
        console.log(response);
        return response;
      },
      refetchOnWindowFocus: false,
      staleTime: 60000,
    });

  

 

  const pageActions = [
    {
      name: "Goal Management",
      onClick: () =>
        router.push(route.employee.managerPerformanceManagement.goalManagement),
    },
    {
      name: "Development Plan",
      onClick: () =>
        router.push(route.employee.performanceManagement.developmentPlan),
    },
    
  ];

  const performanceManagementPageData: PageProps = {
    title: "Performance Management",
    hasButtons: true,
    leftButton: {
      text: "Actions",
      type: ButtonType.outlined,
      popoverOptions: pageActions,
    },
    rightButton: {
      type: ButtonType.contained,
      text: "Continuous Feedback",
      onClick: () =>
        router.push(route.employee.performanceManagement.continuousFeedback),
    },
    smActions: [
      ...pageActions,
      {
        name: "Continuous Feedback",
        onClick: () =>
          router.push(route.employee.performanceManagement.continuousFeedback),
      },
      
    ],
  };

  const teamReviewTableData: TableProps = {
  hasActionsColumn: true,
  hasCheckboxes: true,
  headerRowData: ["Employee Name", "Review Cycle Date", "Self Assessment Status", "Manager Review Status", "Due Date"],
  bodyRowData: Array(5).fill({
    id: `review-${Math.random().toString(36).substr(2, 9)}`,
    employeeName: <Skeleton width={100} />,
    reviewCycleDate: <Skeleton width={100} />,
    selfAssessmentStatus: <Skeleton width={100} />,
    managerReviewStatus: <Skeleton width={100} />,
    dueDate: <Skeleton width={100} />,
  }),
  fieldTypes: [
    FieldType.text,
    FieldType.text,
    FieldType.text,
    FieldType.text,
    FieldType.text,
  ],
  statusMap: SAStatusMap,

  onSearch: handleSearch,
  displayedFields: ["employeeName", "reviewCycleDate", "selfAssessmentStatus", "managerReviewStatus", "dueDate"],
  actions: [
    {
      name: "View Self-Assessment",
      onDataReturned: async () => {
        
      },
      onClick: () => {},
    },
    {
      name: "Start Review",
      onDataReturned: () => {
      },
      onClick() {
        router.push(route.employee.managerPerformanceManagement.managerAssessment)
        
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

  const selfAssessmentsTableData: TableProps = {
    hasActionsColumn: true,
    headerRowData: ["Assessment Name", "Due Date", "Status"],
    bodyRowData: isSelfAssessmentsLoading
      ? Array(5).fill({
          assessmentName: <Skeleton width={100} />,
          dueDate: <Skeleton width={100} />,
          status: <Skeleton width={100} />,
        })
      : selfAssessmentsData?.data?.items?.map((assessment) => ({
          id: assessment.id,
          assessmentName: assessment.assessmentName,
          dueDate: formatDate(assessment.dueDate),
          status: assessment.status,
        })) || [],
    fieldTypes: [FieldType.text, FieldType.text, FieldType.status],
    displayedFields: ["assessmentName", "dueDate", "status"],
    statusMap: SAStatusMap,
    fieldToReturnOnActionItemClick: "id",
    fieldActionMap: {
      in_progress: [
        {
          name: "Continue",
          onClick: () =>
            router.push(route.employee.performanceManagement.selfAssessment),
        },
      ],
      not_started: [
        {
          name: "Start",
          onDataReturned: async (id) => {
            router.push(
              `${route.employee.performanceManagement.selfAssessment}/${id}`,
            );
          },
          onClick: () => {},
        },
      ],
      completed: [
        {
          name: "No Actions",
          onClick: () => {},
        },
      ],
    },
    fieldToGetAction: "status",
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

  const giftIcon = <SvgIcon path={icon.gift} width={16} height={16} />;


 const cardGroupProps: CardGroupProps = {
    gridItemSize: { xs: 12, sm: 6, md: 3 },
    cards: [
      {
        labelText: "Total Reviews",
        value:  "0",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "success",
      },
      {
        labelText: "Completed Reviews",
        value: "0",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "info",
      },
      {
        labelText: "Active Reviews",
        value:  "0",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "warning",
      },
      {
        labelText: "Employees at Risk",
        value:  "0",
        valueBelow: true,
        icon: giftIcon,
        iconColorVariant: "error",
      },
    ],
  };

  return {
    performanceManagementPageData,
    teamReviewTableData,
    selfAssessmentsTableData,
    completeModalData,
    cardGroupProps,
  };
};


  

export default useManagerPerformanceManagementPage;
