import { color } from "@/constants";
import { FormHelperText, TextField as MuiTextField } from "@mui/material";
import { InputFieldProps } from "../../modal/types";

const textFieldStyle = {
  "& .MuiInputBase-root": {
    // height: '45px',
    height: "37px",
    borderRadius: "8px",
  },
};

const TextField: React.FC<Omit<InputFieldProps, 'type'> & { inputProps?: React.InputHTMLAttributes<HTMLInputElement> }> = ({
    label: name,
  placeholder,
  value,
  setValue,
  disabled,
  defaultValue,
  startAdornment,
  register,
  errors,
  required,
        inputProps, 
}) => {
  return (
    <>
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
        {...register?.(name ?? "", {
          required: required ? `${name} is required` : false,
        })}
        slotProps={{
          input: {
            startAdornment: startAdornment,
          },
        }}
        inputProps={{
        startAdornment: startAdornment,
        ...inputProps, // Spread inputProps to the MuiTextField's InputProps
      }}
      />
      {errors && name && errors[name] && (
        <FormHelperText sx={{ color: "red" }}>
          {typeof errors[name].message === "string" && errors[name].message}
        </FormHelperText>
      )}
    </>
  );
};

export default TextField;
