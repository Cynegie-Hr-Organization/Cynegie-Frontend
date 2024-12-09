'use client'

import React from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface AppButtonProps {
  label: string;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({ label, onClick, leftIcon, rightIcon, isLoading, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`capitalize flex items-center justify-center gap-x-2 outline-none rounded-lg px-[12.33px] py-[9px] font-bold w-full md:w-[230px] ${className || ''}`}
    >
      {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : leftIcon}
      <span>{label}</span>
      {rightIcon}
    </button>
  );
};

export default AppButton; 