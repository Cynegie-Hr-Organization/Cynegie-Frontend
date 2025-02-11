import { color } from "@/constants";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";

type TableProgressCellProps = {
  value?: number;
};

const TableProgressCell: React.FC<TableProgressCellProps> = ({ value }) => {
  return (
    <div style={{ position: "relative", width: "fit-content" }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: "8px",
          borderRadius: "12px",
          width: "411px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 0,
          color: color.progress.filled,
          fontWeight: 700,
        }}
      >{`${value}%`}</div>
    </div>
  );
};

export default TableProgressCell;
