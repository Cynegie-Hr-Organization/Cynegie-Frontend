import { Skeleton, Stack, SxProps } from "@mui/material";
import StatusPill from "../../pills/status";
import { SingleDetail } from "../types";
import DetailName from "./name";
import DetailValue from "./value";

const spaceBetweenLayout: SxProps = {
  direction: { xs: "column", sm: "row" },
  justifyContent: { xs: "flex-start", sm: "space-between" },
  gap: { xs: 1, sm: 20 },
};

const Detail: React.FC<SingleDetail> = (props) => {
  return (
    <Stack {...(props.spaceBetweenLayout ? spaceBetweenLayout : { gap: 0.5 })}>
      <DetailName name={props.name} />
      {props.loading ? (
        <Skeleton height={40} sx={{ width: "auto" }} />
      ) : (
        <>
          {props.type === "status" && (
            <StatusPill
              variant={props.statusMap?.[props.value]}
              text={props.value}
            />
          )}
          {props.type === "document" && (
            <StatusPill variant="info" text={props.value} icon={props.icon} />
          )}
          {!props.type && <DetailValue value={props.value} />}
        </>
      )}
    </Stack>
  );
};

export default Detail;
