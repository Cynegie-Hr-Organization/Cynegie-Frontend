import { TextField as MuiTextField } from "@mui/material";
import { InputFieldProps } from "../../modal/types";

const textFieldStyle = {
  "& .MuiInputBase-root": {
    height: "45px",
    borderRadius: "8px",
  },
};

const TextField: React.FC<Omit<InputFieldProps, "type">> = ({
  placeholder,
  value,
  setValue,
}) => {
  return (
    <MuiTextField
      sx={textFieldStyle}
      fullWidth
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue?.(e.target.value)}
    />
  );
};

export default TextField;
