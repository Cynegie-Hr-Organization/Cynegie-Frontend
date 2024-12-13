import { UserRole } from "./enum";

export type Dict = Record<string, string>;
export type DictOf<T> = Record<string, T>;

export type Mode = "info" | "success" | "warning" | "error";

export const rolesMap: Record<string, string> = {
  [UserRole.SUPER_ADMIN]: "/super-admin",
  [UserRole.HR_ADMIN]: "/hr-admin",
  [UserRole.IT_ADMIN]: "/it-admin",
};
