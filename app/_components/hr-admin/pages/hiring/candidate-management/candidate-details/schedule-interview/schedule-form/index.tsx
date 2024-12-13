import React, { useState } from "react";
import CustomDatePicker from "../../../../../../../ui/date-picker";
import CustomTimePicker from "../../../../../../../ui/time-picker";
import { Dayjs } from "dayjs";
import { Dropdown } from "../../../../../../../ui/dropdown"; // Adjust the import path if necessary
import ScheduleSuccessModal from "../modal";
import { useRouter } from "next/navigation";

const ScheduleForm: React.FC = () => {
  const [pickDate, setPickDate] = useState<Dayjs | null>(null);
  const [pickTime, setPickTime] = useState<Dayjs | null>(null);
  const [reminderDate, setReminderDate] = useState<Dayjs | null>(null);
  const [reminderTime, setReminderTime] = useState<Dayjs | null>(null);
  const [reminderDescription, setReminderDescription] = useState("");
  const [selectedInterviewer, setSelectedInterviewer] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const interviewers = ["Interviewer 1", "Interviewer 2", "Interviewer 3"]; // List of available interviewers

  const router = useRouter();

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
    router.push("/hr-admin/hiring/candidate-management"); // Redirect to the desired page
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      pickDate,
      pickTime,
      reminderDate,
      reminderTime,
      reminderDescription,
      selectedInterviewer,
    });
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div className=" p-4 md:p-6 bg-white">
          {/* Candidate and Interviewer Fields */}
          <div className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Candidate
              </label>
              <input
                type="text"
                value="Precious Henry"
                disabled
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assign Interviewer
              </label>
              <Dropdown
                label="Assign Interviewer"
                options={interviewers}
                selected={selectedInterviewer}
                onSelect={(value: string) => setSelectedInterviewer(value)}
              />
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-4 md:gap-6">
            <div className="w-full">
              <label className="block mt-4 md:mt-0 text-sm font-medium text-gray-700">
                Pick Date <span className="text-red-500 mb-1">*</span>
              </label>
              <CustomDatePicker value={pickDate} onChange={setPickDate} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pick Time <span className="text-red-500 mb-1">*</span>
              </label>
              <CustomTimePicker value={pickTime} onChange={setPickTime} />
            </div>
          </div>

          {/* Reminder Section */}
          <div className="my-4  md:mt-0">
            <h3 className="text-lg mb-4 font-semibold">Set Reminder</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="w-full mt-2 md:mt-0">
                <label className="block text-sm font-medium text-gray-700">
                  Set Date
                </label>
                <CustomDatePicker
                  value={reminderDate}
                  onChange={setReminderDate}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
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
          <div className="mt-4  md:mt-0">
            <label className="block text-sm font-medium text-gray-700">
              Reminder Description
            </label>
            <textarea
              id="remainder description"
              placeholder="Reminder Description"
              className="w-full mt-2 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
              rows={4}
              value={reminderDescription}
              onChange={(e) => setReminderDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex flex-row w-full justify-end">
          <button
            type="submit"
            className="w-[90%] mx-auto md:mx-0  flex flex-row items-center justify-center gap-2 md:w-auto px-4 md:px-12 py-2 bg-gray-300 border-gray-200 border-2 text-base font-semibold text-gray-600  rounded-lg hover:text-black hover:bg-[#0035C3] hover:text-white cursor-pointer"
          >
            Schedule
          </button>
        </div>
      </form>
      <ScheduleSuccessModal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
};

export default ScheduleForm;
