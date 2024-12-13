/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InterviewDetailsHeader from "./card-header";
import InterviewDetailsTopHeader from "./header";

export default function InterviewDetails() {
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
        <h1 className="text-lg text-black font-semibold">
          Back to Interviews{" "}
        </h1>
      </div>
      <InterviewDetailsTopHeader />
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-md ">
        <InterviewDetailsHeader />
      </div>
    </div>
  );
}
