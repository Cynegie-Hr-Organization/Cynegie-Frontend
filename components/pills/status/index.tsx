import { Box } from '@mui/material';

const StatusPill: React.FC<{ variant: 'success'; text: string }> = ({
  variant,
  text,
}) => {
  return (
    <Box
      sx={{
        borderRadius: '12px',
        ...(variant === 'success' && { backgroundColor: '#E7F6EC' }),
        ...(variant === 'success' && { color: '#036B26' }),
        textTransform: 'capitalize',
        fontSize: '12px',
        width: '80px',
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 600,
        paddingY: '4px',
      }}
    >
      {text}
    </Box>
  );
};

export default StatusPill;
