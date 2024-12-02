/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  error?: string;
  register: any;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  placeholder,
  error,
  register,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col relative">
      <label className="font-semibold text-sm text-gray-900 leading-[20.3px]">
        {label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        {...register}
        placeholder={placeholder}
        className="input-field border-[1px] rounded-md mt-2 border-gray-200 p-3"
      />
      <span
        className="absolute top-[45px] right-3 text-gray-500 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PasswordField;
