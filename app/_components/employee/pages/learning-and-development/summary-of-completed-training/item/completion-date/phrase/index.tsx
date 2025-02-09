import React from "react";

const Phrase: React.FC<{ text: string }> = ({ text }) => {
  return (
    <span style={{ color: "#475367", fontSize: "14px", fontWeight: 400 }}>
      {text}
    </span>
  );
};

export default Phrase;
