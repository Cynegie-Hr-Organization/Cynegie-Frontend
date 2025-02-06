import {
  ButtonGroupPosition,
  ButtonGroupProps,
} from "@/app/_components/shared/button-group/types";
import { AddItemsProps } from "@/app/_components/shared/custom-popover/content/add-items";
import { DetailGroupProps } from "@/app/_components/shared/detail-group/types";
import { FormProps } from "@/app/_components/shared/form/types";
import { ButtonProps } from "@/app/_components/shared/page/heading/types";
import { Dayjs } from "dayjs";
import { FormEventHandler, SetStateAction } from "react";
import {
  Control,
  FieldErrors,
  FieldName,
  FieldValues,
  RegisterOptions,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormResetField,
  UseFormSetError,
  UseFormSetValue,
  UseFormUnregister,
  UseFormWatch,
} from "react-hook-form";
import { DateRange } from "rsuite/esm/DateRangePicker";
import { ViewTaskProps } from "../../pages/task/view-task/types";

export type ModalProps = {
  open: boolean;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  title?: string;
  subtitle?: string;
  detailGroup?: DetailGroupProps;
  buttonOne?: ButtonProps;
  centerButton?: boolean;
  buttonTwo?: ButtonProps;
  hasHeading?: boolean;
  centerImage?: string;
  centerTitle?: string;
  centerMessage?: string;
  reduceVerticalGap?: boolean;
  form?: FormProps;
  forms?: FormProps[];
  hasDocSelect?: boolean;
  isPayrollSlip?: boolean;
  buttonGroupPosition?: ButtonGroupPosition;
  viewTaskProps?: ViewTaskProps;
  onFormSubmit?: FormEventHandler<HTMLFormElement> | undefined;
  formRegister?: UseFormRegister<FieldValues> | undefined;
  formErrors?: FieldErrors<FieldValues>;
  formControl?: Control<FieldValues, any>;
  formButtonGroup?: ButtonGroupProps;
};

export type ModalData = Omit<ModalProps, "open" | "onClose">;

export type InputFieldProps = {
  label?: string;
  type: InputFieldType;
  placeholder?: string;
  options?: InputFieldOption[];
  value?: string | number;
  // setValue?: Dispatch<SetStateAction<string | number | undefined>>;
  setValue?: (arg: InputFieldValue) => void;
  selectValControlledFromOutside?: boolean;
  disabled?: boolean;
  defaultValue?: string | number | { label: string; value: string }[];
  addItemsProps?: AddItemsProps;
  getCurrentValue?: (arg: string | number) => void;
  startadornment?: React.ReactElement;
  checkboxItems?: string[];
  getDateRange?: (range: { startDate: Date; endDate: Date }) => void;
  getDate?: (date: Dayjs | null) => void;
  dateRangeValue?: DateRange | null;
  dateRangeDefaultValue?: DateRange | null;
  loading?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  control?: Control<FieldValues, any>;
  hookFormField?: boolean;
  hookFormName?: string;
  hookFormSetValue?: UseFormSetValue<FieldValues>;
  hookFormGetValues?: UseFormGetValues<FieldValues>;
  hookFormClearErrors?: UseFormClearErrors<FieldValues>;
  hookFormResetField?: UseFormResetField<FieldValues>;
  hookFormWatch?: UseFormWatch<FieldValues>;
  hookFormSetError?: UseFormSetError<FieldValues>;
  hookFormUnregister?: UseFormUnregister<FieldValues>;
  required?: boolean;
  controllerRules?: Omit<
    RegisterOptions<FieldValues, FieldName<FieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

export type InputFieldOption = {
  label: string;
  value: InputFieldValue;
};

export type InputFieldValue = string | number | undefined;

export type InputFieldType =
  | "text"
  | "message"
  | "select"
  | "radio"
  | "date"
  | "date-range"
  | "time"
  | "editor"
  | "drag-upload"
  | "drag-upload-hook-form"
  | "multi-select"
  | "add-items"
  | "checkbox";
