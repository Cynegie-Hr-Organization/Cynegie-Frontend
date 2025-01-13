import { TextField as MuiTextField } from '@mui/material';
import { InputFieldProps } from '../../modal/types';
import { color } from '@/constants';

const textFieldStyle = {
  '& .MuiInputBase-root': {
    height: '45px',
    borderRadius: '8px',
  },
};

const TextField: React.FC<Omit<InputFieldProps, 'type'> & { inputProps?: React.InputHTMLAttributes<HTMLInputElement> }> = ({
  placeholder,
  value,
  setValue,
  disabled,
  defaultValue,
  startAdornment,
  inputProps, 
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
      value={value || ''} // Ensure no uncontrolled component issues
      onChange={(e) => setValue?.(e.target.value)}
      inputProps={{
        startAdornment: startAdornment,
        ...inputProps, // Spread inputProps to the MuiTextField's InputProps
      }}
    />
  );
};

export default TextField;
