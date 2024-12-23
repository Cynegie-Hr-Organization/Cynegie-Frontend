import React from 'react';
import { Checkbox } from '@mui/material';

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
