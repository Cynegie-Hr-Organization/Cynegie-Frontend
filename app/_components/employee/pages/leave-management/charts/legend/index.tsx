import Dot from '@/app/_components/shared/dot';
import { Stack } from '@mui/material';

type DotLegend = {
  dotColor: string;
  label: string;
  value: number;
  countedItemName: string;
};

const DotLegend: React.FC<DotLegend> = (props) => {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ color: '#1A1919', fontWeight: 400, fontSize: '14px' }}
    >
      <Stack direction='row' alignItems='center' gap={1}>
        <Dot color={props.dotColor} width={18.29} height={18.36} />
        <div>{props.label}</div>
      </Stack>
      <div>{`${props.value} ${
        props.countedItemName + (!(props.value == 1) ? 's' : '')
      }`}</div>
    </Stack>
  );
};

export default DotLegend;
