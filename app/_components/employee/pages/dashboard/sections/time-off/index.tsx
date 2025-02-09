import TimeOffRequest from "./request";
import { Stack } from "@mui/material";
import "./progress-style.css";
import { TimeOffProps } from "./types";

const TimeOff: React.FC<TimeOffProps> = (props) => {
  const { total = 0, used = 0, requests } = props;
  return (
    <Stack gap={5}>
      <div className="flex justify-center">
        <div className="progress">
          <div className="barOverflow">
            <div
              className="bar"
              style={{ transform: `rotate(${45 + (used / total) * 180}deg)` }}
            ></div>
          </div>
          <div className="absolute" style={{ top: 35, left: 63 }}>
            <div
              style={{ fontWeight: 700, fontSize: "24px", color: "#0A0D14" }}
            >
              {used}
            </div>
            <div
              style={{ fontWeight: 700, fontSize: "10px", color: "#98A2B3" }}
            >
              OUT OF {total}
            </div>
          </div>
        </div>
      </div>
      <Stack gap={2}>
        {requests?.map((item, index) => (
          <TimeOffRequest key={index} {...item} />
        ))}
      </Stack>
    </Stack>
  );
};

export default TimeOff;
