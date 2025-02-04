import { ICompanyUser } from "@/app/_core/interfaces/user";
import DetailBlock from "./details-block";


export const Documents = ({ userData }: { userData?: ICompanyUser }) => {
  return (
    <div className="space-y-5">
      <h3 className="text-base font-semibold text-primary">Documents</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DetailBlock label="ID Upload" value="ID.pdf" valueClassName="text-primary" />
        <DetailBlock label="Proof of Contract" value="contract.pdf" valueClassName="text-primary" />
      </div>
    </div>
  );
}