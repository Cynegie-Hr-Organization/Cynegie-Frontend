import { create } from "zustand";
import { CreateJobProps } from "@/types";

interface JobStore {
  jobData: CreateJobProps | null;
  setJobData: (data: CreateJobProps) => void;
  clearJobData: () => void;
}

const useJobStore = create<JobStore>((set) => ({
  jobData: null,
  setJobData: (data) => set({ jobData: data }),
  clearJobData: () => set({ jobData: null }),
}));

export default useJobStore;
