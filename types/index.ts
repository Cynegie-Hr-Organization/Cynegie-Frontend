export type ColorVariant = 'info' | 'success' | 'warning' | 'error' | 'grey';

export type SummaryCard = {
  value: number;
  iconColorVariant: ColorVariant;
  labelText: string;
  valueLineColor?: string;
};
