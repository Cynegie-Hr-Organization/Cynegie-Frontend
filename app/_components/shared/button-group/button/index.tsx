import { PopoverType } from "@/app/_components/shared/custom-popover/types";
import { color, icon } from "@/constants";
import { CircularProgress } from "@mui/material";
import { ChevronDown } from "lucide-react";
import React from "react";
import SvgIcon from "../../../icons/container";
import Popover from "../../custom-popover";
import { ButtonProps, ButtonType } from "../../page/heading/types";

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type,
    text,
    icon: iconProp,
    onClick,
    popoverOptions,
    fullWidth,
    small,
    iconOnly,
    isSubmit,
  } = props;

  const borderStyle = { border: "1.5px solid" };
  const paddingStyle = { padding: "10px 24px" };
  const fontSizeStyle = { fontSize: "16px" };
  const fontWeightStyle = { fontWeight: 700 };
  const borderRadiusStyle = { borderRadius: "8px" };

  const containedStyle = {
    ...color.button.contained,
    ...paddingStyle,
    ...fontSizeStyle,
    ...fontWeightStyle,
    ...borderRadiusStyle,
    fill: "#FFF",
  };

  const outlinedStyle = {
    ...color.button.outlined,
    ...borderStyle,
    ...paddingStyle,
    ...fontSizeStyle,
    ...fontWeightStyle,
    ...borderRadiusStyle,
  };

  const filterStyle = {
    ...color.button.filter,
    ...borderStyle,
    padding: "6px 14px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: 600,
  };

  const outlinedBlueStyle = {
    ...outlinedStyle,
    color: color.info.dark,
    border: `2px solid ${color.info.dark}`,
  };

  const deleteContainedStyle = {
    ...containedStyle,
    backgroundColor: color.error.dark,
  };

  const blackStyle = {
    ...containedStyle,
    backgroundColor: "black",
  };

  const deleteWithIconStyle = {
    ...containedStyle,
    backgroundColor: "white",
    border: 0,
    color: color.error.dark,
    display: "flex",
    gap: 10,
    paddingLeft: 0,
    fontWeight: 400,
  };

  const disabledStyle = {
    ...outlinedStyle,
    ...color.button.disabled,
    fontWeight: 600,
  };

  const deleteIconOnly = type === ButtonType.deleteWithIcon && !text;

  const button = (
    <button
      {...(isSubmit ? { type: "submit" } : { type: "button" })}
      onClick={onClick}
      {...((type === ButtonType.disabled ||
        type === ButtonType.disabledLoading) && { disabled: true })}
      style={{
        ...(type === ButtonType.outlined && outlinedStyle),
        ...(type === ButtonType.contained && containedStyle),
        ...(type === ButtonType.download && containedStyle),
        ...(type === ButtonType.filter && filterStyle),
        ...(type === ButtonType.outlinedBlue && outlinedBlueStyle),
        ...(type === ButtonType.deleteContained && deleteContainedStyle),
        ...(type === ButtonType.deleteWithIcon && deleteWithIconStyle),
        ...(type === ButtonType.disabled && disabledStyle),
        ...(type === ButtonType.disabledLoading && disabledStyle),
        ...(type === ButtonType.black && blackStyle),
        ...(type === ButtonType.actions && outlinedStyle),
        borderRadius: "8px",
        ...((iconProp || type === ButtonType.download) && {
          display: "flex",
          alignItems: "center",
          gap: 5,
        }),
        ...(small && { fontSize: "14px" }),
        textWrap: "nowrap",
        ...(deleteIconOnly && { padding: 0 }),
      }}
      className={`${fullWidth ? "w-full" : "w-fit"} sm:${
        fullWidth ? "w-full" : "w-fit"
      }`}
    >
      {iconProp}
      {type === ButtonType.deleteWithIcon && (
        <SvgIcon path={icon.bin} width={20} height={20} />
      )}
      {type === ButtonType.download && (
        <SvgIcon path="/icons/download.svg" width={24} height={24} />
      )}
      {type === ButtonType.disabledLoading && (
        <CircularProgress
          sx={{ mx: 5 }}
          size={14}
          thickness={5}
          color="inherit"
        />
      )}
      {!iconOnly && text}
      {(popoverOptions || type === ButtonType.actions) && (
        <ChevronDown style={{ display: "inline", marginLeft: 5 }} />
      )}
    </button>
  );

  return popoverOptions ? (
    <Popover
      type={PopoverType.moreOptions}
      triggerButton={button}
      moreOptions={popoverOptions}
    />
  ) : (
    button
  );
};

export default Button;
