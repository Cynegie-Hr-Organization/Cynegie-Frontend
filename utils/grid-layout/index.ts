export type GridLayout =
  | 'request-correction'
  | 'request-feedback'
  | 'view-details'
  | 'view-details-two'
  | 'development-plan'
  | '3-columns';

export const getGridLayout = (index: number, layout?: GridLayout) => {
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
  if (layout === 'view-details-two') {
    const sm = index === 3 ? 12 : 4;
    return { xs: 12, sm: sm };
  }
  if (layout === '3-columns') {
    return { xs: 12, sm: 4 };
  }
  return { xs: 12 };
};
