import React from 'react';
import { InputFieldProps } from '../../modal/types';
import { TextField } from '@mui/material';

const MessageField: React.FC<Omit<InputFieldProps, 'type'>> = ({
  placeholder,
  value,
  setValue,
}) => {
  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      multiline
      minRows={5}
      value={value}
      onChange={(e) => setValue?.(e.target.value)}
    />
  );
};

export default MessageField;
