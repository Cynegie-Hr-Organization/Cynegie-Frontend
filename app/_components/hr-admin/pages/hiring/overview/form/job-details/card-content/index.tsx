import React from "react";

const JobCardContent = () => {
  // Dummy data
  const jobData = {
    jobDescription:
      "<p>This is a job description for the position of <strong>Software Engineer</strong>. Responsibilities include developing, testing, and maintaining web applications.</p>",
    responsibilities:
      "<ul><li>Health Insurance</li><li>Paid Time Off</li><li>Remote Work Options</li></ul>",
    requiredSkill:
      "<p>Candidates should have experience with <strong>React</strong>, <strong>Node.js</strong>, and strong problem-solving skills.</p>",
  };

  return (
    <>
      {" "}
      {/* Job Description */}
      <div>
        <p className="mb-1 font-sans text-sm font-semibold">Job Description</p>
        <div
          dangerouslySetInnerHTML={{ __html: jobData.jobDescription }}
          className="mt-1 text-xs block py-2"
        />
      </div>
      {/* Responsibilities */}
      <div>
        <p className="mb-1 font-sans text-sm font-semibold">Benefits</p>
        <div
          dangerouslySetInnerHTML={{ __html: jobData.responsibilities }}
          className="mt-1 text-xs block py-2"
        />
      </div>
      {/* Required Skills */}
      <div>
        <p className="mb-1 font-sans text-sm font-semibold">Required Skills</p>
        <div
          dangerouslySetInnerHTML={{ __html: jobData.requiredSkill }}
          className="mt-1 text-xs block py-2"
        />
      </div>
    </>
  );
};

export default JobCardContent;
