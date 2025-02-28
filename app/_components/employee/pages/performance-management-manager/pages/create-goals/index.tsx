"use client";
import Page from "@/app/_components/shared/page";
import useManagerCreateGoal from "../../hooks/useCreateGoals";

const ManagerPerformanceManagementCreateGoal = () => {
  const { pageProps, PerformanceGoalsCreatePage } = useManagerCreateGoal();
  return (
    <Page {...pageProps}>
      <PerformanceGoalsCreatePage />
    </Page>
  );
};

export default ManagerPerformanceManagementCreateGoal;
