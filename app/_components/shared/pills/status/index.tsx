import { ColorVariant } from '@/types';
import { Box } from '@mui/material';

const StatusPill: React.FC<{
  variant?: ColorVariant;
  text: string;
  large?: boolean;
}> = ({ variant, text }) => {
  return (
    <Box
      sx={{
        borderRadius: "12px",
        ...(variant === "success" && { backgroundColor: "#E7F6EC" }),
        ...(variant === "error" && { backgroundColor: "#FBEAE9" }),
        ...(variant === "warning" && { backgroundColor: "#FFF5E6" }),
        ...(variant === "success" && { color: "#036B26" }),
        ...(variant === "error" && { color: "#9E0A05" }),
        ...(variant === "warning" && { color: "#B56D00" }),
        textTransform: "capitalize",
        fontSize: "12px",
        width: "80px",
        display: "flex",
        justifyContent: "center",
        fontWeight: 600,
        paddingY: "4px",
      }}
    >
      {text}
    </Box>
  );
};

export default StatusPill;
