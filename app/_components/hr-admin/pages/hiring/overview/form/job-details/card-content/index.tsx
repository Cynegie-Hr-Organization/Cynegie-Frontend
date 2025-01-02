import { Job } from "@/types";
import React from "react";

interface JobCardContentProps {
  job: Job;
}

const JobCardContent: React.FC<JobCardContentProps> = ({ job }) => {
  return (
    <>
      {" "}
      {/* Job Description */}
      <div>
        <p className="mb-1 font-sans text-sm font-semibold">Job Description</p>
        <div
          dangerouslySetInnerHTML={{ __html: job.description }}
          className="mt-1 text-xs block py-2"
        />
      </div>
      {/* Responsibilities */}
      <div>
        <p className="mb-1 font-sans text-sm font-semibold">Benefits</p>
        <div
          dangerouslySetInnerHTML={{ __html: job.benefits }}
          className="mt-1 text-xs block py-2"
        />
      </div>
      {/* Required Skills */}
      <div>
        <p className="mb-1 font-sans text-sm font-semibold">Required Skills</p>
        <div
          dangerouslySetInnerHTML={{
            __html: Array.isArray(job.requiredSkills)
              ? job.requiredSkills.join(", ")
              : job.requiredSkills || "",
          }}
          className="mt-1 text-xs block py-2"
        />
      </div>
    </>
  );
};

export default JobCardContent;
