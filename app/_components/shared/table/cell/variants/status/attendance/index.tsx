import React from "react";
import { AttendanceStatusMap, color } from "@/constants";

type TableAttendanceStatusCellProps = {
  value?: string;
};

const TableAttendanceStatusCell: React.FC<TableAttendanceStatusCellProps> = ({
  value,
}) => {
  return (
    <span
      style={{
        ...(AttendanceStatusMap[value ?? ""] === "grey" && {
          color: "",
        }),
        ...(AttendanceStatusMap[value ?? ""] === "info" && {
          color: color.info.dark,
        }),
        ...(AttendanceStatusMap[value ?? ""] === "error" && {
          color: color.error.dark,
        }),
      }}
    >
      {value}
    </span>
  );
};

export default TableAttendanceStatusCell;
