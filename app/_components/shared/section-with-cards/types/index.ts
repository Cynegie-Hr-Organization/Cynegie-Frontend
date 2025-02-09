import { InputFieldProps } from "@/app/_components/employee/modal/types";
import { ColorVariant } from "@/types";

export type SectionWithCardsProps = {
  title: string;
  isCard?: boolean;
  period?: string;
  periodClick?: () => void;
  headerDivider?: boolean;
  selectFilterProps?: InputFieldProps;
  cardsData?: CardProps[];
  cardsGroup?: CardGroupProps;
};

export type CardProps = {
  value: number | string | undefined;
  valueBelow?: boolean;
  valueLineColor?: string;
  lineBelowValue?: boolean;
  icon?: React.ReactElement;
  iconColorVariant?: ColorVariant;
  iconContainerHeight?: number;
  iconContainerWidth?: number;
  labelText: string;
  largeLabelText?: boolean;
  hasIcon?: boolean;
  denominator?: number;
  isPercentage?: boolean;
  additionalInfo?: CardAdditionalInfo;
  loading?: boolean;
};

export type CardAdditionalInfo = {
  left?: { text: string; color?: string };
  right?: { text: string; color?: string };
};

export type CardValueProps = {
  value?: number | string;
  lineBelow?: boolean;
  lineColor?: string;
  denominator?: number;
  isPercentage?: boolean;
  additionalInfo?: CardAdditionalInfo;
  loading?: boolean;
};

export type CardLabelProps = {
  icon?: React.ReactElement;
  iconColorVariant?: ColorVariant;
  iconContainerHeight?: number;
  iconContainerWidth?: number;
  text: string;
  largeText?: boolean;
  hasIcon?: boolean;
};

export type CardLabelIconProps = {
  icon?: React.ReactElement;
  colorVariant?: ColorVariant;
  containerHeight?: number;
  containerWidth?: number;
};

export type CardTitleProps = { text: string; size?: "small" | "large" };

export type CardPeriodProps = {
  text: string;
  isClickable?: boolean;
  font?: { size?: number; weight?: number; color?: string };
};

export type CardHeaderProps = {
  headerIcon?: React.ReactElement;
  title: string;
  period?: string;
  hasDivider?: boolean;
  periodFont?: { size?: number; weight?: number; color?: string };
  titleSize?: "small" | "large";
  periodClick?: () => void;
};

export type SectionCardContainerProps = {
  headerIcon?: React.ReactElement;
  title: string;
  titleSize?: "small" | "large";
  period?: string;
  periodFont?: { size?: number; weight?: number; color?: string };
  periodClick?: () => void;
  headerDivider?: boolean;
  isCard?: boolean;
  children: React.ReactNode;
};

export type CardGroupProps = {
  cards?: CardProps[];
  hasIcon?: boolean;
  gridItemSize?: GridItemSize;
  cardLargeLabelText?: boolean;
  cardValueBelow?: boolean;
  loading?: boolean;
};

type GridItemSize = { xs?: number; sm?: number; md?: number; lg?: number };
