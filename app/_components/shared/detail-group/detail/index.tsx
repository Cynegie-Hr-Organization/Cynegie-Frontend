import { Stack, SxProps } from '@mui/material';
import { SingleDetail } from '../types';
import DetailName from './name';
import DetailValue from './value';
import StatusPill from '../../pills/status';

const spaceBetweenLayout: SxProps = {
  direction: { xs: 'column', sm: 'row' },
  justifyContent: { xs: 'flex-start', sm: 'space-between' },
  gap: { xs: 1, sm: 20 },
};

const Detail: React.FC<SingleDetail> = (props) => {
  return (
    <Stack {...(props.spaceBetweenLayout ? spaceBetweenLayout : { gap: 0.5 })}>
      <DetailName name={props.name} />
      {props.type === 'status' && (
        <StatusPill
          variant={props.statusMap?.[props.value]}
          text={props.value}
        />
      )}
      {props.type === 'document' && (
        <StatusPill variant='info' text={props.value} icon={props.icon} />
      )}
      {!props.type && <DetailValue value={props.value} />}
    </Stack>
  );
};

export default Detail;
