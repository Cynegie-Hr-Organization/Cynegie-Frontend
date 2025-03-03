import React, { useEffect, useState } from "react";
import ScheduleSuccessModal from "../modal";
import { useParams, useRouter } from "next/navigation";
import useFetchEmployees from "@/utils/usefetchEmployees";
import { fetchCandidateById } from "@/app/api/services/candidate";
import { scheduleInterview } from "@/app/api/services/interview";
import { CandidateResponse } from "@/types";
import AppButton from "@/app/_components/shared/button";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import { AppDatePicker, AppTimePicker } from "@/app/_components/shared/date-picker";
import AppInputText, { AppInputTextArea } from "@/app/_components/shared/input-text";

// Import the new components

const ScheduleForm: React.FC = () => {
  const { employees } = useFetchEmployees();
  const { id } = useParams();
  const candidateId = typeof id === "string" ? id : "";

  const [candidate, setCandidate] = useState<CandidateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pickDate, setPickDate] = useState<Date | undefined>(undefined);
  const [pickTime, setPickTime] = useState<Date | undefined>(undefined);
  const [reminderDate, setReminderDate] = useState<Date | undefined>(undefined);
  const [reminderTime, setReminderTime] = useState<Date | undefined>(undefined);
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

    const formatTime = (date: Date) => {
      const hours = date.getHours() % 12 || 12;
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const period = date.getHours() >= 12 ? "PM" : "AM";
      return `${hours}:${minutes} ${period}`;
    };

    const payload = {
      description: reminderDescription,
      startTime: formatTime(pickTime),
      reminderTime: reminderTime ? formatTime(reminderTime) : null,
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
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div className="grid gap-6 p-4 md:p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Candidate and Interviewer Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <AppInputText
                label="Candidate"
                id="candidate"
                placeholder="Candidate Name"
                requiredField={true}
                value={`${candidate?.firstName} ${candidate?.lastName}` || ""}
                disabled={true}
                isLoadingContent={isLoading} 
              />
            </div>

            <div className="grid gap-2">
              <AppMultipleSelect
                label="Interviewer *"
                placeholder="Select Interviewer"
                items={employees.map((emp: any) => ({
                  label: `${emp.personalInfo.firstName} ${emp.personalInfo.lastName}`,
                  value: emp.id as string,
                }))}
                selectedValues={interviewer ? [interviewer] : []}
                onSelectionChange={(values: string[]) =>
                  setInterviewer(values[values.length - 1])
                }
                className="w-full py-2"
              />
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <AppDatePicker
                label="Pick Date *"
                placeholder="Select a date"
                selectedDate={pickDate}
                setSelectedDate={setPickDate}
                className="w-full"
              />
            </div>

            <div className="grid gap-2">
              <AppTimePicker
                label="Pick Time *"
                selectedTime={pickTime}
                setSelectedTime={setPickTime}
                className="w-full"
              />
            </div>
          </div>

          {/* Reminder Section */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Set Reminder
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <AppDatePicker
                  label="Reminder Date"
                  placeholder="Select a date"
                  selectedDate={reminderDate}
                  setSelectedDate={setReminderDate}
                className="w-full"
                />
              </div>

              <div className="grid gap-2">
                <AppTimePicker
                  label="Set Time"
                  selectedTime={reminderTime}
                  setSelectedTime={setReminderTime}
                className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Reminder Description */}
          <div className="grid gap-2">
            <AppInputTextArea
              label="Reminder Description"
              id="reminder-description"
              placeholder="Reminder Description"
              value={reminderDescription}
              onChange={(e) => setReminderDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="grid justify-end">
          <AppButton
            type="submit"
            label={isLoading ? "Scheduling..." : "Schedule"}
            isLoading={isLoading}
            className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled={isLoading}
          />
        </div>
      </form>

      <ScheduleSuccessModal isOpen={isModalOpen} onClose={handleModalClose} />

      {error && (
        <div className="grid">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </>
  );
};

export default ScheduleForm;