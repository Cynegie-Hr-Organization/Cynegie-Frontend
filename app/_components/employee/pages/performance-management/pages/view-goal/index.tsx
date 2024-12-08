'use client';
import Page from '@/app/_components/shared/page';
import { route } from '@/constants';
import { useRouter } from 'next/navigation';
import React from 'react';
import useGoalDetails from './hooks/useGoalDetails';
import GoalDetails from './goal-details';

const EmployeePerformanceManagementViewGoal: React.FC = () => {
  const router = useRouter();
  const { goalDetails } = useGoalDetails();
  return (
    <Page
      backText='Back to Goals'
      onBackTextClick={() =>
        router.push(route.employee.performanceManagement.home)
      }
    >
      <GoalDetails {...goalDetails} />
    </Page>
  );
};

export default EmployeePerformanceManagementViewGoal;
