import { EmployeeDocuments } from "@/app/_core/actions/user/employee";
import DetailBlock from "./details-block";

export const DocumentsInformation = ({
  userData,
}: {
  userData?: EmployeeDocuments[];
}) => {
  return (
    <div className="space-y-5">
      <h3 className="text-base font-semibold text-primary">Documents</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {userData?.map((item) => (
          <DetailBlock
            key={item?.id}
            isLink
            label={item?.documentName ?? ""}
            value={item?.documentUrl ?? ""}
            valueClassName="text-primary hover:underline cursor-pointer transition-all duration-300 w-max"
          />
        ))}
      </div>
    </div>
  );
};

/* <DetailBlock label="Proof of Contract" value="contract.pdf" valueClassName="text-primary" /> */
// documentName: string;
// documentUrl: string;
// id: string;
