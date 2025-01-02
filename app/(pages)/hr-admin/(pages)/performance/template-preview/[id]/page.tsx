/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import AppButton from "@/app/_components/shared/button";
import CardLayout from "@/app/_components/shared/cards";
import { IoIosArrowBack } from "react-icons/io";
import { useParams, useRouter } from "next/navigation";
import { getTemplatesById } from "@/app/api/services/performance/template";
import { formatDate } from "@/lib/utils";

const TemplatePreviewPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [template, setTemplate] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTemplate = async () => {
      try {
        const response = await getTemplatesById(id as string);
        console.log(response);
        if (response.status === 200) {
          setTemplate(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch template:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!template) {
    return <div>No template found.</div>;
  }

  return (
    <div className="space-y-8 pb-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2" onClick={() => router.back()}>
          <IoIosArrowBack className="text-xl" />
          <p className="text-gray-500">Back to Assessment Form</p>
        </div>
        <h2 className="text-2xl font-bold text-black">Template Preview</h2>
      </div>

      <CardLayout bg="border-none bg-white p-4 md:p-6 text-sm">
        <div className="space-y-4 items-center flex flex-col md:flex-row justify-between">
          <PreviewTitle
            name="Template Name"
            description={template.templateName}
          />
          <PreviewTitle
            name="Questions"
            description={template.questions.length.toString()}
          />
          <PreviewTitle
            name="Created At"
            description={formatDate(template.createdAt)}
          />
          <PreviewTitle
            name="Last Modified"
            description={formatDate(template.updatedAt)}
          />
        </div>
      </CardLayout>

      <CardLayout
        bg="border-none bg-white p-4 md:p-6 text-sm"
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold">Questions</h3>
        <div>
          <div className="flex flex-col gap-4">
            {template.questions.map((question: any) => (
              <TemplatePreviewQuestionCard
                key={question.id}
                question={question.question}
              />
            ))}
          </div>

          <AppButton
            label="Edit Template"
            className="font-bold py-0 px-0 w-max md:w-max disabled:text-gray-500 text-primary"
            onClick={() => router.push("/hr-admin/performance/template/new")}
          />
        </div>
      </CardLayout>
    </div>
  );
};

const PreviewTitle = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <div className="space-y-2">
      <p className="text-gray-500">{name}</p>
      <p className="font-bold text-gray-900">{description}</p>
    </div>
  );
};

const TemplatePreviewQuestionCard = ({ question }: { question: string }) => {
  return (
    <div className="space-y-3 border border-gray-200 p-4 rounded-lg">
      <p className="font-semibold">{question}</p>
      <p className="text-gray-500">Rating and comment</p>
    </div>
  );
};

export default TemplatePreviewPage;
