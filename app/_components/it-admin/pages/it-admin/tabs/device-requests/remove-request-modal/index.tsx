import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeny: () => void; // Callback for when "Deny" is clicked
}

const RemoveRequestModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onDeny,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/icons/modal-delete.svg"
            width={100}
            height={100}
            alt="success"
          />
        </div>

        {/* Success Message */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Are you sure you want to deny this request?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Your request has been denied
        </p>

        {/* Submit Button */}
        <div className="mt-6 w-full md:w-[90%] md:mx-auto flex flex-col md:flex-row gap-2 items-center justify-center ">
          <button
            className="w-full flex flex-row justify-center items-center gap-2  px-4  py-2 border-gray-300 border-2 text-base font-semibold bg-white text-gray-700 rounded-lg hover:border-gray-600 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-full px-4 py-2 text-white bg-red-700 rounded-lg hover:opacity-85"
            onClick={() => {
              onDeny(); // Call onDeny function passed from parent when Deny is clicked
              onClose(); // Close modal after denial
            }}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveRequestModal;
