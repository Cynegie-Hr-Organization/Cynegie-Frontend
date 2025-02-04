import { DeleteSvg } from "@/app/_components/icons/custom-icons"
import AppButton from "@/app/_components/shared/button"
import { IVendor } from "@/app/_core/actions/finance/vendor"
import { useVendorMutations } from "@/app/_core/use-cases/finance/useVendors"
import { AppModal } from "@/components/drawer/modal"
import { useState } from "react"



export enum vendorStatus {
  ACTIVE_VENDOR = 'active',
  INACTIVE_VENDOR = 'inactive'
}
const OtherActionsModal = ({ trigger, vendor }: { trigger: React.ReactNode, vendor: IVendor }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { activateVendor, deactivateVendor } = useVendorMutations({ id: vendor?.id });
  const isDeactivatingVendor = deactivateVendor.isPending;
  const isActivatingVendor = activateVendor.isPending;

  const handleDeactivation = () => {
    deactivateVendor.mutate({ id: vendor?.id }, {
      onSuccess: () => {
        setIsOpen(false)
      },
      onError: () => {
        setIsOpen(false)
      }
    });
  }

  const handleActivation = () => {
    activateVendor.mutate({ id: vendor?.id }, {
      onSuccess: () => {
        setIsOpen(false)
      },
      onError: () => {
        setIsOpen(false)
      }
    });
  }


  return (
    <AppModal
      open={isOpen}
      setOpen={setIsOpen}
      trigger={trigger}
      header={
        <span className="text-lg font-bold text-center">
          <span className="flex flex-col items-center justify-center gap-y-6">
            <DeleteSvg />
            <span className="flex flex-col items-center justify-center gap-y-2">
              <span>Are you sure you want to {vendor.status === vendorStatus.ACTIVE_VENDOR ? 'deactivate' : 'activate'} {vendor.vendorName}?</span>
            </span>
          </span>
        </span>
      }
      footer={
        <div className="flex flex-col md:flex-row items-center justify-center gap-2">
          <AppButton
            label="Cancel"
            className="bg-white border-2 border-gray-400 text-gray-500 md:w-[150px] w-full"
            onClick={() => setIsOpen(false)}
          />

          {vendor.status === vendorStatus.ACTIVE_VENDOR ?
            (<AppButton
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
      }>
    </AppModal>
  )
}


export default OtherActionsModal;