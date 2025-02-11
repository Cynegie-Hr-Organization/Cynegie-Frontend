import { Avatar, Stack } from "@mui/material";
import React from "react";
import { ProfileProps } from "./types";

const Profile: React.FC<ProfileProps> = ({ image, name, role }) => {
  return (
    <div className="flex justify-center" style={{ paddingTop: "20px" }}>
      <Stack gap={0.5}>
        <div className="flex justify-center" style={{ marginBottom: "10px" }}>
          <Avatar
            src={image}
            style={{
              width: "85px",
              height: "85px",
              border: "3px solid #0035C3",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "16.74px",
            color: "#1B1B1B",
            fontWeight: 700,
          }}
        >
          {name}
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#1B1B1B",
            fontWeight: 400,
          }}
        >
          {role}
        </div>
      </Stack>
    </div>
  );
};

export default Profile;
