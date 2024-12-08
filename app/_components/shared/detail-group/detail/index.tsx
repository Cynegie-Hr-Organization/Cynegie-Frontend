import { Stack } from '@mui/material';
import { SingleDetail } from '../types';
import DetailName from './name';
import DetailValue from './value';
import StatusPill from '../../pills/status';

const spaceBetweenLayout: any = {
  direction: 'row',
  justifyContent: 'space-between',
  gap: 20,
};

const Detail: React.FC<SingleDetail> = (props) => {
  return (
    <Stack gap={1} {...(props.spaceBetweenLayout && spaceBetweenLayout)}>
      <DetailName name={props.name} />
      {props.type === 'status' ? (
        <StatusPill
          variant={props.statusMap?.[props.value]}
          text={props.value}
        />
      ) : (
        <DetailValue value={props.value} />
      )}
    </Stack>
  );
};

export default Detail;
