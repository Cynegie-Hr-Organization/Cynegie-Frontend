import { GoalDetailsProps } from './types';
import AlignmentGoalDetails from './alignment';
import GeneralGoalDetails from './general';
import TabFormat from '@/app/_components/shared/tabs';

const GoalDetails: React.FC<GoalDetailsProps> = (props) => {
  const { generalDetails, alignmentDetails, tableTabs } = props;

  return (
    <div className='common-card mt-[-20]'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-5 p-5'>
        <GeneralGoalDetails {...generalDetails} />
        <AlignmentGoalDetails {...alignmentDetails} />
      </div>
      <TabFormat tabs={tableTabs} />
    </div>
  );
};

export default GoalDetails;
