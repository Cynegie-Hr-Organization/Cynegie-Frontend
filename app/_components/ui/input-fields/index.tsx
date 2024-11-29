/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface TextFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  error?: string;
  register: any; 
}

const TextField: React.FC<TextFieldProps> = ({ label, type = "text", placeholder, error, register }) => (
  <div className="flex flex-col">
    <label className="font-semibold text-sm text-gray-900 leading-[20.3px]">{label}</label>
    <input
      type={type}
      {...register}
      placeholder={placeholder}
      className="input-field border-[1px] rounded-md mt-2 border-gray-200 p-3"
    />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default TextField;
