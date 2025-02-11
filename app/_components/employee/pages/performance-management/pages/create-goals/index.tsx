"use client";
import Page from "@/app/_components/shared/page";
import useEmployeeCreateGoal from "../../hooks/useCreateGoals";

const EmployeePerformanceManagementCreateGoal = () => {
  const { pageProps, PerformanceGoalsCreatePage } = useEmployeeCreateGoal();
  return (
    <Page {...pageProps}>
      <PerformanceGoalsCreatePage />
    </Page>
  );
};

export default EmployeePerformanceManagementCreateGoal;
