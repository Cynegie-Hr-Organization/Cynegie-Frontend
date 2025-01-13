import InputText from "@/app/_components/shared/input-text";
import { AppSelect } from "@/app/_components/shared/select";
import { createDevice } from "@/app/api/services/it-admin";
import React from "react";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateDeviceModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = React.useState({
    deviceName: "",
    status: "",
    location: "",
    description: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!formData.deviceName || !formData.status || !formData.location) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await createDevice(formData);
      console.log(response);
      toast.success("Device created successfully!");
      setFormData({
        deviceName: "",
        status: "",
        location: "",
        description: "",
      });
      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Error creating device:", error);
      toast.error("Failed to create device. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 text-2xl right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-1">Create Device</h2>
        <p className="text-gray-600 text-sm mb-6">
          Fill in the details below to register a new device
        </p>

        <div className="flex gap-2">
          <InputText
            label="Device Name"
            type="text"
            id="device-name"
            placeholder="Device name"
            requiredField
            onChange={(e) =>
              setFormData({ ...formData, deviceName: e.target.value })
            }
            value={formData.deviceName}
          />
          <InputText
            label="Location"
            type="text"
            id="device-location"
            placeholder="Device Location"
            requiredField
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            value={formData.location}
          />
          <AppSelect
            label="Status"
            requiredField
            placeholder="Select device status"
            onChange={(value) => setFormData({ ...formData, status: value })}
            listItems={[
              { label: "Active", value: "active" },
              { label: "Under Maintenance", value: "under-maintenance" },
              { label: "Inactive", value: "inactive" },
            ]}
          />
        </div>

        <div className="mt-2">
          <InputText
            label="Device Description"
            type="textarea"
            id="device-description"
            placeholder="Description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
          />
        </div>

        <div className="flex flex-col mt-8 md:flex-row justify-between w-full gap-4">
          <button
            className="px-4 w-full py-2 bg-white text-[#800501] border-[1.5px] border-gray-400 rounded-md hover:border-gray-700"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 w-full py-2 bg-primary text-white rounded-md hover:bg-blue-500"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Device"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDeviceModal;
