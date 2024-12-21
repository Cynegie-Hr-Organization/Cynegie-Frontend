import Popover from '@/app/_components/shared/custom-popover';
import PendingApprovalRequestsItem from './item';
import { PendingApprovalRequestsProps } from './types';
import { PopoverType } from '@/app/_components/shared/custom-popover/types';
import MoreOptionsButton from '@/app/_components/shared/more-options-button';
import { Switch } from '@mui/material';

const PendingApprovalRequests: React.FC<PendingApprovalRequestsProps> = ({
  requests,
  actions,
  type,
}) => {
  return (
    <div className='flex flex-col h-full gap-4'>
      {requests.map((request, index) => (
        <>
          <div
            key={index}
            className={`flex flex-1 items-center justify-between ${
              index !== 0 && 'mt-[-40]'
            }`}
          >
            <PendingApprovalRequestsItem {...request} />
            {type === 'actions' && (
              <Popover
                type={PopoverType.moreOptions}
                moreOptions={actions}
                triggerButton={<MoreOptionsButton />}
              />
            )}
            {type === 'switch' && <Switch />}
          </div>
          {index !== requests.length - 1 && <hr className='mt-[-20]' />}
        </>
      ))}
    </div>
  );
};

export default PendingApprovalRequests;
