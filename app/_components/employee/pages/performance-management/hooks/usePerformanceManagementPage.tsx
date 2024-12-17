import { ButtonType } from '@/app/_components/shared/page/heading/types';
import { PageProps } from '@/app/_components/shared/page/types';
import { FieldType, TableProps } from '@/app/_components/shared/table/types';
import { CISStatusMap, route } from '@/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ModalProps } from '../../../modal/types';

type Goal = {
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
};

type Assessment = {
  name: string;
  dueDate: string;
  status: string;
};

const usePerformanceManagementPage = () => {
  const router = useRouter();
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const pageActions = [
    {
      name: 'Development Plan',
      onClick: () =>
        router.push(route.employee.performanceManagement.developmentPlan),
    },
    { name: 'Create Goals', onClick: () => {} },
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

  const goalsTableData: TableProps<Goal> = {
    hasActionsColumn: true,
    hasCheckboxes: true,
    headerRowData: ['Goal Description', 'Start Date', 'End Date', 'Progress'],
    bodyRowData: [
      {
        description: 'Complete onboarding',
        startDate: '12 Jul 2024',
        endDate: '12 Dec 2024',
        progress: 60,
      },
      {
        description: 'Launch new feature',
        startDate: '12 Jul 2024',
        endDate: '12 Dec 2024',
        progress: 50,
      },
      {
        description: 'Attend training sessions',
        startDate: '12 Jul 2024',
        endDate: '12 Dec 2024',
        progress: 30,
      },
      {
        description: 'Improve customer satisfication',
        startDate: '12 Jul 2024',
        endDate: '12 Dec 2024',
        progress: 70,
      },
      {
        description: 'Reduce operational cost',
        startDate: '12 Jul 2024',
        endDate: '12 Dec 2024',
        progress: 40,
      },
    ],
    fieldTypes: [
      FieldType.text,
      FieldType.text,
      FieldType.text,
      FieldType.progress,
    ],
    displayedFields: ['description', 'startDate', 'endDate', 'progress'],
    actions: [
      {
        name: 'View Details',
        onClick: () =>
          router.push(route.employee.performanceManagement.viewGoal),
      },
      {
        name: 'Mark As Complete',
        onClick: () => setShowCompleteModal(true),
      },
    ],
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

  const selfAssessmentsTableData: TableProps<Assessment> = {
    hasActionsColumn: true,
    headerRowData: ['Assessment Name', 'Due Date', 'Status'],
    bodyRowData: [
      {
        name: 'Q3 Performance Review',
        dueDate: '28 Jul 2024',
        status: 'Not Started',
      },
      {
        name: 'Annual Self Evaluations',
        dueDate: '28 Jul 2024',
        status: 'Not Started',
      },
      {
        name: 'Project Management Competency Review',
        dueDate: '28 Jul 2024',
        status: 'In Progress',
      },
      {
        name: 'Team Collaboration Self Review',
        dueDate: '28 Jul 2024',
        status: 'In Progress',
      },
      {
        name: 'Innovation and Creativity Assessment',
        dueDate: '28 Jul 2024',
        status: 'Completed',
      },
    ],
    fieldTypes: [FieldType.text, FieldType.text, FieldType.status],
    displayedFields: ['name', 'dueDate', 'status'],
    statusMap: CISStatusMap,
    statusActionMap: {
      'In Progress': [
        {
          name: 'Continue',
          onClick: () =>
            router.push(route.employee.performanceManagement.selfAssessment),
        },
      ],
      'Not Started': [
        {
          name: 'Start',
          onClick: () =>
            router.push(route.employee.performanceManagement.selfAssessment),
        },
      ],
      Completed: [
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
      onClick: () => setShowCompleteModal(false),
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
