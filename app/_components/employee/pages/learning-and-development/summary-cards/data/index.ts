import { color } from '@/constants';
import { SummaryCard } from '@/types';

const summaryCardsData: SummaryCard[] = [
  {
    value: 12,
    iconColorVariant: 'success',
    labelText: 'Course Completed',
    valueLineColor: color.success.dark,
  },
  {
    value: 1,
    iconColorVariant: 'warning',
    labelText: 'Course In Progress',
    valueLineColor: color.warning.dark,
  },
  {
    value: 20,
    iconColorVariant: 'error',
    labelText: 'Course Overdue',
    valueLineColor: color.error.dark,
  },
  {
    value: 20,
    iconColorVariant: 'info',
    labelText: 'Certification Received',
    valueLineColor: color.info.dark,
  },
];

export default summaryCardsData;
