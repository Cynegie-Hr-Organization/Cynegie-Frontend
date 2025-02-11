import StatusPill from "@/app/_components/shared/pills/status";
import { APRStatusMap } from "@/constants";

const TimeOffRequest: React.FC<{
  dotColor: string;
  date: string;
  type: string;
  status: string;
}> = ({ dotColor, date, type, status }) => {
  return (
    <div className="flex items-center flex-wrap">
      <div
        style={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor: dotColor,
          marginRight: "10px",
        }}
      ></div>
      <div className="flex-grow">
        <span
          style={{ fontWeight: 600, fontSize: "14px", color: "#1A1919" }}
        >{`${date}`}</span>{" "}
        <span style={{ fontWeight: 400, fontSize: "10px", color: "#1A1919" }}>
          {`(${type})`}
        </span>
      </div>
      <div>
        <StatusPill text={status} variant={APRStatusMap[status]} />
      </div>
    </div>
  );
};

export default TimeOffRequest;
