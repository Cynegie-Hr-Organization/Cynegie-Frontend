import { AppSelect } from "@/app/_components/shared/select";
import { candidateMoveStage } from "@/app/api/services/candidate";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface MoveStageModalProps<
  T extends { id: string; stage: string; firstName: string; lastName: string },
> {
  isOpen: boolean;
  rowData: T | null;
  onClose: () => void;
  refetch: () => void;
}

const MoveStageModal = <
  T extends { id: string; stage: string; firstName: string; lastName: string },
>({
  isOpen,
  rowData,
  onClose,
  refetch,
}: MoveStageModalProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextStage, setNextStage] = useState<string>(""); // Single value for next stage
  const [notes, setNotes] = useState<string>("");

  const stageOptions = [
    { label: "Applied", value: "Applied" },
    { label: "Screened", value: "Screened" },
    { label: "Interviewed", value: "Interviewed" },
    { label: "Hired", value: "Hired" },
  ];

  const handleMoveStage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rowData || !nextStage) {
      setError("Next stage is required.");
      return;
    }

    if (nextStage === rowData.stage) {
      setError("Next stage must be different from the current stage.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = {
      stage: nextStage, // Use the selected next stage
    };

    try {
      const response = await candidateMoveStage(rowData.id, payload);
      if (response.status === 200) {
        toast.success("Candidate successfully moved to the next stage.");
        refetch();
        onClose();
      } else {
        setError(response.message || "Failed to move candidate.");
        toast.error(response.message || "Failed to move candidate.");
      }
    } catch (err) {
      setError("An error occurred while moving the candidate.");
      toast.error("Failed to move the candidate to the next stage.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !rowData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-md md:max-w-3xl p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Move Stage</h2>
          <button
            onClick={onClose}
            className="text-gray-500 bg-gray-100 rounded-full p-1 hover:text-gray-800 hover:bg-gray-200 focus:ring-2 focus:ring-blue-300"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Move the candidate to the next stage
        </p>

        <form onSubmit={handleMoveStage} className="space-y-4">
          <div>
            <label
              htmlFor="candidateName"
              className="block text-sm font-medium text-gray-700"
            >
              Candidate Name
            </label>
            <input
              id="candidateName"
              type="text"
              value={`${rowData?.firstName || "N/A"} ${rowData?.lastName || ""}`.trim()}
              readOnly
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="currentStage"
                className="block text-sm font-medium text-gray-700"
              >
                Current Stage
              </label>
              <input
                id="currentStage"
                type="text"
                value={rowData.stage}
                readOnly
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
              />
            </div>

            <div>
              <AppSelect
                label="Next Stage"
                requiredField
                listItems={stageOptions}
                onChange={setNextStage}
                placeholder="Select next stage"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes
            </label>
            <textarea
              id="notes"
              placeholder="Add additional notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
              rows={4}
            ></textarea>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-white bg-[#0035C3] rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
            >
              {isLoading ? "Processing..." : "Move to Next Stage"}
            </button>
          </div>
        </form>

        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default MoveStageModal;
