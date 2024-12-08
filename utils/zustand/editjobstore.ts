/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface EditStoreState {
  jobData: any;
  setJobData: (data: any) => void;
  clearJobData: () => void;
}

const useEditStore = create<EditStoreState>((set) => ({
  jobData: null,
  setJobData: (data) => set({ jobData: data }),
  clearJobData: () => set({ jobData: null }),
}));

export default useEditStore;
