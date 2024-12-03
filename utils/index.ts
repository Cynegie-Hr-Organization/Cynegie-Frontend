import { color } from '@/constants';
import { ColorVariant } from '@/types';

export function getMonthRange(monthIndex: number, year: number): string {
  const monthNames = [
    { name: 'Jan', days: 31 },
    { name: 'Feb', days: 28 }, // Default days in February (handled for leap year below)
    { name: 'Mar', days: 31 },
    { name: 'Apr', days: 30 },
    { name: 'May', days: 31 },
    { name: 'Jun', days: 30 },
    { name: 'Jul', days: 31 },
    { name: 'Aug', days: 31 },
    { name: 'Sep', days: 30 },
    { name: 'Oct', days: 31 },
    { name: 'Nov', days: 30 },
    { name: 'Dec', days: 31 },
  ];

  // Check if the given year is a leap year
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

  // Adjust February days for leap year
  if (isLeapYear && monthIndex === 1) {
    monthNames[1].days = 29; // February has 29 days in a leap year
  }

  const month = monthNames[monthIndex];
  return `1 - ${month.days} ${month.name} ${year}`;
}

export const getColorVariant = (variant?: ColorVariant) => {
  switch (variant) {
    case 'success':
      return {
        fill: color.success.dark,
        backgroundColor: color.success.light,
      };
    case 'info':
      return {
        fill: color.info.dark,
        backgroundColor: color.info.light,
      };
    case 'warning':
      return {
        fill: color.warning.dark,
        backgroundColor: color.warning.light,
      };
    case 'error':
      return {
        fill: color.error.dark,
        backgroundColor: color.error.light,
      };
    case 'grey':
      return {
        fill: color.grey.dark,
        backgroundColor: color.grey.light,
      };
    default:
      return {
        fill: '',
        backgroundColor: '',
      };
  }
};
