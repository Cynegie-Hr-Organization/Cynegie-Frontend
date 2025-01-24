import { useParams } from 'next/navigation'; // Use the correct hook for Next.js
import { useQuery } from '@tanstack/react-query';
import Table from '@/app/_components/shared/table';
import { FieldType } from '@/app/_components/shared/table/types';
import { Tab } from '@/app/_components/shared/tab-format/types';
import { GoalDetailsProps } from '../goal-details/types';
import { color } from '@/constants';
import { fetchGoalsById } from '@/app/api/services/employee/performance-mgt';
import { Skeleton } from '@mui/material';



const useGoalDetails = () => {

  const { id } = useParams();

  console.log(id);
  
    const { data, isLoading } = useQuery({
    queryKey: ['goalDetails', id],
    queryFn: () => fetchGoalsById(id),
    enabled: !!id, 
    });
  
  const goalData = data?.data;  
  console.log(goalData);
  const skeletonLoader = (
    <Skeleton variant="text" width={100} height={20} />
  );

  const keyResultsTableData = {
    headerRowData: ['Key Results', 'Target', 'Due Date', 'Status'],
    hasActionsColumn: false,
    hasCheckboxes: false,
    bodyRowData: isLoading
      ? Array(5).fill({
          name: skeletonLoader,
          target: skeletonLoader,
          dueDate: skeletonLoader,
          progress: skeletonLoader,
        })
      : goalData?.keyResults.map((result: any) => ({
          name: result.result || 'N/A',
          target: `${result.targetValue || 'N/A'}`,
          dueDate: new Date(result.dueDate).toLocaleDateString() || 'N/A',
          progress: 0, // Replace with actual progress if available
        })) || [],
    fieldTypes: [
      FieldType.text,
      FieldType.text,
      FieldType.text,
      FieldType.progress,
    ],
    displayedFields: ['name', 'target', 'dueDate', 'progress'],
    filters: [
      {
        name: 'Status',
        items: ['All', 'Completed', 'Pending'],
      },
    ],
  };

  const milestonesTableData = {
    headerRowData: ['Milestones', 'Due Date', 'Status'],
    hasActionsColumn: false,
    hasCheckboxes: false,
    bodyRowData: isLoading
      ? Array(5).fill({
          name: skeletonLoader,
          dueDate: skeletonLoader,
          progress: skeletonLoader,
        })
      : goalData?.milestones.map((milestone: any) => ({
          name: milestone.milestoneName || 'N/A',
          dueDate: new Date(milestone.dueDate).toLocaleDateString() || 'N/A',
          progress: 0, // Replace with actual progress if available
        })) || [],
    fieldTypes: [FieldType.text, FieldType.text, FieldType.progress],
    displayedFields: ['name', 'dueDate', 'progress'],
    filters: [
      {
        name: 'Status',
        items: ['All', 'Completed', 'Pending'],
      },
    ],
  };

  const tableTabs: Tab[] = [
    { name: 'Key Results', component: <Table {...keyResultsTableData} /> },
    { name: 'Milestones', component: <Table {...milestonesTableData} /> },
  ];

  const goalDetails: GoalDetailsProps = {
    generalDetails: {
      name: goalData?.goalName || 'N/A',
      description: goalData?.description || 'N/A',
      department:  '',
      dueDate: new Date(goalData?.dueDate).toLocaleDateString() || 'N/A',
      priority: goalData?.priority || 'N/A',
      userPictures: goalData?.employees.map((emp: any) => emp.personalInfo?.email) || [],
    },
    alignmentDetails: {
      alignedGoal: {
        type: 'Company Goal',
        name: 'Improve overall employee engagement',
      },
      chart: {
        value: 50,
        status: {
          label: 'On Track',
          color: color.info.dark,
        },
      },
    },
    tableTabs: tableTabs,
  };

  return { goalDetails };
};

export default useGoalDetails;
