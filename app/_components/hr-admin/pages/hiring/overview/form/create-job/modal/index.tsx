import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation'


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateJobSuccessModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" >
      <div className="bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg relative text-center"    onClick={(e) => e.stopPropagation()}
>
        {/* Icon */}
        <div className="flex items-center justify-center mb-4">
                  <Image
                      src="/icons/modal-success.svg"
                      width={100}
                      height={100}
        alt="success"          />
                      
          
        </div>

        {/* Success Message */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          You have successfully created a job
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          You can now proceed to dashboard to continue
        </p>

        {/* Button */}
        <button
  onClick={onClose}
          className="px-6 py-2 text-white bg-[#0035C3] rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
          onClickCapture={()=> router.push("/hr-admin/hiring/overview")}
        >
  Continue to Dashboard
        </button>
      </div>
      </div>
      
      
  );
};

export default CreateJobSuccessModal;
