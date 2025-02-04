import { ICompanyUser } from "@/app/_core/interfaces/user";
import DetailBlock from "./details-block";



export const EquipmentAccess = ({ userData }: { userData?: ICompanyUser }) => {
  return (
    <div className="space-y-11">
      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">Employee Equipment</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Device Category" value="Laptop" />
          <DetailBlock label="Device Category" value="Macbook Pro 2022" />
        </div>
      </div>


      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">Employee Access</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailBlock label="Behance ID" value="simbi.behance.com" />
        </div>
      </div>
    </div>
  );
}