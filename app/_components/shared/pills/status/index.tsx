import SvgIcon from '@/app/_components/icons/container';
import { color } from '@/constants';
import { ColorVariant } from '@/types';
import { Box } from '@mui/material';

const StatusPill: React.FC<{
  variant?: ColorVariant;
  text: string;
  icon?: string;
  large?: boolean;
}> = ({ variant, text, icon }) => {
  return (
    <Box
      sx={{
        borderRadius: '12px',
        ...(variant === 'success' && { backgroundColor: '#E7F6EC' }),
        ...(variant === 'error' && { backgroundColor: '#FBEAE9' }),
        ...(variant === 'warning' && { backgroundColor: '#FFF5E6' }),
        ...(variant === 'success' && { color: '#036B26' }),
        ...(variant === 'error' && { color: '#9E0A05' }),
        ...(variant === 'warning' && { color: '#B56D00' }),
        ...(variant === 'info' && {
          color: color.info.dark,
          fill: color.info.dark,
          bgcolor: color.info.light,
        }),
        fontSize: '12px',
        width: 'fit-content',
        display: 'flex',
        px: '10px',
        justifyContent: 'center',
        fontWeight: 600,
        paddingY: '4px',
        textWrap: 'nowrap',
        gap: '5px',
        alignItems: 'center',
        textTransform: 'capitalize',
      }}
    >
      {text}
      {icon && <SvgIcon path={icon} width={20} height={20} />}
    </Box>
  );
};

export default StatusPill;
