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

const TextField: React.FC<
  Omit<InputFieldProps, "type"> & {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  } & { hookFormName?: string } & { isMessageField?: boolean }
> = ({
  label: name,
  placeholder,
  value,
  setValue: hookFormSetValue,
  disabled,
  defaultValue,
  startadornment: startAdornment,
  endAdornment,
  register,
  errors,
  required,
  hookFormName,
  isMessageField,
}) => {
  return (
    <>
      <MuiTextField
        sx={{
          ...(!isMessageField && textFieldStyle),
          ...(disabled && color.inputfield.disabled),
        }}
        disabled={disabled}
        fullWidth
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...(isMessageField && { multiline: true, minRows: 5 })}
        value={value}
        onChange={(e) => hookFormSetValue?.(e.target.value)}
        {...register?.(hookFormName ?? name ?? "", {
          required: required ? `${name} is required` : false,
          value: defaultValue,
        })}
        slotProps={{
          input: {
            startAdornment: startAdornment,
            endAdornment: endAdornment,
          },
        }}
        //Results in a console error when used
        //   inputProps={{
        //   startAdornment: startAdornment,
        //   ...inputProps, // Spread inputProps to the MuiTextField's InputProps
        // }}
      />
      {errors && !hookFormName && name && errors[name] && (
        <FormHelperText sx={{ color: "red" }}>
          {typeof errors[name].message === "string" && errors[name].message}
        </FormHelperText>
      )}
      {errors && hookFormName && errors[hookFormName] && (
        <FormHelperText sx={{ color: "red" }}>
          {typeof errors[hookFormName].message === "string" &&
            errors[hookFormName].message}
        </FormHelperText>
      )}
    </>
  );
};

export default TextField;
