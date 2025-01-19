import { Divider, Grid } from "@mui/material";
import { CourseDetailsProps } from "../types";
import React from "react";

const CourseDetails: React.FC<CourseDetailsProps> = (props) => {
  const { name, text, list, duration } = props;

  return (
    <>
      <Grid container spacing={2} className="pt-4">
        {/* Course Name */}
        {name && (
          <>
            <Grid item xs={6} className="text-left">
              <strong>Course Name</strong>
            </Grid>
            <Grid item xs={6} className="text-right">
              <p>{name}</p>
            </Grid>
          </>
        )}

        {/* Text */}
        {text && (
          <>
            <Grid item xs={6} className="text-left">
              <strong>Course Description</strong>
            </Grid>
            <Grid item xs={6} className="text-right">
              <p>{text}</p>
            </Grid>
          </>
        )}

        {/* List */}
        {list?.length && (
          <>
            <Grid item xs={6} className="text-left">
              <strong>Course Url</strong>
            </Grid>
            <Grid item xs={6} className="text-right">
              {list.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </Grid>
          </>
        )}

        {/* Duration */}
        {duration &&
          [
            { label: "Start Date", value: duration.start },
            { label: "End Date", value: duration.end },
          ].map((date) => (
            <React.Fragment key={date.label}>
              <Grid item xs={6} className="text-left">
                <strong>{date.label}</strong>
              </Grid>
              <Grid item xs={6} className="text-right">
                <p>{date.value}</p>
              </Grid>
            </React.Fragment>
          ))}
      </Grid>

      {/* Divider */}
      <Divider sx={{ mx: -2.5, mt: 2 }} />
    </>
  );
};

export default CourseDetails;
