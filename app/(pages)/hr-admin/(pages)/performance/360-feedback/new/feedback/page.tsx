"use client";

import AppButton from "@/app/_components/shared/button";
import CardLayout from "@/app/_components/shared/cards";
import { AppSelect } from "@/app/_components/shared/select";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const FeedbackPage = () => {
  const router = useRouter();

  return (
    <div className="space-y-8 py-6">
      <h3 className="font-semibold text-lg">New 360 Feedback</h3>

      <CardLayout className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg">Feedback Criteria</h3>
          <p className="text-gray-500">
            Add feedback templates for feedback providers.
          </p>
        </div>

        <CriteriaCard
          title="Peer Feedback"
          subtitle="Peers will review who they are selected for"
        >
          <AppSelect
            listItems={[
              { label: "Template 1", value: "template-1" },
              { label: "Template 2", value: "template-2" },
              { label: "Template 3", value: "template-3" },
            ]}
            label="Template"
            placeholder="Select Template"
            onChange={() => {}}
          />
        </CriteriaCard>

        <CriteriaCard
          title="Peer Feedback"
          subtitle="Peers will review who they are selected for"
        >
          <AppSelect
            listItems={[
              { label: "Template 1", value: "template-1" },
              { label: "Template 2", value: "template-2" },
              { label: "Template 3", value: "template-3" },
            ]}
            label="Template"
            placeholder="Select Template"
            onChange={() => {}}
          />
        </CriteriaCard>

        <CriteriaCard
          title="Peer Feedback"
          subtitle="Peers will review who they are selected for"
        >
          <AppSelect
            listItems={[
              { label: "Template 1", value: "template-1" },
              { label: "Template 2", value: "template-2" },
              { label: "Template 3", value: "template-3" },
            ]}
            label="Template"
            placeholder="Select Template"
            onChange={() => {}}
          />
        </CriteriaCard>
      </CardLayout>

      <div className="flex flex-col md:flex-row justify-end gap-4">
        <AppButton
          label="Save & Continue Later"
          className="btn-secondary"
          onClick={() => {}}
        />
        <AppButton
          label="Submit"
          className="disabled:btn-inactive btn-primary"
          onClick={() => {
            router.push("/hr-admin/performance/360-feedback/new/feedback");
          }}
        />
      </div>
    </div>
  );
};

const CriteriaCard = ({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) => {
  const router = useRouter();

  return (
    <div className="border border-gray-300 p-6 space-y-6">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="">
        {children}
        <AppButton
          label="Preview"
          className="font-bold py-0 px-0 w-max md:w-max disabled:text-gray-500 text-primary"
          onClick={() => {
            router.push(
              "/hr-admin/performance/self-assessment/template-preview",
            );
          }}
        />
      </div>
    </div>
  );
};

export default FeedbackPage;
