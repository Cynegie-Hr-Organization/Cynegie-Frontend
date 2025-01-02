"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { fetchJobOfferById } from "@/app/api/services/job-offer";

const HrAdminHiringJobOfferDetails: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [jobOffer, setJobOffer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Extracting the id from the route
  const jobOfferId = pathname?.split("/").pop();
  console.log(jobOfferId);

  useEffect(() => {
    const fetchJobOffer = async () => {
      if (jobOfferId) {
        try {
          const response = await fetchJobOfferById(jobOfferId);
          console.log(response);
          setJobOffer(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching job offer:", error);
          setLoading(false);
        }
      }
    };

    if (jobOfferId) {
      fetchJobOffer();
    }
  }, [jobOfferId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!jobOffer) {
    return <div>No job offer found.</div>;
  }

  return (
    <div className="p-[15px]  flex gap-4 flex-col md:p-[30px]">
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
          Back to Offer Management
        </h1>
      </div>

      <div className="space-y-6 bg-white p-4 md:p-6 rounded-md">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Job Offer Details
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500">Job Title</p>
            <p className="text-base font-medium text-gray-900">
              {jobOffer.jobTitle}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="text-base font-medium text-gray-900">
              {jobOffer.department}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Offer Date</p>
            <p className="text-base font-medium text-gray-900">
              {new Date(jobOffer.offerDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Job Start Date</p>
            <p className="text-base font-medium text-gray-900">
              {new Date(jobOffer.offerDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Expiration Date</p>
            <p className="text-base font-medium text-gray-900">
              {new Date(jobOffer.expirationDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Status</p>
            <span className="text-sm font-medium  text-green-700 bg-green-100 px-3 py-[1px] rounded-full">
              {jobOffer.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Candidate Name</p>
            <p className="text-base font-medium text-gray-900">
              {jobOffer.candidate.firstName} {jobOffer.candidate.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Resume</p>
            <a
              href="#"
              className="text-sm text-blue-600 w-fit rounded-full p-[2px] px-2 bg-blue-50 hover:underline flex items-center"
            >
              Resume .PDF
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 10l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </div>
          <div>
            <p className="text-sm text-gray-500">Application Date</p>
            <p className="text-base font-medium text-gray-900">
              {new Date(jobOffer.candidate.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Stage</p>
            <p className="text-base font-medium text-gray-900">
              {jobOffer.candidate.stage}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-medium text-gray-900">
              {jobOffer.candidate.email}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="text-base font-medium text-gray-900">
              {jobOffer.candidate.phone}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div>{jobOffer.description}</div>
        </div>

        <div>
          <h3 className="text-base font-bold text-gray-900 mb-3">
            Offer Letter
          </h3>
          <a
            href="#"
            className="text-sm text-blue-600 w-fit rounded-full p-[2px] px-2 bg-blue-50 hover:underline flex items-center"
          >
            Offer Letter .PDF
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 10l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HrAdminHiringJobOfferDetails;
