import { AccessRights } from "@/app/_core/actions/user/employee";
import DetailBlock from "./details-block";



export const EquipmentAccessInformation = ({ userData }: { userData?: AccessRights[] }) => {
  // const { } = userData ?? {}


  return (
    <div className="space-y-11">
      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">Employee Equipment</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* {userData?.map((item) => (
            item.devices.map((device) => (
              <DetailBlock key={item?._id} label="Device Category" value={device?.deviceName ?? 'NIL'} />
            ))
          ))} */}
          {/* <DetailBlock label="Device Category" value="Macbook Pro 2022" /> */}
        </div>
      </div>


      <div className="space-y-5">
        <h3 className="text-base font-semibold text-primary">Employee Access</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {userData?.map((item) => (
            item.permissions.map((permission) => (
              <DetailBlock key={permission?.id} label="Tool" value={permission.tool ?? 'NIL'} />
            ))
          ))}
        </div>
      </div>
    </div>
  );
}