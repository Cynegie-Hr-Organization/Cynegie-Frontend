"use client";

import { PageHeader } from "@/app/_components/hr-admin/performance/page-header";
import PerformanceTemplateTable from "./table";

const PerformanceTemplatePage = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Templates"
        description="Access templates in your organization"
        buttonLabel="Create New Template"
        to="/hr-admin/performance/template/new"
      />
      <PerformanceTemplateTable />
    </div>
  );
};

export default PerformanceTemplatePage;
