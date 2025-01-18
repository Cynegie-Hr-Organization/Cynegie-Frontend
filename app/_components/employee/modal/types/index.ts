import { ButtonGroupPosition } from "@/app/_components/shared/button-group/types";
import { AddItemsProps } from "@/app/_components/shared/custom-popover/content/add-items";
import { DetailGroupProps } from "@/app/_components/shared/detail-group/types";
import { FormProps } from "@/app/_components/shared/form/types";
import { ButtonProps } from "@/app/_components/shared/page/heading/types";
import { Dayjs } from "dayjs";
import { SetStateAction } from "react";
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
  hasDocSelect?: boolean;
  isPayrollSlip?: boolean;
  buttonGroupPosition?: ButtonGroupPosition;
  viewTaskProps?: ViewTaskProps;
};

export type ModalData = Omit<ModalProps, "open" | "onClose">;

export type InputFieldProps = {
  name?: string;
  type: InputFieldType;
  placeholder?: string;
  options?: InputFieldOption[];
  value?: string | number;
  // setValue?: Dispatch<SetStateAction<string | number | undefined>>;
  setValue?: (arg: InputFieldValue) => void;
  selectValControlledFromOutside?: boolean;
  disabled?: boolean;
  defaultValue?: string | number;
  addItemsProps?: AddItemsProps;
  getCurrentValue?: (arg: string | number) => void;
  startAdornment?: React.ReactElement;
  checkboxItems?: string[];
  getDateRange?: (range: { startDate: Date; endDate: Date }) => void;
  getDate?: (date: Dayjs | null) => void;
  dateRangeValue?: DateRange | null;
  dateRangeDefaultValue?: DateRange | null;
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
  | "multi-select"
  | "add-items"
  | "checkbox";
