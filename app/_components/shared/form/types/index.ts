import { InputFieldProps } from "@/app/_components/employee/modal/types";
import { GridLayout } from "@/utils/grid-layout";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
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
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  control?: Control<FieldValues, any>;
};
