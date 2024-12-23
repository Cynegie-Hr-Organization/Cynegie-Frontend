import React from 'react';
import { Checkbox } from '@mui/material';
import DetailValue from '@/app/_components/shared/detail-group/detail/value';
import DetailName from '@/app/_components/shared/detail-group/detail/name';

type CheckboxFieldProps = {
  items: string[];
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({ items }) => {
  return (
    <div className='flex flex-col gap-2'>
      {items.map((item) => (
        <div key={item} className='flex gap-0 items-center'>
          <Checkbox />
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default CheckboxField;
