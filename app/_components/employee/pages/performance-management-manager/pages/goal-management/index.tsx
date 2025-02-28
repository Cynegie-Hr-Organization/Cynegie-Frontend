"use client";
import Page from "@/app/_components/shared/page";
import TabFormat from "@/app/_components/shared/tab-format";
import Table from "@/app/_components/shared/table";
import useGoalManagementPage from "../../hooks/useGoalManagement";
import Modal from "../../../../modal";

const ManagerGoalManagement = () => {
  const {
    pageData,
    teamGoalsTableData,
    myGoalsTableData,
    completeModalData,
  } = useGoalManagementPage();

  return (
    <Page {...pageData}>
      <TabFormat
        tabs={[
          {
            name: "My Goals",
            component: <Table {...myGoalsTableData} />,
          },
                  {
                      name: "Team Goals", component: <Table {...teamGoalsTableData} />
                  },
        ]}
      />
      <Modal {...completeModalData} />
    </Page>
  );
};

export default ManagerGoalManagement;
