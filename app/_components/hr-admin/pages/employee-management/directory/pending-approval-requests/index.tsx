import Popover from "@/app/_components/shared/custom-popover";
import PendingApprovalRequestsItem from "./item";
import { PendingApprovalRequestsProps } from "./types";
import { PopoverType } from "@/app/_components/shared/custom-popover/types";
import MoreOptionsButton from "@/app/_components/shared/more-options-button";
import { Switch } from "@mui/material";

const PendingApprovalRequests: React.FC<PendingApprovalRequestsProps> = ({
  requests,
  actions,
  type,
}) => {
  return (
    <div className="flex flex-col h-full pt-5">
      {requests.map((request, index) => (
        <div key={index} className="flex flex-col h-full">
          <div className="flex-grow flex items-center h-full">
            <div
              className={`flex-grow ${
                index === requests.length - 1 && "mt-[-15]"
              }`}
            >
              <PendingApprovalRequestsItem {...request} />
            </div>
            {type === "actions" && (
              <Popover
                type={PopoverType.moreOptions}
                moreOptions={actions}
                triggerButton={<MoreOptionsButton />}
              />
            )}
            {type === "switch" && <Switch />}
          </div>
          {index !== requests.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};

export default PendingApprovalRequests;
