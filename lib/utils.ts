import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const localTime = (time: string, timeFormat: string = "dd MMM") =>
  format(new Date(time), timeFormat);

// utils/dateFormatter.ts
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-GB", options)
    .replace(/(\d{2})\/(\w{3})\/(\d{4})/, "$1-$2-$3");
};

// random indexes
export const newIndex = (index: number) => {
  const { random } = Math;
  return random() + index;
};

// Helper function to truncate text
export const truncateText = (text: string, length: number = 100): string => {
  if (text.length > length) {
    return `${text.substring(0, length)}...`; // Truncate and add ellipsis
  }
  return text;
};

export const getLocalCurrency = (amount: number, currency: string = 'NGN') => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency
  }).format(amount);
}
