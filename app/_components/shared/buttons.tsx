<<<<<<< HEAD
"use client";
=======
'use client'
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
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
      className={`rounded-lg text-base p-2 text-white ${className ?? "bg-primary "}`}
<<<<<<< HEAD
      onClick={onClick}
    >
=======
      onClick={onClick}>
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
      {loading && <Spinner />}
      <span>{buttonText}</span>
    </Button>
  );
};

<<<<<<< HEAD
export const Spinner = () => <Loader2 className="animate-spin" />;
=======
export const Spinner = () => <Loader2 className='animate-spin' />;
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

export default Appbutton;
