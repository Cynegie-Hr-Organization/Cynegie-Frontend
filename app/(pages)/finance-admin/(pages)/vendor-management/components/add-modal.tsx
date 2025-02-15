import AppButton from "@/app/_components/shared/button"
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu"
import AppInputText from "@/app/_components/shared/input-text"
import { useVendorMutations } from "@/app/_core/use-cases/finance/useVendors"
import { AppModal } from "@/components/drawer/modal"
import { useState } from "react"
import { toast } from "react-toastify"

const AddVendorModal: React.FC<{ trigger: React.ReactNode }> = ({
  trigger,
}) => {
  const [isOpenAddVendorModal, setIsOpenAddVendorModal] = useState(false);
  const { addVendor } = useVendorMutations({});
  const isLoading = addVendor.isPending;
  const [formData, setFormData] = useState({
    vendorName: "",
    phoneNumber: "",
    contactEmail: "",
    vendorAddress: "",
    paymentTerms: "",
    contactPerson: "",
  })


  const handleSubmit = () => {
    return addVendor.mutate(formData, {
      onSuccess: () => {
        setIsOpenAddVendorModal(false)
        toast.success('Vendor created successfully');
      },
      onError: () => {
        setIsOpenAddVendorModal(false)
      }
    })
  }


  return (
    <AppModal
      open={isOpenAddVendorModal}
      setOpen={setIsOpenAddVendorModal}
      trigger={trigger}
      header={
        <span className="flex flex-col gap-y-1">
          <span className="font-roboto text-xl font-bold">New Vendor</span>
          <span className="font-roboto text-sm font-normal text-gray-500">
            Add details
          </span>
        </span>
      }
      footer={
        <div className="flex items-center justify-center gap-4">
          <AppButton
            label="Cancel"
            className="btn-secondary w-[296px]"
            disabled={isLoading}
            onClick={() => setIsOpenAddVendorModal(false)}
          />
          <AppButton
            label="Add"
            className="btn-primary w-[296px]"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={handleSubmit}
          />
        </div>
      }
    >
      <form>
        <div className="space-y-4">
          <AppInputText
            label="Vendor Name"
            placeholder="Enter vendor name"
            onChange={(e) => {
              setFormData({ ...formData, vendorName: e.target.value });
            }}
            value={formData.vendorName}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <AppInputText
            label="Phone Number"
            placeholder="Enter vendor phone number"
            onChange={(e) => {
              setFormData({ ...formData, phoneNumber: e.target.value });
            }}
            value={formData.phoneNumber}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <AppInputText
            label="Email"
            placeholder="Enter vendor email"
            onChange={(e) => {
              setFormData({ ...formData, contactEmail: e.target.value });
            }}
            value={formData.contactEmail}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <AppInputText
            label="Contact Person"
            placeholder="Enter vendor contact person"
            onChange={(e) => {
              setFormData({ ...formData, contactPerson: e.target.value });
            }}
            value={formData.contactPerson}
            id={"vendor-name"}
            requiredField
            type={"text"}
          />
          <AppMultipleSelect
            label="Payment Terms"
            placeholder="Select payment terms"
            items={[
              { label: "Net 30 days", value: "Net 30 days" },
              { label: "Net 45 days", value: "Net 45 days" },
              { label: "Net 60 days", value: "Net 60 days" },
              { label: "Net 70 days", value: "Net 70 days" },
              { label: "Net 80 days", value: "Net 80 days" },
              { label: "Net 90 days", value: "Net 90 days" },
              { label: "Net 100 days", value: "Net 100 days" },
            ]}
            selectedValues={
              formData.paymentTerms ? formData.paymentTerms.split(", ") : []
            }
            onSelectionChange={(values) => {
              setFormData({
                ...formData,
                paymentTerms:
                  values.length > 0
                    ? values.map((value: string) => value).join(", ")
                    : "",
              });
            }}
          />
          <AppInputText
            id={"vendor-name"}
            type={"text"}
            requiredField
            label="Vendor Address"
            placeholder="Enter vendor name"
            value={formData.vendorAddress}
            onChange={(e) => { setFormData({ ...formData, vendorAddress: e.target.value }) }}
          />
        </div>
      </form>
    </AppModal>
  )
}


export default AddVendorModal;
