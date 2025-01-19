import { GridLayout } from "@/utils/grid-layout";
import { StatusMap } from "../../table/types";

export type DetailGroupProps = {
  isCard?: boolean;
  loading?: boolean;
  details?: SingleDetail[];
  gridLayout?: GridLayout;
  spaceBetweenLayout?: boolean;
  statusMap?: StatusMap;
  gridItemSize?: { xs: number; sm: number; md: number; lg: number };
};

export type SingleDetail = {
  loading?: boolean;
  name: string;
  value?: string;
  icon?: string;
  spaceBetweenLayout?: boolean;
  type?: "status" | "document";
  statusMap?: StatusMap;
};
