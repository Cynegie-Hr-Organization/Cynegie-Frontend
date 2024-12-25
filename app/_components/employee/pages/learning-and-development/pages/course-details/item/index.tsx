import { Divider, Grid2 } from "@mui/material";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { CourseDetailsProps } from "../types";
import DetailName from "@/app/_components/shared/detail-group/detail/value";

const CourseDetails: React.FC<CourseDetailsProps> = (props) => {
  const { name, text, list, sections, duration, sectionType } = props;
  const showLessonState = useState(false);
  return (
    <>
      <Grid2 className="pt-4" container>
        <Grid2 size={{ xs: 6 }}>
          <DetailName value={name ?? ""} />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          {text && <p>{text}</p>}
          {list?.map((item) => <p key={item}>{item}</p>)}
          {sections?.map((section, moduleIndex) => {
            const [showLessons, setshowLessons] = showLessonState;
            return (
              <div key={moduleIndex}>
                <div className="flex gap-1">
                  <p className="flex gap-1 items-center flex-wrap">
                    <span>
                      <b>
                        {sectionType} {moduleIndex + 1}
                      </b>
                    </span>
                    <span>{section.name}</span>
                  </p>
                  {section.subSections && (
                    <ChevronDown
                      onClick={() => setshowLessons(!showLessons)}
                      style={{
                        cursor: "pointer",
                        rotate: showLessons ? "180deg" : "0deg",
                      }}
                    />
                  )}
                </div>
                {section.subSections.map(
                  (subSection, lessonIndex) =>
                    showLessons && (
                      <p key={lessonIndex} className="flex gap-1">
                        <span>
                          Lesson {moduleIndex + 1}.{lessonIndex + 1}:
                        </span>
                        <span>{subSection}</span>
                      </p>
                    ),
                )}
              </div>
            );
          })}
          {duration &&
            [
              { label: "Start Date", value: duration.start },
              { label: "End Date", value: duration.end },
            ].map((date: { label: string; value: string }) => (
              <p key={date.label}>
                {date.label}: {date.value}
              </p>
            ))}
        </Grid2>
      </Grid2>
      <Divider sx={{ mx: -2.5 }} />
    </>
  );
};

export default CourseDetails;
