import StatusPill from "@/app/_components/shared/pills/status";
import { Avatar, Stack } from "@mui/material";
import Image from "next/image";

const RecentActivityCardDetailsItem = () => {
  return (
    <Stack
      gap={1}
      style={{
        border: "1px solid #E4E7EC",
        borderRadius: "12px",
        padding: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          borderLeftWidth: "3px",
          borderColor: "#D7A601",
          paddingLeft: "10px",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            fontWeight: 600,
            fontSize: "12px",
            color: "#1B1B1B",
          }}
        >
          <div>App usability testing with Maze</div>
          <div style={{ fontWeight: 400, fontSize: "10px", color: "#909090" }}>
            On Slack
          </div>
        </div>
        <div>
          <StatusPill text="Pending" variant="warning" />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            flexGrow: 1,
            fontWeight: 400,
            fontSize: "10px",
            color: "#909090",
          }}
        >
          Not started yet
        </div>
        <div>
          <div style={{ display: "flex" }}>
            {[
              "/people/person-1.png",
              "/people/person-2.png",
              "/people/person-1.png",
            ].map((imageSrc, index) => (
              <Avatar
                key={index}
                src={imageSrc}
                sx={{ ml: "-4px", width: "24.71px", height: "24.71px" }}
              />
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <span style={{ fontWeight: 400, fontSize: "10px", color: "#909090" }}>
            Due:
          </span>{" "}
          <span style={{ fontWeight: 600, color: "#1B1B1B", fontSize: "11px" }}>
            January 21st, 2024
          </span>
        </div>
        <Stack direction="row" alignItems="center" gap={1}>
          <div>
            <Image
              src="/icons/message.svg"
              alt="Message"
              width={16}
              height={16}
            />
          </div>
          <div>2</div>
        </Stack>
      </div>
    </Stack>
  );
};

export default RecentActivityCardDetailsItem;
