import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
<<<<<<< HEAD
=======

// utils/dateFormatter.ts
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', options).replace(/(\d{2})\/(\w{3})\/(\d{4})/, '$1-$2-$3');
};
>>>>>>> d21b1ea1eff8c12dbd6b2997de3987a0171ef053
