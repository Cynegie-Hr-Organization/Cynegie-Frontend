import { Stack } from '@mui/material';
import Header from '../header';
import { SectionCardContainerProps } from '../types';

const SectionCardContainer: React.FC<SectionCardContainerProps> = (props) => {
  const {
    title,
    isCard,
    period,
    children,
    headerDivider = false,
    periodFont,
    periodClick,
  } = props;
  return (
    <Stack
      className={`${isCard && 'common-card'}`}
      sx={{ minHeight: '100%' }}
      gap={2}
    >
      <Header
        title={title}
        period={period}
        periodFont={periodFont}
        periodClick={periodClick}
        hasDivider={headerDivider}
      />
      {children}
    </Stack>
  );
};

export default SectionCardContainer;
