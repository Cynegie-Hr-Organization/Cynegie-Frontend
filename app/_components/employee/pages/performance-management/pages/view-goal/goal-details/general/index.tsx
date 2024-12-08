import { GeneralGoalDetailsProps } from '../types';

const GeneralGoalDetails: React.FC<GeneralGoalDetailsProps> = (props) => {
  const { name, description, department, dueDate, priority } = props;

  const additionalInfo = [
    { name: 'Department', value: department },
    { name: 'Due Date', value: dueDate },
    { name: 'Priority', value: priority },
  ];

  return (
    <div className='flex flex-col gap-4'>
      <div className='card-title-large'>{name}</div>
      <div className='card-subtitle-large'>{description}</div>
      <div className='flex w-full gap-2 flex-col md:flex-row md:gap-10'>
        {additionalInfo.map((info) => (
          <div>
            <span className='font-bold'>{info.name}: </span>
            <span>{info.value}</span>
          </div>
        ))}
      </div>
      <div>
        <p>Avatar Group</p>
        <p>Shared With</p>
      </div>
    </div>
  );
};

export default GeneralGoalDetails;
