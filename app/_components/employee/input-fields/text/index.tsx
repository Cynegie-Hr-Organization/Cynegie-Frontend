import { TextField as MuiTextField } from '@mui/material';
import { InputFieldProps } from '../../modal/types';
import { color } from '@/constants';

const textFieldStyle = {
  '& .MuiInputBase-root': {
    height: '45px',
    borderRadius: '8px',
  },
};

const TextField: React.FC<Omit<InputFieldProps, 'type'>> = ({
  placeholder,
  value,
  setValue,
  disabled,
  defaultValue,
  startAdornment,
}) => {
  return (
    <MuiTextField
      sx={{
        ...textFieldStyle,
        ...(disabled && color.inputfield.disabled),
      }}
      disabled={disabled}
      fullWidth
      defaultValue={defaultValue}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue?.(e.target.value)}
      slotProps={{
        input: {
          startAdornment: startAdornment,
        },
      }}
    />
  );
};

export default TextField;
