import { Stack } from '@mui/material';
import Header from '../header';

const SectionCardContainer: React.FC<{
  title: string;
  period?: string;
  periodFont?: { size: number; weight: number; color: string };
  periodClick?: () => void;
  headerDivider?: boolean;
  children: React.ReactNode;
}> = ({
  title,
  period,
  children,
  headerDivider = false,
  periodFont,
  periodClick,
}) => {
  return (
    <Stack sx={{ minHeight: '100%' }} gap={2}>
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
