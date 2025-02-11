import React from "react";

const CardLabelText: React.FC<{ text: string; large?: boolean }> = ({
  text,
  large = false,
}) => {
  return (
    <div
      className={`${
        large ? "card-title-small" : "text-[12px] text-[#1B1B1B] font-[400]"
      }`}
    >
      {text}
    </div>
  );
};

export default CardLabelText;
