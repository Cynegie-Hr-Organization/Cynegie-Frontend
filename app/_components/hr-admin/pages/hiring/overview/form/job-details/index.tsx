/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import JobsDetailsTable from "./table";
import JobCardHeader from "./card-header";
import JobDescriptionHeader from "./header";
import JobCardContent from "./card-content";


export default function JobDetails() {


 
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
        <h1 className="text-lg text-black font-semibold">Back to Jobs</h1>
      </div>
      <JobDescriptionHeader/>
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-md ">
        <JobCardHeader/>
      </div>
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-md ">
        <JobCardContent/>
      </div>

      <div className="flex mb-4 justify-start items-center ">
        
        <h1 className="text-lg text-black font-semibold">Activity Log</h1>
      </div>
             <JobsDetailsTable/>

    </div>
  );
}
