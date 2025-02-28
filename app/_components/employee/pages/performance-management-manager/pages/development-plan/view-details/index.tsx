"use client";
import Page from "@/app/_components/shared/page";
import DetailGroup from "@/app/_components/shared/detail-group";
import Table from "@/app/_components/shared/table";
import useManagerDevelopmentPlanViewDetailsPage from "../../../hooks/useDevelopmentPlanViewDetailsPage";

const ManagerDevelopmentPlanViewDetails = () => {
  const { pageData, detailGroup, description, tableData } =
    useManagerDevelopmentPlanViewDetailsPage();
  return (
    <Page {...pageData}>
      <div className="common-card flex flex-col gap-20 !pt-14 !px-12">
        <DetailGroup {...detailGroup} />
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <div>
              <b>Development Goals</b>
            </div>
            <div>{description}</div>
          </div>
          <Table {...tableData} />
        </div>
      </div>
    </Page>
  );
};

export default ManagerDevelopmentPlanViewDetails;
