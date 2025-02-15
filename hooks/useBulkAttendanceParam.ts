import { create } from "zustand";

interface AttendanceStore {
  startDate: string;
  endDate: string;
  department: string[];
  attendanceStatus: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setDepartment: (dept: string[]) => void;
  setAttendanceStatus: (status: string) => void;
}

export const useAttendanceStore = create<AttendanceStore>((set) => ({
  startDate: "",
  endDate: "",
  department: [],
  attendanceStatus: "",
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setDepartment: (dept) => set({ department: dept }),
  setAttendanceStatus: (status) => set({ attendanceStatus: status }),
}));
