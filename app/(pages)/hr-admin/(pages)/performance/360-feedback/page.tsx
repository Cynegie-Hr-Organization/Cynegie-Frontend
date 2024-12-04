'use client'

import { PageHeader } from "@/app/_components/hr-admin/performance/page-header";
import FeedbackTable from "./table";

const FeedbackPage = () => {
  return (
    <div className="flex flex-col gap-6 py-6">
      <PageHeader
        title="360 Feedback"
        description='Manage and track ongoing and upcoming 360 feedback in your organization'
        buttonLabel="New 360 Feedback Cycle"
        to={"/hr-admin/performance/360-feedback/new"}
      />
      <FeedbackTable />
    </div>
  )
};

export default FeedbackPage;
