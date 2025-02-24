"use client";

import AppButton from "@/app/_components/shared/button";
import CardLayout from "@/app/_components/shared/cards";
import { AppModal } from "@/components/drawer/modal";
import { DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import { OpenDonughtChart } from "./open-donught-chart";
import DetailsTable from "./table";

export default function TemplateDetailsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <button
          className="flex items-center gap-2 text-gray-500 cursor-pointer"
          onClick={() => router.back()}
        >
          <IoIosArrowBack className="text-xl" />
          <h2 className="">Back</h2>
        </button>

        <DownloadModal
          trigger={
            <AppButton label="Download Report" className="btn-primary" />
          }
        />
      </div>

      <CardLayout bg="border-none bg-white p-4 md:p-6 text-sm space-y-6">
        <h3 className="text-lg font-semibold">Self Assessment Details</h3>
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-6">
          <PreviewTitle name="Employee Name" description="Sarah Williams" />
          <PreviewTitle name="Employee ID" description="1234567890" />
          <PreviewTitle name="Department" description="Sales" />
          <PreviewTitle name="Date Due" description="Nov 31, 2024" />
          <PreviewTitle name="Review Period" description="Q3 2024" />
          <PreviewTitle
            name="Assessment Template"
            description="Q2 2024 Self Assessment"
          />
        </div>
      </CardLayout>

      <CardLayout bg="border-none bg-white p-4 md:p-6 text-sm space-y-6">
        <h3 className="text-lg font-semibold">Assessment Summary</h3>
        <div className="flex items-center gap-4 md:gap-[50px] ">
          <div className="w-48">
            <OpenDonughtChart innerRadius={75} />
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <p className="font-semibold flex items-center gap-6">
              <span className="flex items-center gap-1">
                <GoDotFill className="text-blue-700" /> Communication{" "}
              </span>
              <span className="text-sm text-gray-500"> 4.2(22.5%)</span>
            </p>
            <p className="font-semibold flex items-center gap-6">
              <span className="flex items-center gap-1">
                <GoDotFill className="text-amber-500" /> Leadership{" "}
              </span>
              <span className="text-sm text-gray-500"> 4.0(20.0%)</span>
            </p>
            <p className="font-semibold flex items-center gap-6">
              <span className="flex items-center gap-1">
                <GoDotFill className="text-green-600" /> Teamwork{" "}
              </span>
              <span className="text-sm text-gray-500"> 4.0(20.0%)</span>
            </p>
            <p className="font-semibold flex items-center gap-6">
              <span className="flex items-center gap-1">
                <GoDotFill className="text-gray-300" /> Initiative{" "}
              </span>
              <span className="text-sm text-gray-500"> 4.0(20.0%)</span>
            </p>
          </div>
        </div>
      </CardLayout>

      <DetailsTable />
    </div>
  );
}

const PreviewTitle = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-1 text-sm">
      <h3 className="font-semibold text-gray-400">{name}</h3>
      <p className="">{description}</p>
    </div>
  );
};

const DownloadModal = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <AppModal
      trigger={trigger}
      header={
        <DialogTitle className="text-lg font-bold text-center">
          Download Report
        </DialogTitle>
      }
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <AppButton
            label="Cancel"
            className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full order-2"
          />
          <AppButton
            label="Download"
            className="bg-primary text-white md:w-[150px] w-full border border-primary order-1"
            leftIcon={<LuDownload />}
          />
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-500 text-center">
          Select the format you would like to download your report
        </p>
        <div className="flex items-center justify-center gap-x-2">
          <input type="radio" id="pdf" name="format" value="pdf" />
          <label htmlFor="pdf">PDF</label>
          <input type="radio" id="excel" name="format" value="excel" />
          <label htmlFor="excel">Excel</label>
        </div>
      </div>
    </AppModal>
  );
};
