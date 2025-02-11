"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Appbutton = ({
  buttonText,
  loading,
  disabled,
  className,
  onClick,
}: {
  loading?: boolean;
  disabled?: boolean;
  buttonText: string;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <Button
      disabled={disabled}
      className={`rounded-lg text-sm font-semibold p-2 text-white ${className ?? "bg-primary "}`}
      onClick={onClick}
    >
      {loading && <Spinner />}
      <span>{buttonText}</span>
    </Button>
  );
};

export const Spinner = ({ ...props }) => (
  <Loader2 className={`animate-spin ${props.className ?? ""}`} />
);

export default Appbutton;
