import { PageHeader } from "@/app/_components/hr-admin/pages/performance/page-header";
import ManagerAssessmentTable from "./table";

const ManagerAssessmentPage = () => {
  return (
    <div className="flex flex-col gap-6 py-6">
      <PageHeader
        title="Manager Assessment"
        description="Employess requiring assessment"
        buttonLabel="New Assessment"
        to={"/hr-admin/performance/manager-assessment/new"}
      />
      <ManagerAssessmentTable />
    </div>
  );
};

export default ManagerAssessmentPage;
