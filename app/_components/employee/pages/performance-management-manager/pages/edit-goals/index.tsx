"use client";
import Page from "@/app/_components/shared/page";
import useManagerEditGoal from "../../hooks/useEditGoals";

const ManagerPerformanceManagementEditGoal = () => {
  const { pageProps, PerformanceGoalsEditPage } = useManagerEditGoal();
  return (
    <Page {...pageProps}>
      <PerformanceGoalsEditPage />
    </Page>
  );
};

export default ManagerPerformanceManagementEditGoal;
