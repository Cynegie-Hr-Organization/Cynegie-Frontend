import { PendingApprovalRequestsItemProps } from '../types';

const PendingApprovalRequestsItem: React.FC<
  PendingApprovalRequestsItemProps
> = ({ title, from }) => {
  return (
    <div>
      <p className='font-bold mb-[-7]'>{title}</p>
      <p>{from}</p>
    </div>
  );
};

export default PendingApprovalRequestsItem;
