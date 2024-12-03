import { Box } from '@mui/material';

type DotProps = {
  width: number;
  height: number;
  color: string;
};

const Dot: React.FC<DotProps> = (props) => {
  return (
    <Box
      sx={{
        width: `${props.width}px`,
        height: `${props.height}px`,
        backgroundColor: props.color,
        borderRadius: '50%',
      }}
    ></Box>
  );
};

export default Dot;
