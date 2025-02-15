import AppButton from "@/app/_components/shared/button";
import { AppMultipleSelect } from "@/app/_components/shared/dropdown-menu";
import AppInputText from "@/app/_components/shared/input-text";
import { useGetVendor, useVendorMutations } from "@/app/_core/use-cases/finance/useVendors";
import { AppModal2 } from "@/components/drawer/modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



const EditVendorModal: React.FC<{
  vendorId: string,
  isOpen?: boolean,
  onClose: () => void
}> = ({ isOpen, onClose, vendorId }) => {

  const { data: vendor, isLoading: isLoadingVendor } = useGetVendor({ id: vendorId });
  const { updateVendor } = useVendorMutations({ id: vendorId });

  const isUpdatingVendor = updateVendor.isPending;

  const [formData, setFormData] = useState({
    vendorName: "",
    phoneNumber: "",
    contactEmail: "",
    vendorAddress: "",
    contactPerson: "",
    // city: '',
    // state: '',
    paymentTerms: '',
  })


  useEffect(() => {
    if (vendor) {
      setFormData({
        vendorName: vendor.vendorName ?? "",
        phoneNumber: vendor.phoneNumber ?? "",
        vendorAddress: vendor.vendorAddress ?? "",
        contactEmail: vendor.contactEmail ?? "",
        contactPerson: vendor.contactPerson ?? "",
        // city: vendor.vendorAddress ?? '',
        // state: vendor.vendorAddress ?? '',
        paymentTerms: vendor.paymentTerms ?? "",
      });
    }
  }, [vendor]);

  const handleSubmit = () => {
    updateVendor.mutate({ id: vendorId, body: formData }, {
      onSuccess: () => {
        onClose();
        toast.success('Vendor details edited successfully');
      },
      onError: (error) => console.log(error)
    })
  }

  return (
    <AppModal2
      open={isOpen}
      onClose={() => onClose?.()}
      header={<span className="font-roboto text-xl font-bold">Edit Vendor</span>}
      footer={
        <div className="flex items-center justify-center gap-4">
          <AppButton
            label="Cancel"
            className="btn-secondary w-[296px]"
            onClick={onClose}
          />
          <AppButton
            label="Save"
            className="btn-primary w-[296px]"
            disabled={isUpdatingVendor}
            isLoading={isUpdatingVendor}
            onClick={handleSubmit}
          />
        </div>
      }
    >
      <form>
        <div className="space-y-4">
          <AppInputText
            type={"text"}
            label="Vendor Name"
            disabled={isUpdatingVendor}
            placeholder="Enter vendor name"
            onChange={(e) => {
              setFormData({ ...formData, vendorName: e.target.value });
            }}
            value={formData.vendorName}
            id={"vendor-name"}
            isLoadingContent={isLoadingVendor}
          />
          <AppInputText
            type={"text"}
            label="Phone Number"
            placeholder="Enter phone number"
            onChange={(e) => {
              setFormData({ ...formData, phoneNumber: e.target.value });
            }}
            value={formData.phoneNumber}
            id={"vendor-phone-number"}
            isLoadingContent={isLoadingVendor}
          />
          <AppInputText
            type={"email"}
            label="Email"
            placeholder="Enter vendor email"
            onChange={(e) => {
              setFormData({ ...formData, contactEmail: e.target.value });
            }}
            value={formData.contactEmail}
            id={"vendor-email"}
            isLoadingContent={isLoadingVendor}
          />
          <AppInputText
            type={"text"}
            label="Address"
            placeholder="Enter vendor address"
            onChange={(e) => {
              setFormData({ ...formData, vendorAddress: e.target.value });
            }}
            value={formData.vendorAddress}
            id={"vendor-address"}
            isLoadingContent={isLoadingVendor}
          />
          <AppInputText
            type={"text"}
            label="City"
            placeholder="Enter vendor city"
            onChange={() => {}}
            value={formData.vendorAddress}
            id={"vendor-city"}
            disabled
            isLoadingContent={isLoadingVendor}
          />
          <AppInputText
            type={"text"}
            label="State"
            placeholder="Enter vendor state"
            onChange={(e) => {
              setFormData({ ...formData, vendorAddress: e.target.value });
            }}
            value={formData.vendorAddress}
            id={"vendor-state"}
            disabled
            isLoadingContent={isLoadingVendor}
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
        </div>
      </form>
    </AppModal2>
  )
}

export default EditVendorModal;
