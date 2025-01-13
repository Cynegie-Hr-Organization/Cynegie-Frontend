import {  SetStateAction } from 'react';
import { DetailGroupProps } from '@/app/_components/shared/detail-group/types';
import { FormProps } from '@/app/_components/shared/form/types';
import { ButtonProps } from '@/app/_components/shared/page/heading/types';
import { ButtonGroupPosition } from '@/app/_components/shared/button-group/types';
import { ViewTaskProps } from '../../pages/task/view-task/types';
import { AddItemsProps } from '@/app/_components/shared/custom-popover/content/add-items';

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

export type ModalData = Omit<ModalProps, 'open' | 'onClose'>;

export type InputFieldProps = {
  name?: string;
  type: InputFieldType;
  placeholder?: string;
  options?: InputFieldOption[];
  value?: string | number;
  setValue?: (value: string | number) => void;
  selectValControlledFromOutside?: boolean;
  disabled?: boolean;
  defaultValue?: string | number;
  addItemsProps?: AddItemsProps;
  getCurrentValue?: (arg: string | number) => void;
  startAdornment?: React.ReactElement;
  checkboxItems?: string[];
  
};

export type InputFieldOption = { label: string; value: string | number };

export type InputFieldType =
  | 'text'
  | 'message'
  | 'select'
  | 'radio'
  | 'date'
  | 'date-range'
  | 'time'
  | 'editor'
  | 'drag-upload'
  | 'multi-select'
  | 'add-items'
  | 'checkbox';
