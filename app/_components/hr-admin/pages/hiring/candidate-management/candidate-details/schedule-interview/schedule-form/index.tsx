import React, { useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import ScheduleSuccessModal from "../modal";
import { useParams, useRouter } from "next/navigation";
import useFetchEmployees from "@/utils/usefetchEmployees";
import { fetchCandidateById } from "@/app/api/services/candidate";
import { scheduleInterview } from "@/app/api/services/interview";
import { CandidateResponse } from "@/types";
import AppButton from "@/app/_components/shared/button";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import CustomTimePicker from "@/app/_components/ui/time-picker";
import { AppDatePicker } from "@/app/_components/shared/date-picker";

const ScheduleForm: React.FC = () => {
  const { employees } = useFetchEmployees();
  const { id } = useParams();
  const candidateId = typeof id === "string" ? id : "";

  const [candidate, setCandidate] = useState<CandidateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pickDate, setPickDate] = useState<Date | undefined>(undefined);
  const [pickTime, setPickTime] = useState<Dayjs | null>(null);
  const [reminderDate, setReminderDate] = useState<Date | undefined>(undefined);
  const [reminderTime, setReminderTime] = useState<Dayjs | null>(null);
  const [reminderDescription, setReminderDescription] = useState("");
  const [interviewer, setInterviewer] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!candidateId) return;
      setIsLoading(true);
      try {
        const response = await fetchCandidateById(candidateId);
        setCandidate(response.data);
      } catch (err) {
        console.error("Error fetching candidate data:", err);
        setError("Failed to load candidate details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/hr-admin/hiring/candidate-management");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pickDate || !pickTime || !candidateId || !interviewer) {
      setError("Please fill out all required fields.");
      return;
    }

    const payload = {
      description: reminderDescription,
      startTime: pickTime.format("hh:mm A"),
      reminderTime: reminderTime ? reminderTime.format("hh:mm A") : null,
      startDate: pickDate.toISOString(),
      candidate: candidateId,
      interviewer,
      status: "Scheduled",
    };
    console.log(payload);
    try {
      setIsLoading(true);
      const response = await scheduleInterview(payload);
      console.log(response);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error scheduling interview:", err);
      setError("Failed to schedule the interview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 md:p-6 bg-white">
          {/* Candidate and Interviewer Fields */}
          <div className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Candidate
              </label>
              <input
                type="text"
                value={`${candidate?.firstName} ${candidate?.lastName}` || ""}
                disabled
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
            </div>

            <div>
              <AppMultipleSelect
                label="Interviewer"
                placeholder="Select Interviewer"
                items={employees.map((emp: any) => ({
                  label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
                  value: emp.id as string,
                }))}
                selectedValues={interviewer ? [interviewer] : []} // Ensures it's a single value
                onSelectionChange={(values: string[]) =>
                  setInterviewer(values[values.length - 1])
                } // Use only the last selected value
              />
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-4 md:gap-6">
            <div className="w-full">
              <AppDatePicker
                label="Pick Date"
                placeholder="Select a date"
                selectedDate={pickDate}
                setSelectedDate={setPickDate}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pick Time <span className="text-red-500">*</span>
              </label>
              <CustomTimePicker value={pickTime} onChange={setPickTime} />
            </div>
          </div>

          {/* Reminder Section */}
          <div className="my-4">
            <h3 className="text-lg mb-4 font-semibold">Set Reminder</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="w-full">
                <AppDatePicker
                  label="Reminder Date"
                  placeholder="Select a date"
                  selectedDate={reminderDate}
                  setSelectedDate={setReminderDate}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Set Time
                </label>
                <CustomTimePicker
                  value={reminderTime}
                  onChange={setReminderTime}
                />
              </div>
            </div>
          </div>

          {/* Reminder Description */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700">
              Reminder Description
            </label>
            <textarea
              placeholder="Reminder Description"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
              rows={4}
              value={reminderDescription}
              onChange={(e) => setReminderDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <AppButton
            type="submit"
            label={isLoading ? "Scheduling..." : "Schedule"}
            isLoading={isLoading}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          />
        </div>
      </form>

      <ScheduleSuccessModal isOpen={isModalOpen} onClose={handleModalClose} />

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </>
  );
};

export default ScheduleForm;
