import { color } from '@/constants';
import { CardPeriodProps } from '../types';
import Box from '@mui/material/Box';

const Period: React.FC<CardPeriodProps> = (props) => {
  const { text, isClickable, font } = props;
  return (
    <Box
      style={{
        fontSize: font?.size ?? '12px',
        fontWeight: font?.weight ?? 400,
      }}
      sx={{
        color: font?.color ?? '#98A2B3',
        '&:hover': {
          color: isClickable ? color.info.dark : 'white',
        },
      }}
    >
      {text}
    </Box>
  );
};

export default Period;
