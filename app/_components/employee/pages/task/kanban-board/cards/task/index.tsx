import StatusPill from '@/app/_components/shared/pills/status';
import { Stack } from '@mui/material';
import { Task } from '../../types';
import { color, icon, PDStatusMap } from '@/constants';
import AvatarGroup from '@/app/_components/shared/avatar-group';
import IconWithData from '@/app/_components/shared/icon-with-data';

const TaskCard: React.FC<Task> = ({
  name,
  status,
  app,
  dueDate,
  userPictures,
  noOfComments,
}) => {
  const isPending = status === 'Pending';
  return (
    <Stack
      gap={1}
      style={{
        border: '1px solid #E4E7EC',
        borderRadius: '12px',
        padding: '15px',
      }}
    >
      <div
        style={{
          display: 'flex',
          borderLeftWidth: '3px',
          borderColor: isPending ? color.warning.dark : color.success.dark,
          paddingLeft: '10px',
        }}
      >
        <div
          style={{
            flexGrow: 1,
            fontWeight: 600,
            fontSize: '12px',
            color: '#1B1B1B',
          }}
        >
          <div>{name}</div>
          <div style={{ fontWeight: 400, fontSize: '10px', color: '#909090' }}>
            On {app}
          </div>
        </div>
        <div>
          <StatusPill text={status ?? ''} variant={PDStatusMap[status ?? '']} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            flexGrow: 1,
            fontWeight: 400,
            fontSize: '10px',
            color: '#909090',
          }}
        >
          {status === 'Pending' ? 'Not started yet' : 'Completed'}
        </div>
        <div>
          <AvatarGroup avatars={userPictures} />
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <span style={{ fontWeight: 400, fontSize: '10px', color: '#909090' }}>
            Due:
          </span>{' '}
          <span style={{ fontWeight: 600, color: '#1B1B1B', fontSize: '11px' }}>
            {dueDate}
          </span>
        </div>
        <IconWithData icon={icon.message} data={noOfComments as number} />
      </div>
    </Stack>
  );
};

export default TaskCard;
