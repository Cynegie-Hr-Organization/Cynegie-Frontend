import { SingleDetail } from "@/app/_components/shared/detail-group/types";
import { color } from "@/constants";

type TablePermissionsCellProps = {
  permissions: Permission[];
  onClick?: (permissions: Permission[]) => void;
};

export type Permission = Pick<SingleDetail, "name" | "value">;

const TablePermissionsCell: React.FC<TablePermissionsCellProps> = ({
  permissions,
  onClick,
}) => {
  return (
    <span>
      {permissions[0].name + " "}
      <span
        className={`text-[${color.info.dark}] underline ${
          onClick && "cursor-pointer"
        }`}
        onClick={() => onClick?.(permissions)}
      >
        {permissions.length > 1 && `+${permissions.length - 1}`}
      </span>
    </span>
  );
};

export default TablePermissionsCell;
