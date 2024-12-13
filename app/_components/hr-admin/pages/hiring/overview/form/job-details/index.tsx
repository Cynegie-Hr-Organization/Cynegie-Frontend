/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import JobsDetailsTable from "./table-container";
import JobCardHeader from "./card-header";
import JobDescriptionHeader from "./header";
import JobCardContent from "./card-content";
import { fetchJobById } from "@/app/api/services/job";
import { Job } from "@/types";
import Skeleton from "react-loading-skeleton";

export default function JobDetails() {
  const router = useRouter();
  const { id } = useParams();

  const jobId = typeof id === "string" ? id : "";

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch job details when id is available
  useEffect(() => {
    if (jobId) {
      const getJobDetails = async () => {
        try {
          const response = await fetchJobById(jobId);
          console.log(response);
          if (response.data) {
            setJob(response.data);
          } else {
            setError("Failed to fetch job details.");
          }
        } catch (err) {
          setError("Failed to fetch job details.");
        } finally {
          setIsLoading(false);
        }
      };

      getJobDetails();
    }
  }, [jobId]);

  if (isLoading) {
    return (
      <div className="flex gap-4 flex-col">
        {/* Skeleton loaders for each section */}
        <div className="flex justify-start items-center gap-2">
          <Skeleton width={24} height={24} />
          <Skeleton width={150} height={24} />
        </div>
        <Skeleton width="100%" height={40} />
        <div className="space-y-6 bg-white p-4 md:p-6 rounded-md ">
          <Skeleton height={200} />
        </div>
        <div className="space-y-6 bg-white p-4 md:p-6 rounded-md ">
          <Skeleton height={200} />
        </div>
        <div className="flex mb-1 justify-start items-center ">
          <Skeleton width={200} height={24} />
        </div>
        <Skeleton height={300} />
      </div>
    );
  }

  if (!job) {
    return <p>No Job Details Available</p>;
  }

  return (
    <div className="flex gap-4 flex-col">
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
      <JobDescriptionHeader jobId={jobId} />
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-md ">
        {job && <JobCardHeader job={job} />}
      </div>
      <div className="space-y-6 bg-white p-4 md:p-6 rounded-md ">
        {job && <JobCardContent job={job} />}
      </div>

      <div className="flex mb-1 justify-start items-center ">
        <h1 className="text-lg text-black font-semibold ml-1">Activity Log</h1>
      </div>

      <JobsDetailsTable />
    </div>
  );
}
