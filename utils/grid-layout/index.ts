export type GridLayout =
  | 'request-correction'
  | 'request-feedback'
  | 'view-details'
  | 'development-plan';

export const getGridLayout = (
  index: number,
  length: number,
  layout?: GridLayout
) => {
  if (layout === 'request-correction') {
    const lg = index === 3 ? 12 : index == 4 ? 6 : 4;
    return { xs: 12, md: lg, lg: lg };
  }
  if (layout === 'view-details') {
    const sm = 6;
    return { xs: 12, sm: sm };
  }
  if (layout === 'request-feedback') {
    const sm = index === 4 ? 12 : 6;
    return { xs: 12, sm: sm };
  }
  if (layout === 'development-plan') {
    return { xs: 12, sm: 3 };
  }
  return { xs: 12 };
};
