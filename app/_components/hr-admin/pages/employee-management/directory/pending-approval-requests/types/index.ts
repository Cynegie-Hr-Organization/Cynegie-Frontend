import { TableAction } from "@/app/_components/shared/table/types";

export type PendingApprovalRequestsProps = {
  requests: PendingApprovalRequestsItemProps[];
  actions: TableAction[];
};

export type PendingApprovalRequestsItemProps = {
  title: string;
  from: string;
};
