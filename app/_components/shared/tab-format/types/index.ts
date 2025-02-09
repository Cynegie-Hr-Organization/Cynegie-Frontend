import { ButtonProps } from "../../page/heading/types";

export type TabFormatProps = {
  type?: "button" | "multi-step-form";
  tabs?: Tab[];
  actionButton?: ButtonProps;
};

export type Tab = {
  name: string;
  component: React.ReactElement;
};
