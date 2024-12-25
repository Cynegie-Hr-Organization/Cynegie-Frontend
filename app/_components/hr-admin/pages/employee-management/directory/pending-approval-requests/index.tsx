import Popover from "@/app/_components/shared/custom-popover";
import PendingApprovalRequestsItem from "./item";
import { PendingApprovalRequestsProps } from "./types";
import { PopoverType } from "@/app/_components/shared/custom-popover/types";
import MoreOptionsButton from "@/app/_components/shared/more-options-button";

const PendingApprovalRequests: React.FC<PendingApprovalRequestsProps> = ({
  requests,
  actions,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {requests.map((request, index) => (
        <div key={index} className="flex items-center justify-between">
          <PendingApprovalRequestsItem {...request} />
          <Popover
            type={PopoverType.moreOptions}
            moreOptions={actions}
            triggerButton={<MoreOptionsButton />}
          />
        </div>
      ))}
    </div>
  );
};

export default PendingApprovalRequests;
