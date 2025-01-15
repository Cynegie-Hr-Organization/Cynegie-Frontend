import { InputFieldProps } from "@/app/_components/employee/modal/types";
import { GridLayout } from "@/utils/grid-layout";
import { ButtonGroupProps } from "../../button-group/types";

export type FormProps = {
  title?: string;
  inputFields?: InputFieldProps[];
  isCard?: boolean;
  gridSpacing?: number;
  layout?: GridLayout;
  buttonGroup?: ButtonGroupProps;
  gridItemSize?: { xs?: number; sm?: number; md?: number; lg?: number };
  loading?: boolean;
};
