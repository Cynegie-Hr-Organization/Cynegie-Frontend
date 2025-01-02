"use client";
import AppButton from "@/app/_components/shared/button";
import CardLayout from "@/app/_components/shared/cards";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const TemplatePreviewPage = () => {
  const router = useRouter();
  return (
    <div className="space-y-8 pb-6">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <IoIosArrowBack className="text-xl" />
          <h2 className="text-gray-500">Back to Assessment Form</h2>
        </div>
        <h2 className="text-2xl font-bold text-black">Template Preview</h2>
      </div>

      <CardLayout bg="border-none bg-white p-4 md:p-6 text-sm">
        <div className="space-y-4 flex flex-col md:flex-row justify-between">
          <PreviewTitle
            name="Template Name"
            description="Q3 2024 Peer Review"
          />
          <PreviewTitle name="Questions" description="12" />
          <PreviewTitle name="Created By" description="Lucy Okpara" />
          <PreviewTitle name="Last Modified" description="Sept 30, 2024" />
        </div>
      </CardLayout>

      <CardLayout
        bg="border-none bg-white p-4 md:p-6 text-sm"
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold">Questions</h3>
        <div>
          <div className="flex flex-col gap-4">
            <TemplatePreviewQuestionCard question="How  well do you communicate with your team?" />
            <TemplatePreviewQuestionCard question="How  well do you communicate with your team?" />
            <TemplatePreviewQuestionCard question="How  well do you communicate with your team?" />
          </div>

          <AppButton
            label="Edit Template"
            className="font-bold py-0 px-0 w-max md:w-max disabled:text-gray-500 text-primary"
            onClick={() => {
              router.push("/hr-admin/performance/self-assessment/new");
            }}
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
      <h3 className="text-gray-500">{name}</h3>
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
