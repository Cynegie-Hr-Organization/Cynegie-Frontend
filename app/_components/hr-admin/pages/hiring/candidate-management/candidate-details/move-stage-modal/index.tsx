import React from 'react';

interface MoveStageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MoveStageModal: React.FC<MoveStageModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-md md:max-w-3xl p-6 rounded-lg shadow-lg relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Move Stage</h2>
          <button
            onClick={onClose}
            className="text-gray-500 bg-gray-100 rounded-full p-1 hover:text-gray-800"
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

        {/* Modal Content */}
        <p className="text-sm text-gray-600 mb-6">
          Move candidate to the next stage
        </p>

        {/* Form Fields */}
        <div className="space-y-4">
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
              value="Precious Henry"
              readOnly
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
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
      value="Screening"
      readOnly
      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
    />
  </div>

  <div>
    <label
      htmlFor="nextStage"
      className="block text-sm font-medium text-gray-700"
    >
      Next Stage <span className="text-red-500">*</span>
    </label>
    <input
      id="nextStage"
      type="text"
      placeholder="Enter next stage"
      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
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
              placeholder="Approval Description"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
              rows={4}
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-white bg-[#0035C3] rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
          >
            Move to Next Stage
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveStageModal;
