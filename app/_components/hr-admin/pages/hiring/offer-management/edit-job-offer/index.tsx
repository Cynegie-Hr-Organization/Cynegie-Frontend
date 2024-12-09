"use client";

import React from "react";
import EditJobHeader from "./header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EditJobOfferForm from "./edit-job-form";

const EditJobOffer: React.FC = () => {
  const router = useRouter();

  return (
    <div className="p-[15px] flex gap-4 flex-col md:p-[30px]">
      <div className="flex  justify-start items-center gap-2">
        <Image
          src="/button-icon.svg"
          alt="Create New Job"
          width={24}
          height={24}
          className="object-contain"
          onClick={() => router.back()}
        />
        <h1 className="text-base text-gray-500 font-semibold">
          Back to Candidate Details{" "}
        </h1>
      </div>
      <EditJobHeader />
      <div className="space-y-6   rounded-md ">
        <EditJobOfferForm />
      </div>
    </div>
  );
};

export default EditJobOffer;
