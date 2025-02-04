import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { FieldType, TableProps } from '@/app/_components/shared/table/types';
import { GoalStatusMap, route, SAStatusMap } from '@/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ModalProps } from '../../../modal/types';
import { FetchParams } from '@/types';
import { debounce } from 'lodash';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { completeGoalsById, getAllMyGoals, getAllMySelfAssessment } from '@/app/api/services/employee/performance-mgt';
import Skeleton from '@mui/material/Skeleton/Skeleton';
import { formatDate } from '@/lib/utils';

const usePerformanceManagementPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [fetchParams, setFetchParams] = useState<FetchParams>({
    page: 1,
    limit: 10,
    sortOrder: 'desc',
    search: undefined,
  });

  // Debounced search
  const debouncedSearch = debounce((value: string) => {
    setFetchParams((prev) => ({ ...prev, search: value || undefined }));
  }, 300);

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  const { data: goalsData, isLoading: isGoalsLoading } = useQuery({
    queryKey: ['goals', { ...fetchParams }],
    queryFn: async () => {
      const response = await getAllMyGoals(
        fetchParams.sortOrder,
        fetchParams.page,
        fetchParams.limit,
        fetchParams.search
      );
      console.log(response);
      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });

  const { data: selfAssessmentsData, isLoading: isSelfAssessmentsLoading } = useQuery({
    queryKey: ['selfAssessments', { ...fetchParams }],
    queryFn: async () => {
      const response = await getAllMySelfAssessment(
        fetchParams.sortOrder,
        fetchParams.page,
        fetchParams.limit,
        fetchParams.search
      );
      console.log(response);
      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });

  const mutation = useMutation({
    mutationFn: completeGoalsById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      setShowCompleteModal(false);
    },
  });

  const handleCompleteCourse = async (id: any) => {
    mutation.mutate(id);
  };

  const pageActions = [
    {
      name: 'Development Plan',
      onClick: () =>
        router.push(route.employee.performanceManagement.developmentPlan),
    },
    {
      name: 'Create Goals', onClick: () => 
              router.push(route.employee.performanceManagement.createGoals),
     },
  ];

  const performanceManagementPageData: PageProps = {
    title: 'Performance Management',
    hasButtons: true,
    leftButton: {
      text: 'Actions',
      type: ButtonType.outlined,
      popoverOptions: pageActions,
    },
    rightButton: {
      type: ButtonType.contained,
      text: 'Continuous Feedback',
      onClick: () =>
        router.push(route.employee.performanceManagement.continuousFeedback),
    },
    smActions: [
      ...pageActions,
      {
        name: 'Continuous Feedback',
        onClick: () =>
          router.push(route.employee.performanceManagement.continuousFeedback),
      },
    ],
  };

  const goalsTableData: TableProps = {
    hasActionsColumn: true,
    hasCheckboxes: true,
    headerRowData: ['Goal Description', 'Priority', 'Status', 'Due Date'],
    bodyRowData: isGoalsLoading
      ? Array(5).fill({
          description: <Skeleton width={100} />,
          priority: <Skeleton width={100} />,
          status: <Skeleton width={100} />,
          dueDate: <Skeleton width={100} />,
        })
      : goalsData?.data.map((goal) => ({
          id: goal.id,
          description: goal.description,
          priority: goal.priority,
          status: goal.status,
          dueDate: formatDate(goal.dueDate),
        })) || [],
    fieldTypes: [
      FieldType.text,
      FieldType.text,
      FieldType.status,
      FieldType.text,
    ],
    statusMap: GoalStatusMap,
    onSearch: handleSearch,
    displayedFields: ['description', 'priority', 'status', 'dueDate'],
    actions: [
      {
        name: 'View Details',
        onDataReturned: async (id) => {
          router.push(`${route.employee.performanceManagement.viewGoal}/${id}`);
        },
        onClick: () => {},
      },
      {
        name: 'Mark As Complete',
        onDataReturned: (id) => {
          handleCompleteCourse(id);
          setShowCompleteModal(true);
        },
        onClick: () => setShowCompleteModal(true),
      },
    ],
    fieldToReturnOnActionItemClick: 'id',
    filters: [
      {
        name: 'Priority',
        items: ['All', 'High', 'Medium', 'Low'],
      },
      {
        name: 'Status',
        items: ['All', 'Completed', 'Pending'],
      },
      {
        name: 'Goal Type',
        items: ['All Goals'],
      },
    ],
  };

  const selfAssessmentsTableData: TableProps = {
    hasActionsColumn: true,
    headerRowData: ['Assessment Name', 'Due Date', 'Status'],
    bodyRowData: isSelfAssessmentsLoading
      ? Array(5).fill({
          assessmentName: <Skeleton width={100} />,
          dueDate: <Skeleton width={100} />,
          status: <Skeleton width={100} />,
        })
      : selfAssessmentsData?.data?.items.map((assessment) => ({
          id: assessment.id,
          assessmentName: assessment.assessmentName,
          dueDate: formatDate(assessment.dueDate),
          status: assessment.status,
        })) || [],
        fieldTypes: [FieldType.text, FieldType.text, FieldType.status],
        displayedFields: ['assessmentName', 'dueDate', 'status'],
    statusMap: SAStatusMap,
        fieldToReturnOnActionItemClick : 'id',
        fieldActionMap: {
          'in_progress': [
            {
              name: 'Continue',
              onClick: () =>
                router.push(route.employee.performanceManagement.selfAssessment),
            },
          ],
          'not_started': [
            {
              name: 'Start',
              onDataReturned: async (id) => {
                router.push(
                  `${route.employee.performanceManagement.selfAssessment}/${id}`
                );
              },
              onClick: () => {
                
              }
            },
          ],
          completed: [
            {
              name: 'No Actions',
              onClick: () => {},
            },
          ],
        },
        fieldToGetAction: 'status',
  };

  const completeModalData: ModalProps = {
    open: showCompleteModal,
    onClose: () => setShowCompleteModal(false),
    hasHeading: false,
    centerImage: '/icons/modal-success.svg',
    centerTitle: 'Goal marked as completed successfully',
    centerMessage: 'You have successfully marked the task as completed',
    buttonOne: {
      type: ButtonType.contained,
      text: 'Continue to Dashboard',
      onClick: () => {
        setShowCompleteModal(false);
      },
    },
    centerButton: true,
    reduceVerticalGap: true,
  };

  return {
    performanceManagementPageData,
    goalsTableData,
    selfAssessmentsTableData,
    completeModalData,
  };
};

export default usePerformanceManagementPage;