import React from "react";
import { CardTitleProps } from "../types";

const Title: React.FC<CardTitleProps> = (props) => {
  const { text, size = "small" } = props;
  return (
    <div className={size === "small" ? "card-title-small" : "card-title-large"}>
      {text}
    </div>
  );
};

export default Title;
