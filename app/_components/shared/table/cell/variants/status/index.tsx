import StatusPill from "@/app/_components/shared/pills/status";
import { StatusMap } from "../../../types";

type TableStatusCellProps = {
  value?: string;
  statusMap: StatusMap;
};

const TableStatusCell: React.FC<TableStatusCellProps> = ({
  value,
  statusMap,
}) => {
  return (
    <StatusPill
      variant={statusMap?.[value ?? ""] || "grey"}
      text={value ?? ""}
    />
  );
};

export default TableStatusCell;
