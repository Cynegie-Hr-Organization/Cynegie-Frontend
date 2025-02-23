import { DeleteSvg } from "@/app/_components/icons/custom-icons";
import AppButton from "@/app/_components/shared/button";
import { IVendor } from "@/app/_core/actions/finance/vendor";
import { useVendorMutations } from "@/app/_core/use-cases/finance/useVendors";
import { handleError } from "@/app/_core/utils/axios";
import { useAppToast } from "@/app/_hooks/toast";
import { AppModal2 } from "@/components/drawer/modal";

export enum vendorStatus {
  ACTIVE_VENDOR = "active",
  INACTIVE_VENDOR = "inactive",
}

const OtherActionsModal = ({
  isOpen,
  onClose,
  vendor,
}: {
  isOpen: boolean;
  onClose: () => void;
  vendor: IVendor;
}) => {
  const { apptoast } = useAppToast();
  const { activateVendor, deactivateVendor } = useVendorMutations({
    id: vendor?.id,
  });
  const isDeactivatingVendor = deactivateVendor.isPending;
  const isActivatingVendor = activateVendor.isPending;

  const handleDeactivation = () => {
    deactivateVendor.mutate(
      { id: vendor?.id },
      {
        onSuccess: () => {
          onClose();
          apptoast.success({
            title: "Successful",
            message: "Vendor deactivated successfully",
          });
        },
        onError: () => {
          onClose();
        },
      },
    );
  };

  const handleActivation = () => {
    activateVendor.mutate(
      { id: vendor?.id },
      {
        onSuccess: () => {
          onClose();
          apptoast.success({
            title: "Successful",
            message: "Vendor activated successfully",
          });
        },
        onError: (error) => {
          onClose();
          apptoast.error({
            title: "Error",
            message: handleError(error, "", false),
          });
        },
      },
    );
  };

  return (
    <AppModal2
      open={isOpen}
      setOpen={onClose}
      header={
        <span className="text-lg font-bold text-center">
          <span className="flex flex-col items-center justify-center gap-y-6">
            <DeleteSvg />
            <span className="flex flex-col items-center justify-center gap-y-2">
              <span>
                Are you sure you want to{" "}
                {vendor.status === vendorStatus.ACTIVE_VENDOR
                  ? "deactivate"
                  : "activate"}{" "}
                {vendor.vendorName}?
              </span>
            </span>
          </span>
        </span>
      }
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <AppButton
            label="Cancel"
            className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full"
            onClick={onClose}
          />

          {vendor.status === vendorStatus.ACTIVE_VENDOR ? (
            <AppButton
              label="Deactivate"
              className="bg-red-700 text-white md:w-[150px] w-full border border-red-700 disabled:bg-red-700/90 disabled:text-white"
              disabled={isDeactivatingVendor}
              isLoading={isDeactivatingVendor}
              onClick={handleDeactivation}
            />
          ) : (
            <AppButton
              label="Activate"
              className="bg-red-700 text-white md:w-[150px] w-full border border-red-700 disabled:bg-red-700/90 disabled:text-white"
              disabled={isActivatingVendor}
              isLoading={isActivatingVendor}
              onClick={handleActivation}
            />
          )}
        </div>
      }
    ></AppModal2>
  );
};

export default OtherActionsModal;
