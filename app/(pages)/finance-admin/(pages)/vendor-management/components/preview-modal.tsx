import { Spinner } from "@/app/_components/shared/buttons";
import { useGetVendor } from "@/app/_core/use-cases/finance/useVendors";
import { DrawerDialog } from "@/components/drawer/modal";

const PreviewModal: React.FC<{
  trigger: React.ReactNode;
  vendorId: string;
}> = ({ trigger, vendorId }) => {
  const { data: vendor, isLoading: isLoadingCurrentVendor } = useGetVendor({
    id: vendorId,
  });

  return (
    <DrawerDialog
      trigger={trigger}
      header={<span className="text-lg font-bold pl-4">Vendor Details</span>}
    >
      {isLoadingCurrentVendor ? (
        <Spinner />
      ) : vendor ? (
        <div className="md:p-4 lg:p-6 p-2 space-y-4 py-5">
          <TransactionDetailItem
            label="Vendor Name"
            value={vendor?.vendorName}
          />
          <hr className="border-gray-300 border-b-1 py-5 border-dashed" />
          <TransactionDetailItem
            label="Phone Number"
            value={vendor?.phoneNumber}
          />
          <hr className="border-gray-300 border-b-1 py-5 border-dashed" />
          <TransactionDetailItem
            label="Email Address"
            value={vendor?.contactEmail}
          />
          <hr className="border-gray-300 border-b-1 py-5 border-dashed" />
          <TransactionDetailItem
            label="Contact Person"
            value={vendor?.contactPerson}
          />
          <hr className="border-gray-300 border-b-1 py-5 border-dashed" />
          <TransactionDetailItem
            label="Payment Terms"
            value={vendor?.paymentTerms}
          />
          <hr className="border-gray-300 border-b-1 py-5 border-dashed" />
          <TransactionDetailItem
            label="Vendor Address"
            value={vendor?.vendorAddress}
          />
          <hr className="border-gray-300 border-b-1 py-5 border-dashed" />
          <TransactionDetailItem
            label="Vendor Status"
            pillValue={vendor?.status}
          />
        </div>
      ) : (
        <p>This vendor does not exist</p>
      )}
    </DrawerDialog>
  );
};

const TransactionDetailItem = ({
  label,
  value,
  pillValue,
}: {
  label: string;
  value?: string;
  pillValue?: string;
}) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <p className="text-gray-400">{label}</p>
      <p className="text-black font-bold">{value}</p>
      {pillValue && (
        <p
          className={`text-sm font-semibold rounded-full px-2 py-1 w-fit text-nowrap 
          ${
            {
              ACTIVE: "bg-green-50 text-green-700",
              PENDING: "bg-amber-50 text-amber-700",
              INACTIVE: "bg-red-50 text-red-700",
            }[pillValue]
          }`}
        >
          {pillValue}
        </p>
      )}
    </div>
  );
};

export default PreviewModal;
