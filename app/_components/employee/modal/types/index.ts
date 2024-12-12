import { Dispatch, SetStateAction } from 'react';
import { DetailGroupProps } from '@/app/_components/shared/detail-group/types';
import { FormProps } from '@/app/_components/shared/form/types';
import { ButtonProps } from '@/app/_components/shared/page/heading/types';

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
};

export type ModalData = Omit<ModalProps, 'open' | 'onClose'>;

export type InputField = {
  name?: string;
  type: InputFieldType;
  placeholder?: string;
  options?: InputFieldOption[];
  value?: string | number;
  setValue?: Dispatch<SetStateAction<string | number | undefined>>;
  selectValControlledFromOutside?: boolean;
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
  | 'drag-upload';
