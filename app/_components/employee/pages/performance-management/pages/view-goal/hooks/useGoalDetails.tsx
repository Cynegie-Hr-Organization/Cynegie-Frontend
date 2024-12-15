import Table from '@/app/_components/shared/table';
import { FieldType } from '@/app/_components/shared/table/types';
import { Tab } from '@/app/_components/shared/tab-format/types';
import { GoalDetailsProps } from '../goal-details/types';
import { color } from '@/constants';

const useGoalDetails = () => {
  const keyResultsTableData = {
    headerRowData: ['Key Results', 'Target', 'Due Date', 'Status'],
    hasActionsColumn: false,
    hasCheckboxes: false,
    bodyRowData: Array(3).fill({
      name: 'Increase employee engagement',
      target: '14.00%',
      dueDate: '31 Jul 2024',
      progress: 10,
    }),
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
    bodyRowData: Array(3).fill({
      name: 'Increase employee engagement',
      dueDate: '31 Jul 2024',
      progress: 10,
    }),
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
      name: 'Increase Employee Satisfaction',
      description:
        'Implement strategies to increase overall employee satisfaction by 20% by the end of the year',
      department: 'HR Team',
      dueDate: '12 Dec 2024',
      priority: 'High',
      userPictures: Array(5).fill('/image/team/mattew.png'),
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
