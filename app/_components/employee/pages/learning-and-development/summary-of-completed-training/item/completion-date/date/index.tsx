import React from "react";

const Date: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span style={{ color: "#000000", fontWeight: 400, fontSize: "12px" }}>
      {text}
    </span>
  );
};

export default Date;
