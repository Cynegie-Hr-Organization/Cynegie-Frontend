import { ButtonProps } from "../../page/heading/types";

export type TabFormatProps = {
  type?: "button" | "multi-step-form";
  tabs?: Tab[];
  actionButton?: ButtonProps;
  customTabValue?: number;
  customHandleChange?: (
    event?: React.SyntheticEvent,
    newValue?: number,
  ) => void;
  hasButtons?: boolean;
};

export type Tab = {
  name: string;
  component: React.ReactElement;
};
