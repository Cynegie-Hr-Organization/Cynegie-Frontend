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
}

const AppButton: React.FC<AppButtonProps> = ({ label, onClick, leftIcon, rightIcon, isLoading, className }) => {
  return (
    <button
      onClick={onClick}
      className={`capitalize flex items-center justify-center gap-x-2 outline-none rounded-lg px-[12.33px] py-[9px] font-bold ${className}`}
    >
      {isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : leftIcon}
      <span>{label}</span>
      {rightIcon}
    </button>
  );
};

export default AppButton; 