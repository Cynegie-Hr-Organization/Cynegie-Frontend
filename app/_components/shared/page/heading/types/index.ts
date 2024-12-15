import { TableAction } from '../../../table/types';

export type PageHeadingProps = {
  type?: HeadingType;
  smallHeading?: boolean;
  title?: string;
  backText?: string;
  subtitle?: string;
  hasButtons?: boolean;
  leftButton?: ButtonProps;
  rightButton?: ButtonProps;
  onBackTextClick?: () => void;
  onCloseClick?: (arg: boolean) => void;
  smActions?: TableAction[];
  rightButtonSm?: boolean;
};

export type ButtonProps = {
  type?: ButtonType;
  text?: string;
  icon?: React.ReactElement;
  onClick?: () => void;
  popoverOptions?: { name: string; onClick: () => void }[];
  fullWidth?: boolean;
  small?: boolean;
};

export type ContainedButtonProps = {
  text?: string;
  onClick?: () => void;
};

export enum ButtonType {
  outlined,
  contained,
  filter,
  outlinedBlue,
  deleteContained,
  deleteWithIcon,
  disabled,
  black,
}

export type HeadingType = 'page' | 'modal' | 'card';

export type HeadingBackProps = {
  text: string;
  onClick?: () => void;
};
