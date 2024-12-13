import Button from '@/app/_components/shared/button-group/button';
import { ViewTaskProps } from './types';
import { ButtonType } from '@/app/_components/shared/page/heading/types';
import DetailGroup from '@/app/_components/shared/detail-group';
import IconWithData, {
  IconWithAction,
} from '@/app/_components/shared/icon-with-data';
import { ChevronDown, Plus, SortDesc } from 'lucide-react';
import { color, icon } from '@/constants';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import Form from '@/app/_components/shared/form';

const ViewTask: React.FC<ViewTaskProps> = ({
  name,
  appName,
  assignedTo,
  dateCreated,
  label,
  dueDate,
  description,
  comments,
  userPicture,
}) => {
  const [showDetails, setShowDetails] = useState(true);
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex items-center'>
        <h4>{name}</h4>
        <div className='flex flex-grow justify-end'>
          <Button
            type={ButtonType.black}
            text='To Do'
            popoverOptions={[
              { name: 'To Do', onClick: () => {} },
              { name: 'In progress', onClick: () => {} },
              { name: 'Completed', onClick: () => {} },
            ]}
          />
        </div>
      </div>
      <div className='common-card'>
        <div className='flex'>
          <h6>Details</h6>
          <div className='flex-grow flex justify-end'>
            <ChevronDown
              className='cursor-pointer'
              onClick={() => setShowDetails(!showDetails)}
              style={{ rotate: showDetails ? '180deg' : '0deg' }}
            />
          </div>
        </div>
        {showDetails && (
          <div className={`border-t mt-4 pt-4`}>
            <DetailGroup
              gridLayout='view-task-details'
              details={[
                { name: 'APP NAME', value: appName },
                { name: 'ASSIGNED TO', value: '' },
                { name: 'CREATED', value: dateCreated },
                { name: 'LABELS', value: label, type: 'status' },
                { name: 'DUE DATE', value: dueDate },
              ]}
            />
          </div>
        )}
      </div>
      <div>
        <h6>Description</h6>
        <p className='card-subtitle-small'>{description}</p>
      </div>
      <div className='flex gap-2'>
        <h6>Subtask</h6>
        <IconWithAction icon={<Plus />} action='Add' color={color.info.dark} />
      </div>
      <div className='flex items-center'>
        <h6>Activity</h6>
        <div className='flex items-center flex-grow justify-end'>
          <IconWithAction
            icon={<SortDesc />}
            action='Newest first'
            color={color.info.dark}
          />
        </div>
      </div>
      <div className='flex gap-4'>
        <div>
          <Avatar src={userPicture} style={{ width: '32px', height: '32px' }} />
        </div>
        <div className='flex-grow flex flex-col gap-2 mt-[-10]'>
          <Form
            inputFields={[{ placeholder: 'Add a comment...', type: 'text' }]}
          />
          <p>
            <b>Pro tip:</b> press <b>M</b> to comment
          </p>
        </div>
      </div>
      {comments.map((comment, index) => (
        <div key={index} className='flex gap-4'>
          <div>
            <Avatar
              src={comment.image}
              style={{ width: '32px', height: '32px' }}
            />
          </div>
          <div className='flex-grow flex flex-col gap-2 mt-[-10]'>
            <div className='flex items-center gap-2'>
              <h6>{comment.name}</h6>
              <IconWithData icon={icon.clock} data={comment.timePosted} />
            </div>
            <p>{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewTask;
