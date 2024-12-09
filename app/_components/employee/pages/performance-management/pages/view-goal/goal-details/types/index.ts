import { Tab } from '@/app/_components/shared/tabs/types';

export type GoalDetailsProps = {
  generalDetails: GeneralGoalDetailsProps;
  alignmentDetails: AlignmentGoalDetailsProps;
  tableTabs: Tab[];
};

export type GeneralGoalDetailsProps = {
  name?: string;
  description?: string;
  department?: string;
  dueDate?: string;
  priority?: string;
  userPictures?: string[];
};

export type AlignmentGoalDetailsProps = GoalCompletion;

type GoalCompletion = {
  alignedGoal?: AlignedGoal;
  chart?: AlignmentGoalDetailsChartProps;
};

type AlignedGoal = {
  type: string;
  name: string;
};

export type AlignmentGoalDetailsChartProps = {
  value?: number;
  status?: { label: string; color: string };
};
