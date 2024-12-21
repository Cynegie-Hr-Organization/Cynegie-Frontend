import SvgIcon from '@/app/_components/icons/container';
import AvatarGroup from '@/app/_components/shared/avatar-group';
import StatusPill from '@/app/_components/shared/pills/status';
import { StatusMap } from '@/app/_components/shared/table/types';

type RecentRequestAccessCardProps = {
  appLogo: string;
  appName: string;
  status: string;
  dueDate: string;
  userPictures: string[];
  statusMap: StatusMap;
};

const RecentRequestAccessCard: React.FC<RecentRequestAccessCardProps> = ({
  appLogo,
  appName,
  status,
  dueDate,
  userPictures,
  statusMap,
}) => {
  return (
    <div className='flex flex-col common-card gap-6'>
      <div className='flex gap-4'>
        <div>
          <SvgIcon path={appLogo} width={26} height={26} />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='card-title-small'>{appName}</div>
          <div>
            <StatusPill text={status} variant={statusMap[status]} />
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-2 justify-between items-center mb-[-10px]'>
        <div>
          <span className='text-[grey]'>Due</span>: {dueDate}
        </div>
        <div>
          <AvatarGroup avatars={userPictures} />
        </div>
      </div>
    </div>
  );
};

export default RecentRequestAccessCard;
