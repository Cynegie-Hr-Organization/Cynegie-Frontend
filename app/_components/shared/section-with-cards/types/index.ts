import { ColorVariant } from '@/types';

export type SectionWithCardsProps = {
  title: string;
  isCard?: boolean;
  period?: string;
  headerDivider?: boolean;
  cardsData?: CardProps[];
  cardsGroup?: CardGroupProps;
};

export type CardProps = {
  value: number | string;
  valueBelow?: boolean;
  valueLineColor?: string;
  lineBelowValue?: boolean;
  icon?: React.ReactElement;
  iconColorVariant?: ColorVariant;
  iconContainerHeight?: number;
  iconContainerWidth?: number;
  labelText: string;
  hasIcon?: boolean;
  denominator?: number;
  isPercentage?: boolean;
};

export type CardValueProps = {
  value?: number | string;
  lineBelow?: boolean;
  lineColor?: string;
  denominator?: number;
  isPercentage?: boolean;
};

export type CardLabelProps = {
  icon?: React.ReactElement;
  iconColorVariant?: ColorVariant;
  iconContainerHeight?: number;
  iconContainerWidth?: number;
  text: string;
  hasIcon?: boolean;
};

export type CardLabelIconProps = {
  icon?: React.ReactElement;
  colorVariant?: ColorVariant;
  containerHeight?: number;
  containerWidth?: number;
};

export type CardTitleProps = { text: string; size?: 'small' | 'large' };

export type CardPeriodProps = {
  text: string;
  font?: { size: number; weight: number; color: string };
};

export type CardHeaderProps = {
  headerIcon?: React.ReactElement;
  title: string;
  period?: string;
  hasDivider?: boolean;
  periodFont?: { size: number; weight: number; color: string };
  titleSize?: 'small' | 'large';
  periodClick?: () => void;
};

export type SectionCardContainerProps = {
  headerIcon?: React.ReactElement;
  title: string;
  period?: string;
  periodFont?: { size: number; weight: number; color: string };
  periodClick?: () => void;
  headerDivider?: boolean;
  isCard?: boolean;
  children: React.ReactNode;
};

export type CardGroupProps = {
  data?: CardProps[];
  hasIcon?: boolean;
  gridItemSize?: GridItemSize;
};

type GridItemSize = { xs?: number; sm?: number; md?: number; lg?: number };
