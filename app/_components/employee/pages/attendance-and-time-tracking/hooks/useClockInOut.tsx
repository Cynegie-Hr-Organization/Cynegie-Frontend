import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  AttendanceResponse,
  clockIn,
  clockOut,
  fetchAttendanceMine,
} from "@/app/api/services/employee/attendance";

const useClockInOut = () => {
  const queryClient = useQueryClient();
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStatus, setToastStatus] = useState<"Successful" | "Error">(
    "Successful",
  );

  const handleClockIn = async () => {
    try {
      const response = await clockIn();
      console.log("Clock In Response:", response);
      setToastMessage("You have successfully clocked in!");
      setToastStatus("Successful");
      setOpenToast(true);
      queryClient.invalidateQueries({ queryKey: ["attendanceRecords"] });
    } catch (error) {
      console.error("Clock In Error:", error);
      setToastMessage("Failed to clock in. Please try again.");
      setToastStatus("Error");
      setOpenToast(true);
    }
  };

  const handleClockOut = async () => {
    try {
      const attendanceResponse: AttendanceResponse =
        await fetchAttendanceMine();
      const attendanceRecords = attendanceResponse.data;

      if (!attendanceRecords || attendanceRecords.length === 0) {
        throw new Error("No attendance records found.");
      }

      const lastAttendanceRecord = attendanceRecords.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )[0];

      if (!lastAttendanceRecord) {
        throw new Error("No attendance record found.");
      }

      const response = await clockOut(lastAttendanceRecord.id);
      console.log("Clock Out Response:", response);
      setToastMessage("You have successfully clocked out!");
      setToastStatus("Successful");
      setOpenToast(true);
      queryClient.invalidateQueries({ queryKey: ["attendanceRecords"] });
    } catch (error) {
      console.error("Clock Out Error:", error);
      setToastMessage("Failed to clock out. Please try again.");
      setToastStatus("Error");
      setOpenToast(true);
    }
  };

  return {
    handleClockIn,
    handleClockOut,
    openToast,
    setOpenToast,
    toastMessage,
    toastStatus,
  };
};

export default useClockInOut;
