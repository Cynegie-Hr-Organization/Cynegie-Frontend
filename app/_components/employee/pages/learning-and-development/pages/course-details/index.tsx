"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Page from "@/app/_components/shared/page";
import CourseDetails from "./item";
import { ButtonGroupProps } from "@/app/_components/shared/button-group/types";
import ButtonGroup from "@/app/_components/shared/button-group";
import { fetchCourseById } from "@/app/api/services/employee/learning";

type EmployeeLearningAndDevelopmentCourseDetailsProps = {
  heading?: string;
  smallHeading?: boolean;
  backText?: string;
  onBackTextClick?: () => void;
  buttonGroup?: ButtonGroupProps;
};

const EmployeeLearningAndDevelopmentCourseDetails: React.FC<
  EmployeeLearningAndDevelopmentCourseDetailsProps
> = (props) => {
  const { id } = useParams(); // Extract the course ID from the route
  const [courseDetails, setCourseDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the course details when the component mounts
  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        try {
          const response = await fetchCourseById(id);
          setCourseDetails(response.data); // Update with your API's response structure
        } catch (error) {
          console.error("Failed to fetch course details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [id]);

  return (
    <Page
      smallHeading={props.smallHeading}
      title={props.heading || "Course Details"}
      backText={props.backText || "Back"}
      onBackTextClick={props.onBackTextClick}
    >
      <div className="common-card flex flex-col gap-10 pt-40">
        {loading ? (
          <p>Loading...</p>
        ) : courseDetails ? (
          <CourseDetails
            name={courseDetails.courseTitle}
            text={courseDetails.courseDescription}
            list={courseDetails.courseSource}
            sections={courseDetails.sections || []} // Assuming `sections` can be null
            duration={{
              start: courseDetails.startDate,
              end: courseDetails.endDate,
            }}
            sectionType="Module"
          />
        ) : (
          <p>Course details not found.</p>
        )}
      </div>
      {props.buttonGroup && <ButtonGroup {...props.buttonGroup} />}
    </Page>
  );
};

export default EmployeeLearningAndDevelopmentCourseDetails;
