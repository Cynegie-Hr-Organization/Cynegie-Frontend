'use client'

import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface AppButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({ label, type, onClick, leftIcon, rightIcon, isLoading, className, disabled }) => {
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      className={`capitalize flex items-center justify-center gap-x-2 outline-none rounded-lg px-[12.33px] py-[9px] font-bold w-full md:w-[230px] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-400 transition duration-300 ${className || ''}`}
    >
      {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : leftIcon}
      <span>{label}</span>
      {rightIcon}
    </button>
  );
};

export default AppButton; 